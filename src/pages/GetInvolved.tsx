import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Globe, Users, Briefcase } from 'lucide-react';
import { useState, FormEvent } from 'react';

const GetInvolved = () => {
  const opportunities = [
    {
      icon: <Heart className="w-8 h-8 text-hope-red" />,
      title: "Field Volunteer",
      description: "Walk into active crisis zones, holding the hands of terrified children and distributing shelter in freezing rubble. Be the human face of hope when all else has collapsed.",
      commitment: "2-12 months",
      requirements: "Medical training preferred, mental resilience required"
    },
    {
      icon: <Globe className="w-8 h-8 text-hope-blue" />,
      title: "Remote Support",
      description: "Translate desperate distress calls, write grants that fund survival kits, and manage digital lifelines from the safety of your home. Your laptop can save lives.",
      commitment: "5-10 hours/week",
      requirements: "Computer access, specific skills vary"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Community Fundraiser",
      description: "Mobilize your neighbors to support starving families. Run local drives for thermal blankets, food packs, and medical kits, bridging your community to war-torn zones.",
      commitment: "Flexible",
      requirements: "Passion for the cause, community connections"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      title: "Professional Pro Bono",
      description: "Donate your clinical, legal, or technical expertise to secure safe passages, design emergency sanitation platforms, or treat trauma survivors.",
      commitment: "Project-based",
      requirements: "Professional expertise in relevant field"
    }
  ];

  const faqs = [
    {
      question: "Is volunteering in active crisis zones safe?",
      answer: "Safety is our absolute priority. All field volunteers receive comprehensive emergency training, tactical safety guides, and we operate under strict security coordination with local communities."
    },
    {
      question: "Do I need previous field experience?",
      answer: "While specialized skills are valuable, the willingness to comfort a grieving mother or hand out survival blankets requires nothing but empathy. We train you fully before deployment."
    },
    {
      question: "How are field volunteers supported on the ground?",
      answer: "We cover secure accommodation, meals, critical medical insurance, and 24/7 communications. We also provide professional mental health counseling before and after deployment."
    },
    {
      question: "Can I choose my relief mission placement?",
      answer: "We match volunteers with regions based on their technical skills (e.g., medical expertise in Mpox zones) and language capabilities, alongside live safety assessments."
    }
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: {} as Record<string, boolean>,
    experience: '',
    availability: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: { ...prev.interests, [name]: checked },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const submissionData = {
      ...formData,
      interests: Object.keys(formData.interests).filter(key => formData.interests[key]),
    };

    const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://hope-backend-0h72.onrender.com';

    try {
      const response = await fetch(`${BACKEND_URL}/api/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', interests: {}, experience: '', availability: '' });
    } catch (error) {
      console.error('Failed to submit application:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-hope-blue text-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/40 to-[#111827]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="font-playfair font-black text-4xl md:text-5xl lg:text-6xl text-white">
            Stand in the Gap. Save Lives on the Frontlines.
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Whether working in sub-zero bombed shelters in Ukraine, distributing therapeutic nutrition in starving Sudanese villages, or offering remote logistics, your compassion is the difference between survival and despair.
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-playfair font-black text-3xl md:text-4xl text-hope-blue">
              Ways to Make a Difference
            </h2>
            <p className="text-hope-gray text-md font-light max-w-xl mx-auto">
              Every specialized hand and comforting voice helps rebuild shattered lives. Find your place in our relief network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover-lift border border-slate-100 shadow-lg bg-[#faf7f2]/30 rounded-xl">
                <CardContent className="p-8 space-y-4 text-left">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#faf7f2] p-3 rounded-full border border-hope-gold/15">
                      {opportunity.icon}
                    </div>
                    <h3 className="font-playfair font-bold text-xl text-hope-blue">
                      {opportunity.title}
                    </h3>
                  </div>
                  <p className="text-hope-gray text-sm font-light leading-relaxed">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2 text-xs pt-3 border-t border-slate-100 font-medium text-hope-gray">
                    <p><span className="font-bold text-hope-blue">Time Commitment:</span> {opportunity.commitment}</p>
                    <p><span className="font-bold text-hope-blue">Requirements:</span> {opportunity.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white border-t border-b border-hope-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-playfair font-black text-3xl md:text-4xl text-hope-blue">
              Begin Your Application
            </h2>
            <p className="text-hope-gray text-sm font-light max-w-lg mx-auto">
              The need is urgent. Provide your background details below, and our deployment coordinators will review your file within 48 hours.
            </p>
          </div>

          <Card className="border border-hope-gold/15 shadow-2xl rounded-2xl overflow-hidden bg-[#faf7f2]/20">
            <CardContent className="p-8 sm:p-12 text-left">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                      First Name *
                    </label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Jane" className="border-slate-300 h-11 focus-visible:ring-hope-red" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                      Last Name *
                    </label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className="border-slate-300 h-11 focus-visible:ring-hope-red" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                    Email Address *
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.name@example.com" className="border-slate-300 h-11 focus-visible:ring-hope-red" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" className="border-slate-300 h-11 focus-visible:ring-hope-red" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                    Areas of Interest *
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {opportunities.map((opportunity) => (
                      <label key={opportunity.title} className="flex items-center space-x-2.5 cursor-pointer bg-white px-4 py-3 rounded-lg border border-slate-200 hover:bg-[#faf7f2]/50 transition-colors shadow-sm">
                        <input
                          type="checkbox"
                          name={opportunity.title}
                          checked={!!formData.interests[opportunity.title]}
                          onChange={handleCheckboxChange}
                          className="rounded border-slate-300 text-hope-red focus:ring-hope-red w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-hope-blue">{opportunity.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                    Relevant Experience & Humanitarian Skills
                  </label>
                  <Textarea 
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Describe any professional skills, languages, medical training, or previous field missions that motivate you to volunteer..."
                    className="border-slate-300 min-h-32 focus-visible:ring-hope-red"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-xs font-bold uppercase tracking-wider text-hope-blue mb-2">
                    Availability & Scheduling Details
                  </label>
                  <Textarea 
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="When could you deploy? Any physical or travel limitations we should know about?"
                    className="border-slate-300 focus-visible:ring-hope-red"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-hope-red hover:bg-red-800 text-white font-bold py-6 rounded-full transition-all duration-300 shadow-md disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider mt-4"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Submitting Application...' : 'Submit Official Volunteer Application'}
                </Button>

                {status === 'success' && (
                  <p className="text-sm font-semibold text-emerald-600 text-center animate-pulse">
                    Thank you! Your volunteer profile has been securely logged. A coordinator will email you shortly.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-semibold text-red-600 text-center">
                    Something went wrong. Please double-check details or try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-playfair font-black text-3xl md:text-4xl text-hope-blue">
              Deployment FAQs
            </h2>
            <p className="text-hope-gray text-md font-light max-w-xl mx-auto">
              Answers to common questions regarding security, logistical support, and medical placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-slate-100 shadow bg-[#faf7f2]/30 rounded-xl flex flex-col justify-between">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-playfair font-bold text-lg text-hope-blue leading-tight">
                    {faq.question}
                  </h3>
                  <p className="text-hope-gray text-xs font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetInvolved;
