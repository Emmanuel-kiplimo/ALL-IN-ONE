import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Youtube, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hope-blue text-white border-t border-hope-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-hope-red fill-hope-red" />
              <span className="font-playfair font-bold text-2xl tracking-tight">Hope Charity</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              Since 2013, Hope Charity has been on the ground helping families rebuild their lives with dignity. 
              Together, we provide shelter, clean water, food, and hope to communities in their darkest hours.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6 text-hope-gold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Our Stories</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Our Mission</Link></li>
              <li><Link to="/donate" className="text-slate-400 hover:text-white transition-colors font-semibold text-hope-red">Donate Securely</Link></li>
              <li><Link to="/get-involved" className="text-slate-400 hover:text-white transition-colors">Volunteer Application</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & Security Info */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6 text-hope-gold">Contact & Support</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Email: <span className="text-white">support@hopecharity.org</span></p>
              <p>Phone: <span className="text-white">+1 (555) 123-4567</span></p>
              <p>24/7 Response Line:<br /><span className="text-hope-red font-semibold">+1 (555) 999-HELP</span></p>
            </div>
            
            {/* Trust and Payment Badges */}
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-hope-gold" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center space-x-3 opacity-60">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 border border-slate-500 rounded px-1.5 py-0.5">VISA</span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 border border-slate-500 rounded px-1.5 py-0.5 font-serif italic">Mastercard</span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 border border-slate-500 rounded px-1.5 py-0.5">AMEX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500 space-y-2">
          <p>&copy; {new Date().getFullYear()} Hope Charity International. All rights reserved. Registered NGO #5027419-A.</p>
          <p>Hope Charity is an audited 501(c)(3) tax-exempt organization. 85%+ of all donations directly fund local relief programs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
