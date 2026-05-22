
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      title: "Empathy First",
      description: "Behind every cold statistic is a beating heart. We refuse to turn away from human suffering, meeting every soul with deep dignity."
    },
    {
      title: "Radical Transparency", 
      description: "We honor your trust. Every dollar is tracked, verified, and sent directly to the frontlines where it saves lives."
    },
    {
      title: "Unwavering Recovery",
      description: "We do not leave when the cameras do. We stay to rebuild, planting seeds of hope that will flourish for generations."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] font-outfit text-hope-blue selection:bg-hope-red/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#030712] text-white overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b1e2f]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hope-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-hope-gold font-medium tracking-widest text-xs uppercase mb-3 block">Who We Are</span>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
            Our Story of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#faf7f2] to-hope-gold">Hope</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Born in the mud of crisis, fueled by radical empathy, sustained by the beautiful generosity of human hearts.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[#8b1e2f] font-semibold tracking-wider text-sm uppercase">Our Genesis</span>
              <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827] leading-tight">
                How We Started
              </h2>
              <div className="space-y-6 text-[#4b5563] text-lg leading-relaxed font-light">
                <p>
                  In the freezing winter of 2013, as the Syrian crisis tore lives apart, our founders stood in the mud of border camps. They stood alongside mothers who had walked for days through active gunfire, carrying shivering infants wrapped in garbage bags to keep out the sleet.
                </p>
                <p>
                  We saw the raw terror in their eyes and felt the crushing weight of a world turning away. We couldn't look away. What began as a desperate scramble to distribute warm blankets and clean water out of the trunk of a car grew into a lifetime commitment.
                </p>
                <p>
                  We learned that disaster doesn't discriminate. A mother grieving in Aleppo feels the exact same agony as a father searching through rubble in Kathmandu, or a family freezing without power in Kyiv. We exist to hold their hands in the dark.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8b1e2f] to-hope-gold rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20">
                <img 
                  src="/images/death people crying.jpg"
                  alt="Hope Charity volunteers delivering aid in crisis"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement - Elevated Impact Banner */}
      <section className="py-24 bg-gradient-to-br from-[#111827] to-[#030712] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,30,47,0.15),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-hope-gold font-semibold tracking-wider text-sm uppercase">Our Unwavering Promise</span>
          <h2 className="font-playfair italic font-medium text-3xl md:text-5xl max-w-4xl mx-auto leading-relaxed text-slate-100">
            "To stand as a shield for the vulnerable, restoring raw dignity and burning hope to communities broken by conflict and disaster, rebuilding lives from the ashes."
          </h2>
          <div className="h-1 w-20 bg-hope-gold mx-auto rounded-full" />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#8b1e2f] font-semibold tracking-wider text-sm uppercase">Our Compass</span>
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827]">
              Our Core Values
            </h2>
            <p className="text-lg text-hope-gray font-light">
              These principles guide every choice we make on the ground, in the office, and on the frontlines.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-panel border border-[#c5a880]/20 hover:border-[#8b1e2f]/40 hover-lift bg-white/70 backdrop-blur-md shadow-xl transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#8b1e2f]/10 flex items-center justify-center text-[#8b1e2f] font-bold text-xl font-playfair mb-2">
                    0{index + 1}
                  </div>
                  <h3 className="font-playfair font-bold text-2xl text-[#111827]">
                    {value.title}
                  </h3>
                  <p className="text-hope-gray leading-relaxed font-light text-base">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-last lg:order-first group">
              <div className="absolute -inset-2 bg-gradient-to-r from-hope-gold to-[#8b1e2f] rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20">
                <img 
                  src="/images/expploring missile.jpg"
                  alt="A view of global humanitarian reach"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[#8b1e2f] font-semibold tracking-wider text-sm uppercase">Global Actions</span>
              <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827] leading-tight">
                Global Reach, Local Depth
              </h2>
              <div className="space-y-6 text-[#4b5563] text-lg leading-relaxed font-light">
                <p>
                  From earthquake-stricken villages high in the Nepalese mountains to war-torn regions across Sudan, Ukraine, and the DR Congo, we have learned that relief is only as good as the trust we build.
                </p>
                <p>
                  We do not drop boxes from helicopters and fly away. We work directly with local leaders, community groups, and courageous doctors who know every family's name. They know who needs insulin, who is starving in silence, and who has lost their entire family.
                </p>
                <p>
                  By empowering local systems and placing resources directly in their hands, we ensure that aid isn't just a brief handout—it is the foundation of long-term survival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#8b1e2f] font-semibold tracking-wider text-sm uppercase">Testimonials</span>
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827]">
              Voices of Survival & Support
            </h2>
            <p className="text-lg text-hope-gray font-light">
              Real stories from those who have lived through the dark and those who help bring the light.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-panel border border-[#c5a880]/15 bg-white/80 shadow-xl p-8 hover-lift">
              <CardContent className="p-0 space-y-6">
                <div className="text-[#8b1e2f] text-4xl font-serif">“</div>
                <p className="text-hope-gray italic text-lg leading-relaxed font-light">
                  "When the earthquake ripped our town apart, burying our homes and our neighbors under concrete, we were paralyzed by despair. Hope Charity didn't just hand us a box of rations; they held our hands in the dust and walked with us every step of the way as we rebuilt our school, our homes, and our lives."
                </p>
                <div>
                  <p className="font-semibold text-[#111827] font-playfair text-lg">- Maria Santos, Philippines</p>
                  <p className="text-sm text-[#8b1e2f] font-medium uppercase tracking-wider">Earthquake Survivor & Community Leader</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border border-[#c5a880]/15 bg-white/80 shadow-xl p-8 hover-lift">
              <CardContent className="p-0 space-y-6">
                <div className="text-[#8b1e2f] text-4xl font-serif">“</div>
                <p className="text-hope-gray italic text-lg leading-relaxed font-light">
                  "I have seen many charities distribute aid, but Hope Charity operates with a rare, burning empathy and radical transparency. Knowing that my contributions go directly to buying winter fuel for freezing children or medical kits for conflict zones makes me proud to support them."
                </p>
                <div>
                  <p className="font-semibold text-[#111827] font-playfair text-lg">- Dr. James Mitchell, UK</p>
                  <p className="text-sm text-[#8b1e2f] font-medium uppercase tracking-wider">Monthly Donor Since 2019</p>
                </div>
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

