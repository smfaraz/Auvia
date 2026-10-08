import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/examples/jsm/loaders/GLTFLoader.js';

// This module is loaded only after the landing scene is visible or requested.
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
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.8, 48), new THREE.MeshBasicMaterial({ color: 0x3b6042, transparent: true, opacity: 0.13, depthWrite: false }));
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
  let mixer;
  let wave;
  let idle;
  const render = () => { if (!disposed) renderer.render(scene, camera); };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; };
  const resetPose = () => { character.rotation.set(0, yaw, 0); character.position.y = 0; };
  const resize = () => {
    if (disposed) return;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(0, 1.4, Math.max(5.5, modelWidth / camera.aspect * 1.85));
    camera.lookAt(0, 1.2, 0);
    camera.updateProjectionMatrix();
    render();
  };
  const tick = (now) => {
    frame = 0;
    if (disposed || !visible || !playing) return;
    if (!previous) previous = now;
    const delta = now - previous;
    if (delta >= 1000 / 30) {
      elapsed += Math.min(delta / 1000, 0.08);
      previous = now;
      const progress = Math.min(elapsed / 3, 1);
      const envelope = Math.sin(progress * Math.PI);
      mixer?.update(Math.min(delta / 1000, 0.08));
      character.rotation.y = yaw + Math.sin(progress * Math.PI * 2) * 0.2 * envelope;
      character.rotation.z = Math.sin(progress * Math.PI * 4) * 0.025 * envelope;
      character.position.y = Math.sin(progress * Math.PI * 2) * 0.04 * envelope;
      if (progress >= 1) { playing = false; mixer?.stopAllAction(); idle?.reset().play(); mixer?.update(0); resetPose(); }
      render();
      if (!playing) { onComplete?.(); return; }
    }
    frame = requestAnimationFrame(tick);
  };
  const start = () => { if (!frame && playing && visible && !disposed) frame = requestAnimationFrame(tick); };
  const observer = new ResizeObserver(resize);
  const contextLost = (event) => { event.preventDefault(); stop(); onError?.(); };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    stop();
    observer.disconnect();
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
    const waveClip = model.animations.find((clip) => clip.name.endsWith('|Wave'));
    const idleClip = model.animations.find((clip) => clip.name.endsWith('|Idle'));
    if (idleClip) { idle = mixer.clipAction(idleClip); idle.play(); mixer.update(0); }
    if (waveClip) { wave = mixer.clipAction(waveClip); wave.setLoop(THREE.LoopOnce, 1); wave.clampWhenFinished = true; }
    resetPose();
    host.appendChild(renderer.domElement);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    observer.observe(host);
    resize();
    return {
      setVisible(value) { visible = value; if (visible) start(); else stop(); },
      replay(animate = true) {
        stop(); elapsed = 0; playing = animate; resetPose(); mixer?.stopAllAction();
        if (animate && wave) { wave.reset().play(); } else { idle?.reset().play(); }
        mixer?.update(0); render();
        if (animate) start(); else onComplete?.();
      },
      pause() { playing = false; stop(); },
      rotate(delta) { playing = false; stop(); yaw = (yaw + delta) % (Math.PI * 2); resetPose(); render(); host.dataset.rotation = String(yaw); },
      resetView() { playing = false; stop(); yaw = 0; resetPose(); render(); host.dataset.rotation = String(yaw); },
      dispose,
    };
  } catch (error) { dispose(); throw error; }
}

// Public modules are loaded with an HTML script tag in Vite development and builds.
window.auviaWelcomeScene = createWelcomeScene;
