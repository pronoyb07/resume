// src/types/resume.ts
export interface ResumeData {
    contact?: {
        name: string;
        email: string;
        phone: string;
    };
    education?: Array<{
        institution: string;
        degree: string;
        graduationYear: string;
    }>;
    experience?: Array<{
        company: string;
        role: string;
        duration: string;
        responsibilities: string[];
    }>;
    skills?: string[];
}