import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Particles } from "@/components/Particles";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Hackathons } from "@/components/Hackathons";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nisarg Panchal — AI Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Nisarg Panchal — AI Engineer, full-stack developer and automation builder crafting intelligent products from Ahmedabad." },
      { property: "og:title", content: "Nisarg Panchal — AI Engineer & Full-Stack Developer" },
      { property: "og:description", content: "Building intelligent systems, automation and scalable software." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <Cursor />
      <SmoothScroll>
        <Particles global />
        <main className="relative z-10 overflow-x-hidden">
          <Nav />
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Work />
          <Hackathons />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
