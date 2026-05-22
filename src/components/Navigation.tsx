import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-[#faf7f2]/85 backdrop-blur-md border-b border-hope-gold/10 shadow-sm fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-hope-red fill-hope-red animate-pulse" />
            <span className="font-playfair font-bold text-2xl text-hope-blue tracking-tight">Hope Charity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-hope-gray hover:text-hope-red transition-all duration-200 font-medium text-xs lg:text-sm tracking-wide uppercase"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/donate">
              <Button className="bg-hope-red hover:bg-red-800 text-white font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-hope-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-[#faf7f2] border-t border-hope-gold/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-3 text-hope-gray hover:text-hope-blue font-semibold border-b border-hope-gold/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-hope-red hover:bg-red-800 text-white font-bold py-3 rounded-full shadow-md">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
