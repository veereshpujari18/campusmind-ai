import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  NavigationTab,
  StudentProfile,
  SemesterRecord,
  SubjectGrade,
  Scholarship,
  InternshipApplication,
  InternshipStatus,
  PlacementTopic,
  DsaProblem,
  DsaStatus,
  StudyTask,
  CollegeResource,
  NotificationItem,
  AppSettings,
} from '../types';
import { StorageService } from '../services/storage';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Student Profile
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;

  // Academics
  semesters: SemesterRecord[];
  activeSemesterNum: number;
  setActiveSemesterNum: (sem: number) => void;
  addSubject: (semesterNum: number, subject: Omit<SubjectGrade, 'id'>) => void;
  updateSubject: (semesterNum: number, subjectId: string, updated: Partial<SubjectGrade>) => void;
  deleteSubject: (semesterNum: number, subjectId: string) => void;
  calculateOverallCgpa: () => number;

  // Scholarships
  scholarships: Scholarship[];
  toggleSaveScholarship: (id: string) => void;
  markScholarshipApplied: (id: string) => void;

  // Internships
  internships: InternshipApplication[];
  addInternship: (item: Omit<InternshipApplication, 'id' | 'lastUpdated'>) => void;
  updateInternshipStatus: (id: string, newStatus: InternshipStatus) => void;
  deleteInternship: (id: string) => void;

  // Placement Prep
  placementTopics: PlacementTopic[];
  updatePlacementTopicProgress: (topicId: string, completedDelta: number) => void;

  // DSA Tracker
  dsaProblems: DsaProblem[];
  updateDsaStatus: (problemId: string, status: DsaStatus) => void;
  updateDsaNotes: (problemId: string, notes: string) => void;

  // Study Planner
  studyTasks: StudyTask[];
  addTask: (task: Omit<StudyTask, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // College Resources
  resources: CollegeResource[];
  addResource: (resource: Omit<CollegeResource, 'id' | 'uploadedDate' | 'downloads'>) => void;
  incrementResourceDownload: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return StorageService.getAuthSession().isAuthenticated;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Core Data States
  const [profile, setProfile] = useState<StudentProfile>(() => StorageService.getProfile());
  const [semesters, setSemesters] = useState<SemesterRecord[]>(() => StorageService.getSemesters());
  const [activeSemesterNum, setActiveSemesterNum] = useState<number>(6);
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => StorageService.getScholarships());
  const [internships, setInternships] = useState<InternshipApplication[]>(() => StorageService.getInternships());
  const [placementTopics, setPlacementTopics] = useState<PlacementTopic[]>(() => StorageService.getPlacementTopics());
  const [dsaProblems, setDsaProblems] = useState<DsaProblem[]>(() => StorageService.getDsaProblems());
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(() => StorageService.getStudyTasks());
  const [resources, setResources] = useState<CollegeResource[]>(() => StorageService.getResources());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => StorageService.getNotifications());
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());

  // Dark mode effect
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // If already authenticated on first load, switch to dashboard
  useEffect(() => {
    if (isAuthenticated && currentTab === 'landing') {
      setCurrentTab('dashboard');
    }
  }, []);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const login = (email: string) => {
    StorageService.setAuthSession(email);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setCurrentTab('dashboard');
  };

  const logout = () => {
    StorageService.setAuthSession(null);
    setIsAuthenticated(false);
    setCurrentTab('landing');
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      StorageService.saveProfile(next);
      return next;
    });
  };

  const calculateOverallCgpa = useCallback((): number => {
    let totalCreditPoints = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      sem.subjects.forEach((subj) => {
        totalCreditPoints += subj.credits * subj.gradePoint;
        totalCredits += subj.credits;
      });
    });

    if (totalCredits === 0) return 0;
    return Number((totalCreditPoints / totalCredits).toFixed(2));
  }, [semesters]);

  const addSubject = (semesterNum: number, subjectData: Omit<SubjectGrade, 'id'>) => {
    const newSubject: SubjectGrade = {
      ...subjectData,
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };

    setSemesters((prev) => {
      const next = prev.map((sem) => {
        if (sem.semesterNumber === semesterNum) {
          const updatedSubjects = [...sem.subjects, newSubject];
          // Recalculate SGPA
          const totalCreds = updatedSubjects.reduce((acc, s) => acc + s.credits, 0);
          const totalPoints = updatedSubjects.reduce((acc, s) => acc + s.credits * s.gradePoint, 0);
          const newSgpa = totalCreds > 0 ? Number((totalPoints / totalCreds).toFixed(2)) : 0;

          return {
            ...sem,
            subjects: updatedSubjects,
            totalCredits: totalCreds,
            sgpa: newSgpa,
          };
        }
        return sem;
      });

      StorageService.saveSemesters(next);
      return next;
    });
  };

  const updateSubject = (semesterNum: number, subjectId: string, updated: Partial<SubjectGrade>) => {
    setSemesters((prev) => {
      const next = prev.map((sem) => {
        if (sem.semesterNumber === semesterNum) {
          const updatedSubjects = sem.subjects.map((sub) => {
            if (sub.id === subjectId) {
              return { ...sub, ...updated };
            }
            return sub;
          });

          const totalCreds = updatedSubjects.reduce((acc, s) => acc + s.credits, 0);
          const totalPoints = updatedSubjects.reduce((acc, s) => acc + s.credits * s.gradePoint, 0);
          const newSgpa = totalCreds > 0 ? Number((totalPoints / totalCreds).toFixed(2)) : 0;

          return {
            ...sem,
            subjects: updatedSubjects,
            totalCredits: totalCreds,
            sgpa: newSgpa,
          };
        }
        return sem;
      });

      StorageService.saveSemesters(next);
      return next;
    });
  };

  const deleteSubject = (semesterNum: number, subjectId: string) => {
    setSemesters((prev) => {
      const next = prev.map((sem) => {
        if (sem.semesterNumber === semesterNum) {
          const updatedSubjects = sem.subjects.filter((sub) => sub.id !== subjectId);
          const totalCreds = updatedSubjects.reduce((acc, s) => acc + s.credits, 0);
          const totalPoints = updatedSubjects.reduce((acc, s) => acc + s.credits * s.gradePoint, 0);
          const newSgpa = totalCreds > 0 ? Number((totalPoints / totalCreds).toFixed(2)) : 0;

          return {
            ...sem,
            subjects: updatedSubjects,
            totalCredits: totalCreds,
            sgpa: newSgpa,
          };
        }
        return sem;
      });

      StorageService.saveSemesters(next);
      return next;
    });
  };

  const toggleSaveScholarship = (id: string) => {
    setScholarships((prev) => {
      const next = prev.map((sch) => {
        if (sch.id === id) {
          return { ...sch, isSaved: !sch.isSaved };
        }
        return sch;
      });
      StorageService.saveScholarships(next);
      return next;
    });
  };

  const markScholarshipApplied = (id: string) => {
    setScholarships((prev) => {
      const next = prev.map((sch) => {
        if (sch.id === id) {
          return { ...sch, isApplied: true };
        }
        return sch;
      });
      StorageService.saveScholarships(next);
      return next;
    });
  };

  const addInternship = (item: Omit<InternshipApplication, 'id' | 'lastUpdated'>) => {
    const newInt: InternshipApplication = {
      ...item,
      id: `int_${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInternships((prev) => {
      const next = [newInt, ...prev];
      StorageService.saveInternships(next);
      return next;
    });
  };

  const updateInternshipStatus = (id: string, newStatus: InternshipStatus) => {
    setInternships((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return item;
      });
      StorageService.saveInternships(next);
      return next;
    });
  };

  const deleteInternship = (id: string) => {
    setInternships((prev) => {
      const next = prev.filter((item) => item.id !== id);
      StorageService.saveInternships(next);
      return next;
    });
  };

  const updatePlacementTopicProgress = (topicId: string, completedDelta: number) => {
    setPlacementTopics((prev) => {
      const next = prev.map((topic) => {
        if (topic.id === topicId) {
          const updatedCount = Math.max(0, Math.min(topic.totalModules, topic.completedModules + completedDelta));
          return { ...topic, completedModules: updatedCount };
        }
        return topic;
      });
      StorageService.savePlacementTopics(next);
      return next;
    });
  };

  const updateDsaStatus = (problemId: string, status: DsaStatus) => {
    setDsaProblems((prev) => {
      const next = prev.map((p) => {
        if (p.id === problemId) {
          return {
            ...p,
            status,
            lastPracticed: new Date().toISOString().split('T')[0],
          };
        }
        return p;
      });
      StorageService.saveDsaProblems(next);
      return next;
    });
  };

  const updateDsaNotes = (problemId: string, notes: string) => {
    setDsaProblems((prev) => {
      const next = prev.map((p) => {
        if (p.id === problemId) {
          return { ...p, notes };
        }
        return p;
      });
      StorageService.saveDsaProblems(next);
      return next;
    });
  };

  const addTask = (task: Omit<StudyTask, 'id' | 'completed'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task_${Date.now()}`,
      completed: false,
    };
    setStudyTasks((prev) => {
      const next = [newTask, ...prev];
      StorageService.saveStudyTasks(next);
      return next;
    });
  };

  const toggleTask = (id: string) => {
    setStudyTasks((prev) => {
      const next = prev.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });
      StorageService.saveStudyTasks(next);
      return next;
    });
  };

  const deleteTask = (id: string) => {
    setStudyTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      StorageService.saveStudyTasks(next);
      return next;
    });
  };

  const addResource = (resource: Omit<CollegeResource, 'id' | 'uploadedDate' | 'downloads'>) => {
    const newRes: CollegeResource = {
      ...resource,
      id: `res_${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      downloads: 0,
    };
    setResources((prev) => {
      const next = [newRes, ...prev];
      StorageService.saveResources(next);
      return next;
    });
  };

  const incrementResourceDownload = (id: string) => {
    setResources((prev) => {
      const next = prev.map((r) => {
        if (r.id === id) {
          return { ...r, downloads: r.downloads + 1 };
        }
        return r;
      });
      StorageService.saveResources(next);
      return next;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => {
        if (n.id === id) {
          return { ...n, read: true };
        }
        return n;
      });
      StorageService.saveNotifications(next);
      return next;
    });
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      StorageService.saveNotifications(next);
      return next;
    });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      StorageService.saveSettings(next);
      return next;
    });
  };

  const resetAllData = () => {
    StorageService.resetAllDemoData();
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        isAuthenticated,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        isSearchOpen,
        setIsSearchOpen,
        profile,
        updateProfile,
        semesters,
        activeSemesterNum,
        setActiveSemesterNum,
        addSubject,
        updateSubject,
        deleteSubject,
        calculateOverallCgpa,
        scholarships,
        toggleSaveScholarship,
        markScholarshipApplied,
        internships,
        addInternship,
        updateInternshipStatus,
        deleteInternship,
        placementTopics,
        updatePlacementTopicProgress,
        dsaProblems,
        updateDsaStatus,
        updateDsaNotes,
        studyTasks,
        addTask,
        toggleTask,
        deleteTask,
        resources,
        addResource,
        incrementResourceDownload,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        settings,
        updateSettings,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
