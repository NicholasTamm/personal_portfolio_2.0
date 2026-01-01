import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Nicholas Tam. All rights reserved.</p>
      </footer>
    </main>
  );
}
