import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { GitHubIcon, LinkedInIcon } from "./components/Icons";
import MoonWrapper from "./components/MoonWrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground selection:bg-white/20">
      <MoonWrapper />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 text-center text-sm text-zinc-500">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4">
            <div className="flex flex-wrap justify-center gap-6 text-zinc-400">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/NicholasTamm" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/nicholastamm/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Nicholas Tam. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
