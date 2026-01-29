
import React, { useState, useEffect } from 'react';
import { TeamMember, StudentProgress, WeeklyHighlight } from '../types';
import { X, ChevronLeft, Star, Quote, Users, Briefcase, Award, Info, Calendar, UserCheck, UserX, Activity, ChevronRight, Target, Camera, Image as ImageIcon, Maximize2, Zap } from 'lucide-react';

interface CuratorDetailProps {
  curator: TeamMember;
  onClose: () => void;
  studentsData?: StudentProgress[];
  highlights?: WeeklyHighlight[];
}

const CuratorDetail: React.FC<CuratorDetailProps> = ({ curator, onClose, studentsData = [], highlights = [] }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'plans'>('profile');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  
  const curatorStudents = studentsData
    .filter(item => item.curatorId === curator.id)
    .reduce((acc, current) => {
      const x = acc.find(item => item.studentName === current.studentName);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as StudentProgress[]);

  const filteredPlans = studentsData.filter(
    item => item.curatorId === curator.id && item.weekNumber === selectedWeek
  );

  const currentHighlights = highlights.filter(h => 
    h.weekNumber === selectedWeek && h.curatorId === curator.id
  );

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
    <div className="fixed inset-0 z-[110] bg-[#0a0a0c] overflow-y-auto animate-in fade-in duration-300">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-20">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <button onClick={onClose} className="w-full md:w-auto flex items-center justify-center space-x-3 text-slate-400 hover:text-white transition-all bg-white/5 px-6 py-4 rounded-2xl border border-white/10 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase text-[10px] tracking-widest">Barcha kuratorlar</span>
          </button>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`flex-1 md:flex-none px-10 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              PROFİL
            </button>
            <button 
              onClick={() => setActiveTab('plans')} 
              className={`flex-1 md:flex-none px-10 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              O'QUV REJALARI
            </button>
          </div>
        </div>

        {activeTab === 'profile' ? (
          <div className="grid lg:grid-cols-3 gap-12 animate-in fade-in duration-500 max-w-7xl mx-auto">
            {/* Sidebar Profile Card */}
            <div className="lg:col-span-1">
              <div className="glass border border-white/10 rounded-[48px] p-8 md:sticky md:top-32">
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-8 border-4 border-white/5 shadow-2xl group">
                  <img src={curator.avatar} alt={curator.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">{curator.name}</h2>
                  <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-6">{curator.role}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {curator.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-tight">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-[32px] border border-white/5 text-center">
                    <div className="flex items-center justify-center text-indigo-400 mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">O'quvchilar</p>
                    <p className="text-2xl font-black text-white">{curatorStudents.length}</p>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-[32px] border border-white/5 text-center">
                    <div className="flex items-center justify-center text-yellow-500 mb-2">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Reyting</p>
                    <p className="text-2xl font-black text-white">5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="glass border border-white/10 rounded-[48px] p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-indigo-500">
                   <Briefcase className="w-64 h-64" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-10 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span>Soha va Tajriba</span>
                </h3>
                
                <div className="space-y-10 relative z-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 ml-1">Mutaxassis haqida</h4>
                    <p className="text-2xl text-slate-300 leading-relaxed font-medium tracking-tight">{curator.longBio}</p>
                  </div>
                  
                  <div className="p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-5 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Mutaxassislik falsafasi
                    </h4>
                    <p className="text-slate-400 text-lg leading-relaxed italic font-medium">"{curator.fieldDescription}"</p>
                  </div>
                </div>
              </div>

              {/* Motivation Quote Block */}
              <div className="relative group">
                 <div className="absolute -left-6 -top-6">
                    <Quote className="w-24 h-24 text-indigo-600/10 group-hover:text-indigo-600/20 transition-colors" />
                 </div>
                 <div className="glass border border-white/10 rounded-[48px] p-16 md:p-24 text-center bg-gradient-to-br from-indigo-600/[0.03] to-purple-600/[0.03] shadow-2xl">
                    <p className="text-3xl md:text-5xl font-black text-white leading-[1.1] italic tracking-tighter">
                      "{curator.motivationQuote}"
                    </p>
                    <div className="mt-12 flex justify-center items-center gap-4">
                       <div className="w-16 h-1 bg-gradient-to-r from-transparent to-indigo-600 rounded-full"></div>
                       <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                       <div className="w-16 h-1 bg-gradient-to-l from-transparent to-indigo-600 rounded-full"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-20">
            {/* Header Section for Plans */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
              <div className="text-center xl:text-left">
                <h2 className="text-indigo-500 font-black tracking-[0.3em] uppercase text-[10px] mb-3 flex items-center justify-center xl:justify-start gap-2">
                  <Activity className="w-4 h-4" /> Monitoring Tizimi
                </h2>
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">Haftalik Monitoring</h1>
              </div>
              
              <div className="flex items-center justify-center p-2 glass rounded-[2.5rem] border border-white/10 self-center">
                <button 
                  disabled={selectedWeek === 1} 
                  onClick={() => setSelectedWeek(w => w - 1)} 
                  className="p-4 text-slate-400 hover:text-white disabled:opacity-20 transition-all hover:bg-white/5 rounded-3xl"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <div className="px-12 md:px-16 text-center border-x border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-500 mb-1 tracking-[0.2em]">Haftalik Hisobot</p>
                  <p className="text-3xl md:text-4xl font-black text-white leading-none">#0{selectedWeek}</p>
                </div>
                <button 
                  disabled={selectedWeek === 4} 
                  onClick={() => setSelectedWeek(w => w + 1)} 
                  className="p-4 text-slate-400 hover:text-white disabled:opacity-20 transition-all hover:bg-white/5 rounded-3xl"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </div>

            {/* BLOCK 1: MONITORING TABLE */}
            <div className="space-y-8">
               <div className="flex items-center gap-4 ml-4">
                  <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/20">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest">O'quv rejalari va holatlar</h3>
               </div>
               
               <div className="glass rounded-[48px] border border-white/10 overflow-hidden shadow-2xl bg-[#0a0a0c]/40">
                  <div className="hidden lg:block w-full">
                    <table className="w-full text-left border-collapse table-fixed">
                      <thead>
                        <tr className="bg-white/[0.04] border-b border-white/5">
                          <th className="w-[15%] px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchi</th>
                          <th className="w-[13%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Vaqt</th>
                          <th className="w-[20%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Maqsad</th>
                          <th className="w-[15%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Muammo</th>
                          <th className="w-[20%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Yechim</th>
                          <th className="w-[11%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Holat</th>
                          <th className="w-[9%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Davomat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredPlans.map((item) => (
                          <tr key={item.id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="px-10 py-9 align-middle">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-sm border border-indigo-500/20">
                                  {item.studentName[0]}
                                </div>
                                <span className="font-black text-white text-[15px] tracking-tight">{item.studentName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-9 align-middle">
                              <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                                <Calendar className="w-4 h-4" />
                                {formatMeetingDay(item.meetingDay)}
                              </span>
                            </td>
                            <td className="px-4 py-9 align-middle">
                              <p className="text-[13px] text-slate-300 font-medium leading-relaxed">{item.weeklyGoal}</p>
                            </td>
                            <td className="px-4 py-9 align-middle">
                              <p className={`text-[13px] leading-relaxed ${item.difficulty === 'Yo\'q' ? 'text-slate-600' : 'text-orange-400 font-bold'}`}>
                                {item.difficulty}
                              </p>
                            </td>
                            <td className="px-4 py-9 align-middle">
                              <p className="text-[13px] text-indigo-300 font-medium italic opacity-90 leading-relaxed">
                                {item.solution}
                              </p>
                            </td>
                            <td className="px-4 py-9 align-middle">
                                <span className={`inline-flex items-center px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(item.status)}`}>
                                  {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-9 text-center align-middle">
                               {item.attended ? (
                                 <div className="flex flex-col items-center gap-1 text-green-400">
                                   <UserCheck className="w-6 h-6" />
                                   <span className="text-[9px] font-black uppercase tracking-widest">Keldi</span>
                                 </div>
                               ) : (
                                 <div className="flex flex-col items-center gap-1 text-red-400/50">
                                   <UserX className="w-6 h-6" />
                                   <span className="text-[9px] font-black uppercase tracking-widest">Yo'q</span>
                                 </div>
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredPlans.length === 0 && (
                    <div className="py-32 text-center opacity-40">
                       <p className="text-slate-600 font-black uppercase text-sm tracking-[0.3em]">Hozircha monitoring ma'lumotlari yo'q</p>
                    </div>
                  )}
               </div>
            </div>

            {/* BLOCK 2: HIGHLIGHTS GALLERY */}
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
                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                      Vizual monitoring
                    </div>
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
                                 <div>
                                   <p className="text-[11px] font-black text-white uppercase tracking-widest">{highlight.uploadedBy}</p>
                                   <p className="text-[9px] font-bold text-purple-400 uppercase mt-1">Isbot #0{selectedWeek}</p>
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
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-10 right-10 p-6 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
              <X className="w-10 h-10" />
            </button>
            <img src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-[3rem] shadow-3xl border border-white/10" alt="Full view" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CuratorDetail;
