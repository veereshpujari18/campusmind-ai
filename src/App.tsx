import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { AcademicsView } from './components/academics/AcademicsView';
import { ScholarshipFinderView } from './components/scholarships/ScholarshipFinderView';
import { InternshipTrackerView } from './components/internships/InternshipTrackerView';
import { PlacementPrepView } from './components/placement/PlacementPrepView';
import { DsaTrackerView } from './components/dsa/DsaTrackerView';
import { CgpaCalculatorView } from './components/cgpa/CgpaCalculatorView';
import { StudyPlannerView } from './components/planner/StudyPlannerView';
import { CollegeResourcesView } from './components/resources/CollegeResourcesView';
import { AiAssistantView } from './components/assistant/AiAssistantView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (currentTab === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
        <GlobalSearchModal />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'academics':
        return <AcademicsView />;
      case 'scholarships':
        return <ScholarshipFinderView />;
      case 'internships':
        return <InternshipTrackerView />;
      case 'placement':
        return <PlacementPrepView />;
      case 'dsa':
        return <DsaTrackerView />;
      case 'cgpa':
        return <CgpaCalculatorView />;
      case 'planner':
        return <StudyPlannerView />;
      case 'resources':
        return <CollegeResourcesView />;
      case 'assistant':
        return <AiAssistantView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 pb-16 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Modals & Command Palettes */}
      <AuthModal />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ToastProvider>
  );
}
