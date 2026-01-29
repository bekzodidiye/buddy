
import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { Github, Twitter, Sparkle, UserCheck, Search, Users } from 'lucide-react';
import CuratorDetail from './CuratorDetail';
import { TeamMember, StudentProgress, WeeklyHighlight } from '../types';
import { UserData } from '../App';

interface TeamProps {
  user: UserData | null;
  onAssignCurator: (id: string) => void;
  customMembers?: TeamMember[];
  studentsData?: StudentProgress[];
  highlights?: WeeklyHighlight[];
}

const Team: React.FC<TeamProps> = ({ user, onAssignCurator, customMembers, studentsData = [], highlights = [] }) => {
  const [selectedCurator, setSelectedCurator] = useState<TeamMember | null>(null);

  const members = customMembers || TEAM_MEMBERS;

  const displayedMembers = React.useMemo(() => {
    if (user?.role === 'student' && user.assignedCuratorId) {
      return members.filter(m => m.id === user.assignedCuratorId);
    }
    return members;
  }, [user, members]);

  const isStudentChoosing = user?.role === 'student' && !user.assignedCuratorId;
  const isStudentWithCurator = user?.role === 'student' && user.assignedCuratorId;

  return (
    <section id="team" className="py-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-600/5 blur-[150px] -z-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4">
            <Sparkle className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black text-blue-400 uppercase tracking-widest">
              {isStudentWithCurator ? "Sizning Tanlangan Buddyingiz" : "O'z ustozingni top"}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
            {isStudentWithCurator ? "Sizning " : "Barcha"}
            <span className="gradient-text">Kuratorlar</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {isStudentWithCurator 
              ? "Ushbu kurator sizning haftalik o'sishingiz va muammolaringizni hal qilishda yordam beradi."
              : "Bizning jamoa a'zolari har haftalik sessiyalarni boshqarishadi. O'zingizga mos yo'nalishni tanlang."}
          </p>
        </div>

        {isStudentChoosing && (
          <div className="mb-12 p-10 glass border-dashed border-2 border-indigo-500/30 rounded-[40px] text-center animate-in fade-in zoom-in duration-500">
             <Users className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
             <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Kurator Tanlash Rejimi Faol</h4>
             <p className="text-slate-500 text-sm font-medium">Sizga mos keladigan mutaxassisni tanlang. Tanlovdan so'ng u sizga biriktiriladi.</p>
          </div>
        )}

        <div className={`grid grid-cols-1 ${displayedMembers.length === 1 ? 'max-w-md mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-12`}>
          {displayedMembers.map((member) => (
            <div 
              key={member.id} 
              className="group relative"
            >
              <div className="absolute inset-0 bg-indigo-600/20 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-[#121214] border border-white/5 rounded-[40px] p-8 transition-all duration-500 group-hover:border-indigo-500/50 group-hover:-translate-y-4 shadow-2xl overflow-hidden">
                <div onClick={() => setSelectedCurator(member)} className="cursor-pointer aspect-[4/5] rounded-[32px] overflow-hidden mb-8 relative border border-white/5">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-black flex items-center space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Search className="w-5 h-5" />
                      <span>Batafsil ko'rish</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">{member.name}</h3>
                    <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] mt-1">{member.role}</p>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                    {member.bio}
                  </p>
                  
                  {isStudentChoosing ? (
                    <button 
                      onClick={() => onAssignCurator(member.id)}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 active:scale-95"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>Shu kuratorni tanlash</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-6 flex justify-between items-center border-t border-white/5">
                    <div className="flex space-x-3">
                      <span className="p-2 bg-white/5 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors border border-white/5 cursor-pointer"><Github className="w-4 h-4" /></span>
                      <span className="p-2 bg-white/5 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors border border-white/5 cursor-pointer"><Twitter className="w-4 h-4" /></span>
                    </div>
                    {isStudentWithCurator && (
                       <div className="text-[9px] font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Sizning Buddyingiz</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCurator && (
        <CuratorDetail 
          curator={selectedCurator} 
          onClose={() => setSelectedCurator(null)} 
          studentsData={studentsData}
          highlights={highlights}
        />
      )}
    </section>
  );
};

export default Team;
