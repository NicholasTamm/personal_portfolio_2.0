import { SkillSet } from "../types";

export const skillList: SkillSet = {
    languages: ["C", "C++", "HTML", "CSS", "Java", "JavaScript", "Python", "Kotlin", "R", "SQL", "TypeScript"],
    frameworks: ["React", "FastAPI", "Qt", "Boost", "Next.js", "Node.js"],
    devtools: ["Github", "GitLab", "Azure", "Docker", "DockerFiles", "Android Studio"]
};

export const categories = ["Languages", "Frameworks", "Dev-Tools"];
export const skillValues = Object.values(skillList) as string[][];
