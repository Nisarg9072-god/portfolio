import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export type ProjectVisualId =
  | "nerox"
  | "horizon-fleet"
  | "collab-code"
  | "civic";

type Props = {
  id: ProjectVisualId;
  name: string;
  tag: string;
  index: string;
  accent: string;
  active?: boolean;
};

function useProjectCanvas(id: ProjectVisualId, active = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawer = DRAWERS[id];
    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const loop = (now: number) => {
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const t = (now - start) / 1000;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(loop);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      drawer(ctx, w, h, t);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [id, active]);

  return { containerRef, canvasRef };
}

function drawNerox(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const cx = w * 0.5;
  const cy = h * 0.48;
  const nodes = 8;
  const radius = Math.min(w, h) * 0.28;

  for (let i = 0; i < nodes; i++) {
    for (let j = i + 1; j < nodes; j++) {
      const a = (i / nodes) * Math.PI * 2 - Math.PI / 2 + t * 0.15;
      const b = (j / nodes) * Math.PI * 2 - Math.PI / 2 + t * 0.15;
      const x1 = cx + Math.cos(a) * radius;
      const y1 = cy + Math.sin(a) * radius;
      const x2 = cx + Math.cos(b) * radius;
      const y2 = cy + Math.sin(b) * radius;
      ctx.strokeStyle = `rgba(120,180,255,${0.08 + 0.06 * Math.sin(t + i)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  for (let i = 0; i < nodes; i++) {
    const a = (i / nodes) * Math.PI * 2 - Math.PI / 2 + t * 0.15;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i);
    ctx.fillStyle = `rgba(14,165,255,${0.4 + pulse * 0.5})`;
    ctx.beginPath();
    ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(124,58,237,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const sweep = (t * 0.8) % (Math.PI * 2);
  ctx.strokeStyle = "rgba(14,165,255,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweep) * radius * 1.2, cy + Math.sin(sweep) * radius * 1.2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(124,58,237,0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const r = 28 + Math.sin(t * 3) * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "rgba(14,165,255,0.15)";
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fill();

  const labels = ["AUTH", "SCAN", "FLOW", "GUARD"];
  labels.forEach((label, i) => {
    const a = (i / labels.length) * Math.PI * 2 + t * 0.4;
    const x = cx + Math.cos(a) * (radius + 36);
    const y = cy + Math.sin(a) * (radius + 36);
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillStyle = `rgba(255,255,255,${0.25 + 0.15 * Math.sin(t * 2 + i)})`;
    ctx.textAlign = "center";
    ctx.fillText(label, x, y);
  });
}

function drawVehicle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.fillRect(-10, -5, 18, 10);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillRect(4, -3, 5, 6);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(-10, -5, 18, 10);
  ctx.restore();
}

function drawHorizonFleet(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const cols = 10;
  const rows = 7;
  const padX = w * 0.06;
  const padY = h * 0.1;
  const mapW = w - padX * 2;
  const mapH = h - padY * 2;
  const cellW = mapW / cols;
  const cellH = mapH / rows;

  ctx.fillStyle = "rgba(16,185,129,0.12)";
  ctx.fillRect(padX, padY, mapW, mapH);

  for (let x = 0; x <= cols; x++) {
    ctx.strokeStyle = "rgba(16,185,129,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX + x * cellW, padY);
    ctx.lineTo(padX + x * cellW, padY + mapH);
    ctx.stroke();
  }
  for (let y = 0; y <= rows; y++) {
    ctx.strokeStyle = "rgba(14,165,255,0.18)";
    ctx.beginPath();
    ctx.moveTo(padX, padY + y * cellH);
    ctx.lineTo(padX + mapW, padY + y * cellH);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(16,185,129,0.55)";
  ctx.lineWidth = 2;
  ctx.strokeRect(padX, padY, mapW, mapH);

  const routes = [
    { path: [[1, 1], [3, 2], [6, 2], [8, 4]], color: "#10b981" },
    { path: [[1, 5], [4, 4], [7, 3], [9, 1]], color: "#0ea5ff" },
    { path: [[2, 3], [5, 5], [8, 5]], color: "#34d399" },
  ];

  routes.forEach((route, ri) => {
    const pts = route.path.map(([gx, gy]) => ({
      x: padX + gx * cellW + cellW / 2,
      y: padY + gy * cellH + cellH / 2,
    }));

    ctx.strokeStyle = route.color;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    const seg = pts.length - 1;
    const progress = ((t * 0.22 + ri * 0.34) % 1) * seg;
    const idx = Math.floor(progress);
    const frac = progress - idx;
    const a = pts[idx];
    const b = pts[Math.min(idx + 1, pts.length - 1)];
    const vx = a.x + (b.x - a.x) * frac;
    const vy = a.y + (b.y - a.y) * frac;
    const angle = Math.atan2(b.y - a.y, b.x - a.x);

    drawVehicle(ctx, vx, vy, angle, route.color);

    ctx.strokeStyle = route.color;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(vx, vy, 16 + Math.sin(t * 4 + ri) * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  const depots = [
    { x: padX + cellW * 0.5, y: padY + cellH * 0.5 },
    { x: padX + mapW - cellW * 0.5, y: padY + mapH - cellH * 0.5 },
  ];
  depots.forEach((d, i) => {
    ctx.fillStyle = "rgba(14,165,255,0.25)";
    ctx.beginPath();
    ctx.arc(d.x, d.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#0ea5ff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = "#7dd3fc";
    ctx.textAlign = "center";
    ctx.fillText(i === 0 ? "HUB" : "DEPOT", d.x, d.y - 12);
  });

  const stats = [
    { x: w * 0.14, y: h * 0.16, label: "FLEET LIVE", value: "24" },
    { x: w * 0.84, y: h * 0.2, label: "ROUTES", value: "12" },
    { x: w * 0.8, y: h * 0.82, label: "FUEL SAVED", value: "18%" },
  ];
  stats.forEach((s, i) => {
    const alpha = 0.75 + 0.2 * Math.sin(t * 1.5 + i);
    ctx.fillStyle = `rgba(0,0,0,${0.55 * alpha})`;
    ctx.fillRect(s.x - 46, s.y - 24, 92, 48);
    ctx.strokeStyle = `rgba(16,185,129,${0.6 * alpha})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(s.x - 46, s.y - 24, 92, 48);
    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = `rgba(52,211,153,${alpha})`;
    ctx.textAlign = "center";
    ctx.fillText(s.label, s.x, s.y - 6);
    ctx.font = "bold 16px Space Grotesk, sans-serif";
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillText(s.value, s.x, s.y + 14);
  });

  ctx.font = "bold 11px Space Grotesk, sans-serif";
  ctx.fillStyle = "rgba(16,185,129,0.9)";
  ctx.textAlign = "left";
  ctx.fillText("HORIZONFLEET OPS", padX, padY - 8);
}

