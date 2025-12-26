export default function Projects() {
    const projects = [
        {
            title: "Portfolio 1.0",
            description: "My previous personal website built with HTML/CSS.",
            tags: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "E-commerce Dashboard",
            description: "A comprehensive dashboard for managing online stores.",
            tags: ["Next.js", "React", "Tailwind"]
        },
        {
            title: "Task Manager",
            description: "Productivity application with real-time updates.",
            tags: ["Vue.js", "Firebase"]
        }
    ];

    return (
        <section id="projects" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Projects</h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <div key={index} className="flex flex-col justify-between rounded-2xl bg-component p-6 transition-transform hover:-translate-y-1">
                        <div>
                            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                            <p className="mt-4 text-zinc-400">{project.description}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="text-xs font-medium text-zinc-500">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
