export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  degree: string;
  university: string;
  graduationYear: string;
  skills: string;
  experience: string;
  targetRole: string;
  targetIndustry: string;
}

export interface JobPost {
  title: string;
  company: string;
  location: string;
  description: string;
}

export type Tab = 'profile' | 'job' | 'resume' | 'cover' | 'interview';

export interface AppState {
  profile: StudentProfile;
  job: JobPost;
  generatedResume: string;
  generatedCover: string;
  generatedInterview: string;
}