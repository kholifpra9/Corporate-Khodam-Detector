'use client';

import { useEffect, useRef } from 'react';
import type { Rarity } from '@/types';

const PARTICLE_CONFIG: Record<Rarity, { count: number; colors: string[]; size: [number, number] }> = {
  common: { count: 15, colors: ['#9CA3AF', '#D1D5DB'], size: [2, 4] },
  uncommon: { count: 20, colors: ['#34D399', '#6EE7B7'], size: [2, 5] },
  rare: { count: 25, colors: ['#60A5FA', '#93C5FD', '#3B82F6'], size: [2, 5] },
  epic: { count: 30, colors: ['#A78BFA', '#C4B5FD', '#8B5CF6'], size: [2, 6] },
  legendary: { count: 40, colors: ['#FBBF24', '#FDE68A', '#F59E0B', '#FFF'], size: [2, 7] },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

interface ParticlesProps {
  rarity: Rarity;
}

export function Particles({ rarity }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const config = PARTICLE_CONFIG[rarity];

  const particles = useRef<Particle[]>([]);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx!.scale(2, 2);
    }

    resize();
    window.addEventListener('resize', resize);

    particles.current = Array.from({ length: config.count }, () => createParticle(canvas, config));

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life++;

        const alpha = p.life < 20 ? p.life / 20 : p.life > p.maxLife - 20 ? (p.maxLife - p.life) / 20 : 1;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = Math.max(0, alpha);
        ctx!.fillStyle = p.color;

        const s = p.size;
        ctx!.beginPath();
        // Draw a star shape
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const px = Math.cos(angle) * s;
          const py = Math.sin(angle) * s;
          if (i === 0) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
          const innerAngle = angle + Math.PI / 4;
          const ix = Math.cos(innerAngle) * s * 0.4;
          const iy = Math.sin(innerAngle) * s * 0.4;
          ctx!.lineTo(ix, iy);
        }
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();

        return p.life < p.maxLife;
      });

      while (particles.current.length < config.count) {
        particles.current.push(createParticle(canvas, config));
      }

      animFrame.current = requestAnimationFrame(animate);
    }

    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, [rarity, config]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function createParticle(canvas: HTMLCanvasElement, config: { count: number; colors: string[]; size: [number, number] }): Particle {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const sizeRange = config.size[1] - config.size[0];

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -(Math.random() * 0.8 + 0.2),
    size: config.size[0] + Math.random() * sizeRange,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
    life: 0,
    maxLife: 100 + Math.random() * 150,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
  };
}
