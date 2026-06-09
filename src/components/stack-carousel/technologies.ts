export type Technology = {
  name: string;
  category: string;
  icon?: string;
  fallback?: string;
  color: string;
};

export const TECHNOLOGIES: Technology[] = [
  { name: "Python", category: "Backend & AI", icon: "python", color: "#3776AB" },
  { name: "FastAPI", category: "Backend API Framework", icon: "fastapi", color: "#009688" },
  { name: "Flask", category: "Backend Framework", icon: "flask", color: "#FFFFFF" },
  { name: "React", category: "Frontend Framework", icon: "react", color: "#61DAFB" },
  { name: "Next.js", category: "Frontend Framework", icon: "nextdotjs", color: "#FFFFFF" },
  { name: "TypeScript", category: "Language", icon: "typescript", color: "#3178C6" },
  { name: "JavaScript", category: "Language", icon: "javascript", color: "#F7DF1E" },
  { name: "Tailwind CSS", category: "Styling", icon: "tailwindcss", color: "#06B6D4" },
  { name: "Three.js", category: "3D Graphics", icon: "threedotjs", color: "#FFFFFF" },
  { name: "React Three Fiber", category: "3D Graphics", icon: "react", color: "#61DAFB" },
  { name: "Framer Motion", category: "Animation", icon: "framer", color: "#0055FF" },
  { name: "GSAP", category: "Animation", icon: "greensock", color: "#88CE02" },
  { name: "MySQL", category: "Database", icon: "mysql", color: "#4479A1" },
  { name: "SQL", category: "Database", fallback: "SQL", color: "#336791" },
  { name: "Git", category: "Version Control", icon: "git", color: "#F05032" },
  { name: "GitHub", category: "Version Control", icon: "github", color: "#FFFFFF" },
  { name: "Docker", category: "DevOps", icon: "docker", color: "#2496ED" },
  { name: "OpenCV", category: "Computer Vision", icon: "opencv", color: "#5C3EE8" },
  { name: "TensorFlow", category: "Machine Learning", icon: "tensorflow", color: "#FF6F00" },
  { name: "PyTorch", category: "Machine Learning", icon: "pytorch", color: "#EE4C2C" },
  { name: "Scikit-Learn", category: "Machine Learning", icon: "scikitlearn", color: "#F7931E" },
  { name: "Machine Learning", category: "AI Domain", fallback: "ML", color: "#00D4FF" },
  { name: "AI Engineering", category: "AI Domain", fallback: "AI", color: "#00D4FF" },
  { name: "REST APIs", category: "Architecture", fallback: "API", color: "#00D4FF" },
];

export const CAROUSEL_COUNT = TECHNOLOGIES.length;
export const CAROUSEL_STEP = (Math.PI * 2) / CAROUSEL_COUNT;
