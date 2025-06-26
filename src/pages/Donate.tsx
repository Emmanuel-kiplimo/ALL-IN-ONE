
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react'; // Ensure Shield is imported
import { FaBitcoin } from 'react-icons/fa'; // Import Bitcoin icon
import { SiBinance } from 'react-icons/si'; // Import Binance icon
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { causesData } from '@/data/causes'; // Import local causes data

interface Cause {
  id: string;
  title: string;
  description: string;
  image: string;
  urgent: boolean;
  raised: number;
  target: number;
}

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    method: '',
    address: '',
    network: ''
  });
  const causes = causesData; // Use hardcoded data

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const handleBinanceClick = () => {
    setModalDetails({
      method: 'Binance Pay (BEP20)',
      ...cryptoAddresses.binance
    });
    setIsModalOpen(true);
  };

  // --- IMPORTANT ACTION REQUIRED ---
  // 1. Replace the placeholder addresses with your actual crypto wallet addresses.
  // 2. QR codes will now be generated dynamically from the address.
  const cryptoAddresses = {
    binance: {
      address: '0x38986cb16492a2a2c369776befa03dbec11373d94',
      network: 'BEP20 (Binance Smart Chain)'
    },
    crypto: {
      address: '0xf9a2F872Fc071addcF78b095849f6d6D556448b7',
      network: 'ETHERIUM'
    }
  };

  const handleCryptoClick = () => {
    setModalDetails({
      method: 'ETHERIUM',
      ...cryptoAddresses.crypto
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-hope-blue to-hope-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-lato font-bold text-4xl md:text-5xl text-white mb-6">
            Your Donation Changes Lives
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Every dollar you give goes directly to families in crisis. Choose to make a one-time donation or join our monthly giving program.
          </p>
        </div>
      </section>

      {/* General Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-lato font-bold text-3xl text-hope-blue mb-4">
                  Make a General Donation
                </h2>
                <p className="text-hope-gray">
                  Your donation helps us respond quickly to emerging crises and support ongoing relief efforts worldwide.
                </p>
              </div>

              <div className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-semibold text-hope-blue mb-3">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 border-2 border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white">
                      One-Time Donation
                    </Button>
                    <Button variant="outline" className="h-16 border-2 border-hope-red text-hope-red hover:bg-hope-red hover:text-white">
                      Monthly Giving ❤️
                    </Button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-semibold text-hope-blue mb-3">
                    Choose Amount
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <Button 
                        key={amount}
                        variant="outline" 
                        className="h-12 hover:bg-hope-blue hover:text-white"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Input placeholder="Enter custom amount" className="text-center text-lg font-semibold" />
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-sm font-semibold text-hope-blue mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button asChild variant="outline" className="h-16 flex flex-col items-center space-y-1 border-2 border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white hover:shadow-md">
                      <a href="https://www.paypal.com/donate/?hosted_button_id=N7SJJFEQQNXTG" target="_blank" rel="noopener noreferrer">
                        <span className="text-xl">💳</span>
                        <span className="text-xs">PayPal</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center space-y-1 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-md" onClick={handleCryptoClick}>
                      <FaBitcoin className="w-6 h-6" /> {/* Icon color changed to yellow */}
                      <span className="text-xs">Crypto</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center space-y-1 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-md" onClick={handleBinanceClick}>
                      <SiBinance className="w-6 h-6" /> {/* Icon color changed to yellow */}
                      <span className="text-xs">Binance Pay</span>
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-hope-red hover:bg-red-700 text-white font-bold text-lg py-6"
                  // TODO: Implement donation processing logic.
                  // This should likely trigger a function that opens a payment modal (e.g., Stripe Checkout)
                  // or sends the selected amount and type to the backend to initiate a payment.
                >
                  Donate Now - Secure Payment
                </Button>

                <div className="flex items-center justify-center space-x-4 text-sm text-hope-gray">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                  <span>•</span>
                  <span>Tax Deductible</span>
                  <span>•</span>
                  <span>85% Goes to Programs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Specific Causes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-lato font-bold text-3xl md:text-4xl text-hope-blue mb-6">
              Support Specific Causes
            </h2>
            <p className="text-hope-gray text-lg">
              Choose a specific cause that resonates with you. Your targeted donation makes an immediate impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => {
              const percentage = (cause.raised / cause.target) * 100;
              
              return (
                <Card key={cause.id} className="hover-lift overflow-hidden border-0 shadow-lg">
                  {cause.urgent && (
                    <div className="bg-hope-red text-white text-center py-2 font-semibold text-sm">
                      🚨 URGENT
                    </div>
                  )}
                  
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={cause.image} 
                      alt={cause.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-lato font-bold text-lg mb-2 text-hope-blue">
                      {cause.title}
                    </h3>
                    
                    <p className="text-hope-gray mb-4 text-sm leading-relaxed">
                      {cause.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-hope-blue">
                          ${cause.raised.toLocaleString()}
                        </span>
                        <span className="text-hope-gray">
                          of ${cause.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                    
                    <Link to={`/donate/${cause.id}`}>
                      <Button className="w-full bg-hope-red hover:bg-red-700 text-white font-semibold">
                        Donate to This Cause
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Information */}
      <section className="py-20 bg-hope-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-lato font-bold text-3xl md:text-4xl mb-6">
              See Your Impact
            </h2>
            <p className="text-slate-200 text-lg max-w-3xl mx-auto">
              Here's exactly how your donation creates change in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-bold text-xl mb-2">$25</h3>
              <p className="text-slate-200">Provides emergency shelter for a family of 4 for one week</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-bold text-xl mb-2">$50</h3>
              <p className="text-slate-200">Feeds 10 children nutritious meals for a full month</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-bold text-xl mb-2">$100</h3>
              <p className="text-slate-200">Provides essential medical supplies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚰</div>
              <h3 className="font-bold text-xl mb-2">$250</h3>
              <p className="text-slate-200">Builds a clean water access point for a village</p>
            </div>
          </div>
        </div>
      </section>

      <CryptoDonationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalDetails}
      />

      <Footer />
    </div>
  );
};

export default Donate;
