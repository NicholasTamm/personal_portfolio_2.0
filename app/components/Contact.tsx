export default function Contact() {
    return (
        <section id="contact" className="container mx-auto px-4 py-20 text-center md:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white/5 p-12 backdrop-blur-sm">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">Get in Touch</h2>
                <p className="mb-8 text-lg text-zinc-400">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <a
                    href="mailto:hello@example.com"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                    Say Hello
                </a>
            </div>
        </section>
    );
}
