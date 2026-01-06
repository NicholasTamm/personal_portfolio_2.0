export default function About() {
    return (
        <section id="about" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">About Me</h2>
            <div className="mx-auto max-w-4xl rounded-2xl bg-component p-8 md:p-12 transition-transform hover:-translate-y-1">
                <p className="text-lg leading-relaxed text-zinc-300">
                    I am a passionate software developer with a strong foundation in C++, Python, and full-stack web development.
                    Currently studying at Simon Fraser University, I specialize in building efficient systems and user-friendly applications.
                    From designing autonomous robot behaviors to optimizing data pipelines, I love tackling complex problems and turning ideas into reality.
                </p>
            </div>
        </section>
    );
}
