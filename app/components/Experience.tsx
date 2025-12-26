export default function Experience() {
    const experiences = [
        {
            company: "Tech Corp",
            role: "Senior Frontend Engineer",
            period: "2023 - Present",
            description: "Leading frontend development for core products using Next.js and Tailwind CSS."
        },
        {
            company: "Startup Inc",
            role: "Full Stack Developer",
            period: "2021 - 2023",
            description: "Built scalable web applications and managed cloud infrastructure."
        }
    ];

    return (
        <section id="experience" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Experience</h2>
            <div className="mx-auto max-w-3xl space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative rounded-2xl bg-component p-8 transition-transform hover:-translate-y-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                            <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                            <span className="text-sm text-zinc-400">{exp.period}</span>
                        </div>
                        <p className="mt-2 text-lg font-medium text-zinc-300">{exp.role}</p>
                        <p className="mt-4 text-zinc-400">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
