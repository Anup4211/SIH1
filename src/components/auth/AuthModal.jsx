import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  User,
  CheckCircle2,
  ChevronRight,
  Lock,
  Mail,
  Smartphone,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { useLanguage } from '../../context/LanguageContext';

export const AuthModal = ({ onLogin, onComplete }) => {
  const { setRole: setGlobalRole } = useRole();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState(null); // 'government' | 'trainee' | null
  const [emailOrId, setEmailOrId] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
  };

  const handleAuthSubmit = (e) => {
    if (e) e.preventDefault();
    if (!selectedRole) {
      setErrorMessage('Please select your access role (Government Official or Trainee) to continue.');
      return;
    }

    setGlobalRole(selectedRole);
    const callback = onLogin || onComplete;
    if (callback) {
      callback(selectedRole);
    }
  };

  const handleSocialAuth = (providerName) => {
    if (!selectedRole) {
      setErrorMessage(`Please select an access role before authenticating with ${providerName}.`);
      return;
    }

    setGlobalRole(selectedRole);
    const callback = onLogin || onComplete;
    if (callback) {
      callback(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Ambient background glow elements */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200/80 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 my-auto relative z-10">
        {/* State Seal & Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 sm:p-7 text-white text-center border-b border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500/20 via-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Landmark className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white">
            कौशल्य सेतू • Kaushal Setu
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto font-sans leading-relaxed">
            Maharashtra Skilling Outcomes & Longitudinal Impact Platform
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Govt. of Maharashtra Single Sign-On (SSO)</span>
          </div>
        </div>

        {/* Tab Selector: Sign In vs Sign Up */}
        <div className="flex border-b border-slate-200/80 bg-slate-50/80 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-4 text-center text-xs font-bold rounded-xl transition-all cursor-pointer btn-interactive ${
              activeTab === 'signin'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {t('signIn') || 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 px-4 text-center text-xs font-bold rounded-xl transition-all cursor-pointer btn-interactive ${
              activeTab === 'signup'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {t('signUp') || 'Sign Up'}
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-5">
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-2xl flex items-start gap-3 text-xs text-rose-800 animate-in fade-in duration-150 shadow-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Required: </span>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Explicit Role Selection (Required for BOTH Sign In & Sign Up) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-display">
                Select Portal Access Role <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-500 font-medium">
                {selectedRole ? 'Role Selected' : 'Required to proceed'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Government Official */}
              <button
                type="button"
                onClick={() => handleRoleSelect('government')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer btn-interactive ${
                  selectedRole === 'government'
                    ? 'border-cyan-600 bg-cyan-50/70 shadow-sm ring-2 ring-cyan-500/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-2 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  {selectedRole === 'government' && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-700" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 font-display">Government Official</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Departmental Admin, Analytics & Audits
                  </div>
                </div>
              </button>

              {/* Option 2: Trainee / Student */}
              <button
                type="button"
                onClick={() => handleRoleSelect('trainee')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer btn-interactive ${
                  selectedRole === 'trainee'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-2 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                  {selectedRole === 'trainee' && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 font-display">Trainee / Candidate</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Learning Journey & Skill Credentials
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Form Fields for Email/Password */}
          <form onSubmit={handleAuthSubmit} className="space-y-3.5 pt-1">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-sans">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh V. Pawar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 focus:outline-hidden transition-all font-medium"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-sans">
                {selectedRole === 'government'
                  ? 'Official Government ID / Email'
                  : selectedRole === 'trainee'
                  ? 'Candidate Registration No. / Mobile'
                  : 'Email / Official ID / Mobile'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={
                    selectedRole === 'government'
                      ? 'officer.dept@maharashtra.gov.in'
                      : selectedRole === 'trainee'
                      ? 'MH-TR-2024-8831 / +91 98200XXXXX'
                      : 'Enter email or official registration ID'
                  }
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 focus:outline-hidden transition-all font-medium"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-sans">
                {activeTab === 'signup' ? 'Create Secure Password' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 focus:outline-hidden transition-all font-medium"
                />
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-sans">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 focus:outline-hidden transition-all font-medium"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 hover:from-slate-800 hover:to-slate-800 text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer btn-interactive"
            >
              <span>
                {activeTab === 'signin'
                  ? selectedRole
                    ? `Sign In as ${selectedRole === 'government' ? 'Government Official' : 'Trainee'}`
                    : 'Sign In to Portal'
                  : selectedRole
                  ? `Create ${selectedRole === 'government' ? 'Official' : 'Trainee'} Account`
                  : 'Create Account'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Visual Divider: --- or continue with --- */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider font-mono">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Providers Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Google / Gmail */}
            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-all shadow-2xs cursor-pointer btn-interactive"
              title="Authenticate with Google / Gmail"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="truncate">Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialAuth('GitHub')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-900 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-2xs cursor-pointer btn-interactive"
              title="Authenticate with GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="truncate">GitHub</span>
            </button>

            {/* Phone / OTP */}
            <button
              type="button"
              onClick={() => handleSocialAuth('Phone OTP')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-all shadow-2xs cursor-pointer btn-interactive"
              title="Authenticate via Mobile OTP (Aadhaar / Registered Mobile)"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="truncate">Phone OTP</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-400 font-sans">
            Protected by State Data Encryption Standard (AES-256) & Digilocker Consent Framework.
          </div>
        </div>
      </div>
    </div>
  );
};
