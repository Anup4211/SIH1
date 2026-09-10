import React, { useState, useEffect } from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/shared/Header';
import { ToastContainer } from './components/shared/ToastContainer';
import { GovernmentDashboard } from './components/government/GovernmentDashboard';
import { TraineeDashboard } from './components/trainee/TraineeDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { Landmark } from 'lucide-react';

const MainFooter = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
              <Landmark className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="font-bold font-display text-sm">
                {t('govMaharashtra')} • MSInS
              </div>
              <div className="text-[11px] text-slate-400">
                {t('deptTitle')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            © 2025 Maharashtra State Innovation Society (MSInS). All rights reserved. Designed for Longitudinal Outcome Measurement.
          </div>
        </div>
      </div>
    </footer>
  );
};

const AppContent = () => {
  const { role, setRole } = useRole();
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(role));

  useEffect(() => {
    setIsAuthenticated(Boolean(role));
  }, [role]);

  const handleLogout = () => {
    setRole(null);
    setIsAuthenticated(false);
  };

  // Guard Clause 1: Unauthenticated or No Role Selected
  if (!isAuthenticated || !role) {
    return (
      <AuthModal
        onLogin={(selectedRole) => {
          if (selectedRole) setRole(selectedRole);
          setIsAuthenticated(true);
        }}
        onComplete={(selectedRole) => {
          if (selectedRole) setRole(selectedRole);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  // Guard Clause 2: Government Portal Isolation
  if (role === 'government') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Header onLogout={handleLogout} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <GovernmentDashboard />
        </main>
        <MainFooter />
        <ToastContainer />
      </div>
    );
  }

  // Guard Clause 3: Trainee Portal Isolation
  if (role === 'trainee') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Header onLogout={handleLogout} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <TraineeDashboard />
        </main>
        <MainFooter />
        <ToastContainer />
      </div>
    );
  }

  // Fallback
  return (
    <AuthModal
      onLogin={() => setIsAuthenticated(true)}
      onComplete={() => setIsAuthenticated(true)}
    />
  );
};

function App() {
  return (
    <LanguageProvider>
      <RoleProvider>
        <AppContent />
      </RoleProvider>
    </LanguageProvider>
  );
}

export default App;

