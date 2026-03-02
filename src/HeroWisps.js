import React, { useRef, useEffect } from 'react';

export default function HeroWisps() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const POINT_COUNT = 40;
    const CONNECT_DISTANCE = 380; // increased range
    let raf;

    // Create floating particles with organic movement
    const particles = Array.from({ length: POINT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.2 + 0.6,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
    }));

    let mouse = { x: width / 2, y: height / 2 };

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function draw() {
      // Clear each frame to avoid connection trails
      ctx.clearRect(0, 0, width, height);

      // Update particles with organic floating motion
      for (let p of particles) {
        // Orbital/wave motion for organic movement (subtle)
        p.angle += p.speed;
        p.vx += Math.cos(p.angle) * 0.005;
        p.vy += Math.sin(p.angle) * 0.005;

        // Gentle damping (slower)
        p.vx *= 0.995;
        p.vy *= 0.995;

        // No attraction to cursor: particles move independently

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      // Draw connections from cursor node to nearby particles (no particle-particle lines)
      ctx.strokeStyle = 'rgba(159, 191, 220, 0.32)';
      ctx.lineWidth = 1;
      for (let p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONNECT_DISTANCE) {
          ctx.globalAlpha = 0.85 * (1 - dist / CONNECT_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw cursor node
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(159,191,220,0.95)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // Draw particles with glow
      for (let p of particles) {
        ctx.fillStyle = 'rgba(159, 191, 220, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow
        ctx.strokeStyle = 'rgba(159, 191, 220, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="hero-canvas"
      width={typeof window !== 'undefined' ? window.innerWidth : 1024}
      height={typeof window !== 'undefined' ? window.innerHeight : 768}
      aria-hidden="true"
    />
  );
}
