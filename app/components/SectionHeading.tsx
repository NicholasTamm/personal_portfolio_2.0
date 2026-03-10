interface SectionHeadingProps {
    number: string;
    label: string;
    title: string;
}

export default function SectionHeading({ number, label, title }: SectionHeadingProps) {
    return (
        <div className="mb-16 text-center">
            <span className="text-xs tracking-widest uppercase font-mono text-zinc-500">
                <span className="text-accent">{number} /</span> {label}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
        </div>
    );
}