function drawCollabCode(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const lines = [
    { text: "import { Agent } from '@ai/core'", color: "#f43f5e" },
    { text: "const session = await collab.open()", color: "#f59e0b" },
    { text: "session.on('edit', suggestNext)", color: "#fb7185" },
    { text: "await session.merge(branchId)", color: "#fbbf24" },
    { text: "ai.complete({ context, intent })", color: "#f43f5e" },
    { text: "socket.broadcast(patch.delta)", color: "#f59e0b" },
  ];

  const pad = 28;
  const lineH = 26;
  const scroll = (t * 18) % (lines.length * lineH);

  ctx.fillStyle = "rgba(244,63,94,0.06)";
  ctx.fillRect(pad, h * 0.12, w - pad * 2, h * 0.76);

  lines.forEach((line, i) => {
    let y = h * 0.2 + i * lineH - scroll;
    if (y < h * 0.1) y += lines.length * lineH;
    if (y > h * 0.88) return;

    ctx.font = "12px JetBrains Mono, monospace";
    ctx.fillStyle = line.color + "cc";
    ctx.textAlign = "left";
    const visible = Math.min(
      line.text.length,
      Math.floor((t * 8 + i * 3) % (line.text.length + 8)),
    );
    ctx.fillText(line.text.slice(0, visible), pad + 12, y);

    if (i === 2) {
      const cx = pad + 12 + ctx.measureText(line.text.slice(0, visible)).width + 4;
      if (Math.floor(t * 2) % 2 === 0) {
        ctx.fillStyle = "#f43f5e";
        ctx.fillRect(cx, y - 12, 2, 16);
      }
    }
  });

  const cursors = [
    { x: 0.35, y: 0.35, color: "#f43f5e", label: "dev_1" },
    { x: 0.62, y: 0.52, color: "#f59e0b", label: "dev_2" },
    { x: 0.48, y: 0.68, color: "#fb7185", label: "ai_bot" },
  ];

  cursors.forEach((c, i) => {
    const x = w * c.x + Math.sin(t * 1.2 + i) * 12;
    const y = h * c.y + Math.cos(t * 0.9 + i * 2) * 8;
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 14);
    ctx.lineTo(x + 6, y + 11);
    ctx.stroke();

    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = c.color;
    ctx.fillRect(x + 8, y - 4, ctx.measureText(c.label).width + 10, 16);
    ctx.fillStyle = "#000";
    ctx.fillText(c.label, x + 13, y + 8);
  });

  const suggestions = ["refactor()", "optimize()", "test()"];
  suggestions.forEach((s, i) => {
    const x = w * 0.55 + i * 52;
    const y = h * 0.82 + Math.sin(t * 2 + i) * 4;
    ctx.fillStyle = `rgba(245,158,11,${0.2 + 0.15 * Math.sin(t + i)})`;
    ctx.fillRect(x, y, ctx.measureText(s).width + 16, 22);
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillStyle = "#fbbf24";
    ctx.fillText(s, x + 8, y + 15);
  });
}

