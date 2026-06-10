import type { Technology } from "./technologies";

type Props = {
  tech: Technology;
  size?: "sm" | "md";
};

const SIZES = {
  sm: { box: "h-8 w-8", icon: "h-4 w-4", text: "text-[9px]" },
  md: { box: "h-9 w-9 sm:h-10 sm:w-10", icon: "h-4 w-4 sm:h-5 sm:w-5", text: "text-[10px]" },
} as const;

export function TechIcon({ tech, size = "sm" }: Props) {
  const s = SIZES[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg ${s.box}`}
      style={{
        background: `linear-gradient(145deg, ${tech.color}35, ${tech.color}10)`,
        border: `1px solid ${tech.color}40`,
      }}
    >
      {tech.icon ? (
        <img
          src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace("#", "")}`}
          alt=""
          className={`${s.icon} object-contain`}
          draggable={false}
        />
      ) : (
        <span className={`font-mono font-bold ${s.text}`} style={{ color: tech.color }}>
          {tech.fallback}
        </span>
      )}
    </div>
  );
}
