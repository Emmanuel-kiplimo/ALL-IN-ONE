
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hope-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-hope-red" />
              <span className="font-lato font-bold text-xl">Hope Charity</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Since 2013, we've been restoring hope to disaster-affected communities worldwide. 
              Every donation helps families rebuild their lives with dignity and strength.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-slate-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-lato font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-white transition-colors">Latest News</Link></li>
              <li><Link to="/get-involved" className="text-slate-300 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-lato font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-slate-300">
              <p>Email: info@hopecharity.org</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>24/7 Emergency Line:<br />+1 (555) 999-HELP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Hope Charity. All rights reserved. Registered Charity #123456789</p>
          <p className="mt-2">Transparency is our commitment. 85% of donations go directly to aid programs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
