import { SkillSet } from "../types";

export const skillList: SkillSet = {
    languages: ["C++", "C", "Python", "GoLang", "Java", "Kotlin", "SQL", "TypeScript", "JavaScript", "HTML", "CSS", "Bash", "PowerShell", "R"],
    ai_vision: ["OpenCV", "YOLO", "ETL Pipelines", "Matplotlib", "NumPy", "Pandas", "Computer Vision", "Covulutional Neural Nets", "Machine Learning", "Natural Language Processing"],
    robotics: ["Agent Systems", "Behavior Trees", "Real-time Systems", "Embedded Systems", "Qt", "Boost"],
    full_stack: ["Next.js", "Node.js", "React", "Tailwind CSS", "FastAPI", "SQLAlchemy", "Electron", "Jetpack Compose", "MVVM", "Room"],
    devops: ["Docker", "Git", "GitHub", "GitLab CI/CD"],
    soft_skills: ["Agile", "Scrum", "Systems Design", "Technical Writing", "Cross-functional Collaboration", "Leadership"]
};

export const categories = [
    "Programming Languages",
    "AI & Data",
    "Robotics",
    "Full Stack",
    "DevOps",
    "Soft Skills"
];
export const skillValues = Object.values(skillList) as string[][];
