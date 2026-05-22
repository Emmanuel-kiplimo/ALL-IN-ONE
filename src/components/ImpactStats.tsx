import { Heart, Globe, Users, ShieldAlert } from 'lucide-react';

const ImpactStats = () => {
  const stats = [
    { 
      number: "13", 
      label: "Years on the Ground", 
      suffix: "+", 
      icon: <Globe className="w-5 h-5 text-hope-gold" /> 
    },
    { 
      number: "4.8", 
      label: "Million Dollars Contributed", 
      suffix: "M", 
      icon: <Heart className="w-5 h-5 text-hope-red fill-hope-red" /> 
    },
    { 
      number: "52", 
      label: "Crisis Zones Reached", 
      suffix: "", 
      icon: <ShieldAlert className="w-5 h-5 text-hope-gold" /> 
    },
    { 
      number: "120", 
      label: "Donors Worldwide", 
      suffix: "K+", 
      icon: <Users className="w-5 h-5 text-hope-gold" /> 
    },
  ];

  return (
    <section className="bg-hope-blue text-white py-20 relative overflow-hidden border-t border-b border-hope-gold/15">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-3">
          <h2 className="font-playfair font-black text-3xl md:text-4xl lg:text-5xl text-white">
            Our Global Stewardship
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-sm">
            We hold ourselves accountable to the highest standards of humanitarian aid. Every figure represents families comforted and shelter rebuilt.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between text-center hover:bg-white/10 transition-all duration-300 hover:border-hope-gold/30 hover:scale-[1.03]"
            >
              <div className="mb-4 bg-white/5 p-2.5 rounded-full border border-white/5">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-outfit tracking-tight">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-14 pt-8 border-t border-white/5">
          <p className="text-slate-400 text-xs font-light max-w-md mx-auto leading-relaxed">
            All transaction portals utilize modern Visa card tokenization standards. We support Credit Cards, Visa, and digital currencies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
