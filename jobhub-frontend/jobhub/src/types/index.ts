// ---------------------------------------------------------------------------
// JOBHUB domain types
// These mirror the shape we expect the Spring Boot REST API to return.
// Keeping them centralized means UI components never guess at field names —
// only the api/* service layer and data/mockData.ts need to change when the
// real backend is wired in.
// ---------------------------------------------------------------------------

export type UserRole = 'CANDIDATE' | 'RECRUITER';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyId?: string; // present for recruiters
}

export type JobType = 'Full Time' | 'Part Time' | 'Internship' | 'Contract';
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  location: string;
  about: string;
  website: string;
  employeeCount: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  workMode: WorkMode;
  salaryMin: number;
  salaryMax: number;
  currency: 'INR' | 'USD';
  salaryPeriod: 'LPA' | 'yr' | 'mo';
  jobType: JobType;
  experience: string;
  skills: string[];
  postedAt: string; // ISO date
  applicationDeadline?: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  qualifications: string[];
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
  applicantCount: number;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  candidateId: string;
  candidateName: string;
  candidateAvatarUrl?: string;
  candidateHeadline?: string;
  candidateExperience?: string;
  candidateEducation?: string;
  matchScore?: number;
  appliedDate: string;
  lastUpdated: string;
  status: ApplicationStatus;
  resumeId?: string;
  coverLetter?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  headline: string;
  about: string;
  avatarUrl?: string;
  phone?: string;
  location?: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export interface Resume {
  id: string;
  fileName: string;
  uploadedAt: string;
  fileType: string;
  fileSizeKb: number;
  isPrimary: boolean;
}

export interface Recommendation {
  job: Job;
  matchPercent: number;
  matchingSkills: string[];
  missingSkills: string[];
  reason: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'STATUS' | 'JOB_MATCH' | 'INTERVIEW' | 'RESUME' | 'SYSTEM';
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}

export interface ApplicationStats {
  applied: number;
  underReview: number;
  shortlisted: number;
  interview: number;
  rejected: number;
  selected: number;
}

export interface RecruiterStats {
  activeJobs: number;
  totalApplications: number;
  shortlisted: number;
  interviews: number;
  hires: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface JobFilters {
  query?: string;
  location?: string;
  jobType?: JobType[];
  workMode?: WorkMode[];
  experience?: string[];
  skills?: string[];
  salaryMin?: number;
  datePosted?: 'ANY' | '24H' | '7D' | '30D';
  page?: number;
  pageSize?: number;
}
