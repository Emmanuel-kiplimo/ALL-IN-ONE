
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
      description: "Join our teams on the ground providing direct aid to disaster-affected communities.",
      commitment: "2-12 months",
      requirements: "Medical training preferred, resilience required"
    },
    {
      icon: <Globe className="w-8 h-8 text-hope-blue" />,
      title: "Remote Support",
      description: "Help with translations, social media, grant writing, and administrative tasks.",
      commitment: "5-10 hours/week",
      requirements: "Computer access, specific skills vary"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Fundraiser",
      description: "Organize local events, awareness campaigns, and donation drives.",
      commitment: "Flexible",
      requirements: "Passion for the cause, community connections"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      title: "Professional Pro Bono",
      description: "Offer your professional skills - legal, medical, tech, marketing, finance.",
      commitment: "Project-based",
      requirements: "Professional expertise in relevant field"
    }
  ];

  const faqs = [
    {
      question: "Is volunteering with Hope Charity safe?",
      answer: "Safety is our top priority. All field volunteers receive comprehensive safety training, and we maintain strict security protocols in all locations."
    },
    {
      question: "Do I need previous humanitarian experience?",
      answer: "While experience is valuable, it's not required. We provide extensive training for all volunteers, and passion often matters more than experience."
    },
    {
      question: "How are volunteers supported in the field?",
      answer: "We provide accommodation, meals, transportation, insurance, and 24/7 support. Volunteers also receive mental health support before, during, and after assignments."
    },
    {
      question: "Can I choose where I volunteer?",
      answer: "We try to match volunteers with locations that fit their skills and preferences, though final placement depends on current needs and security conditions."
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

    try {
      const response = await fetch('https://hope-backend-0h72.onrender.com/api/volunteer', {
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-hope-blue to-hope-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-lato font-bold text-4xl md:text-5xl text-white mb-6">
            Join Our Mission
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Be part of something bigger. Help us restore hope to communities facing their darkest hours.
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue text-center mb-12">
            Ways to Make a Difference
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    {opportunity.icon}
                    <h3 className="font-lato font-bold text-2xl text-hope-blue">
                      {opportunity.title}
                    </h3>
                  </div>
                  <p className="text-hope-gray mb-4 leading-relaxed">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold text-hope-blue">Time Commitment:</span> {opportunity.commitment}</p>
                    <p><span className="font-semibold text-hope-blue">Requirements:</span> {opportunity.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue mb-6">
              Ready to Get Involved?
            </h2>
            <p className="text-hope-gray text-lg">
              Fill out this form and we'll be in touch within 48 hours to discuss opportunities that match your skills and interests.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-hope-blue mb-2">
                      First Name *
                    </label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" className="border-gray-300" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-hope-blue mb-2">
                      Last Name *
                    </label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" className="border-gray-300" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-hope-blue mb-2">
                    Email Address *
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" className="border-gray-300" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-hope-blue mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" className="border-gray-300" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-hope-blue mb-2">
                    Areas of Interest *
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {opportunities.map((opportunity) => (
                      <label key={opportunity.title} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name={opportunity.title}
                          checked={!!formData.interests[opportunity.title]}
                          onChange={handleCheckboxChange}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-hope-gray">{opportunity.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-hope-blue mb-2">
                    Relevant Experience & Skills
                  </label>
                  <Textarea 
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Tell us about your background, skills, and what motivates you to volunteer..."
                    className="border-gray-300 min-h-32"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-hope-blue mb-2">
                    Availability
                  </label>
                  <Textarea 
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="When are you available? Any constraints we should know about?"
                    className="border-gray-300"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-hope-red hover:bg-red-700 text-white font-semibold"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                </Button>

                {status === 'success' && (
                  <p className="text-sm text-green-600 text-center">
                    Thank you for your application! We'll be in touch soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-600 text-center">
                    Something went wrong. Please try again or contact us directly.
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
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-lato font-bold text-xl text-hope-blue mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-hope-gray leading-relaxed">
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
