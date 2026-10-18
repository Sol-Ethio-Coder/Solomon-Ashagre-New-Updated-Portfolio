import { useEffect } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" />;
}

// One listener feeds every `.spot` card its pointer position for the hover glow.
function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

export default function App() {
  useSpotlight();
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
