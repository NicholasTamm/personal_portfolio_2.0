import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MoonWrapper from "./components/MoonWrapper";

function SectionDivider() {
  return (
    <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground selection:bg-white/20">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <MoonWrapper />

      {/* Moon-glow radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(201,169,110,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.3)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
