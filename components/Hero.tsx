
import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-[#0a0a0c]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-black text-purple-300 uppercase tracking-widest">Buddy Team • Birgalikda Kuchlimiz</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-black leading-[0.9] mb-8 text-white tracking-tighter">
              Buddy <br />
              <span className="gradient-text">Team</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
               Bizning yangi logotipimizdagi mushuk va kuchukcha kabi biz ham bir-birimizga tayanchmiz. Kuratorlarimiz sizning o'sishingiz uchun har hafta xizmatda!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#team" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-[2rem] flex items-center justify-center transition-all group shadow-2xl shadow-purple-600/40 hover:scale-105 active:scale-95"
              >
                Kuratorlarni ko'rish
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          <div className="relative">
             <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-[80px] blur-[60px]"></div>
                
                <div className="relative w-full max-w-[500px] glass rounded-[60px] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8">
                   <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8">
                      <div className="relative w-full bg-[#1a1a1e] rounded-[40px] p-2 border border-white/5 shadow-inner">
                         <img 
                            src="image.png" 
                            alt="Buddy Team Art" 
                            className="w-full h-auto rounded-[32px] shadow-2xl block mx-auto"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://i.ibb.co/Lzr2KrkS/buddy-team-art.jpg';
                            }}
                         />
                      </div>
                      
                      <div className="text-center">
                         <p className="text-2xl sm:text-4xl font-black tracking-[0.2em] uppercase text-white mb-2">БАДДИ-КОМАНДЫ</p>
                         <div className="flex justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Zap key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-bounce duration-[3s]"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-bounce duration-[4s]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
