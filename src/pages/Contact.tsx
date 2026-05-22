
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState, FormEvent } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, inquiryType: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://hope-backend-0h72.onrender.com';
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', inquiryType: '', message: '' });
      // Find all radio buttons and uncheck them
      document.querySelectorAll<HTMLInputElement>('input[name="inquiry-type"]').forEach(radio => radio.checked = false);
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-outfit text-hope-blue selection:bg-hope-red/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#030712] text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b1e2f]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hope-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-hope-gold font-medium tracking-widest text-xs uppercase block">Get In Touch</span>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl text-white tracking-tight">
            Connect With <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#faf7f2] to-hope-gold">Our Team</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Every connection is the start of a new chapter in survival. Whether seeking emergency aid, exploring partnerships, or asking questions, we are standing by to listen.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[#8b1e2f] font-semibold tracking-wider text-sm uppercase">Availability</span>
                <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827] leading-tight">
                  Reach Our Response Centers
                </h2>
                <p className="text-[#4b5563] text-lg font-light leading-relaxed">
                  We maintain active hubs around the world. For general queries, we will reach out within 24 hours. For critical emergencies, our crisis hotline is open day and night.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div className="bg-[#8b1e2f]/10 p-4 rounded-xl text-[#8b1e2f] group-hover:bg-[#8b1e2f] group-hover:text-white transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-[#111827] mb-1">Direct Lines</h3>
                    <p className="text-hope-gray font-light">General Operations: +1 (555) 123-4567</p>
                    <p className="text-[#8b1e2f] font-semibold font-outfit mt-1">24/7 Crisis Response: +1 (555) 999-HELP</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="bg-[#8b1e2f]/10 p-4 rounded-xl text-[#8b1e2f] group-hover:bg-[#8b1e2f] group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-[#111827] mb-1">Electronic Support</h3>
                    <p className="text-hope-gray font-light">Inquiries: info@hopecharity.org</p>
                    <p className="text-hope-gray font-light">Alliances: partnerships@hopecharity.org</p>
                    <p className="text-[#8b1e2f] font-light">Press: media@hopecharity.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="bg-[#8b1e2f]/10 p-4 rounded-xl text-[#8b1e2f] group-hover:bg-[#8b1e2f] group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-[#111827] mb-1">Humanitarian Base</h3>
                    <p className="text-hope-gray font-light leading-relaxed">
                      Hope Charity International Headquarters<br />
                      1234 Humanitarian Way, Suite 400<br />
                      Global City, NY 10018<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="bg-[#8b1e2f]/10 p-4 rounded-xl text-[#8b1e2f] group-hover:bg-[#8b1e2f] group-hover:text-white transition-all duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-[#111827] mb-1">Operating Hours</h3>
                    <p className="text-hope-gray font-light leading-relaxed">
                      Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                      Saturday: 9:00 AM - 3:00 PM EST<br />
                      Sunday: Closed (Emergency Responders Active)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4 pt-6 border-t border-hope-gold/20">
                <h3 className="font-playfair font-bold text-xl text-[#111827]">
                  Follow Our Footsteps
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all p-3 rounded-lg cursor-pointer">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-pink-600 hover:bg-pink-700 hover:scale-105 transition-all p-3 rounded-lg cursor-pointer">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all p-3 rounded-lg cursor-pointer">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-[#8b1e2f] hover:bg-red-700 hover:scale-105 transition-all p-3 rounded-lg cursor-pointer">
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                </div>
                <p className="text-sm text-hope-gray font-light">
                  Follow @HopeCharityOfficial for daily dispatch photos, video updates, and impact reports directly from volunteers in active zones.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="glass-panel border border-[#c5a880]/20 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-8 md:p-10 space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-playfair font-bold text-2xl md:text-3xl text-[#111827]">
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-hope-gray font-light">
                      Complete the details below, and one of our case managers will review your submission.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                          First Name *
                        </label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="E.g. Clara" className="border-gray-300 focus-visible:ring-[#8b1e2f]" required />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                          Last Name *
                        </label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="E.g. Barton" className="border-gray-300 focus-visible:ring-[#8b1e2f]" required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                        Email Address *
                      </label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="clara.barton@redcross.org" className="border-gray-300 focus-visible:ring-[#8b1e2f]" required />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                        Phone Number
                      </label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" className="border-gray-300 focus-visible:ring-[#8b1e2f]" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                        Subject *
                      </label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="E.g. Corporate donation request" className="border-gray-300 focus-visible:ring-[#8b1e2f]" required />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                        How can we serve you? *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {[
                          'General Information',
                          'Volunteer Opportunities',
                          'Partnership Inquiry',
                          'Media & Press',
                          'Emergency Response',
                          'Other'
                        ].map(type => (
                          <label key={type} className="flex items-center space-x-3 cursor-pointer group text-sm font-light text-hope-gray hover:text-[#111827] transition duration-200">
                            <input
                              type="radio"
                              name="inquiry-type"
                              value={type}
                              checked={formData.inquiryType === type}
                              onChange={handleRadioChange}
                              className="w-4 h-4 text-[#8b1e2f] border-gray-300 focus:ring-[#8b1e2f]"
                              required
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2">
                        Detailed Message *
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please write from your heart..."
                        className="border-gray-300 min-h-32 focus-visible:ring-[#8b1e2f]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-[#8b1e2f] hover:bg-red-800 text-white font-semibold transition-all duration-300 py-6"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                    </Button>

                    {status === 'success' && (
                      <p className="text-sm font-medium text-emerald-600 text-center animate-fade-in">
                        Thank you. Your message has been sent. Our team will read it and reply promptly.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-sm font-medium text-red-600 text-center animate-fade-in">
                        We could not send your message due to a connection issue. Please double-check and try again.
                      </p>
                    )}

                    <p className="text-[11px] text-hope-gray text-center font-light leading-relaxed">
                      By submitting this form, you acknowledge that our staff handles all inquiries with strict confidentiality and respect.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-16 bg-[#8b1e2f] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-playfair font-bold text-3xl mb-4">
            🚨 Rapid Response Crisis Hotlines
          </h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto font-light">
            If you are reporting a developing natural disaster, regional famine, or severe human conflict that requires immediate deployment, contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 font-outfit text-xl font-bold pt-4">
            <div className="flex items-center space-x-2 bg-black/25 px-6 py-3 rounded-full border border-white/10">
              <span>📞 Hotline: +1 (555) 999-HELP</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/25 px-6 py-3 rounded-full border border-white/10">
              <span>📧 Email: emergency@hopecharity.org</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

