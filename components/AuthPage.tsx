
import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Lock, ArrowRight, Github, Chrome, ChevronLeft, Loader2, Briefcase, AtSign } from 'lucide-react';
import { UserData } from '../App';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: (user: UserData) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onBack, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setRole] = useState<'student' | 'curator'>('student');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    field: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (mode === 'login' && (!formData.username || !formData.password)) {
      setError('Iltimos, username va parolni kiriting');
      return;
    }

    if (mode === 'signup' && (!formData.email || !formData.password || !formData.name || !formData.username)) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    if (mode === 'signup' && role === 'curator' && !formData.field) {
      setError('Kurator sifatida sohangizni ko\'rsatishingiz kerak');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name: mode === 'signup' ? formData.name : (formData.username),
        username: formData.username,
        email: formData.email || `${formData.username}@buddy.uz`,
        role: role,
        field: role === 'curator' ? formData.field : undefined,
        assignedCuratorId: null
      };
      
      onSuccess(userData);
    } catch (err) {
      setError('Xatolik yuz berdi. Iltimos qaytadan urining.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Asosiyga qaytish</span>
        </button>

        <div className="glass border border-white/10 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-3">
              {mode === 'login' ? 'Xush kelibsiz!' : 'Jamoaga qo\'shiling'}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              {mode === 'login' 
                ? 'Buddy Team platformasiga qaytganingizdan xursandmiz.' 
                : 'O\'z o\'sishingizni bugun biz bilan boshlang.'}
            </p>
          </div>

          <div className="flex p-1.5 bg-white/5 rounded-2xl mb-8 border border-white/5">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === 'student' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span>O'quvchi</span>
            </button>
            <button
              onClick={() => setRole('curator')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === 'curator' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Kurator</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">To'liq ismingiz</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Abbos Aliyev" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Username</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input name="username" value={formData.username} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="abbos_99" />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Email manzil</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="example@buddy.uz" />
                </div>
              </div>
            )}

            {mode === 'signup' && role === 'curator' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Sohangiz (Expertise)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input name="field" value={formData.field} onChange={handleInputChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Frontend / UI/UX / Mobile..." />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Parol</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input name="password" value={formData.password} onChange={handleInputChange} type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>

            <button disabled={isLoading} className={`w-full py-5 rounded-2xl text-white font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 mt-4 disabled:opacity-70 ${role === 'student' ? 'bg-indigo-600' : 'bg-purple-600'}`}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{mode === 'login' ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            {mode === 'login' ? 'Hisobingiz yo\'qmi?' : 'Hisobingiz bormi?'} 
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="ml-2 text-indigo-400 font-bold hover:underline">
              {mode === 'login' ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
