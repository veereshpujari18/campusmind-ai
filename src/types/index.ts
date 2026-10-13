export type NavigationTab =
  | 'landing'
  | 'dashboard'
  | 'academics'
  | 'scholarships'
  | 'internships'
  | 'placement'
  | 'dsa'
  | 'cgpa'
  | 'planner'
  | 'resources'
  | 'assistant'
  | 'profile'
  | 'settings';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  semester: number;
  currentCgpa: number;
  targetCgpa: number;
  usnOrRollNo: string;
  skills: string[];
  github: string;
  linkedin: string;
  resumeFileName: string;
  bio: string;
  avatarUrl?: string;
}

export interface SubjectGrade {
  id: string;
  code: string;
  name: string;
  credits: number;
  internalMarks: number;
  maxInternalMarks: number;
  externalMarks: number;
  maxExternalMarks: number;
  grade: string;
  gradePoint: number;
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  assignmentsCompleted: number;
  totalAssignments: number;
}

export interface SemesterRecord {
  semesterNumber: number;
  academicYear: string;
  sgpa: number;
  totalCredits: number;
  subjects: SubjectGrade[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  annualValue: number;
  deadline: string;
  category: 'All' | 'General' | 'OBC' | 'SC/ST' | 'EWS' | 'Girls Only' | 'Minority';
  minCgpa: number;
  maxFamilyIncomeLakhs: number;
  eligibleCourses: string[];
  eligibleYears: number[];
  gender: 'All' | 'Female' | 'Male';
  scholarType: 'All' | 'Day Scholar' | 'Hosteller';
  state: string;
  description: string;
  documentsRequired: string[];
  officialWebsite: string;
  isSaved?: boolean;
  isApplied?: boolean;
}

export type InternshipStatus =
  | 'Wishlist'
  | 'Applied'
  | 'Online Assessment'
  | 'Interview'
  | 'Selected'
  | 'Rejected';

export interface InternshipApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  stipend: string;
  applicationDate: string;
  deadline: string;
  status: InternshipStatus;
  jobUrl?: string;
  notes?: string;
  contactPerson?: string;
  lastUpdated: string;
}

export interface PlacementTopic {
  id: string;
  title: string;
  category: 'Core CS' | 'Languages' | 'Systems' | 'Soft Skills';
  description: string;
  totalModules: number;
  completedModules: number;
  recommendedNext: string;
  keyConcepts: string[];
  interviewTips: string;
  cheatSheetSummary: string;
}

export type DsaDifficulty = 'Easy' | 'Medium' | 'Hard';
export type DsaStatus = 'Not Started' | 'Attempted' | 'Solved' | 'Revision';

export interface DsaProblem {
  id: string;
  title: string;
  topicId: string;
  topicName: string;
  difficulty: DsaDifficulty;
  status: DsaStatus;
  platform: 'LeetCode' | 'GFG' | 'HackerRank' | 'Codeforces';
  platformUrl: string;
  notes?: string;
  codeSnippet?: string;
  lastPracticed?: string;
}

export interface DsaTopicSummary {
  id: string;
  name: string;
  total: number;
  solved: number;
  attempted: number;
  remaining: number;
  progressPercentage: number;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  estimatedMinutes: number;
  completed: boolean;
  category: 'Assignment' | 'Exam Prep' | 'Lab Work' | 'DSA Practice' | 'Project';
}

export interface CollegeResource {
  id: string;
  title: string;
  subject: string;
  semester: number;
  type: 'Notes' | 'PYQ' | 'Lab Programs' | 'Syllabus' | 'Timetables' | 'Important Announcements' | 'Study Materials';
  uploadedDate: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'CODE';
  fileSize: string;
  author: string;
  downloads: number;
  description: string;
  downloadUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'scholarship' | 'internship' | 'academic' | 'system';
  timestamp: string;
  read: boolean;
  actionTab?: NavigationTab;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  codeSnippet?: string;
  language?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  gradingScale: 10 | 4;
  emailNotifications: boolean;
  desktopReminders: boolean;
  compactSidebar: boolean;
}
