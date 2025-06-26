
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
      const response = await fetch('https://hope-backend-0h72.onrender.com/api/contact', {
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-hope-blue to-hope-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-lato font-bold text-4xl md:text-5xl text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Have questions? Want to partner with us? We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-lato font-bold text-3xl text-hope-blue mb-6">
                  Contact Information
                </h2>
                <p className="text-hope-gray text-lg mb-8">
                  We're available 24/7 for emergencies and respond to all inquiries within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-hope-blue/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-hope-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hope-blue mb-1">Phone</h3>
                    <p className="text-hope-gray">General Inquiries: +1 (555) 123-4567</p>
                    <p className="text-hope-red font-semibold">Emergency Line: +1 (555) 999-HELP</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hope-blue/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-hope-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hope-blue mb-1">Email</h3>
                    <p className="text-hope-gray">info@hopecharity.org</p>
                    <p className="text-hope-gray">partnerships@hopecharity.org</p>
                    <p className="text-hope-gray">media@hopecharity.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hope-blue/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-hope-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hope-blue mb-1">Headquarters</h3>
                    <p className="text-hope-gray">
                      Hope Charity International<br />
                      1234 Humanitarian Way<br />
                      Global City, GC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hope-blue/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-hope-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hope-blue mb-1">Office Hours</h3>
                    <p className="text-hope-gray">
                      Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                      Saturday: 9:00 AM - 3:00 PM EST<br />
                      Sunday: Emergency calls only
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-lato font-bold text-xl text-hope-blue mb-4">
                  Follow Our Work
                </h3>
                <div className="flex space-x-4">
                  <div className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg cursor-pointer transition-colors">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-pink-600 hover:bg-pink-700 p-3 rounded-lg cursor-pointer transition-colors">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer transition-colors">
                    <Twitter className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-red-600 hover:bg-red-700 p-3 rounded-lg cursor-pointer transition-colors">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-hope-gray mt-2">
                  @HopeCharityOfficial - Follow us for real-time updates from the field
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="font-lato font-bold text-2xl text-hope-blue mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-hope-blue mb-2">
                          First Name *
                        </label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Your first name" className="border-gray-300" required />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-hope-blue mb-2">
                          Last Name *
                        </label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Your last name" className="border-gray-300" required />
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
                      <label htmlFor="subject" className="block text-sm font-semibold text-hope-blue mb-2">
                        Subject *
                      </label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What is this regarding?" className="border-gray-300" required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-hope-blue mb-2">
                        How can we help you? *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {[
                          'General Information',
                          'Volunteer Opportunities',
                          'Partnership Inquiry',
                          'Media & Press',
                          'Emergency Response',
                          'Other'
                        ].map(type => (
                          <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="inquiry-type"
                              value={type}
                              checked={formData.inquiryType === type}
                              onChange={handleRadioChange}
                              className="text-hope-blue"
                              required
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-hope-blue mb-2">
                        Message *
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        className="border-gray-300 min-h-32"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-hope-red hover:bg-red-700 text-white font-semibold"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </Button>

                    {status === 'success' && (
                      <p className="text-sm text-green-600 text-center">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-sm text-red-600 text-center">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}

                    <p className="text-xs text-hope-gray text-center">
                      We typically respond within 24 hours. For urgent matters, please call our emergency line.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-12 bg-hope-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-lato font-bold text-2xl mb-4">
            🚨 Emergency Response
          </h2>
          <p className="text-lg mb-4">
            If you're witnessing or experiencing a humanitarian crisis that requires immediate attention:
          </p>
          <div className="space-y-2 md:space-y-0 md:space-x-8 md:flex md:justify-center">
            <div className="font-bold text-xl">
              📞 Emergency Hotline: +1 (555) 999-HELP
            </div>
            <div className="font-bold text-xl">
              📧 emergency@hopecharity.org
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
