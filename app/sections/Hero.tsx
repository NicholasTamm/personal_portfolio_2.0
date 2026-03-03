export default function Hero() {
    return (
        <section id="hero" className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent font-sans">
                    Nicholas Tam
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base sm:whitespace-nowrap">
                    Software Developer · Robotics · Analytics · Computer Vision
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="https://github.com/NicholasTamm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                    >
                        GitHub
                    </a>
                    <a
                        href="/Nicholas_Tam_Resume(default).pdf"
                        download
                        className="rounded-full border border-zinc-700 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:border-zinc-500 active:scale-95"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
}
