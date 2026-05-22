import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AlertCircle, Heart } from 'lucide-react';
import { causesData } from '@/data/causes';

const UrgentCauses = () => {
  // Load the causes dynamically from our local data source
  const causes = causesData;

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
      default:
        return 'Global Relief';
    }
  };

  return (
    <section className="py-24 bg-[#faf7f2] relative">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8b1e2f_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center space-x-1.5 text-hope-red font-bold text-sm tracking-wider uppercase">
            <Heart className="w-4 h-4 fill-hope-red animate-pulse" />
            <span>Urgent Appeals for Survival</span>
          </div>
          <h2 className="font-playfair font-black text-4xl md:text-5xl lg:text-6xl text-hope-blue max-w-4xl mx-auto leading-tight">
            They are praying for a miracle. Will you be the one?
          </h2>
          <p className="text-hope-gray text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Behind every conflict, flood, and earthquake is a child shivering in the dark, a mother crying over an empty table, or a family fleeing shattered ruins. Your swift gift is their immediate lifeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {causes.map((cause) => {
            const percentage = (cause.raised / cause.target) * 100;
            const locationName = getLocation(cause.id);
            
            return (
              <Card key={cause.id} className="hover-lift overflow-hidden border border-hope-gold/10 bg-white shadow-xl flex flex-col md:flex-row h-full rounded-2xl">
                
                {/* Image Section */}
                <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden min-h-[250px]">
                  <img 
                    src={cause.image} 
                    alt={cause.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                  
                  {cause.urgent && (
                    <div className="absolute top-4 left-4 bg-hope-red text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center space-x-1.5 shadow-md">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Immediate Aid</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 text-white text-xs font-semibold tracking-wide bg-hope-blue/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    {locationName}
                  </div>
                </div>
                
                {/* Content Section */}
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-playfair font-bold text-xl md:text-2xl text-hope-blue leading-snug">
                      {cause.title}
                    </h3>
                    
                    <p className="text-hope-gray text-sm font-light leading-relaxed">
                      {cause.description}
                    </p>
                  </div>
                  
                  {/* Funding Details */}
                  <div className="mt-6 pt-6 border-t border-hope-gold/10 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-hope-blue">
                          ${cause.raised.toLocaleString()} raised
                        </span>
                        <span className="text-hope-gray font-medium">
                          Target: ${cause.target.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full progress-bar transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-[10px] text-hope-gray">
                        <span className="font-semibold text-hope-red">{percentage.toFixed(0)}% Funded</span>
                        <span>{Math.ceil((cause.target - cause.raised) / 50)} donors needed</span>
                      </div>
                    </div>
                    
                    <Link to={`/donate/${cause.id}`} className="block">
                      <Button className="w-full bg-hope-blue hover:bg-hope-red text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow hover:shadow-lg">
                        Provide Direct Aid
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <Link to="/donate">
            <Button size="lg" className="bg-transparent hover:bg-hope-blue/5 text-hope-blue border-2 border-hope-blue/20 font-bold px-10 py-3.5 rounded-full">
              View All Urgent Appeals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UrgentCauses;
