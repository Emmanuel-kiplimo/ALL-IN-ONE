import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [donateType, setDonateType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleQuickDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    navigate(`/donate?amount=${amount}&type=${donateType}`);
  };

  const donationAmounts = [25, 50, 100, 250];

  const getImpactText = (amount: number) => {
    switch(amount) {
      case 25: return "Keeps a starving child alive with vital nutrition paste for two full weeks";
      case 50: return "Protects five innocent families from deadly cholera by supplying clean water filters";
      case 100: return "Saves a freezing mother and baby by providing thermal blankets and emergency shelter";
      case 250: return "Restores hope to an entire war-torn community with a local clean water well";
      default: return "Feeds, shelters, and heals children trapped in active conflict zones";
    }
  };

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Emotional Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Dark Overlay for contrast and readability */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 text-white text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-hope-red/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>Emergency Winter Alert</span>
            </div>
            
            <h1 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-shadow">
              Will you leave them in the dark, or will you be their light?
            </h1>
            
            <p className="text-lg sm:text-xl font-light text-slate-200 leading-relaxed max-w-2xl text-shadow">
              Right now, innocent children are sleeping on freezing concrete, shivering through sub-zero winter nights, and starving in the shadows of conflict. 
              We are on the frontlines delivering life-saving warmth, clean water, and medicine. Your compassion is their shield. Please, don't let them suffer alone.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/blog')}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/60 font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Read Stories of Hope
              </Button>
            </div>
          </div>
          
          {/* Right Column: Quick Donation Box */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto animate-scale-in">
            <div className="glass-panel-dark text-white rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-hope-red/10 rounded-full blur-2xl"></div>
              
              <h2 className="font-playfair font-bold text-2xl text-hope-gold mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-hope-red fill-hope-red animate-pulse" />
                Save a Life Today
              </h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Your secure donation goes directly to emergency field programs. Change a life with Visa.
              </p>
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-full border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => setDonateType('one-time')}
                  className={`py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    donateType === 'one-time' ? 'bg-hope-red text-white shadow-md' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  One-Time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setDonateType('monthly')}
                  className={`py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    donateType === 'monthly' ? 'bg-hope-red text-white shadow-md' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly Hope ❤️
                </button>
              </div>

              {/* Amount Tiers */}
              <div className="grid grid-cols-4 gap-2.5 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`h-11 rounded-lg text-sm font-bold border transition-all duration-300 ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-hope-gold text-hope-blue border-hope-gold shadow-md scale-105'
                        : 'border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative mb-5">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="w-full h-11 bg-white/5 border border-white/20 rounded-lg pl-8 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-hope-gold focus:ring-1 focus:ring-hope-gold transition-all duration-300"
                />
              </div>

              {/* Dynamic Impact Display */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3.5 mb-6 min-h-12 flex items-center justify-center text-center">
                <p className="text-xs font-medium text-hope-gold leading-relaxed italic animate-fade-in">
                  "{getImpactText(customAmount ? parseFloat(customAmount) : selectedAmount)}"
                </p>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleQuickDonate}
                className="w-full bg-hope-red hover:bg-red-800 text-white font-bold text-md py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-hope-red/20 uppercase tracking-wider"
              >
                Donate Now via Visa
              </Button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-hope-gold" />
                <span>100% Secure • Tax-Deductible</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer animate-bounce hidden md:block">
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
