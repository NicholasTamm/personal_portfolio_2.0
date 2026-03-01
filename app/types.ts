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
    ai_vision: string[];
    robotics: string[];
    full_stack: string[];
    devops: string[];
    soft_skills: string[];
}
