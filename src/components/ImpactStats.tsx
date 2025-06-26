
const ImpactStats = () => {
  const stats = [
    { number: "11", label: "Years of Service", suffix: "+" },
    { number: "2.3", label: "Million Dollars Contributed", suffix: "M" },
    { number: "50", label: "Countries Served", suffix: "+" },
    { number: "100", label: "Generous Donors", suffix: "K+" },
  ];

  return (
    <section className="bg-hope-blue py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-white mb-4">
            Our Global Impact
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Together, we've transformed millions of lives across the globe. Every number represents hope restored.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-hope-red mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-white font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-300 text-sm">
            We accept all major payment methods including: Credit Cards, PayPal, Bank Transfers, Cryptocurrency (Bitcoin, Ethereum), Binance Pay
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
