// Lightweight canvas confetti and sparkle generator with zero dependencies.
// Colors match Auvia's vibrant pediatric palette.

const PALETTE = ['#2D6A5D', '#FFC93C', '#FF7A59', '#38BDF8', '#A7F3D0', '#F472B6', '#FBBF24'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'sparkle';
  alpha: number;
}

export function burstConfetti(originX?: number, originY?: number, particleCount = 45) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const startX = originX ?? width - 80;
  const startY = originY ?? height - 120;

  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * -Math.PI) + (Math.random() - 0.5) * 0.4; // upward spray
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 5 + Math.random() * 6,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'sparkle',
      alpha: 1,
    });
  }

  let startTime: number | null = null;
  const duration = 1400; // ms

  const animate = (time: number) => {
    if (!startTime) startTime = time;
    const progress = (time - startTime) / duration;

    if (progress >= 1) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - Math.pow(progress, 1.5));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw 4-point sparkle
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}
