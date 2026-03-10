import { GitHubIcon, LinkedInIcon } from "../components/Icons";
import { navLinks } from "../data/navigation";
import { socials } from "../data/socials";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 text-center text-sm text-zinc-500">
            <div className="container mx-auto flex flex-col items-center gap-6 px-4">
                <div className="flex flex-wrap justify-center gap-6 text-zinc-400">
                    <a href="#hero" className="hover:text-white transition-colors">Home</a>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                        <GitHubIcon className="h-5 w-5" />
                    </a>
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                        <LinkedInIcon className="h-5 w-5" />
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} Nicholas Tam. All rights reserved.</p>
            </div>
        </footer>
    );
}
