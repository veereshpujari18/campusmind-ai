import {
  StudentProfile,
  SemesterRecord,
  Scholarship,
  InternshipApplication,
  PlacementTopic,
  DsaProblem,
  StudyTask,
  CollegeResource,
  NotificationItem,
  AppSettings,
} from '../types';
import {
  initialStudentProfile,
  initialSemesters,
  initialScholarships,
  initialInternships,
  initialPlacementTopics,
  initialDsaProblems,
  initialStudyTasks,
  initialCollegeResources,
  initialNotifications,
  initialSettings,
} from '../data/mockData';

const KEYS = {
  PROFILE: 'studentos_profile',
  SEMESTERS: 'studentos_semesters',
  SCHOLARSHIPS: 'studentos_scholarships',
  INTERNSHIPS: 'studentos_internships',
  PLACEMENT_TOPICS: 'studentos_placement_topics',
  DSA_PROBLEMS: 'studentos_dsa_problems',
  STUDY_TASKS: 'studentos_study_tasks',
  RESOURCES: 'studentos_resources',
  NOTIFICATIONS: 'studentos_notifications',
  SETTINGS: 'studentos_settings',
  AUTH_TOKEN: 'studentos_auth_token',
};

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving ${key} to localStorage:`, error);
  }
}

export const StorageService = {
  getProfile: (): StudentProfile => safeGet(KEYS.PROFILE, initialStudentProfile),
  saveProfile: (profile: StudentProfile): void => safeSet(KEYS.PROFILE, profile),

  getSemesters: (): SemesterRecord[] => safeGet(KEYS.SEMESTERS, initialSemesters),
  saveSemesters: (semesters: SemesterRecord[]): void => safeSet(KEYS.SEMESTERS, semesters),

  getScholarships: (): Scholarship[] => safeGet(KEYS.SCHOLARSHIPS, initialScholarships),
  saveScholarships: (scholarships: Scholarship[]): void => safeSet(KEYS.SCHOLARSHIPS, scholarships),

  getInternships: (): InternshipApplication[] => safeGet(KEYS.INTERNSHIPS, initialInternships),
  saveInternships: (internships: InternshipApplication[]): void => safeSet(KEYS.INTERNSHIPS, internships),

  getPlacementTopics: (): PlacementTopic[] => safeGet(KEYS.PLACEMENT_TOPICS, initialPlacementTopics),
  savePlacementTopics: (topics: PlacementTopic[]): void => safeSet(KEYS.PLACEMENT_TOPICS, topics),

  getDsaProblems: (): DsaProblem[] => safeGet(KEYS.DSA_PROBLEMS, initialDsaProblems),
  saveDsaProblems: (problems: DsaProblem[]): void => safeSet(KEYS.DSA_PROBLEMS, problems),

  getStudyTasks: (): StudyTask[] => safeGet(KEYS.STUDY_TASKS, initialStudyTasks),
  saveStudyTasks: (tasks: StudyTask[]): void => safeSet(KEYS.STUDY_TASKS, tasks),

  getResources: (): CollegeResource[] => safeGet(KEYS.RESOURCES, initialCollegeResources),
  saveResources: (resources: CollegeResource[]): void => safeSet(KEYS.RESOURCES, resources),

  getNotifications: (): NotificationItem[] => safeGet(KEYS.NOTIFICATIONS, initialNotifications),
  saveNotifications: (notifications: NotificationItem[]): void => safeSet(KEYS.NOTIFICATIONS, notifications),

  getSettings: (): AppSettings => safeGet(KEYS.SETTINGS, initialSettings),
  saveSettings: (settings: AppSettings): void => safeSet(KEYS.SETTINGS, settings),

  getAuthSession: (): { isAuthenticated: boolean; userEmail?: string } => {
    try {
      const token = localStorage.getItem(KEYS.AUTH_TOKEN);
      return { isAuthenticated: !!token, userEmail: token || undefined };
    } catch {
      return { isAuthenticated: false };
    }
  },
  setAuthSession: (email: string | null): void => {
    try {
      if (email) {
        localStorage.setItem(KEYS.AUTH_TOKEN, email);
      } else {
        localStorage.removeItem(KEYS.AUTH_TOKEN);
      }
    } catch (e) {
      console.warn('Could not set auth session', e);
    }
  },

  resetAllDemoData: (): void => {
    try {
      localStorage.removeItem(KEYS.PROFILE);
      localStorage.removeItem(KEYS.SEMESTERS);
      localStorage.removeItem(KEYS.SCHOLARSHIPS);
      localStorage.removeItem(KEYS.INTERNSHIPS);
      localStorage.removeItem(KEYS.PLACEMENT_TOPICS);
      localStorage.removeItem(KEYS.DSA_PROBLEMS);
      localStorage.removeItem(KEYS.STUDY_TASKS);
      localStorage.removeItem(KEYS.RESOURCES);
      localStorage.removeItem(KEYS.NOTIFICATIONS);
      localStorage.removeItem(KEYS.SETTINGS);
    } catch (e) {
      console.warn('Could not reset demo data', e);
    }
  },
};
