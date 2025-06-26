
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { causesData } from '@/data/causes';


const UrgentCauses = () => {
  // We can filter for urgent causes, or show a slice of all causes.
  // Let's show the first 6 to match the original design.
  const causes = causesData.slice(0, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-lato font-bold text-4xl md:text-5xl text-hope-blue mb-6">
            Urgent Causes That Need Your Help
          </h2>
          <p className="text-hope-gray text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Right now, families are facing unimaginable hardships. Your donation can be the difference between despair and hope, 
            between loss and recovery. Every dollar goes directly to those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, index) => {
            const percentage = (cause.raised / cause.target) * 100;
            
            return (
              <Card key={cause.id} className="hover-lift overflow-hidden border-0 shadow-lg">
                {cause.urgent && (
                  <div className="bg-hope-red text-white text-center py-2 font-semibold text-sm">
                    🚨 URGENT - Immediate Help Needed
                  </div>
                )}
                
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={cause.image} 
                    alt={cause.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-lato font-bold text-xl mb-3 text-hope-blue line-clamp-2">
                    {cause.title}
                  </h3>
                  
                  <p className="text-hope-gray mb-4 line-clamp-3 leading-relaxed">
                    {cause.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-hope-blue">
                        ${cause.raised.toLocaleString()} raised
                      </span>
                      <span className="text-hope-gray">
                       of ${cause.target.toLocaleString()}
                      </span>
                    </div>
                    {/* Flex container for Progress bar and Percentage text */}
                    <div className="flex items-center space-x-2">
                      <Progress value={percentage} className="h-3 flex-grow" />
                      <p className="text-xs text-hope-gray whitespace-nowrap">
                       {percentage.toFixed(1)}% funded
                      </p>
                    </div>
                  </div>
                  
                  <Link to={`/donate/${cause.id}`}>
                    <Button className="w-full bg-hope-red hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:shadow-lg">
                      Donate to This Cause
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/donate">
            <Button size="lg" variant="outline" className="border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white font-semibold px-8">
              View All Causes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UrgentCauses;
