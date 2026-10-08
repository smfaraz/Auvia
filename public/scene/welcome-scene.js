import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/examples/jsm/loaders/GLTFLoader.js';

// Interactive WebGL 3D Mascot Scene for Auvie
export async function createWelcomeScene(host, { signal, onComplete, onError }) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
  const character = new THREE.Group();
  scene.add(character);

  scene.add(new THREE.HemisphereLight(0xfff9ed, 0x829675, 3));
  const keyLight = new THREE.DirectionalLight(0xfff5e3, 3.5);
  keyLight.position.set(-3, 5, 4);
  scene.add(keyLight);
  const fill = new THREE.DirectionalLight(0xffffff, 1.5);
  fill.position.set(3, 2, -2);
  scene.add(fill);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.8, 48),
    new THREE.MeshBasicMaterial({ color: 0x3b6042, transparent: true, opacity: 0.13, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.y = 0.65;
  shadow.position.y = -0.015;
  scene.add(shadow);

  let frame = 0;
  let visible = false;
  let playing = false;
  let disposed = false;
  let elapsed = 0;
  let previous = 0;
  let modelWidth = 2;
  let yaw = 0;
  let isDragging = false;
  let dragTimer = 0;

  // Cursor tracking
  let lookTargetX = 0;
  let lookTargetY = 0;
  let currentLookX = 0;
  let currentLookY = 0;

  let mixer;
  const actions = {};
  let currentAction = null;
  let currentActionName = 'idle';
  let actionCallback = null;

  const render = () => { if (!disposed) renderer.render(scene, camera); };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; };
  const resetPose = () => {
    character.rotation.set(0, yaw, 0);
    character.position.set(0, 0, 0);
  };

  const resize = () => {
    if (disposed) return;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(0, 1.4, Math.max(5.5, (modelWidth / camera.aspect) * 1.85));
    camera.lookAt(0, 1.2, 0);
    camera.updateProjectionMatrix();
    render();
  };

  const tick = (now) => {
    frame = 0;
    if (disposed || !visible) return;
    if (!previous) previous = now;
    const delta = now - previous;

    if (delta >= 1000 / 35) {
      const dt = Math.min(delta / 1000, 0.08);
      elapsed += dt;
      previous = now;
      mixer?.update(dt);

      // Smooth cursor head-tracking lerp
      currentLookX += (lookTargetX - currentLookX) * 0.08;
      currentLookY += (lookTargetY - currentLookY) * 0.08;

      if (!isDragging) {
        character.rotation.y = yaw + currentLookX * 0.38;
        character.rotation.x = -currentLookY * 0.16;
      }

      // Dynamic reactive physical touches
      if (currentActionName === 'jump') {
        const jumpProgress = Math.min(elapsed / 0.9, 1);
        character.position.y = Math.sin(jumpProgress * Math.PI) * 0.12;
      } else if (currentActionName === 'wave') {
        const waveProgress = Math.min(elapsed / 2.0, 1);
        const envelope = Math.sin(waveProgress * Math.PI);
        character.rotation.z = Math.sin(waveProgress * Math.PI * 4) * 0.03 * envelope;
      } else {
        character.position.y = 0;
        character.rotation.z = 0;
      }

      render();
    }

    frame = requestAnimationFrame(tick);
  };

  const start = () => { if (!frame && visible && !disposed) frame = requestAnimationFrame(tick); };

  // Pointer tracking across window for gentle eye/head contact
  const onPointerMoveWindow = (event) => {
    if (!visible || disposed || isDragging) return;
    const rect = host.getBoundingClientRect();
    const mascotCenterX = rect.left + rect.width / 2;
    const mascotCenterY = rect.top + rect.height / 2;
    const dx = (event.clientX - mascotCenterX) / (window.innerWidth * 0.45);
    const dy = (event.clientY - mascotCenterY) / (window.innerHeight * 0.45);
    lookTargetX = Math.max(-1, Math.min(1, dx));
    lookTargetY = Math.max(-1, Math.min(1, dy));
    start();
  };
  window.addEventListener('pointermove', onPointerMoveWindow, { passive: true });

  const observer = new ResizeObserver(resize);
  const contextLost = (event) => { event.preventDefault(); stop(); onError?.(); };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    stop();
    observer.disconnect();
    window.removeEventListener('pointermove', onPointerMoveWindow);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);

    const released = new Set();
    const release = (resource) => { if (resource && !released.has(resource)) { resource.dispose(); released.add(resource); } };
    scene.traverse((object) => {
      release(object.geometry);
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (!material) continue;
        for (const value of Object.values(material)) if (value?.isTexture) release(value);
        release(material);
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };

  try {
    const response = await fetch('/models/steve.glb', { signal });
    if (!response.ok) throw new Error('Character asset unavailable');
    const model = await new GLTFLoader().parseAsync(await response.arrayBuffer(), '/models/');
    character.add(model.scene);
    if (signal.aborted) throw new DOMException('Scene cancelled', 'AbortError');

    const bounds = new THREE.Box3().setFromObject(model.scene);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 2.3 / Math.max(size.y, 0.001);
    model.scene.scale.multiplyScalar(scale);
    model.scene.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
    modelWidth = size.x * scale;

    mixer = new THREE.AnimationMixer(model.scene);

    // Extract and map all available animation clips
    const knownNames = ['Wave', 'Jump', 'Yes', 'No', 'Duck', 'Idle', 'Walk'];
    for (const name of knownNames) {
      const clip = model.animations.find((c) => c.name.endsWith('|' + name));
      if (clip) {
        const action = mixer.clipAction(clip);
        if (name === 'Idle' || name === 'Walk') {
          action.setLoop(THREE.LoopRepeat);
        } else {
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
        }
        actions[name.toLowerCase()] = action;
      }
    }

    currentAction = actions['idle'] || null;
    currentActionName = 'idle';
    if (currentAction) {
      currentAction.play();
    }

    // Return to gentle idle when one-shot animations finish
    mixer.addEventListener('finished', (e) => {
      if (e.action !== actions['idle'] && actions['idle']) {
        actions['idle'].reset();
        actions['idle'].fadeIn(0.25).play();
        e.action.fadeOut(0.25);
        currentAction = actions['idle'];
        currentActionName = 'idle';
        resetPose();
      }
      if (actionCallback) {
        const cb = actionCallback;
        actionCallback = null;
        cb();
      }
    });

    resetPose();
    host.appendChild(renderer.domElement);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    observer.observe(host);
    resize();

    function triggerAction(name, onDone) {
      const targetName = (name || 'wave').toLowerCase();
      const nextAction = actions[targetName] || actions['wave'];
      if (!nextAction) {
        onDone?.();
        return;
      }

      actionCallback = onDone || null;
      currentActionName = targetName;
      elapsed = 0;
      playing = true;

      nextAction.reset();
      nextAction.setLoop(THREE.LoopOnce, 1);
      nextAction.clampWhenFinished = true;

      if (currentAction && currentAction !== nextAction) {
        currentAction.fadeOut(0.2);
      }
      nextAction.fadeIn(0.2).play();
      currentAction = nextAction;

      start();
    }

    return {
      setVisible(value) {
        visible = value;
        if (visible) start();
        else stop();
      },
      replay(animate = true) {
        if (animate) {
          triggerAction('wave', onComplete);
        } else {
          stop();
          elapsed = 0;
          playing = false;
          mixer?.stopAllAction();
          actions['idle']?.reset().play();
          currentAction = actions['idle'];
          currentActionName = 'idle';
          resetPose();
          render();
          onComplete?.();
        }
      },
      playAction(name, onDone) {
        triggerAction(name, onDone);
      },
      setLook(xRatio, yRatio) {
        lookTargetX = Math.max(-1, Math.min(1, xRatio));
        lookTargetY = Math.max(-1, Math.min(1, yRatio));
        start();
      },
      pause() {
        playing = false;
        stop();
      },
      rotate(delta) {
        isDragging = true;
        clearTimeout(dragTimer);
        dragTimer = window.setTimeout(() => { isDragging = false; }, 400);
        yaw = (yaw + delta) % (Math.PI * 2);
        resetPose();
        render();
        host.dataset.rotation = String(yaw);
      },
      resetView() {
        isDragging = false;
        yaw = 0;
        lookTargetX = 0;
        lookTargetY = 0;
        currentLookX = 0;
        currentLookY = 0;
        resetPose();
        render();
        host.dataset.rotation = '0';
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

// Public modules are loaded with an HTML script tag in Vite development and builds.
window.auviaWelcomeScene = createWelcomeScene;
