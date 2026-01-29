
import React from 'react';
import Hero from './Hero';
import { Page } from '../App';
import { Shield, Users, Heart, Star, Sparkles, Zap, MessageSquare, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onAuthNavigate }) => {
  return (
    <div className="bg-[#0a0a0c]">
      <Hero />
      
      {/* About Buddy Section - Deep Information */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-xl mb-6 border border-indigo-500/20">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-black text-indigo-300 uppercase tracking-widest">Biz kimmiz?</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
                Buddy — Bu shunchaki jamoa emas, <br />
                <span className="gradient-text">bu Oila.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Buddy Team 2023-yilda o'zaro ishonch va do'stlik poydevorida tashkil topgan. Bizning asosiy logotipimizdagi mushuk va kuchukcha tasviri tasodifiy emas — u qarama-qarshi xarakterlar ham bitta maqsad yo'lida do'st bo'la olishini anglatadi.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 glass rounded-3xl border border-white/5">
                   <h4 className="text-2xl font-black text-white mb-2">50+</h4>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Muvaffaqiyatli Bitiruvchilar</p>
                </div>
                <div className="p-6 glass rounded-3xl border border-white/5">
                   <h4 className="text-2xl font-black text-white mb-2">12</h4>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Barcha Kuratorlar</p>
                </div>
              </div>
              <button 
                onClick={() => onAuthNavigate('signup')}
                className="flex items-center space-x-3 text-indigo-400 font-black hover:text-indigo-300 transition-colors group"
              >
                <span>Hoziroq bizga qo'shiling</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square glass rounded-[60px] border border-white/10 overflow-hidden p-4 relative group">
                 <div className="absolute inset-0 bg-indigo-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover rounded-[50px] grayscale hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                       <Heart className="w-10 h-10 text-pink-500 fill-current" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: "Bizning Missiya",
                desc: "Har bir insonga o'z potensialini topishda do'stona ko'mak berish.",
                icon: <Zap className="w-6 h-6 text-yellow-400" />
              },
              {
                title: "Do'stlik Ustuvor",
                desc: "Bizda usto-shogird emas, do'st-buddy munosabatlari rivojlangan.",
                icon: <Heart className="w-6 h-6 text-pink-400" />
              },
              {
                title: "Ochiq Muloqot",
                desc: "Har bir muammo birgalikda, AI va jamoaviy tahlil bilan hal etiladi.",
                icon: <MessageSquare className="w-6 h-6 text-blue-400" />
              }
            ].map((card, i) => (
              <div key={i} className="p-10 glass rounded-[40px] border border-white/5 hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center p-16 glass rounded-[60px] border border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 -z-10"></div>
             <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-6" />
             <h2 className="text-4xl font-black text-white mb-6">Tayyormisiz?</h2>
             <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">
               Bizning jamoa va kuratorlar ish rejasi bilan tanishish uchun bo'limlarga o'ting.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => onNavigate('team')}
                  className="px-10 py-4 bg-white text-[#0a0a0c] font-black rounded-2xl hover:scale-105 transition-transform"
                >
                  Kuratorlarni Ko'rish
                </button>
                <button 
                  onClick={() => onAuthNavigate('signup')}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-transform"
                >
                  O'quvchi bo'lish
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
