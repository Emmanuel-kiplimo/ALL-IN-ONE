import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, CreditCard, Smartphone, ArrowLeft, Heart, Wallet } from 'lucide-react';
import VisaPaymentForm from '@/components/VisaPaymentForm';
import { causesData } from '@/data/causes';

const DonateProject = () => {
  const { projectId } = useParams();

  // State Management
  const [donateType, setDonateType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'binance'>('card');

  // Inline payments via VisaPaymentForm

  const project = causesData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center space-y-4">
        <Heart className="w-12 h-12 text-hope-red fill-hope-red animate-bounce" />
        <h2 className="font-playfair font-bold text-2xl text-hope-blue">Appeal Not Found</h2>
        <p className="text-hope-gray text-sm">The emergency appeal you are looking for does not exist or has closed.</p>
        <Link to="/donate">
          <Button className="bg-hope-blue hover:bg-hope-red text-white font-bold rounded-full px-6">
            View Active Appeals
          </Button>
        </Link>
      </div>
    );
  }

  const percentage = (project.raised / project.target) * 100;
  const donationAmounts = [25, 50, 100, 250];
  const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
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

  const locationName = getLocation(project.id);

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/donate" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-hope-blue hover:text-hope-red transition-colors gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Emergency Appeals
        </Link>
      </div>

      {/* Project Hero / Overview */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Media */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-hope-gold/10 h-[300px] sm:h-[450px]">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
              {project.urgent && (
                <div className="absolute top-6 left-6 bg-hope-red text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  🚨 URGENT APPEAL
                </div>
              )}
              <div className="absolute bottom-6 left-6 text-white text-sm font-semibold tracking-wide bg-hope-blue/60 backdrop-blur-sm px-3 py-1.5 rounded">
                📍 Location: {locationName}
              </div>
            </div>

            {/* Right Column: Funding Status */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-hope-red flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-hope-red rounded-full animate-ping"></span>
                Urgent Crisis Appeal
              </span>
              <h1 className="font-playfair font-black text-3xl sm:text-4xl lg:text-5xl text-hope-blue leading-tight">
                {project.title}
              </h1>
              
              <p className="text-hope-gray text-md font-light leading-relaxed">
                {project.description}
              </p>

              {/* Progress Card */}
              <div className="bg-white border border-hope-gold/10 p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-hope-gray uppercase block mb-1">Total Contributed</span>
                    <span className="font-playfair font-bold text-3xl text-hope-blue">
                      ${project.raised.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-hope-gray uppercase block mb-1">Target Need</span>
                    <span className="font-bold text-hope-gray text-md">
                      ${project.target.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-hope-gold via-hope-red to-hope-crimson rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] text-hope-gray font-medium">
                  <span className="text-hope-red font-bold">{percentage.toFixed(1)}% Funded</span>
                  <span>{Math.ceil((project.target - project.raised) / 50)} more donors needed to reach target</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Narrative & Checkout Divider */}
      <section className="py-16 bg-white border-t border-b border-hope-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          <h2 className="font-playfair font-black text-2xl sm:text-3xl text-hope-blue border-b border-hope-gold/25 pb-3">
            The Ground Reality
          </h2>
          <p className="text-hope-gray text-md font-light leading-relaxed space-y-4">
            {project.fullStory}
          </p>
        </div>
      </section>

      {/* Donation Form Segment */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-hope-gold/15 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-hope-blue text-white py-3 px-6 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 text-hope-red fill-hope-red animate-pulse" />
              <span>Send Mercy Directly to This Cause</span>
            </div>

            <CardContent className="p-8 sm:p-12 space-y-8">
              
              {/* Frequency */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue text-left">
                  1. Frequency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setDonateType('one-time')}
                    className={`h-14 font-bold text-xs rounded-xl transition-all duration-300 ${
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
                    className={`h-14 font-bold text-xs rounded-xl transition-all duration-300 ${
                      donateType === 'monthly' 
                        ? 'border-hope-red bg-hope-red/5 text-hope-red shadow-sm' 
                        : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                    }`}
                  >
                    Monthly Support ❤️
                  </Button>
                </div>
              </div>

              {/* Amount Grid */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue text-left">
                  2. Gift Amount & Target Impact
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {donationAmounts.map((amount) => (
                    <Button 
                      key={amount}
                      type="button"
                      variant="outline" 
                      onClick={() => handleAmountClick(amount)}
                      className={`h-20 flex flex-col items-center justify-center space-y-1.5 rounded-xl border transition-all duration-200 ${
                        selectedAmount === amount && !customAmount
                          ? 'border-hope-blue bg-hope-blue text-white shadow-md'
                          : 'border-slate-200 text-hope-gray hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg font-bold">${amount}</span>
                      <span className="text-[9px] text-center leading-tight line-clamp-2 px-1 max-w-[130px] opacity-80">
                        {project.impact[amount]}
                      </span>
                    </Button>
                  ))}
                </div>
                <div className="relative max-w-sm mx-auto">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hope-gray font-semibold">$</span>
                  <Input 
                    type="number"
                    placeholder="Enter custom amount" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="pl-8 text-center font-semibold border-slate-300 focus-visible:ring-hope-red" 
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue text-left">
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

              {/* Checkout details */}
              <div className="pt-6 border-t border-slate-100">
                <VisaPaymentForm 
                  amount={currentAmount} 
                  causeTitle={project.title} 
                  type={donateType} 
                  paymentMethod={paymentMethod} 
                />
              </div>

              {/* Trust Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-slate-100 text-xs text-hope-gray">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-hope-gold" />
                  <span>SSL ENCRYPTED</span>
                </div>
                <span>•</span>
                <span>100% OF DESIGNATED FUNDS GO TO THIS CAUSE</span>
                <span>•</span>
                <span>TAX-DEDUCTIBLE DONATION</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonateProject;
