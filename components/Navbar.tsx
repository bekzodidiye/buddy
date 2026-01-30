
import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Home, Layout, Mail, Sparkles, LogIn, LogOut, UserCircle } from 'lucide-react';
import { Page, UserData } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  user: UserData | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onAuthNavigate, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; id: Page; icon: React.ReactNode }[] = [
    { name: 'Asosiy', id: 'home', icon: <Home className="w-4 h-4" /> },
    { name: 'Xizmatlar', id: 'features', icon: <Layout className="w-4 h-4" /> },
    { name: 'Kuratorlar', id: 'team', icon: <Users className="w-4 h-4" /> },
    { name: 'Bog\'lanish', id: 'contact', icon: <Mail className="w-4 h-4" /> },
  ];

  if (user) {
    navLinks.push({ name: 'Panel', id: 'dashboard', icon: <Layout className="w-4 h-4" /> });
  }

  const handleLinkClick = (id: Page) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div onClick={() => handleLinkClick('home')} className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center ">
                <img 
                            src="../image.png" 
                            alt="Buddy Team Art" 
                            className="w-full h-auto rounded-[12px] shadow-2xl block mx-auto"
                          
                         />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-white">Buddy<span className="text-purple-400">Team</span></span>
              <p className="text-[10px] text-purple-300 font-bold uppercase tracking-[0.3em] leading-none">Команды</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center space-x-2 ${
                  currentPage === link.id ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            ))}
            
            <div className="ml-4 pl-4 border-l border-white/10 flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <UserCircle className="w-5 h-5 text-purple-400" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white leading-tight">{user.name}</span>
                      <span className="text-[9px] font-black uppercase text-purple-400 tracking-tighter">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                    title="Chiqish"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => onAuthNavigate('login')}
                    className="text-slate-400 hover:text-white text-sm font-bold px-4 py-2 transition-colors"
                  >
                    Kirish
                  </button>
                  <button 
                    onClick={() => onAuthNavigate('signup')}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-600/20 flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Ro'yxatdan o'tish</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors border border-white/10"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 m-4 py-6 px-4 border border-white/10 rounded-3xl shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center space-x-3 p-4 rounded-2xl text-lg font-bold transition-all ${
                  currentPage === link.id ? 'text-purple-400 bg-white/10' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            ))}
            
            {user ? (
              <button 
                onClick={() => { onLogout(); setIsMenuOpen(false); }} 
                className="w-full mt-4 py-4 bg-red-500/10 text-red-400 font-bold rounded-2xl border border-red-500/20 flex items-center justify-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Chiqish ({user.name})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button onClick={() => { onAuthNavigate('login'); setIsMenuOpen(false); }} className="py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10">Kirish</button>
                <button onClick={() => { onAuthNavigate('signup'); setIsMenuOpen(false); }} className="py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl">Qo'shilish</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
