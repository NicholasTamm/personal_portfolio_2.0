export default function Skills() {
    const skills = [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
        "GraphQL", "PostgreSQL", "AWS", "Docker", "Git", "Figma"
    ];

    return (
        <section id="skills" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Skills & Interests</h2>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}
