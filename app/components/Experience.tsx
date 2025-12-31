import Image from "next/image";

export default function Experience() {
    const experiences = [
        {
            company: "PricewaterhouseCoopers (PwC)",
            role: "Data Engineer Intern",
            period: "July 2022 - September 2022",
            description: `
            ·Built ETL pipelines to perform data migration from cloud platform to custom designed database
            ·Deployed and tested an Azure Synapse pipeline to query, validate, and process 11M+ database records, automating
            Excel report generation and reducing manual preparation time for consultants and client-facing services by 70%
            · Automated manual data handling and error-prone tasks by developing a custom Python script to validate and transform data.
            `,
            logo: "/pwc.jpg" // Placeholder logo
        }
    ];

    return (
        <section id="experience" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Experience</h2>
            <div className="mx-auto max-w-3xl space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative rounded-2xl bg-component p-8 transition-transform hover:-translate-y-1">
                        <div className="flex flex-col gap-6 sm:flex-row">
                            <div className="flex-shrink-0">
                                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-zinc-800 p-1">
                                    <Image
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                                        <p className="mt-1 text-lg font-medium text-zinc-300">{exp.role}</p>
                                    </div>
                                    <span className="text-sm text-zinc-400">{exp.period}</span>
                                </div>
                                <p className="mt-4 text-zinc-400 leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
