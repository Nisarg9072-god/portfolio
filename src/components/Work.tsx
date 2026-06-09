import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ProjectFlipCard,
  type ProjectData,
} from "@/components/work/ProjectFlipCard";

const GITHUB_PROFILE = "https://github.com/Nisarg9072-god";

const projects: ProjectData[] = [
  {
    n: "01",
    name: "Nerox",
    tag: "AI · Security",
    desc: "AI-powered smart automation and security platform with secure auth, AI workflow automation and real-time task management.",
    details:
      "Nerox combines secure authentication, AI-driven workflow automation, and real-time task orchestration into one platform built for teams that need intelligent operations without sacrificing security.",
    highlights: [
      "Secure auth with role-based access",
      "AI workflow automation pipelines",
      "Real-time task and event management",
    ],
    tech: ["Python", "FastAPI", "Flask", "MySQL"],
    accent: "from-[#0ea5ff] to-[#7c3aed]",
    visual: "nerox",
    github: GITHUB_PROFILE,
  },
  {
    n: "02",
    name: "HorizonFleet",
    tag: "Fleet Intelligence",
    desc: "Intelligent fleet management platform with vehicle tracking, cost analytics, rule-based validation and operational dashboards.",
    details:
      "HorizonFleet (FleetOps) digitizes vehicle, driver, trip, maintenance, and expense operations in a centralized dashboard. It enforces overload and license validations with rule-based fleet intelligence.",
    highlights: [
      "Live vehicle and route tracking",
      "Cost analytics and fuel insights",
      "Rule-based overload & license checks",
    ],
    tech: ["React", "FastAPI", "MySQL", "Analytics"],
    accent: "from-[#10b981] to-[#0ea5ff]",
    visual: "horizon-fleet",
    github: "https://github.com/Nisarg9072-god/Fleet-Flow-Hackathon-",
  },
  {
    n: "03",
    name: "CollabCode",
    tag: "Realtime · AI",
    desc: "AI collaborative coding platform with real-time multi-user editing and intelligent code suggestions.",
    details:
      "CollabCode is a real-time collaborative coding environment where multiple developers edit together while an AI assistant suggests completions, refactors, and context-aware improvements.",
    highlights: [
      "Multi-user real-time editing",
      "WebSocket-powered live sync",
      "AI code suggestions and merges",
    ],
    tech: ["React", "WebSockets", "AI", "Node"],
    accent: "from-[#f43f5e] to-[#f59e0b]",
    visual: "collab-code",
    github: "https://github.com/Nisarg9072-god/collab-code",
  },
  {
    n: "04",
    name: "Civic Reporting",
    tag: "AI · Civic Tech",
    desc: "Citizen-first issue reporting with AI classification, spam detection, location-aware routing and smart prioritization.",
    details:
      "CivicTrack empowers citizens to report local issues with AI-powered classification, spam filtering, and location-aware routing so municipalities can prioritize and resolve problems faster.",
    highlights: [
      "AI issue classification & spam detection",
      "Location-aware civic routing",
      "Smart priority scoring for authorities",
    ],
    tech: ["Python", "ML", "FastAPI", "Maps"],
    accent: "from-[#a855f7] to-[#ec4899]",
    visual: "civic",
    github: "https://github.com/Nisarg9072-god/civicTrack",
  },
];

function ProjectCard({ p }: { p: ProjectData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setParallaxEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const mailto = `mailto:nisargpanchal40@gmail.com?subject=${encodeURIComponent(`Inquiry about ${p.name}`)}&body=${encodeURIComponent(`Hi Nisarg,\n\nI'd like to learn more about your project "${p.name}".\n\n`)}`;

  return (
    <div
      ref={ref}
      className="relative grid min-h-0 items-center gap-8 border-t border-border/40 py-14 md:min-h-[65vh] md:grid-cols-12 md:gap-10 md:py-20 lg:py-24"
    >
      <motion.div style={parallaxEnabled ? { y } : undefined} className="space-y-5 md:col-span-5 md:space-y-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.25em] md:tracking-[0.3em]">
          {p.n} / {String(projects.length).padStart(2, "0")} — {p.tag}
        </div>
        <h3 className="font-display text-4xl font-bold leading-none sm:text-5xl md:text-6xl lg:text-7xl">
          {p.name}
        </h3>
        <p className="max-w-md text-base leading-relaxed text-foreground/70">
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="glass rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={mailto}
          data-hover
          className="group inline-flex items-center gap-3 pt-4 text-sm uppercase tracking-[0.2em]"
        >
          Discuss Project
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-electric group-hover:bg-electric/10">
            <ArrowUpRight size={16} />
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-7"
      >
        <ProjectFlipCard project={p} />
      </motion.div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="section-page">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-block"
        >
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-muted-foreground/40" /> 004 — Selected
            Work
          </div>
          <h2 className="type-section-title">
            Products that ship, scale,{" "}
            <span className="text-electric-gradient">and think</span>.
          </h2>
          <p className="mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:tracking-[0.2em]">
            Tap any project card to explore details + GitHub
          </p>
        </motion.div>
        {projects.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}
