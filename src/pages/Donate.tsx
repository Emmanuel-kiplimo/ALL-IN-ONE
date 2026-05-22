import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, Shield, CreditCard, Smartphone, DollarSign, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisaPaymentForm from '@/components/VisaPaymentForm';
import { causesData } from '@/data/causes';

const mockContributions = [
  { cardholderName: "Sarah K.", amount: 150, causeTitle: "Israel-Iran War - Humanitarian Crisis Relief", createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
  { cardholderName: "David L.", amount: 50, causeTitle: "General Emergency Fund", createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
  { cardholderName: "Elena R.", amount: 250, causeTitle: "Gaza, Palestine - Emergency Shelter", createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString() },
  { cardholderName: "Marcus P.", amount: 100, causeTitle: "Afghanistan Winter Emergency", createdAt: new Date(Date.now() - 58 * 60 * 1000).toISOString() }
];

const Donate = () => {
  const [searchParams] = useSearchParams();
  const urlAmount = searchParams.get('amount');
  const urlType = searchParams.get('type');

  // Inline payments via VisaPaymentForm

  // Donation State
  const [donateType, setDonateType] = useState<'one-time' | 'monthly'>(urlType === 'monthly' ? 'monthly' : 'one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(urlAmount ? parseFloat(urlAmount) : 100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'binance'>('card');
  const [recentDonations, setRecentDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      // Setup dynamic backend URL selection
      const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://hope-backend-0h72.onrender.com';
      try {
        const res = await fetch(`${BACKEND_URL}/api/donations`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setRecentDonations(data);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch contributions:', err);
      }
    };
    fetchDonations();
    const interval = setInterval(fetchDonations, 12000);
    return () => clearInterval(interval);
  }, []);

  const causes = causesData;

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const getImpactDescription = (amount: number) => {
    if (amount <= 25) return `Provides 2 weeks of emergency meals and clean water for a child in crisis.`;
    if (amount <= 50) return `Feeds a family of four for a month and provides basic sanitation supplies.`;
    if (amount <= 100) return `Provides heavy thermal blankets, ground mats, and dry food rations for a family.`;
    if (amount <= 250) return `Builds a complete, insulated winterized tent and provides baby formula kits.`;
    if (amount <= 500) return `Supplies trauma medicines and life-saving clinic supplies to a disaster field camp.`;
    return `Funds an entire clean water filtration system, supporting a village of 150 people.`;
  };

  const getLocation = (id: string) => {
    switch (id) {
      case 'israel-iran-war':
        return 'Middle East';
      case 'gaza-palestine':
        return 'Gaza, Palestine';
      case 'iran-earthquake':
        return 'Western Iran';
      case 'south-sudan-flood':
        return 'South Sudan';
      case 'conflict-relief':
        return 'Palestine & Israel';
      case 'afghanistan-winter':
        return 'Bamyan, Afghanistan';
      case 'sudan-famine':
        return 'Darfur, Sudan';
      case 'ukraine-winter':
        return 'Kyiv, Ukraine';
      case 'drc-health':
        return 'Goma, DR Congo';
      default:
        return 'Global Relief';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-hope-blue text-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/40 to-[#111827]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="font-playfair font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Be Their Lifeline. Stand Between Them and the Cold.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Every second you wait, another displaced family faces freezing elements, starvation, and fear. Your secure gift is a warm meal, clean medical aid, and a reminder that they are not alone in the dark.
          </p>
        </div>
      </section>

      {/* Live Contributions Ticker */}
      <div className="bg-[#1e293b] border-y border-white/10 py-3.5 relative overflow-hidden z-20 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-hope-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md shrink-0 z-30">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span>Live Contributions Feed</span>
          </div>
          <div className="flex-1 overflow-hidden relative h-5">
            <div className="animate-marquee whitespace-nowrap absolute left-0 flex items-center space-x-12">
              {(recentDonations.length > 0 ? recentDonations : mockContributions).map((don, idx) => {
                const timeStr = don.createdAt ? new Date(don.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                }) : "Just now";
                return (
                  <span key={idx} className="inline-flex items-center space-x-2 text-xs md:text-sm text-slate-300 font-medium">
                    <span className="text-hope-gold font-bold">{don.cardholderName || 'Anonymous'}</span>
                    <span className="text-slate-400">generously donated</span>
                    <span className="text-emerald-400 font-bold font-mono">${don.amount}</span>
                    <span className="text-slate-400">to</span>
                    <span className="text-slate-200 italic font-semibold">"{don.causeTitle}"</span>
                    <span className="text-slate-500 text-[10px]">({timeStr})</span>
                    <span className="text-hope-gold font-bold ml-6 shrink-0">•</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Donation Container */}
      <section className="py-20 relative z-10 -mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-hope-gold/15 bg-white shadow-2xl rounded-2xl overflow-hidden">
            {/* Header banner */}
            <div className="bg-hope-red text-white py-3 px-6 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>Secure SSL Encrypted Donation Hub</span>
            </div>

            <CardContent className="p-8 sm:p-12 space-y-8">
              
              {/* Step 1: Donation Type */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue">
                  1. Choose Frequency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setDonateType('one-time')}
                    className={`h-16 border-2 font-bold text-sm rounded-xl transition-all duration-300 ${
                      donateType === 'one-time' 
                        ? 'border-hope-red bg-hope-red/5 text-hope-red shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    One-Time Gift
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setDonateType('monthly')}
                    className={`h-16 border-2 font-bold text-sm rounded-xl transition-all duration-300 ${
                      donateType === 'monthly' 
                        ? 'border-hope-red bg-hope-red/5 text-hope-red shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    Monthly Support ❤️
                  </Button>
                </div>
              </div>

              {/* Step 2: Amount Selection */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue">
                  2. Gift Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {donationAmounts.map((amount) => (
                    <Button 
                      key={amount}
                      type="button"
                      variant="outline" 
                      onClick={() => handleAmountClick(amount)}
                      className={`h-12 text-sm font-bold rounded-lg border transition-all duration-200 ${
                        selectedAmount === amount && !customAmount
                          ? 'border-hope-blue bg-hope-blue text-white shadow-md'
                          : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                      }`}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div className="relative max-w-sm mx-auto">
                  <DollarSign className="w-4 h-4 text-hope-gray absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input 
                    type="number"
                    placeholder="Or enter custom amount ($)" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="pl-8 text-center text-md font-semibold border-slate-300 focus-visible:ring-hope-red" 
                  />
                </div>

                {/* Dynamic Impact Statement */}
                {currentAmount > 0 && (
                  <div className="bg-[#faf7f2] border border-hope-gold/25 p-4 rounded-xl text-center">
                    <p className="text-sm font-medium text-hope-blue leading-relaxed">
                      Your contribution of <span className="font-bold text-hope-red">${currentAmount.toLocaleString()}</span>:
                      <span className="block mt-1 text-xs text-hope-gray font-normal italic">
                        "{getImpactDescription(currentAmount)}"
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3: Payment Method selection */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue">
                  3. Select Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setPaymentMethod('card')}
                    className={`h-16 flex flex-col items-center justify-center space-y-1 rounded-xl border transition-all duration-300 ${
                      paymentMethod === 'card' 
                        ? 'border-hope-gold bg-hope-gold/5 text-hope-blue font-bold shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px]">Visa / Card</span>
                  </Button>

                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setPaymentMethod('crypto')}
                    className={`h-16 flex flex-col items-center justify-center space-y-1 rounded-xl border transition-all duration-300 ${
                      paymentMethod === 'crypto' 
                        ? 'border-hope-gold bg-hope-gold/5 text-hope-blue font-bold shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg font-bold text-orange-500">₿</span>
                    <span className="text-[10px]">Cryptocurrency</span>
                  </Button>

                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setPaymentMethod('binance')}
                    className={`h-16 flex flex-col items-center justify-center space-y-1 rounded-xl border transition-all duration-300 ${
                      paymentMethod === 'binance' 
                        ? 'border-hope-gold bg-hope-gold/5 text-hope-blue font-bold shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-yellow-600" />
                    <span className="text-[10px]">Binance Pay</span>
                  </Button>
                </div>
              </div>

              {/* Step 4: Checkout details render */}
              <div className="pt-6 border-t border-slate-100">
                <VisaPaymentForm 
                  amount={currentAmount} 
                  causeTitle="General Emergency Fund" 
                  type={donateType} 
                  paymentMethod={paymentMethod} 
                />
              </div>

              {/* Footer Trust Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-slate-100 text-xs text-hope-gray">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-hope-gold" />
                  <span>SSL SECURE PAYMENTS</span>
                </div>
                <span>•</span>
                <span>501(c)(3) TAX DEDUCTIBLE</span>
                <span>•</span>
                <span>85% OF FUNDS DIRECTED TO AID</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Specific Causes */}
      <section className="py-24 bg-white border-t border-hope-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-playfair font-black text-3xl md:text-4xl text-hope-blue">
              Support Specific Appeals
            </h2>
            <p className="text-hope-gray text-md font-light max-w-xl mx-auto">
              If you wish for your donation to fund a specific family story directly, select one of our ongoing emergency appeals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => {
              const percentage = (cause.raised / cause.target) * 100;
              const locationName = getLocation(cause.id);
              
              return (
                <Card key={cause.id} className="hover-lift overflow-hidden border border-slate-100 shadow-lg flex flex-col justify-between rounded-xl bg-[#faf7f2]/30">
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={cause.image} 
                      alt={cause.title}
                      className="w-full h-full object-cover"
                    />
                    {cause.urgent && (
                      <div className="absolute top-3 left-3 bg-hope-red text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Urgent
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-hope-gold font-bold uppercase tracking-wider">{locationName}</span>
                      <h3 className="font-playfair font-bold text-md text-hope-blue line-clamp-2 leading-tight">
                        {cause.title}
                      </h3>
                      <p className="text-hope-gray text-xs font-light line-clamp-3 leading-relaxed">
                        {cause.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-hope-blue">
                          <span>${cause.raised.toLocaleString()} raised</span>
                          <span className="text-hope-gray">of ${cause.target.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                      
                      <Link to={`/donate/${cause.id}`} className="block">
                        <Button className="w-full bg-hope-blue hover:bg-hope-red text-white text-xs font-bold py-2 rounded-lg">
                          Donate to Cause
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Scale */}
      <section className="py-20 bg-hope-blue text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-playfair font-black text-3xl md:text-4xl text-white">
              Every Dollar Counts
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto font-light text-sm">
              We monitor allocation closely. Here is a guide showing exactly how your funds rebuild families on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center space-y-3 hover:bg-white/10 transition-colors">
              <div className="text-3xl">🍲</div>
              <h3 className="font-playfair font-bold text-xl text-hope-gold">$25</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Feeds two orphan children with warm, nutritious meals for a full fortnight.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center space-y-3 hover:bg-white/10 transition-colors">
              <div className="text-3xl">💊</div>
              <h3 className="font-playfair font-bold text-xl text-hope-gold">$50</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Provides emergency malaria medicines, clean water tabs, and first-aid kits for families.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center space-y-3 hover:bg-white/10 transition-colors">
              <div className="text-3xl">🧥</div>
              <h3 className="font-playfair font-bold text-xl text-hope-gold">$100</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Supplies heavy winter coats, thermal blankets, and firewood fuel to survive sub-zero mountain winters.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center space-y-3 hover:bg-white/10 transition-colors">
              <div className="text-3xl">⛺</div>
              <h3 className="font-playfair font-bold text-xl text-hope-gold">$250</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Constructs an insulated weatherproof winter tent shelter with ground pads for a displaced family.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
