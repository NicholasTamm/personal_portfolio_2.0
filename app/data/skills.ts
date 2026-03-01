import { SkillSet } from "../types";

export const skillList: SkillSet = {
    languages: ["C", "C++", "Python", "Kotlin", "TypeScript", "SQL", "Java", "JavaScript", "HTML", "CSS", "R", "Bash", "PowerShell"],
    ai_vision: ["Computer Vision", "Covulutional Neural Nets", "ETL Pipelines", "Natural Language Processing", "Machine Learning", "YOLO", "OpenCV", "Pandas", "NumPy", "Matplotlib"],
    robotics: ["Behavior Trees", "Real-time Systems", "Embedded Systems", "Qt", "Boost", "Path Planning", "Agent Systems"],
    full_stack: ["React", "Next.js", "Node.js", "FastAPI", "Jetpack Compose", "MVVM", "Room", "Tailwind CSS", "SQLAlchemy"],
    devops: ["Docker", "GitLab CI/CD", "Azure", "Firebase", "Vercel", "Linux", "Git", "GitHub"],
    soft_skills: ["Agile/Scrum", "Technical Writing", "System Design", "Leadership", "Cross-functional Collaboration"]
};

export const categories = [
    "Languages",
    "AI & Data",
    "Robotics",
    "Full Stack",
    "DevOps",
    "Soft Skills"
];
export const skillValues = Object.values(skillList) as string[][];
