export type StackGroup = "frontend" | "backend" | "ai-ml";

export type Technology = {
  name: string;
  category: string;
  stackGroup: StackGroup;
  icon?: string;
  fallback?: string;
  color: string;
};

export const STACK_GROUPS: {
  id: StackGroup;
  label: string;
  color: string;
}[] = [
  { id: "frontend", label: "Frontend", color: "#61DAFB" },
  { id: "backend", label: "Backend", color: "#009688" },
  { id: "ai-ml", label: "AI / ML", color: "#00D4FF" },
];

export const TECHNOLOGIES: Technology[] = [
  { name: "React", category: "UI Framework", stackGroup: "frontend", icon: "react", color: "#61DAFB" },
  { name: "Next.js", category: "App Framework", stackGroup: "frontend", icon: "nextdotjs", color: "#FFFFFF" },
  { name: "TypeScript", category: "Language", stackGroup: "frontend", icon: "typescript", color: "#3178C6" },
  { name: "JavaScript", category: "Language", stackGroup: "frontend", icon: "javascript", color: "#F7DF1E" },
  { name: "Tailwind CSS", category: "Styling", stackGroup: "frontend", icon: "tailwindcss", color: "#06B6D4" },
  { name: "Three.js", category: "3D Graphics", stackGroup: "frontend", icon: "threedotjs", color: "#FFFFFF" },
  { name: "React Three Fiber", category: "3D Graphics", stackGroup: "frontend", icon: "react", color: "#61DAFB" },
  { name: "Framer Motion", category: "Animation", stackGroup: "frontend", icon: "framer", color: "#0055FF" },
  { name: "GSAP", category: "Animation", stackGroup: "frontend", icon: "greensock", color: "#88CE02" },
  { name: "Python", category: "Language", stackGroup: "backend", icon: "python", color: "#3776AB" },
  { name: "FastAPI", category: "API Framework", stackGroup: "backend", icon: "fastapi", color: "#009688" },
  { name: "Flask", category: "Web Framework", stackGroup: "backend", icon: "flask", color: "#FFFFFF" },
  { name: "REST APIs", category: "Architecture", stackGroup: "backend", fallback: "API", color: "#00D4FF" },
  { name: "MySQL", category: "Database", stackGroup: "backend", icon: "mysql", color: "#4479A1" },
  { name: "SQL", category: "Database", stackGroup: "backend", fallback: "SQL", color: "#336791" },
  { name: "Docker", category: "DevOps", stackGroup: "backend", icon: "docker", color: "#2496ED" },
  { name: "Git", category: "Version Control", stackGroup: "backend", icon: "git", color: "#F05032" },
  { name: "GitHub", category: "Version Control", stackGroup: "backend", icon: "github", color: "#FFFFFF" },
  { name: "OpenCV", category: "Computer Vision", stackGroup: "ai-ml", icon: "opencv", color: "#5C3EE8" },
  { name: "TensorFlow", category: "Deep Learning", stackGroup: "ai-ml", icon: "tensorflow", color: "#FF6F00" },
  { name: "PyTorch", category: "Deep Learning", stackGroup: "ai-ml", icon: "pytorch", color: "#EE4C2C" },
  { name: "Scikit-Learn", category: "Machine Learning", stackGroup: "ai-ml", icon: "scikitlearn", color: "#F7931E" },
  { name: "Machine Learning", category: "AI Domain", stackGroup: "ai-ml", fallback: "ML", color: "#00D4FF" },
  { name: "AI Engineering", category: "AI Domain", stackGroup: "ai-ml", fallback: "AI", color: "#00D4FF" },
];

export function getTechnologiesByGroup(group: StackGroup): Technology[] {
  return TECHNOLOGIES.filter((tech) => tech.stackGroup === group);
}

export const CAROUSEL_COUNT = TECHNOLOGIES.length;
export const CAROUSEL_STEP = (Math.PI * 2) / CAROUSEL_COUNT;
