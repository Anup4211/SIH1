import React, { useState } from 'react';
import { Landmark, User, ShieldCheck, ChevronRight } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const AuthModal = ({ onLogin, onComplete }) => {
  const { setRole: setGlobalRole } = useRole();
  const [stage, setStage] = useState('role-select'); // role-select, auth-form
  const [role, setLocalRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleRoleSelect = (selectedRole) => {
    setLocalRole(selectedRole);
    setGlobalRole(selectedRole);
    setStage('auth-form');
  };

  const handleAuth = () => {
    if (role) {
      setGlobalRole(role);
    }
    const callback = onLogin || onComplete;
    if (callback) {
      callback(role);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-indigo-900 p-8 text-white text-center">
          <Landmark className="w-16 h-16 mx-auto mb-4 text-white/90" />
          <h1 className="text-2xl font-bold font-display">कौशल्य सेतू | Kaushal Setu</h1>
          <p className="text-orange-100/80 text-sm mt-2">Maharashtra Skilling Outcomes Platform</p>
        </div>

        <div className="p-6">
          {stage === 'role-select' ? (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 text-center mb-6">Select your portal</h2>
              <button
                onClick={() => handleRoleSelect('government')}
                className="w-full flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all group cursor-pointer"
              >
                <ShieldCheck className="w-8 h-8 text-orange-600 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-slate-900">Government Official</div>
                  <div className="text-xs text-slate-500">Departmental Admin & Analytics</div>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect('trainee')}
                className="w-full flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all group cursor-pointer"
              >
                <User className="w-8 h-8 text-indigo-600 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-slate-900">Trainee / Student</div>
                  <div className="text-xs text-slate-500">Learning & Skill Certification</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setStage('role-select')}
                className="text-sm text-indigo-600 hover:underline mb-4 cursor-pointer block"
              >
                &larr; Back to Role Selection
              </button>
              <div className="flex border-b border-slate-200 mb-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`pb-2 px-4 text-sm font-semibold border-b-2 cursor-pointer ${
                    isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`pb-2 px-4 text-sm font-semibold border-b-2 cursor-pointer ${
                    !isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {isLogin ? 'Login' : 'Sign Up'} as {role === 'government' ? 'Official' : 'Trainee'}
              </h2>
              <input
                type="text"
                placeholder={role === 'government' ? 'Official ID / Email' : 'Registration Number / Mobile'}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAuth}
                className="w-full bg-slate-900 text-white p-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer shadow-md"
              >
                Access Portal <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


