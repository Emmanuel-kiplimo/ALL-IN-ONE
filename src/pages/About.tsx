
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      title: "Empathy",
      description: "We understand that behind every crisis are real people with real stories. We approach every situation with compassion and dignity."
    },
    {
      title: "Transparency", 
      description: "Every dollar is tracked and reported. We believe donors deserve to know exactly how their contribution makes a difference."
    },
    {
      title: "Long-term Impact",
      description: "We don't just provide emergency relief - we help communities rebuild stronger and more resilient than before."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-hope-blue to-hope-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-lato font-bold text-4xl md:text-5xl text-white mb-6">
            Our Story of Hope
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Born from crisis, built on compassion, sustained by your generosity
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue mb-6">
                How We Started
              </h2>
              <div className="space-y-4 text-hope-gray text-lg leading-relaxed">
                <p>
                  In 2013, as the Syria crisis unfolded, a group of volunteers felt compelled to act. 
                  We couldn't stand by while families fled their homes with nothing but the clothes on their backs.
                </p>
                <p>
                  What started as a small relief effort in refugee camps grew into something much larger. 
                  We realized that disasters don't discriminate - they affect everyone, everywhere.
                </p>
                <p>
                  Today, Hope Charity operates in over 50 countries, but our mission remains the same: 
                  to restore dignity and hope to disaster-affected communities worldwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://worldchildrensfund.org/site/assets/Site_images/WCF-Home-7-Basic-Rights-Suffers-Violencek.jpg"
                alt="Hope Charity volunteers"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue mb-6">
            Our Mission
          </h2>
          <p className="text-2xl text-hope-gray max-w-4xl mx-auto font-light leading-relaxed">
            "To restore dignity and hope to disaster-affected communities through immediate relief, 
            long-term recovery support, and sustainable development programs."
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-lato font-bold text-2xl text-hope-blue mb-4">
                    {value.title}
                  </h3>
                  <p className="text-hope-gray leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 bg-hope-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-lato font-bold text-3xl md:text-4xl mb-6">
                Global Reach, Local Impact
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed mb-6">
                From earthquake-stricken villages in Nepal to hurricane-ravaged communities in the Caribbean, 
                we've learned that disaster relief is most effective when it's culturally sensitive and community-led.
              </p>
              <p className="text-slate-200 text-lg leading-relaxed">
                We work with local partners who understand their communities' unique needs, ensuring that aid 
                reaches those who need it most and creates lasting positive change.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/International_Mine_Action_Center_in_Syria_(Aleppo)_45.jpg"
                alt="Global community"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue text-center mb-12">
            Voices of Hope
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-hope-gray italic mb-4 text-lg leading-relaxed">
                  "When the earthquake destroyed our home, we thought we had lost everything. 
                  Hope Charity didn't just give us shelter - they gave us the tools to rebuild our lives stronger than before."
                </p>
                <p className="font-semibold text-hope-blue">- Maria Santos, Philippines</p>
                <p className="text-sm text-hope-gray">Earthquake Survivor & Community Leader</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-hope-gray italic mb-4 text-lg leading-relaxed">
                  "As a donor for 5 years, I've seen firsthand how Hope Charity transforms lives. 
                  Their transparency and dedication keep me contributing every month."
                </p>
                <p className="font-semibold text-hope-blue">- Dr. James Mitchell, UK</p>
                <p className="text-sm text-hope-gray">Monthly Donor Since 2019</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
