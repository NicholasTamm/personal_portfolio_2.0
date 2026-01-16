import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="hover:opacity-60 transition-opacity">
          <Image
            src="/icon.png"
            alt="NT Logo"
            width={48}
            height={48}
            className="fill"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="#hero" className="hover:text-white transition-colors">Home</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
}
