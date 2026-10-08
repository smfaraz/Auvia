// Serves the existing review artifact with current plain CSS. No build or compilation.
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const artifact = resolve(root, 'review-dist');
const styles = ['refinements', 'navigation', 'home', 'pages', 'locations', 'auvie'];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary' };
createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/__local-styles.css') {
      res.writeHead(200, { 'Content-Type': 'text/css', 'Cache-Control': 'no-store' });
      res.end(styles.map(name => readFileSync(resolve(root, `src/styles/${name}.css`), 'utf8')).join('\n')); return;
    }
    let file = resolve(artifact, '.' + pathname);
    if (file !== artifact && !file.startsWith(artifact + sep)) { res.writeHead(403); res.end(); return; }
    try { if (!statSync(file).isFile()) file = resolve(artifact, 'index.html'); } catch { file = resolve(artifact, 'index.html'); }
    let body = readFileSync(file);
    if (extname(file) === '.html') body = Buffer.from(body.toString().replace('</head>', '<link rel="stylesheet" href="/__local-styles.css"></head>'));
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Local review unavailable'); }
}).listen(3010, '127.0.0.1', () => console.log('Local CSS review: http://127.0.0.1:3010 (existing JavaScript artifact; current source CSS)'));
