
import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2, Save, X, Quote, Info, Zap, Plus, Settings, Activity, Users, ChevronLeft, ChevronRight, UserCheck, UserX, Image as ImageIcon, Calendar, Camera, Maximize2, CheckCircle2, UploadCloud, Briefcase, Layout, Upload, AtSign, ExternalLink, GraduationCap, Mail, User, Clock, Shield, Sparkles, Hash } from 'lucide-react';
import { UserData } from '../App';
import { StudentProgress, WeeklyHighlight } from '../types';

interface DashboardProps {
  user: UserData | null;
  studentsData: StudentProgress[];
  highlights: WeeklyHighlight[];
  onRemoveStudent: (id: string) => void;
  onUpdateProfile: (data: Partial<UserData>) => void;
  onUpdateStudent: (student: StudentProgress) => void;
  onAddProgress: (progress: StudentProgress) => void;
  onAddHighlight: (highlight: WeeklyHighlight) => void;
  onRemoveHighlight: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  studentsData, 
  highlights,
  onRemoveStudent, 
  onUpdateProfile, 
  onUpdateStudent, 
  onAddProgress,
  onAddHighlight,
  onRemoveHighlight
}) => {
  const [activeTab, setActiveTab] = useState<'panel' | 'profile'>(user?.role === 'curator' ? 'panel' : 'profile');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingProgress, setIsAddingProgress] = useState(false);
  const [editingProgress, setEditingProgress] = useState<StudentProgress | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewingStudentName, setViewingStudentName] = useState<string | null>(null);
  
  const highlightFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    if (viewingStudentName || editingProgress || selectedImage || isAddingStudent || isAddingProgress) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [viewingStudentName, editingProgress, selectedImage, isAddingStudent, isAddingProgress]);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEditForm, setProfileEditForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    avatar: user?.avatar || '',
    field: user?.field || '',
    longBio: user?.longBio || '',
    motivationQuote: user?.motivationQuote || '',
    skillsString: user?.skills?.join(', ') || ''
  });
  
  const [newStudentName, setNewStudentName] = useState('');

  const [newProgressForm, setNewProgressForm] = useState({
    studentName: '',
    weekNumber: selectedWeek,
    weeklyGoal: '',
    difficulty: 'Yo\'q',
    solution: 'Kutilmoqda',
    status: 'Bajarilmoqda' as const,
    meetingDay: '',
    attended: true
  });

  const myStudentsProgress = user?.role === 'curator' 
    ? studentsData.filter(s => s.curatorId === user.id)
    : [];

  const myOwnProgress = user?.role === 'student'
    ? studentsData.filter(p => p.studentName === user.name)
    : [];

  const filteredProgress = (user?.role === 'curator' ? myStudentsProgress : myOwnProgress)
    .filter(p => p.weekNumber === selectedWeek);

  const currentHighlights = highlights.filter(h => 
    h.weekNumber === selectedWeek && (
      user?.role === 'curator' 
        ? h.curatorId === user.id 
        : h.curatorId === user?.assignedCuratorId
    )
  );

  const uniqueStudents = Array.from(
    new Set(myStudentsProgress.map(s => s.studentName))
  ).map(name => {
    const studentData = myStudentsProgress.find(s => s.studentName === name);
    return { id: studentData?.id || Math.random().toString(), name: name };
  });

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: profileEditForm.name,
      username: profileEditForm.username,
      avatar: profileEditForm.avatar,
      field: profileEditForm.field,
      longBio: profileEditForm.longBio,
      motivationQuote: profileEditForm.motivationQuote,
      skills: profileEditForm.skillsString.split(',').map(s => s.trim()).filter(s => s !== '')
    });
    setIsEditingProfile(false);
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileEditForm(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHighlightUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAddHighlight({
          id: Math.random().toString(36).substr(2, 9),
          curatorId: user.id,
          weekNumber: selectedWeek,
          photoUrl: reader.result as string,
          uploadedBy: user.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProgressEdit = () => {
    if (editingProgress) {
      onUpdateStudent(editingProgress);
      setEditingProgress(null);
    }
  };

  const handleSaveNewProgress = () => {
    if (!newProgressForm.studentName || !newProgressForm.weeklyGoal || !user) return;
    onAddProgress({
      ...newProgressForm,
      id: Math.random().toString(36).substr(2, 9),
      curatorId: user.id,
      weekNumber: selectedWeek,
      meetingDay: newProgressForm.meetingDay || new Date().toISOString().slice(0, 16)
    });
    setIsAddingProgress(false);
    setNewProgressForm({ studentName: '', weekNumber: selectedWeek, weeklyGoal: '', difficulty: 'Yo\'q', solution: 'Kutilmoqda', status: 'Bajarilmoqda', meetingDay: '', attended: true });
  };

  const handleAddNewStudent = () => {
    if (!newStudentName.trim() || !user) return;
    onAddProgress({
      id: Math.random().toString(36).substr(2, 9),
      curatorId: user.id,
      weekNumber: selectedWeek,
      studentName: newStudentName,
      weeklyGoal: 'Dastlabki tanishuv',
      difficulty: 'Yo\'q',
      solution: 'Kutilmoqda',
      status: 'Bajarilmoqda',
      meetingDay: new Date().toISOString().slice(0, 16),
      attended: true
    });
    setNewStudentName('');
    setIsAddingStudent(false);
  };

  const formatMeetingDay = (val: string) => {
    if (!val) return "Belgilanmagan";
    try {
      const date = new Date(val);
      if (isNaN(date.getTime())) return val;
      return date.toLocaleString('uz-UZ', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return val;
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Hal qilindi': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Bajarmadi': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Bajarilmoqda': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Kutilmoqda': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <section id="dashboard" className="py-10 md:py-20 bg-[#0a0a0c] min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="inline-flex p-1.5 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-2xl">
            <button 
              onClick={() => setActiveTab('panel')}
              className={`flex items-center space-x-3 px-10 py-4 rounded-3xl text-xs font-black transition-all ${
                activeTab === 'panel' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="uppercase tracking-widest">Monitoring</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-3 px-10 py-4 rounded-3xl text-xs font-black transition-all ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="uppercase tracking-widest">Profil</span>
            </button>
          </div>
        </div>

        {activeTab === 'profile' ? (
          /* PROFILE SECTION */
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500 space-y-12">
            
            {isEditingProfile ? (
              /* --- EDITING MODE --- */
              <div className="glass rounded-[48px] border border-white/10 p-10 md:p-16 relative overflow-hidden animate-in slide-in-from-top-4 duration-500">
                <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-16">
                  {/* Left: Avatar & Main Inputs */}
                  <div className="flex flex-col md:flex-row gap-12 w-full md:w-auto flex-1">
                    <div className="w-56 h-56 rounded-[32px] bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center border-4 border-white/5 shadow-[0_0_50px_rgba(79,70,229,0.3)] relative group overflow-hidden shrink-0">
                      {profileEditForm.avatar ? (
                        <img src={profileEditForm.avatar} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <ImageIcon className="w-16 h-16 text-white/40" />
                      )}
                      <button 
                        onClick={() => profileFileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                         <Camera className="w-8 h-8 text-white" />
                      </button>
                      <input type="file" ref={profileFileInputRef} className="hidden" accept="image/*" onChange={handleProfilePhotoUpload} />
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">Profil Rasmi (URL)</label>
                        <input 
                          className="w-full bg-[#1b1b1f] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-600 transition-all text-sm" 
                          placeholder="https://..."
                          value={profileEditForm.avatar} 
                          onChange={e => setProfileEditForm({...profileEditForm, avatar: e.target.value})} 
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">To'liq ismingiz</label>
                          <input 
                            className="w-full bg-[#1b1b1f] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-600 transition-all text-sm font-bold" 
                            value={profileEditForm.name} 
                            onChange={e => setProfileEditForm({...profileEditForm, name: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">Username (@)</label>
                          <input 
                            className="w-full bg-[#1b1b1f] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-600 transition-all text-sm font-bold" 
                            value={profileEditForm.username} 
                            onChange={e => setProfileEditForm({...profileEditForm, username: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex gap-4 self-start md:self-center">
                    <button 
                      onClick={handleSaveProfile} 
                      className="px-14 py-5 bg-[#10b981] text-white font-black rounded-3xl text-xs uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                    >
                      <Save className="w-5 h-5" /> Saqlash
                    </button>
                    <button 
                      onClick={() => setIsEditingProfile(false)} 
                      className="px-14 py-5 bg-[#1f1f23] text-slate-400 border border-white/5 font-black rounded-3xl text-xs uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
                    >
                      Bekor
                    </button>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 mb-16"></div>

                <div className="grid md:grid-cols-5 gap-16">
                  <div className="md:col-span-3 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 ml-1">
                        <Info className="w-4 h-4 text-slate-500" />
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Tarjimai hol (Tahrir)</label>
                      </div>
                      <textarea 
                        className="w-full bg-[#1b1b1f] border border-white/5 rounded-[32px] px-8 py-8 text-white h-[350px] resize-none outline-none focus:border-indigo-600 transition-all leading-relaxed text-sm" 
                        value={profileEditForm.longBio} 
                        onChange={e => setProfileEditForm({...profileEditForm, longBio: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 ml-1">
                        <Zap className="w-4 h-4 text-slate-500" />
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ko'nikmalar</label>
                      </div>
                      <input 
                        className="w-full bg-[#1b1b1f] border border-white/5 rounded-2xl px-8 py-6 text-white outline-none focus:border-indigo-600 transition-all text-sm" 
                        placeholder="React, Node.js, UI/UX..."
                        value={profileEditForm.skillsString} 
                        onChange={e => setProfileEditForm({...profileEditForm, skillsString: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 ml-1">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sohangiz</label>
                      </div>
                      <input 
                        className="w-full bg-[#1b1b1f] border border-white/5 rounded-2xl px-8 py-6 text-white outline-none focus:border-indigo-600 transition-all text-sm font-bold" 
                        value={profileEditForm.field} 
                        onChange={e => setProfileEditForm({...profileEditForm, field: e.target.value})} 
                      />
                    </div>
                    <div className="p-10 bg-[#1b1b1f]/30 rounded-[40px] border border-white/5 space-y-6">
                       <label className="text-[11px] font-black uppercase text-indigo-400 tracking-widest ml-1">Shaxsiy Shior</label>
                       <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl px-6 py-5">
                          <input 
                            className="w-full bg-transparent text-white outline-none italic text-sm" 
                            placeholder="Shioringiz..."
                            value={profileEditForm.motivationQuote} 
                            onChange={e => setProfileEditForm({...profileEditForm, motivationQuote: e.target.value})} 
                          />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <div className="glass rounded-[48px] border border-white/10 p-8 md:p-14 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                      <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] bg-[#121214] overflow-hidden border-4 border-white/5 shadow-2xl relative group">
                          <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">{user?.username || '@buddy'}</h2>
                          </div>
                          <p className="text-xl md:text-2xl font-bold text-slate-400 tracking-tight pl-1">{user?.name}</p>
                          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                            <span className="px-6 py-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                              {user?.field || (user?.role === 'curator' ? 'Buddy Curator' : 'Student')}
                            </span>
                          </div>
                      </div>
                    </div>
                    <button onClick={() => setIsEditingProfile(true)} className="px-10 py-4 bg-white/5 text-white rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                      Profilni tahrirlash
                    </button>
                </div>
                <div className="mt-16 grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    <div className="space-y-8">
                      <div>
                          <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Mutaxassis haqida</h4>
                          <p className="text-xl text-slate-400 leading-relaxed font-medium">{user?.longBio || "Hozircha ma'lumot kiritilmagan."}</p>
                      </div>
                      <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[32px]">
                          <Quote className="w-8 h-8 text-indigo-500/30 mb-4" />
                          <p className="text-2xl font-black text-white italic">"{user?.motivationQuote || 'Harakatda barakat!'}"</p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                          <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Ko'nikmalar</h4>
                          <div className="flex flex-wrap gap-2">
                            {(user?.skills && user.skills.length > 0) ? user.skills.map(s => <span key={s} className="px-5 py-2.5 bg-white/5 border border-white/5 text-indigo-300 text-xs font-black rounded-xl uppercase tracking-tight">{s}</span>) : <span className="text-slate-600 text-xs italic">Ma'lumot yo'q</span>}
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {user?.role === 'curator' && (
              <div className="glass rounded-[48px] border border-white/10 p-10 md:p-14">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                   <h3 className="text-3xl font-black text-white flex items-center gap-4"><Users className="w-8 h-8 text-indigo-400" /> Jamoa O'quvchilari</h3>
                   <button onClick={() => setIsAddingStudent(true)} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                      <Plus className="w-5 h-5" /> O'quvchi qo'shish
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {uniqueStudents.map(s => (
                     <div 
                      key={s.id} 
                      className="p-8 h-36 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-indigo-600/10 transition-all hover:-translate-y-1 cursor-pointer w-full shadow-lg"
                      onClick={() => setViewingStudentName(s.name)}
                     >
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors text-2xl">{s.name[0]}</div>
                           <div className="flex flex-col">
                              <span className="font-black text-white text-xl tracking-tight group-hover:text-indigo-400 transition-colors">{s.name}</span>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 opacity-60 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" /> Talaba Profili
                              </span>
                           </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onRemoveStudent(s.id); }} 
                          className="p-4 text-red-500/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* MONITORING SECTION */
          <div className="animate-in fade-in duration-500 space-y-16">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
               <div>
                  <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                    <Layout className="w-4 h-4" /> Boshqaruv Markazi
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter">Haftalik Monitoring</h1>
                    {user?.role === 'curator' && (
                       <button onClick={() => setIsAddingProgress(true)} className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                         <Plus className="w-6 h-6" /> Reja Qo'shish
                       </button>
                    )}
                  </div>
               </div>

               <div className="flex items-center justify-center p-2.5 glass rounded-[3rem] border border-white/10 self-center">
                  <button disabled={selectedWeek === 1} onClick={() => setSelectedWeek(w => w - 1)} className="p-5 text-slate-500 hover:text-white disabled:opacity-20 transition-all hover:bg-white/5 rounded-[2rem]"><ChevronLeft className="w-8 h-8" /></button>
                  <div className="px-16 text-center border-x border-white/5">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Hafta</p>
                    <p className="text-4xl font-black text-white tracking-tighter">#0{selectedWeek}</p>
                  </div>
                  <button disabled={selectedWeek === 4} onClick={() => setSelectedWeek(w => w + 1)} className="p-5 text-slate-500 hover:text-white disabled:opacity-20 transition-all hover:bg-white/5 rounded-[2rem]"><ChevronRight className="w-8 h-8" /></button>
               </div>
            </div>

            <div className="space-y-24">
               {/* PROGRESS TABLE BLOCK */}
               <div className="glass rounded-[48px] border border-white/10 overflow-hidden shadow-2xl bg-[#0a0a0c]/50">
                  <div className="hidden lg:block w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
                      <thead>
                        <tr className="bg-white/[0.04] border-b border-white/5">
                          <th className="w-[16%] px-10 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchi</th>
                          <th className="w-[12%] px-4 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">Uchrashuv</th>
                          <th className="w-[20%] px-4 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">Haftalik Maqsad</th>
                          <th className="w-[15%] px-4 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asosiy Muammo</th>
                          <th className="w-[15%] px-4 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">Berilgan Yechim</th>
                          <th className="w-[12%] px-4 py-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">Holat</th>
                          <th className="w-[10%] px-8 py-10 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredProgress.map((item) => (
                          <tr key={item.id} className="hover:bg-indigo-600/[0.03] transition-colors group">
                            <td className="px-10 py-10">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-sm border border-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{item.studentName[0]}</div>
                                <span className="font-black text-white text-[15px]">{item.studentName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-10">
                               <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {formatMeetingDay(item.meetingDay)}</span>
                                  <span className={`text-[9px] font-bold uppercase tracking-widest ${item.attended ? 'text-green-500' : 'text-red-500/50'}`}>{item.attended ? 'Ishtirok etdi' : 'Kelmagan'}</span>
                               </div>
                            </td>
                            <td className="px-4 py-10">
                               <p className="text-[13px] text-slate-300 font-medium leading-relaxed line-clamp-3">{item.weeklyGoal}</p>
                            </td>
                            <td className="px-4 py-10">
                               <p className={`text-[13px] font-bold leading-relaxed ${item.difficulty === 'Yo\'q' ? 'text-slate-600' : 'text-orange-400'}`}>{item.difficulty}</p>
                            </td>
                            <td className="px-4 py-10">
                               <p className="text-[13px] text-indigo-300 italic opacity-80 leading-relaxed line-clamp-3">{item.solution}</p>
                            </td>
                            <td className="px-4 py-10">
                               <span className={`px-4 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                                 {item.status}
                               </span>
                            </td>
                            <td className="px-8 py-10 text-center">
                               {user?.role === 'curator' && (
                                 <button onClick={() => setEditingProgress({...item})} className="p-4 bg-white/5 text-indigo-400 border border-white/10 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl group-hover:scale-110">
                                   <Edit2 className="w-5 h-5" />
                                 </button>
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Progress List */}
                  <div className="lg:hidden p-6 space-y-4">
                     {filteredProgress.map((item) => (
                       <div key={item.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="font-black text-white text-lg">{item.studentName}</span>
                             {user?.role === 'curator' && <button onClick={() => setEditingProgress({...item})} className="p-3 bg-indigo-600 text-white rounded-xl"><Edit2 className="w-4 h-4" /></button>}
                          </div>
                          <div className="flex gap-2">
                             <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase border ${getStatusStyle(item.status)}`}>{item.status}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed italic">"{item.weeklyGoal}"</p>
                       </div>
                     ))}
                  </div>
               </div>

               {/* HIGHLIGHTS GALLERY BLOCK */}
               <div className="pt-16 border-t border-white/5">
                  <div className="space-y-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 px-4">
                      <div className="text-center sm:text-left">
                        <h3 className="text-4xl font-black text-white flex items-center gap-5 tracking-tighter">
                          <Camera className="w-12 h-12 text-purple-400" />
                          <span>Uchrashuvdan lavhalar</span>
                        </h3>
                        <p className="text-slate-500 text-sm font-medium mt-3">Hafta #0{selectedWeek} davomidagi vizual isbotlar va jarayonlar.</p>
                      </div>
                      
                      {user?.role === 'curator' && (
                        <button 
                          onClick={() => highlightFileInputRef.current?.click()}
                          className="px-10 py-4 bg-purple-600 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-xl shadow-purple-600/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                        >
                          <UploadCloud className="w-5 h-5" /> Lavha yuklash
                          <input type="file" ref={highlightFileInputRef} className="hidden" accept="image/*" onChange={handleHighlightUpload} />
                        </button>
                      )}
                    </div>
                    
                    <div className="glass rounded-[4rem] border border-white/10 p-12 bg-white/[0.01]">
                      {currentHighlights.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                           {currentHighlights.map((highlight) => (
                             <div 
                               key={highlight.id} 
                               className="group relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-[#121214] shadow-2xl transition-all hover:scale-[1.05] cursor-pointer" 
                               onClick={() => setSelectedImage(highlight.photoUrl)}
                             >
                                <img src={highlight.photoUrl} alt="Highlight" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-8">
                                   <div className="w-full flex items-center justify-between">
                                      <div>
                                        <p className="text-[11px] font-black text-white uppercase tracking-widest">{highlight.uploadedBy}</p>
                                        <p className="text-[9px] font-bold text-purple-400 uppercase mt-1">Isbot #0{selectedWeek}</p>
                                      </div>
                                      {user?.role === 'curator' && highlight.curatorId === user.id && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); onRemoveHighlight(highlight.id); }}
                                          className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      )}
                                   </div>
                                </div>
                                <Maximize2 className="absolute top-8 right-8 w-6 h-6 text-white/50 opacity-0 group-hover:opacity-100 transition-all" />
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="py-24 text-center border-4 border-dashed border-white/5 rounded-[4rem]">
                           <ImageIcon className="w-20 h-20 text-slate-800 mx-auto mb-8 opacity-20" />
                           <p className="text-slate-600 font-black uppercase tracking-widest text-sm">Ushbu hafta uchun lavhalar hali yuklanmagan.</p>
                        </div>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- MODALS --- */}

        {/* ADD STUDENT MODAL */}
        {isAddingStudent && (
          <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
             <div className="glass w-full max-w-lg border border-white/10 rounded-[40px] p-10 animate-in zoom-in duration-300">
                <h3 className="text-3xl font-black text-white mb-6">Yangi o'quvchi qo'shish</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">O'quvchi ismi</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-600 transition-all"
                        placeholder="Masalan: Behruz Aliyev"
                        value={newStudentName}
                        onChange={e => setNewStudentName(e.target.value)}
                      />
                   </div>
                   <div className="flex gap-4 pt-4">
                      <button onClick={handleAddNewStudent} className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20">Qo'shish</button>
                      <button onClick={() => setIsAddingStudent(false)} className="flex-1 py-4 bg-white/5 text-slate-500 font-black rounded-2xl text-xs uppercase tracking-widest border border-white/10">Bekor qilish</button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ADD PROGRESS MODAL */}
        {isAddingProgress && (
          <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl overflow-y-auto pt-10 pb-20 px-4 flex justify-center items-start">
             <div className="glass w-full max-w-4xl border border-white/10 rounded-[48px] p-8 md:p-14 animate-in zoom-in duration-300 my-auto">
                <h3 className="text-4xl font-black text-white mb-10 tracking-tighter">Yangi haftalik reja</h3>
                <div className="grid md:grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">O'quvchini tanlang</label>
                         <select 
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-600 [color-scheme:dark]"
                           value={newProgressForm.studentName}
                           onChange={e => setNewProgressForm({...newProgressForm, studentName: e.target.value})}
                         >
                            <option value="">Tanlang...</option>
                            {uniqueStudents.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Haftalik Maqsad</label>
                         <textarea 
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm h-32 resize-none outline-none focus:border-indigo-600"
                           placeholder="Ushbu haftada nima kutilmoqda..."
                           value={newProgressForm.weeklyGoal}
                           onChange={e => setNewProgressForm({...newProgressForm, weeklyGoal: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Uchrashuv vaqti</label>
                         <input 
                           type="datetime-local" 
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-600 [color-scheme:dark]"
                           value={newProgressForm.meetingDay}
                           onChange={e => setNewProgressForm({...newProgressForm, meetingDay: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Asosiy Muammo</label>
                         <textarea 
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm h-32 resize-none outline-none focus:border-orange-500"
                           placeholder="O'quvchi qiynalayotgan nuqta..."
                           value={newProgressForm.difficulty}
                           onChange={e => setNewProgressForm({...newProgressForm, difficulty: e.target.value})}
                         />
                      </div>
                   </div>
                </div>
                <div className="mt-12 flex gap-6">
                   <button onClick={handleSaveNewProgress} className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/40">Rejani saqlash</button>
                   <button onClick={() => setIsAddingProgress(false)} className="px-10 py-6 bg-white/5 text-slate-500 font-black rounded-3xl text-xs uppercase tracking-widest border border-white/10">Bekor qilish</button>
                </div>
             </div>
          </div>
        )}
        
        {/* VIEW STUDENT PROFILE MODAL - LOCKS BACKGROUND AND SCROLLS NATIVELY */}
        {viewingStudentName && (
          <div className="fixed inset-0 z-[250] bg-black/98 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto pt-10 pb-20 px-4 md:px-10 flex justify-center items-start">
             <div className="glass w-full max-w-6xl border border-white/10 rounded-[56px] p-8 md:p-16 shadow-[0_0_100px_rgba(79,70,229,0.15)] relative flex flex-col my-auto">
                <button onClick={() => setViewingStudentName(null)} className="absolute top-10 right-10 p-5 bg-white/5 text-slate-400 hover:text-white rounded-[2rem] transition-all border border-white/10 z-[60] hover:scale-110 active:scale-95"><X className="w-8 h-8" /></button>
                
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left mb-16 relative z-50">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center border-4 border-white/5 shadow-[0_0_50px_rgba(79,70,229,0.3)] shrink-0 text-white text-7xl font-black">
                     {viewingStudentName[0]}
                  </div>

                  <div className="flex-1 space-y-6 pt-4">
                     <div className="space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">@{viewingStudentName.toLowerCase().replace(/\s+/g, '_')}</h3>
                          <div className="hidden md:block w-3 h-3 rounded-full bg-green-500 animate-pulse mt-4"></div>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-slate-400 flex items-center justify-center md:justify-start gap-3">
                           {viewingStudentName} <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                        </p>
                     </div>
                     <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <span className="px-8 py-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                           <GraduationCap className="w-5 h-5" /> Buddy Student
                        </span>
                        <span className="px-8 py-3 bg-green-600/20 text-green-400 border border-green-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                           <Shield className="w-5 h-5" /> Verified Profile
                        </span>
                     </div>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 mb-16"></div>

                <div className="grid md:grid-cols-5 gap-16">
                  <div className="md:col-span-3 space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 ml-2">
                        <div className="p-3 bg-white/5 rounded-2xl text-slate-400"><Info className="w-5 h-5" /></div>
                        <label className="text-[12px] font-black uppercase text-slate-500 tracking-[0.3em]">Tarjimai hol</label>
                      </div>
                      <div className="w-full bg-[#1b1b1f]/80 border border-white/5 rounded-[40px] px-12 py-12 text-slate-300 min-h-[300px] transition-all leading-relaxed text-xl italic font-medium relative group hover:bg-[#1b1b1f]">
                         <div className="absolute top-8 left-8 text-indigo-500/10"><Quote className="w-16 h-16" /></div>
                         <p>Ushbu talaba Buddy jamoasida o'z yo'nalishi bo'yicha professional mahoratini oshirib bormoqda. Har haftalik monitoringlar va jamoaviy yordam orqali u real loyihalarda ishtirok etishga tayyorgarlik ko'rmoqda. Uning asosiy maqsadi — sohasi bo'yicha kuchli mutaxassis bo'lib yetishish va global miqyosdagi muammolarga yechim topishdir.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 pt-4">
                       <div className="p-10 bg-white/5 rounded-[32px] border border-white/5 text-left flex items-start gap-6 hover:bg-white/[0.08] transition-all">
                          <div className="p-4 bg-indigo-600/10 rounded-2xl text-indigo-400">
                             <Clock className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Jamoaga qo'shilgan vaqti</p>
                             <p className="text-white font-black text-xl">15 May, 2024</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 ml-2">
                        <div className="p-3 bg-white/5 rounded-2xl text-slate-400"><Zap className="w-5 h-5" /></div>
                        <label className="text-[12px] font-black uppercase text-slate-500 tracking-[0.3em]">Ko'nikmalar</label>
                      </div>
                      <div className="flex flex-wrap gap-3">
                         {['JavaScript', 'React', 'Tailwind CSS', 'Git', 'Redux', 'API', 'UI Design', 'Logic'].map(s => (
                           <span key={s} className="px-6 py-3 bg-[#1b1b1f] border border-white/5 text-indigo-300 text-xs font-black rounded-2xl uppercase tracking-tighter hover:border-indigo-600/50 transition-colors cursor-default">{s}</span>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 ml-2">
                        <div className="p-3 bg-white/5 rounded-2xl text-slate-400"><Briefcase className="w-5 h-5" /></div>
                        <label className="text-[12px] font-black uppercase text-slate-500 tracking-[0.3em]">Sohasi (Role)</label>
                      </div>
                      <div className="w-full bg-[#1b1b1f] border border-white/5 rounded-3xl px-8 py-7 text-white text-lg font-black tracking-tight flex items-center gap-4">
                         <Sparkles className="w-6 h-6 text-yellow-500" /> Junior Frontend Developer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 w-full">
                  <div className="p-10 md:p-14 bg-gradient-to-r from-[#1b1b1f] to-[#0a0a0c] rounded-[48px] border border-white/5 shadow-inner relative overflow-hidden group flex flex-col md:flex-row items-center gap-10">
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03] text-indigo-500 pointer-events-none">
                       <Quote className="w-40 h-40" />
                    </div>
                    
                    <div className="shrink-0 text-center md:text-left">
                       <label className="text-[11px] font-black uppercase text-indigo-400 tracking-[0.4em] mb-2 block">Shaxsiy Shior</label>
                       <div className="p-4 bg-indigo-600/10 rounded-2xl text-indigo-400 inline-flex">
                          <Quote className="w-6 h-6" />
                       </div>
                    </div>
                    
                    <div className="flex-1 bg-[#0a0a0c]/50 border border-white/5 rounded-[32px] px-10 py-10 relative z-10">
                        <p className="text-white italic text-2xl md:text-3xl font-black tracking-tighter leading-tight text-center md:text-left">
                          "Har kuni 1% yaxshiroq bo'lish — kelajakdagi muvaffaqiyat garovidir."
                        </p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 flex justify-center shrink-0 pt-10 border-t border-white/5">
                   <button 
                     onClick={() => setViewingStudentName(null)}
                     className="px-24 py-7 bg-white/5 border border-white/10 text-white font-black rounded-[2.5rem] text-sm uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center gap-4 hover:scale-105 active:scale-95 shadow-2xl"
                   >
                     Profilni yopish <X className="w-6 h-6" />
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* EDIT PROGRESS MODAL - FIXED SCROLL ISSUE */}
        {editingProgress && (
          <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl overflow-y-auto pt-10 pb-20 px-4 md:px-10 flex justify-center items-start">
             <div className="glass w-full max-w-5xl border border-white/10 rounded-[48px] p-8 md:p-16 shadow-[0_0_100px_rgba(79,70,229,0.15)] relative flex flex-col animate-in zoom-in duration-300 my-auto">
                <button onClick={() => setEditingProgress(null)} className="absolute top-8 right-8 p-4 bg-white/5 text-slate-400 hover:text-white rounded-2xl transition-all border border-white/10 z-[60]"><X className="w-6 h-6" /></button>
                
                <div className="flex items-center gap-6 mb-12 border-b border-white/5 pb-10 shrink-0">
                   <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-600/30">{editingProgress.studentName[0]}</div>
                   <div>
                      <h3 className="text-4xl font-black text-white tracking-tighter">{editingProgress.studentName}</h3>
                      <p className="text-[11px] font-black uppercase text-indigo-400 tracking-[0.3em] mt-2">Hafta #0{editingProgress.weekNumber} Monitoringini tahrirlash</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Uchrashuv vaqti va Davomat</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="datetime-local" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-600 [color-scheme:dark] transition-colors" value={editingProgress.meetingDay} onChange={e => setEditingProgress({...editingProgress, meetingDay: e.target.value})} />
                            <button onClick={() => setEditingProgress({...editingProgress, attended: !editingProgress.attended})} className={`flex items-center justify-center gap-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all py-4 ${editingProgress.attended ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-600/20' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                               {editingProgress.attended ? <><UserCheck className="w-4 h-4" /> Ishtirok etdi</> : <><UserX className="w-4 h-4" /> Kelmagan</>}
                            </button>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Haftalik Maqsad</label>
                         <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-[14px] min-h-[140px] resize-none outline-none focus:border-indigo-600 leading-relaxed transition-colors" placeholder="Haftalik reja..." value={editingProgress.weeklyGoal} onChange={e => setEditingProgress({...editingProgress, weeklyGoal: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1"> Monitoring Holati</label>
                         <div className="grid grid-cols-2 gap-3">
                            {(['Bajarilmoqda', 'Hal qilindi', 'Kutilmoqda', 'Bajarmadi'] as const).map(st => (
                              <button key={st} onClick={() => setEditingProgress({...editingProgress, status: st})} className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${editingProgress.status === st ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/30' : 'bg-white/5 border-white/10 text-slate-600 hover:text-slate-400 hover:bg-white/10'}`}>{st}</button>
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Asosiy Muammo</label>
                         <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-[14px] min-h-[160px] resize-none outline-none focus:border-orange-500 transition-colors" placeholder="Qiynalgan nuqtalari..." value={editingProgress.difficulty} onChange={e => setEditingProgress({...editingProgress, difficulty: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Tavsiya qilingan Yechim</label>
                         <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-[14px] min-h-[160px] resize-none outline-none focus:border-green-600 transition-colors" placeholder="Qanday yordam berildi..." value={editingProgress.solution} onChange={e => setEditingProgress({...editingProgress, solution: e.target.value})} />
                      </div>
                   </div>
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-6 shrink-0 pt-8 border-t border-white/5">
                   <button onClick={handleSaveProgressEdit} className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-3xl text-sm uppercase tracking-widest shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all">
                     <Save className="w-6 h-6" /> MONITORINGNI SAQLASH
                   </button>
                   <button onClick={() => setEditingProgress(null)} className="px-12 py-6 bg-white/5 text-slate-500 font-black rounded-3xl text-sm uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">Bekor qilish</button>
                </div>
             </div>
          </div>
        )}

        {/* IMAGE LIGHTBOX */}
        {selectedImage && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-10 right-10 p-6 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all shadow-2xl"><X className="w-10 h-10" /></button>
            <img src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-[4rem] shadow-3xl border border-white/10" alt="Full view" />
          </div>
        )}

      </div>
    </section>
  );
};

export default Dashboard;
