export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface ResumeSummary {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  skills: string[];
  experienceYears: number;
  summary: string;
  education: Education[];
  experienceHistory: Experience[];
  keyStrengths: string[];
  verdict: string;
  suitabilityScore: number;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  summary: ResumeSummary;
}