function drawCivic(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const pins = [
    { x: 0.22, y: 0.35, priority: "high", label: "Pothole" },
    { x: 0.45, y: 0.28, priority: "med", label: "Streetlight" },
    { x: 0.68, y: 0.42, priority: "low", label: "Graffiti" },
    { x: 0.55, y: 0.62, priority: "high", label: "Water leak" },
    { x: 0.32, y: 0.7, priority: "med", label: "Trash" },
    { x: 0.78, y: 0.68, priority: "low", label: "Noise" },
  ];

  const colors: Record<string, string> = {
    high: "#ec4899",
    med: "#a855f7",
    low: "#c084fc",
  };

  for (let i = 0; i < 5; i++) {
    const gx = ((i * 3.7 + t * 0.1) % 10) / 10;
    const gy = ((i * 2.3) % 8) / 8;
    ctx.strokeStyle = "rgba(168,85,247,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx * w, 0);
    ctx.lineTo(gx * w, h);
    ctx.moveTo(0, gy * h);
    ctx.lineTo(w, gy * h);
    ctx.stroke();
  }

  pins.forEach((pin, i) => {
    const appear = Math.min(1, (t - i * 0.4) * 0.8);
    if (appear <= 0) return;

    const x = pin.x * w;
    const y = pin.y * h;
    const color = colors[pin.priority];
    const pulse = 8 + Math.sin(t * 3 + i) * 4;

    ctx.strokeStyle = `${color}${Math.floor(appear * 60).toString(16).padStart(2, "0")}`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4 * appear, 0, Math.PI * 2);
    ctx.fill();

    const tagY = y - 28 - Math.sin(t * 1.5 + i) * 6;
    const tagW = ctx.measureText(pin.label).width + 24;
    ctx.fillStyle = `rgba(0,0,0,${0.5 * appear})`;
    ctx.fillRect(x - tagW / 2, tagY - 14, tagW, 24);
    ctx.strokeStyle = `${color}88`;
    ctx.strokeRect(x - tagW / 2, tagY - 14, tagW, 24);
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillStyle = `rgba(255,255,255,${0.8 * appear})`;
    ctx.textAlign = "center";
    ctx.fillText(pin.label, x, tagY + 2);

    const conf = Math.floor(82 + Math.sin(t + i) * 8);
    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = `${color}aa`;
    ctx.fillText(`AI ${conf}%`, x, tagY - 20);
  });

  ctx.font = "11px JetBrains Mono, monospace";
  ctx.fillStyle = "rgba(168,85,247,0.7)";
  ctx.textAlign = "left";
  const status = ["Classifying...", "Routing...", "Prioritizing..."];
  const statusIdx = Math.floor(t / 2) % status.length;
  ctx.fillText(status[statusIdx], w * 0.08, h * 0.88);
}

const DRAWERS: Record<
  ProjectVisualId,
  (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
> = {
  nerox: drawNerox,
  "horizon-fleet": drawHorizonFleet,
  "collab-code": drawCollabCode,
  civic: drawCivic,
};

export function ProjectVisual({
  id,
  name,
  tag,
  index,
  accent,
  active = true,
}: Props) {
  const { containerRef, canvasRef } = useProjectCanvas(id, active);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-px`}
    >
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-3xl bg-card"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-25`} />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
            AI Live
          </span>
        </motion.div>

        <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 sm:right-6 sm:bottom-6 sm:left-6">
          <div className="font-display text-[clamp(2.5rem,12vw,5rem)] leading-none font-bold text-white/8">
            {index}
          </div>
          <div className="min-w-0 text-right">
            <div className="truncate font-display text-base font-semibold text-white/90 sm:text-lg md:text-xl">
              {name}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 sm:text-[10px] sm:tracking-[0.25em]">
              {tag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
