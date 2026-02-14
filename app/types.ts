export interface ExperienceData {
    company: string;
    role: string;
    period: string;
    description: string[];
    location: string;
    logo: string;
    skills: string[];
}

export interface ProjectData {
    title: string;
    description: string;
    keyContribution: string[];
    tags: string[];
    link: string;
    additionalLink: string;
    period: string;
    image?: string;
}

export interface SkillSet {
    languages: string[];
    frameworks: string[];
    devtools: string[];
}
