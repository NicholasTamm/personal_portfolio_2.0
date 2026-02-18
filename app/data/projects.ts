import { ProjectData } from "../types";

export const projects: ProjectData[] = [
    {
        title: "MovieFinder",
        description: "Combine modern media content forms with movie discovery",
        keyContribution: [
            "Implemented an NLP-driven search pipeline that translated user-described movie features into structured queries, enhancing search expressiveness beyond keyword matching",
            "Developed a Jetpack-Compose–based, infinite vertical scrolling trailer feed using the YouTube Player API, caching media assets and differentiating from traditional grid-based movie UIs with a short-form content approach",
            "Architected a Room-backed local cache integrated with the MVVM data layer to persist recently viewed and searched movies, reducing TMDb API request volume and ensuring fast, resilient UI state restoration",
            "Implemented Firebase Authentication and cloud-backed data sync to provide real-time, cross-device consistency, ensuring seamless user sessions and state restoration across Android devices"
        ],
        period: "December 2025",
        tags: ["Android", "Kotlin", "Compose", "Natural Language Processing", "Gemini API", "Firebase"],
        link: "https://github.com/Gherra/MovieFinder",
        additionalLink: "https://cmpt-362-website.vercel.app",
        image: "/project_images/MovieFinder.png",
    },
    {
        title: "RateTheWashroom",
        description: "A web application for rating and reviewing washrooms",
        keyContribution: [
            "Engineered a RESTful API using FastAPI and SQLAlchemy, enabling seamless and reliable data flow between frontend and backend",
            "Containerized the frontend, backend, and PostgreSQL database with Docker, ensuring consistent deployment and development across all team environments",
            "Designed ETL pipeline to automating transformation process for over 1,000 SFU campus washroom listings and 100+ public washrooms, providing a comprehensive dataset that enhances user accessibility and utility"
        ],
        period: "October 2025",
        tags: ["React", "DockerFile", "FastAPI", "Firebase", "PostgreSQL", "Tailwind CSS", "Python"],
        link: "https://github.com/gregoryliu05/rate-the-washroom",
        additionalLink: "",
        image: "/project_images/RateTheWashroom.png",
    },
    {
        title: "youOme",
        description: "Android app for expense splitting made using XML-Layouts",
        keyContribution: [
            "Developed an Android application in Kotlin to simplify expense splitting, minimizing the total transactions",
            "Modeled and implemented a local database and DAOs using Room ORM to enable offline access and persistent data, enhancing user reliability and data integrity",
            "Preserved MVVM architecture to ensure reactive, maintainable, testable, and scalable data flow between the UI and Room database"
        ],
        period: "October 2025",
        tags: ["Kotlin", "XML", "Room"],
        link: "https://github.com/NicholasTamm/youOme",
        additionalLink: "",
        image: "/project_images/youOme.png",
    },
    {
        title: "YOLO Traffic Analysis",
        description: "A vision model benchmarking pipeline",
        keyContribution: [
            "Engineered and deployed ETL pipelines with Pandas, NumPy, and OpenCV to preprocess 20,000+ annotated images, enabling simultaneous training of 3 YOLO model variants",
            "Produced analytical scripts with teammates to benchmark model performance using IoU, chi-square tests, and Euclidean residuals, improving detection accuracy insights and streamlining comparison across model variants",
            "Co-authored a 13-page research report on statistical confidence, edge -case failures, and model limitations, delivering actionable recommendations that enhanced tuning strategies and informed real - world deployment."
        ],
        period: "May 2025",
        tags: ["Python", "YOLO", "Pandas", "OpenCV", "Matplotlib"],
        link: "https://github.com/jonathanung/traffic-yolo-analysis",
        additionalLink: "",
        image: "/project_images/YOLO.png",
    }
];
