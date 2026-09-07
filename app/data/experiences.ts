import { ExperienceData } from "../types";

export const experiences: ExperienceData[] = [
    {
        company: "Electronic Arts",
        role: "Quality Designer Intern ",
        period: "May 2026 - December 2026",
        location: "Burnaby, British Columbia",
        description: [
            "Built a REST API and visualization UI for an automated game-test agent that crawls FC 26 end-user builds, exposing execution state and failures for gameplay validation and debugging",
            "Orchestrated stateful test execution with LangGraph and integrated Langfuse for prompt versioning and evaluation, enabling dynamic branching, recovery, and reproducible iteration across automated gameplay scenarios",
            "Developed a PS5 SDK integration layer that translates structured LLM actions into executable game controls, enabling closed-loop agent interaction with FC 26 builds",
            "Automated 80+ manual FC26 test cases using custom game testing agent, reducing repetitive regression testing effort by 40+ tester-hours per patch enabling manual testers to allocate to higher severity and complexity issue"
        ],
        logo: "/EA_sports.svg",
        skills: ["Python", "TypeScript", "LangChain"]
    },
    {
        company: "PricewaterhouseCoopers (PwC)",
        role: "Data Engineer Intern",
        period: "July 2024 - September 2024",
        location: "Central, Hong Kong",
        description: [
            "Built ETL pipelines to perform data migration from cloud platform to custom designed database, ensuring 100% data accuracy and integrity throughout the process",
            "Deployed and tested an Azure Synapse pipeline to query, validate, and process 11M+ database records, automating Excel report generation and reducing manual preparation time for consultants and client-facing services by 70%",
            "Automated manual data handling and err or-prone tasks by developing a custom Python script to validate and transform data"
        ],
        logo: "/pwc.png",
        skills: ["Azure", "Python", "SQL", "PowerShell", "Bash", "OutSystems", "Excel"]
    },
    {
        company: "SFU Robot Soccer",
        role: "Head Developer",
        period: "February 2025 - Present",
        location: "Burnaby, British Columbia",
        description: [
            "Engineered game-state reactivity with Qt signals and slots integrated into a Behavior Tree framework, enabling robots to autonomously process referee commands and maintain 100% compliance with SSL rule enforcement in both simulation and live matches",
            "Spearheaded development of an autonomous agent in C++ using Behavior Trees, enabling real-time decision-making and active game state reflex for 6 robots",
            "Developed and implemented 10+ unit tests with BoostUT to validate robot behaviour and movement, increasing reliability of strategic play and tactic management by 30%"
        ],
        logo: "/SFUrs.png",
        skills: ["C++", "Qt", "Docker", "GitLab CI/CD", "Python", "BoostUT"]
    }

];
