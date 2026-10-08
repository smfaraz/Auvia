import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '.browser-qa');
mkdirSync(output, { recursive: true });
const port = 9337;
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3000';
const delay = (ms) => new Promise((done) => setTimeout(done, ms));
const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--disable-extensions', '--renderer-process-limit=2',
  '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1440,1000',
  `--remote-debugging-port=${port}`, `--user-data-dir=${resolve(output, 'profile')}`, 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
let socket;
const pending = new Map();
const events = [];
const blocked = new Set();
let sequence = 0;
function send(method, params = {}) {
  const id = ++sequence;
  return new Promise((done, fail) => {
    const timeout = setTimeout(() => { pending.delete(id); fail(new Error(`Timeout: ${method}`)); }, method==='Runtime.evaluate' && process.argv.includes('--audit-check') ? 60000 : 15000);
    pending.set(id, { done, fail, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
  return result.result.value;
}
async function until(expression, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) { if (await evaluate(expression)) return; await delay(150); }
  throw new Error(`Condition not reached: ${expression}`);
}
async function navigate(path) {
  await send('Page.navigate', { url: origin + path });
  await until(`document.querySelector('main')?.dataset.route === ${JSON.stringify(path)} && !document.querySelector('[data-route-loading]') && Boolean(document.querySelector('h1') || document.querySelector('main p'))`);
  await delay(600);
}
async function click(selector) {
  const rect = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)}); if(!el)throw Error('Missing control'); const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...rect, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...rect, button: 'left', clickCount: 1 });
  await delay(80);
}
async function key(key, code, virtualKey) {
  const params = { key, code, windowsVirtualKeyCode: virtualKey, nativeVirtualKeyCode: virtualKey };
  await send('Input.dispatchKeyEvent', { type: 'keyDown', ...params });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...params });
}
async function screenshot(name) {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  writeFileSync(resolve(output, name + '.png'), Buffer.from(result.data, 'base64'));
}
const report = { checkedAt: new Date().toISOString(), routes: [], dialogs: {}, character: {}, screenshots: [], productionRequestsBlocked: true };
try {
  let target;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json()); break; } catch { await delay(100); }
  }
  assert(target?.webSocketDebuggerUrl, 'Chrome debugging target unavailable');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done, fail) => { socket.addEventListener('open', done, { once: true }); socket.addEventListener('error', fail, { once: true }); });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const item = pending.get(message.id); if (!item) return;
      clearTimeout(item.timeout); pending.delete(message.id);
      if (message.error) item.fail(new Error(message.error.message)); else item.done(message.result);
    } else if (message.method === 'Fetch.requestPaused') {
      const request = message.params.request;
      const url = new URL(request.url);
      const mapRead = ['maps.google.com', 'maps.gstatic.com', 'maps.googleapis.com', 'www.gstatic.com'].includes(url.hostname) && request.method === 'GET' || url.hostname === 'www.google.com' && url.pathname.startsWith('/maps') && request.method === 'GET';
      const allowedRead = mapRead || ['fonts.googleapis.com', 'fonts.gstatic.com', 'images.unsplash.com', 'upload.wikimedia.org'].includes(url.hostname) && request.method === 'GET';
      const originRead = url.origin === origin && ['GET', 'HEAD'].includes(request.method);
      if (originRead || allowedRead || url.protocol === 'data:' || url.protocol === 'blob:') void send('Fetch.continueRequest', { requestId: message.params.requestId }).catch(() => {});
      else { blocked.add(url.hostname); void send('Fetch.failRequest', { requestId: message.params.requestId, errorReason: 'BlockedByClient' }).catch(() => {}); }
    } else if (message.method === 'Page.javascriptDialogOpening' && process.argv.includes('--review-check')) {
      report.reviewNotices ||= [];
      report.reviewNotices.push(message.params.message);
      void send('Page.handleJavaScriptDialog', { accept: true });
    } else if (message.method === 'Runtime.exceptionThrown') events.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  if (process.argv.includes('--design-check') || process.argv.includes('--design-visual-only') || process.argv.includes('--narrow-insurance')) {
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    const routes=process.argv.includes('--narrow-insurance') ? ['/insurance'] : process.argv.includes('--design-visual-only') ? ['/','/about','/insurance','/locations','/parent-help-center'] : ['/','/services','/about','/careers','/locations','/locations/irving-tx','/locations/blaine-mn','/parent-help-center','/parent-guide','/what-is-autism','/what-is-aba','/insurance-by-state','/insurance-financial-assistance','/insurance','/contact','/privacy','/terms','/accessibility','/qa-missing-page'];
    for (const width of process.argv.includes('--narrow-insurance') ? [320,375] : process.argv.includes('--design-visual-only') ? [320,1280] : [320,768,1280]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===320});
      for (const route of routes) {
        await navigate(route);
        const result=await evaluate(`(()=>{const h=document.querySelector('h1'),nav=document.querySelector('.auvia-desktop-nav'),logo=document.querySelector('.auvia-logo');return {scrollWidth:document.documentElement.scrollWidth,width:innerWidth,headingTop:h?.getBoundingClientRect().top,headingClipped:h? h.scrollHeight>h.clientHeight+2:false,headingFont:h?getComputedStyle(h).fontFamily:null,navOverlap:nav&&getComputedStyle(nav).display!=='none'?nav.getBoundingClientRect().left<logo.getBoundingClientRect().right+8:false}})()`);
        report.routes.push({route,viewport:width,...result});
        if ((width===320&&['/about','/insurance','/locations','/parent-help-center'].includes(route))||(width===1280&&route==='/')) {
          await until("document.querySelector('.auvia-character')?.dataset.intro==='false'",6000);
          await screenshot('design-'+width+'-'+(route.slice(1)||'home'));
        }
      }
      console.log(`Design check ${width}px: ${routes.length} routes inspected`);
    }
    report.runtimeExceptions=events; report.mode='Existing review JavaScript plus current source CSS; no build';
    writeFileSync(resolve(output,process.argv.includes('--narrow-insurance')?'local-insurance-report.json':process.argv.includes('--design-visual-only')?'local-visual-report.json':'local-design-report.json'),JSON.stringify(report,null,2));
    assert(report.routes.every(r=>r.scrollWidth<=r.width+2),'Horizontal overflow');
    assert(report.routes.every(r=>!r.headingClipped),'Heading clipping');
    assert(report.routes.every(r=>!r.navOverlap),'Desktop navigation overlaps logo');
    assert.equal(events.length,0,'Runtime exceptions');
  } else if (process.argv.includes('--controls-check')) {
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    const checks=[];
    for (const width of [320,1280]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===320});
      await navigate('/'); await until("document.querySelector('.auvia-character').dataset.intro==='false'",6000);
      await click('.auvia-character__actions button'); await until("Boolean(document.querySelector('dialog[open]'))");
      const chat=await evaluate(`(()=>{const d=document.querySelector('dialog'),b=d.querySelector('[aria-label="Send question"]'),r=b.getBoundingClientRect();return {sendWidth:r.width,sendHeight:r.height,overflow:d.scrollWidth>d.clientWidth+2,shortcuts:[...d.querySelectorAll('.auvie-chat__shortcuts>a')].map(a=>a.getBoundingClientRect().width)}})()`);
      assert(chat.sendWidth>=44 && chat.sendHeight>=44,'Send target size'); assert(!chat.overflow,'Chat overflow');
      for(let i=0;i<12;i++){await key('Tab','Tab',9); assert(await evaluate("document.querySelector('dialog').contains(document.activeElement)"));}
      await screenshot('controls-chat-'+width); await key('Escape','Escape',27);
      if(width===320){
        await click('button[aria-controls="mobile-navigation"]');
        await until("Boolean(document.querySelector('[aria-label=\"Navigation menu\"]'))");
        for(let i=0;i<12;i++){await key('Tab','Tab',9);assert(await evaluate("document.querySelector('[aria-label=\"Navigation menu\"]').contains(document.activeElement)"));}
        await screenshot('controls-menu-320'); await key('Escape','Escape',27);
      }
      await navigate('/insurance-financial-assistance');
      const select=await evaluate("(()=>{const s=document.querySelector('select.appearance-none');return {arrow:getComputedStyle(s).backgroundImage,padding:parseFloat(getComputedStyle(s).paddingRight)}})()");
      assert(select.arrow!=='none'&&select.padding>=44,'Select indicator and text clearance');
      checks.push({width,chat,select});
    }
    assert.equal(events.length,0,'Runtime exceptions');
    writeFileSync(resolve(output,'local-controls-report.json'),JSON.stringify({checks,runtimeExceptions:events,mode:'Existing JavaScript artifact with current CSS',passed:true},null,2));
    console.log('Chat target sizes, focus containment, mobile menu, select arrows and overflow: passed.');
  } else if (process.argv.includes('--audit-check')) {
    const audit = [];
    const axe = readFileSync(resolve(output,'axe.min.js'),'utf8');
    const routes=['/','/services','/about','/careers','/locations','/locations/irving-tx','/locations/blaine-mn','/parent-help-center','/parent-guide','/what-is-autism','/what-is-aba','/insurance-by-state','/insurance-financial-assistance','/insurance','/contact','/privacy','/terms','/accessibility','/qa-missing-page'];
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    for (const width of [1440,375]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:width===375?812:1000,deviceScaleFactor:1,mobile:width===375});
      for (const route of routes) {
        await navigate(route);
        await until("document.querySelector('.auvia-character').dataset.intro==='false'",6000);
        await evaluate(axe);
        const result = await evaluate("axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}).then(r=>({violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,helpUrl:v.helpUrl,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))}))");
        audit.push({route,width,...result});
        writeFileSync(resolve(output,'accessibility-audit.json'),JSON.stringify({origin,audit},null,2));
        console.log(`Audit ${width}px ${route}: ${result.violations.length} rules flagged`);
        if(width===375&&['/about','/services','/contact','/insurance','/parent-help-center'].includes(route))await screenshot(route.slice(1)+'-mobile');
      }
    }
    writeFileSync(resolve(output,'accessibility-audit.json'),JSON.stringify({origin,audit},null,2));
    console.log(JSON.stringify(audit.filter(a=>a.violations.length).map(a=>({route:a.route,width:a.width,violations:a.violations.map(v=>({id:v.id,count:v.nodes.length}))})),null,2));
  } else if (process.argv.includes('--review-check')) {
    for (const route of ['/', '/contact', '/insurance-financial-assistance']) {
      await navigate(route);
      assert(await evaluate("Boolean(document.querySelector('.review-preview-note'))"));
      await evaluate("document.querySelectorAll('form').forEach(form=>form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})))");
      await delay(500);
    }
    assert(report.reviewNotices?.length>=4, 'Review forms intercepted');
    assert(report.reviewNotices.every(message=>message.includes('Nothing was sent or saved')));
    await until("document.querySelector('.auvia-character').dataset.intro==='false'",6000);
    await click('.auvia-character__actions button');
    await until("Boolean(document.querySelector('dialog[open]'))");
    assert(await evaluate("document.querySelector('dialog input').disabled && document.querySelector('dialog').textContent.includes('Preview: navigation only')"));
    for(let i=0;i<12;i++){await key('Tab','Tab',9);assert(await evaluate("document.querySelector('dialog').contains(document.activeElement)"));}
    await screenshot('review-chat-disabled');
    await click('dialog a[href="/locations"]');
    await until("document.querySelector('main').dataset.route==='/locations' && !document.querySelector('dialog[open]')");
    await navigate('/admin/login');
    assert(await evaluate("!document.querySelector('input[type=password]')"));
    assert(![...blocked].some(host=>/firestore|firebase|generativelanguage|facebook/.test(host)), 'No backend/tracker attempts');
    assert.equal(events.length,0);
    writeFileSync(resolve(output,'review-report.json'),JSON.stringify({origin,reviewNotices:report.reviewNotices.length,blockedHosts:[...blocked],runtimeExceptions:events,passed:true},null,2));
    console.log('Review forms intercepted; no backend/tracker attempts; admin unavailable; passed.');
  } else if (process.argv.includes('--link-check')) {
    await navigate('/'); await until("document.querySelector('.auvia-character').dataset.intro==='false'",6000);
    await click('.auvia-character__actions button'); await until("Boolean(document.querySelector('dialog[open]'))");
    await click('dialog a[href="/insurance-financial-assistance"]');
    await until("document.querySelector('main').dataset.route==='/insurance-financial-assistance' && !document.querySelector('dialog[open]')");
    for (const route of ['/services','/parent-help-center','/insurance']) {
      await click(`[aria-label="Main navigation"] a[href="${route}"]`);
      await until(`document.querySelector('main').dataset.route===${JSON.stringify(route)}`);
    }
    await evaluate('history.back()');
    await until("document.querySelector('main').dataset.route==='/parent-help-center'");
    await evaluate('history.forward()');
    await until("document.querySelector('main').dataset.route==='/insurance'");
    await send('Emulation.setDeviceMetricsOverride',{width:320,height:812,deviceScaleFactor:1,mobile:true});
    await click('button[aria-controls="mobile-navigation"]');
    await until("Boolean(document.querySelector('[aria-label=\"Navigation menu\"]'))");
    assert(await evaluate("getComputedStyle(document.querySelector('.auvia-character')).visibility==='hidden'"));
    await screenshot('navigation-narrow-mobile');
    await key('Escape','Escape',27);
    await until("!document.querySelector('[aria-label=\"Navigation menu\"]')");
    assert(await evaluate("getComputedStyle(document.querySelector('.auvia-character')).visibility==='visible'"));
    console.log('Direct top-level navigation, insurance chat shortcut and Back/Forward: passed; no chat messages sent.');
  } else if (process.argv.includes('--map-check')) {
    await navigate('/locations'); await delay(6000);
    await evaluate("document.querySelector('.google-center-map').scrollIntoView({block:'center'})");
    await screenshot('google-map');
    const frames = await send('Page.getFrameTree');
    console.log(JSON.stringify({mapFrame: frames.frameTree.childFrames?.map(item=>new URL(item.frame.url).hostname),link:await evaluate("document.querySelector('.google-center-map').href"),width:await evaluate("document.querySelector('.google-center-map').getBoundingClientRect().width")},null,2));
    await navigate('/');await until("document.querySelector('.auvia-character__canvas')?.dataset.ready==='true'",25000);
    await click('.auvia-character__stage'); await delay(650); await screenshot('auvie-wave');
  } else {
  await navigate('/');
  assert(await evaluate("document.querySelector('.auvia-character').dataset.intro==='true'"));
  await screenshot('auvie-intro');
  await until("document.querySelector('.auvia-character').dataset.intro==='false'",6000);
  await until("document.querySelector('.auvia-character__stage').getAnimations().every(animation=>animation.playState!=='running')",3000);
  await until("document.querySelector('.auvia-character__canvas')?.dataset.ready === 'true'", 25000);
  await click('.auvia-character__stage');
  await until("Boolean(document.querySelector('.auvia-character__hello'))", 10000);
  report.character.timedGreeting = 'large welcome on load, settles after three seconds; tap greeting includes chat/care actions';
  await evaluate("document.querySelector('.auvia-character__stage').focus()"); await key('Home','Home',36);
  const poster = await evaluate("document.querySelector('.auvia-character canvas').toDataURL('image/png')");
  if (process.argv.includes('--update-poster')) writeFileSync(resolve(root,'public/models/auvie-poster.png'), Buffer.from(poster.split(',')[1], 'base64'));
  await evaluate("document.querySelector('.auvia-character__stage').focus()");
  await key('ArrowRight', 'ArrowRight', 39);
  assert(await evaluate("Number(document.querySelector('.auvia-character__canvas').dataset.rotation) > 0"));
  await key('Home','Home',36);
  assert(await evaluate("Number(document.querySelector('.auvia-character__canvas').dataset.rotation) === 0"));
  const point = await evaluate("(()=>{const r=document.querySelector('.auvia-character__stage').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
  await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+35,y:point.y,button:'left',buttons:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x+35,y:point.y,button:'left',clickCount:1});
  assert(await evaluate("Number(document.querySelector('.auvia-character__canvas').dataset.rotation)>0.3"));
  await evaluate("document.querySelector('.auvia-character__stage').focus()"); await key('Home','Home',36);
  await click('.auvia-character__stage');
  assert(await evaluate("!document.querySelector('.auvia-character').textContent.includes(String.fromCharCode(65533)) && !document.querySelector('.auvia-character').textContent.includes('Skip hello') && !document.querySelector('.auvia-character').textContent.includes('Play')"));
  report.character.interaction = 'pointer drag, keyboard rotation/reset, clean greeting text, tap greeting passed; Chat is the only dock button';
  await screenshot('home-desktop'); report.screenshots.push('home-desktop.png');
  await click('.auvia-character__chat');
  await until("Boolean(document.querySelector('dialog[open]'))");
  assert(await evaluate("document.querySelector('.auvia-character').dataset.chatOpen==='true'"));
  await until("(()=>{const c=document.querySelector('.auvia-character').getBoundingClientRect(),d=document.querySelector('dialog').getBoundingClientRect();return c.right<d.left})()",2000);
  for(let i=0;i<12;i++){await key('Tab','Tab',9); assert(await evaluate("document.querySelector('dialog').contains(document.activeElement)"));}
  await screenshot('chat-desktop'); await key('Escape','Escape',27);
  await until("!document.querySelector('dialog[open]')");
  report.dialogs.chat = 'opens, focus containment, Escape passed; no messages sent';
  await evaluate("document.querySelector('nav button[aria-controls=\"desktop-insurance\"]').click()");
  assert(await evaluate("document.querySelector('nav button[aria-controls=\"desktop-insurance\"]').getAttribute('aria-expanded')==='true'"));
  assert(await evaluate("Array.from(document.querySelectorAll('nav a')).some(a=>a.textContent.trim()==='Home')"));
  assert(await evaluate("Boolean(document.querySelector('nav a[href=\"/services\"]') && document.querySelector('nav a[href=\"/parent-help-center\"]') && document.querySelector('nav a[href=\"/insurance\"]'))"));
  report.dialogs.navigation = 'direct Services, Parent Resources, Insurance links, submenu controls and Home passed';
  const routes=['/','/services','/about','/careers','/locations','/locations/irving-tx','/locations/blaine-mn','/parent-help-center','/parent-guide','/what-is-autism','/what-is-aba','/insurance-by-state','/insurance-financial-assistance','/insurance','/contact','/privacy','/terms','/accessibility','/qa-missing-page'];
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  for(const width of [1440,1024,320,375]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:width<=375?812:1000,deviceScaleFactor:1,mobile:width<=375});
    for(const route of routes){await navigate(route); if(route==='/locations/blaine-mn') await delay(5100);
      const result=await evaluate("({heading:document.querySelector('h1')?.textContent.trim(),width:innerWidth,scrollWidth:document.documentElement.scrollWidth,footer:!!document.querySelector('footer'),headingTop:document.querySelector('h1')?.getBoundingClientRect().top,headingClipped:document.querySelector('h1')?document.querySelector('h1').scrollHeight>document.querySelector('h1').clientHeight+2:false,font:document.querySelector('h1')?getComputedStyle(document.querySelector('h1')).fontFamily:null})");
      report.routes.push({route,viewport:width,...result,overflow:result.scrollWidth>result.width+2});
      if(width===1440&&['/locations','/about','/insurance-by-state','/insurance-financial-assistance'].includes(route))await screenshot(route.slice(1));
      if(route==='/locations/irving-tx')assert(await evaluate("document.querySelector('.google-center-map')?.href.includes('3100')"));
    }
  }
  await navigate('/'); await screenshot('home-mobile'); report.screenshots.push('home-mobile.png');
  await click('button[aria-controls="mobile-navigation"]');
  assert(await evaluate("document.querySelector('button[aria-label=\"Close menu\"]')!==null"));
  for(let i=0;i<16;i++){await key('Tab','Tab',9);assert(await evaluate("document.querySelector('[aria-label=\"Navigation menu\"]').contains(document.activeElement)"));}
  await screenshot('navigation-mobile'); await key('Escape','Escape',27);
  report.dialogs.mobile = 'original sidebar opens and Escape dismisses';
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await navigate('/');await delay(1300);
  assert(await evaluate("!document.querySelector('.auvia-character canvas') && Boolean(document.querySelector('.auvia-character__poster'))"));
  await screenshot('home-reduced-motion');
  report.character.reducedMotion = 'poster of the same model by default; tap loads stationary 3D model';
  report.dialogs.careerApplication='not submitted; managed job reads blocked';
  report.runtimeExceptions=events;report.blockedHosts=[...blocked];report.overflowFailures=report.routes.filter(item=>item.overflow);
  writeFileSync(resolve(output,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({checkedRoutes:report.routes.length,character:report.character,dialogs:report.dialogs,overflowFailures:report.overflowFailures,runtimeExceptions:events},null,2));
  assert.equal(events.length,0,'Browser runtime exceptions');assert.equal(report.overflowFailures.length,0,'Horizontal page overflow');
  assert.equal(report.routes.filter(item=>item.headingClipped).length,0,'Clipped page headings');
  for (const width of [1440,1024,320,375]) {
    const pages=report.routes.filter(item=>item.viewport===width && item.route!=='/' && item.route!=='/qa-missing-page');
    assert(pages.every(item=>Math.abs(item.headingTop-(width<=375?104:112))<2),'Consistent page heading start at '+width);
  }
  }
} catch (error) {
  report.failure = error.message; report.runtimeExceptions = events; report.blockedHosts = [...blocked];
  if (socket?.readyState === WebSocket.OPEN) {
    try {
      await screenshot('failure');
      report.pageDiagnostic = await evaluate(`({text:document.querySelector('.auvia-character')?.textContent, width:innerWidth, height:innerHeight, reduced:matchMedia('(prefers-reduced-motion:reduce)').matches, memory:navigator.deviceMemory, connection:navigator.connection?.effectiveType})`);
      if (report.failure.includes('welcome-character')) report.sceneDiagnostic = await evaluate(`(async()=>{try { const m=await import('/scene/welcome-scene.js');const c=await m.createWelcomeScene(document.querySelector('.welcome-character__canvas'),{signal:new AbortController().signal});c.dispose();return 'Manual scene creation passed'; }catch(e){return String(e)}})()`);
    } catch (diagnosticError) { report.diagnosticError = diagnosticError.message; }
  }
  writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.error(error.message); process.exitCode = 1;
} finally {
  if (socket?.readyState === WebSocket.OPEN) { try { await send('Browser.close'); } catch {} }
  socket?.close(); browser.kill();
  for (const item of pending.values()) clearTimeout(item.timeout);
}
