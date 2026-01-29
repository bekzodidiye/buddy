
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import Features from './components/Features';
import Team from './components/Team';
import Contact from './components/Contact';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { INITIAL_PROGRESS_DATA, TEAM_MEMBERS, INITIAL_HIGHLIGHTS_DATA } from './constants';
import { StudentProgress, WeeklyHighlight, TeamMember } from './types';

export type Page = 'home' | 'features' | 'team' | 'contact' | 'auth' | 'dashboard';

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'student' | 'curator';
  field?: string;
  longBio?: string;
  fieldDescription?: string;
  motivationQuote?: string;
  skills?: string[];
  assignedCuratorId?: string | null;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<UserData | null>(null);
  const [allStudentsData, setAllStudentsData] = useState<StudentProgress[]>(INITIAL_PROGRESS_DATA);
  const [weeklyHighlights, setWeeklyHighlights] = useState<WeeklyHighlight[]>(INITIAL_HIGHLIGHTS_DATA);
  const [dynamicTeamMembers, setDynamicTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigateToAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentPage('auth');
  };

  const handleLoginSuccess = (userData: UserData) => {
    let finalUserData = { ...userData };
    
    if (userData.role === 'curator') {
      const existing = dynamicTeamMembers.find(m => m.id === userData.id || m.name === userData.name);
      
      if (existing) {
        finalUserData = { 
          ...finalUserData, 
          id: existing.id,
          avatar: existing.avatar,
          longBio: existing.longBio,
          fieldDescription: existing.fieldDescription,
          motivationQuote: existing.motivationQuote,
          skills: existing.skills,
          field: existing.role
        };
      } else {
        const newCurator: TeamMember = {
          id: userData.id,
          name: userData.name,
          role: userData.field || 'Buddy Curator',
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=6366f1&color=fff&size=256`,
          bio: "Buddy jamoasining yangi kuratori.",
          longBio: "Buddy jamoasining yangi kuratori. Hozircha o'z biografiyasini kiritmagan.",
          fieldDescription: "Dasturlash va Mentorlik yo'nalishi.",
          motivationQuote: "Harakatda barakat!",
          skills: ['Dasturlash', 'Mentorlik']
        };
        
        setDynamicTeamMembers(prev => [...prev, newCurator]);
        
        finalUserData = {
          ...finalUserData,
          avatar: newCurator.avatar,
          longBio: newCurator.longBio,
          motivationQuote: newCurator.motivationQuote,
          skills: newCurator.skills,
          field: newCurator.role
        };
      }

      const currentCuratorStudents = allStudentsData.filter(s => s.curatorId === finalUserData.id);
      if (currentCuratorStudents.length === 0) {
        const defaultStudentsNames = ['Dostonbek Islomov', 'Nilufar G\'aniyeva', 'Jahongir To\'rayev'];
        const newDefaultData: StudentProgress[] = defaultStudentsNames.map((name, index) => ({
          id: `default-${finalUserData.id}-${index}`,
          curatorId: finalUserData.id,
          weekNumber: 1,
          studentName: name,
          weeklyGoal: "Dastlabki tanishuv va reja tuzish",
          difficulty: "Yo'q",
          solution: "Kutilmoqda",
          status: 'Bajarilmoqda',
          meetingDay: new Date(Date.now() + index * 86400000).toISOString(),
          attended: true
        }));
        setAllStudentsData(prev => [...prev, ...newDefaultData]);
      }
    }
    
    setUser(finalUserData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleAssignCurator = (curatorId: string) => {
    if (user && user.role === 'student') {
      setUser({ ...user, assignedCuratorId: curatorId });
      const studentExists = allStudentsData.find(s => s.studentName === user.name && s.curatorId === curatorId);
      if (!studentExists) {
        setAllStudentsData(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          curatorId: curatorId,
          weekNumber: 1,
          studentName: user.name,
          weeklyGoal: 'Hali belgilanmagan',
          difficulty: 'Yo\'q',
          solution: 'Kutilmoqda',
          status: 'Bajarilmoqda',
          meetingDay: new Date().toISOString(),
          attended: true
        }]);
      }
      alert("Kurator muvaffaqiyatli tanlandi!");
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm("Haqiqatdan ham ushbu o'quvchini jamoangizdan chiqarmoqchimisiz?")) {
      setAllStudentsData(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const handleUpdateStudent = (updatedStudent: StudentProgress) => {
    setAllStudentsData(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleAddHighlight = (highlight: WeeklyHighlight) => {
    setWeeklyHighlights(prev => [...prev, highlight]);
  };

  const handleRemoveHighlight = (id: string) => {
    setWeeklyHighlights(prev => prev.filter(h => h.id !== id));
  };

  const handleUpdateProfile = (profileData: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      if (user.role === 'curator') {
        setDynamicTeamMembers(prev => {
          const exists = prev.some(m => m.id === user.id);
          if (exists) {
            return prev.map(member => 
              member.id === user.id ? { 
                ...member, 
                name: updatedUser.name || member.name,
                avatar: updatedUser.avatar || member.avatar,
                longBio: updatedUser.longBio || member.longBio,
                role: updatedUser.field || member.role,
                skills: updatedUser.skills || member.skills,
                motivationQuote: updatedUser.motivationQuote || member.motivationQuote
              } : member
            );
          } else {
            return [...prev, {
              id: user.id,
              name: updatedUser.name,
              role: updatedUser.field || 'Buddy Curator',
              avatar: updatedUser.avatar || '',
              bio: updatedUser.longBio?.substring(0, 100) || '',
              longBio: updatedUser.longBio || '',
              fieldDescription: updatedUser.fieldDescription || '',
              motivationQuote: updatedUser.motivationQuote || '',
              skills: updatedUser.skills || []
            }];
          }
        });
      }
    }
  };

  const handleAddProgress = (newProgress: StudentProgress) => {
    setAllStudentsData(prev => [...prev, newProgress]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={setCurrentPage} onAuthNavigate={handleNavigateToAuth} />;
      case 'features':
        return <div className="pt-20"><Features /></div>;
      case 'team':
        return (
          <div className="pt-20">
            <Team 
              user={user} 
              onAssignCurator={handleAssignCurator}
              customMembers={dynamicTeamMembers}
              studentsData={allStudentsData}
              highlights={weeklyHighlights}
            />
          </div>
        );
      case 'contact':
        return <div className="pt-20"><Contact /></div>;
      case 'dashboard':
        return (
          <div className="pt-20">
            <Dashboard 
              user={user} 
              studentsData={allStudentsData} 
              highlights={weeklyHighlights}
              onRemoveStudent={handleRemoveStudent}
              onUpdateProfile={handleUpdateProfile}
              onUpdateStudent={handleUpdateStudent}
              onAddProgress={handleAddProgress}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={handleRemoveHighlight}
            />
          </div>
        );
      case 'auth':
        return <AuthPage 
          initialMode={authMode} 
          onBack={() => setCurrentPage('home')} 
          onSuccess={handleLoginSuccess}
        />;
      default:
        return <HomeView onNavigate={setCurrentPage} onAuthNavigate={handleNavigateToAuth} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c]">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onAuthNavigate={handleNavigateToAuth} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="animate-in fade-in duration-700">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      
      <ChatBot />

      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default App;
