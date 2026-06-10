import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
import {
  getTechnologiesByGroup,
  STACK_GROUPS,
  TECHNOLOGIES,
  type StackGroup,
  type Technology,
} from "./technologies";

function CategoryColumn({
  label,
  color,
  items,
  index,
}: {
  label: string;
  color: string;
  items: Technology[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-w-0 flex-col"
    >
      <div
        className="mb-3 flex items-center gap-2 border-b pb-3 sm:mb-4"
        style={{ borderColor: `${color}28` }}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
        />
        <h3
          className="font-mono text-[10px] uppercase tracking-[0.26em] sm:text-[11px] sm:tracking-[0.3em]"
          style={{ color }}
        >
          {label}
        </h3>
        <span className="ml-auto font-mono text-[9px] text-muted-foreground">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="flex flex-col gap-1.5 sm:gap-2">
        {items.map((tech, i) => (
          <motion.li
            key={tech.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + index * 0.07 + i * 0.025, duration: 0.35 }}
          >
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/[0.07] px-2.5 py-2 transition-colors hover:border-white/12 sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2.5">
              <TechIcon tech={tech} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold leading-tight text-foreground/92 sm:text-[0.9375rem]">
                  {tech.name}
                </p>
                <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px] sm:tracking-[0.18em]">
                  {tech.category}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function StackOverviewTable() {
  const grouped = STACK_GROUPS.map((group) => ({
    ...group,
    items: getTechnologiesByGroup(group.id),
  }));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 shrink-0 border-b border-border/40 pb-4 sm:mb-5 sm:pb-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-electric/80 sm:text-[10px]">
              Full Stack Overview
            </p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              Technologies I work with
            </h2>
          </div>
          <span className="glass rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
            {TECHNOLOGIES.length} tools
          </span>
        </div>
      </motion.div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5 sm:pr-1">
        <div className="stack-overview-grid">
          {grouped.map((group, index) => (
            <CategoryColumn
              key={group.id}
              label={group.label}
              color={group.color}
              items={group.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export type { StackGroup };
