
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1158899543/photo/african-children-asking-for-food-africa.jpg?s=612x612&w=0&k=20&c=R6AL8lKlv2FZ0jsVkMrntxCnm7E72JPxpGwxupnMqdI=')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="font-lato font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-shadow animate-fade-in">
          Restoring Hope Where It's Needed Most
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-shadow opacity-90 animate-fade-in font-light max-w-3xl mx-auto leading-relaxed">
          Since 2013, Hope Charity has been on the ground helping families rebuild their lives after disasters and conflict. 
          When hope seems lost, we help communities find it again.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-scale-in">
          <Link to="/donate">
            <Button 
              size="lg" 
              className="bg-hope-red hover:bg-red-700 text-white font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              Donate Now
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-hope-blue font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              Learn Our Story
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
