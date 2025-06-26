
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress'; // Ensure Progress is imported
import { Badge } from '@/components/ui/badge'; // Ensure Badge is imported
import { Shield, ArrowLeft } from 'lucide-react'; // Ensure Shield, ArrowLeft are imported
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBitcoin } from 'react-icons/fa'; // Import Bitcoin icon
import { SiBinance } from 'react-icons/si'; // Import Binance icon
import { CryptoDonationModal } from '../components/CryptoDonationModal';
import { causesData } from '@/data/causes';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  urgent: boolean;
  raised: number;
  target: number;
  fullStory: string;
  impact: Record<string, string>;
}

const DonateProject = () => {
  const { projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    method: '',
    address: '',
    network: ''
  });
  // Find the project from local data instead of fetching from the backend
  const project = causesData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

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

  const percentage = (project.raised / project.target) * 100;
  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const handleBinanceClick = () => {
    setModalDetails({
      method: 'Binance Pay (BEP20)',
      ...cryptoAddresses.binance
    });
    setIsModalOpen(true);
  };

  const handleCryptoClick = () => {
    setModalDetails({
      method: 'Crypto',
      ...cryptoAddresses.crypto
    });
    setIsModalOpen(true);
  };


  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Back Navigation */}
      <section className="pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/donate" className="inline-flex items-center text-hope-blue hover:text-hope-blue-dark transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Causes
          </Link>
        </div>
      </section>

      {/* Project Hero */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {project.urgent && (
                <Badge className="mb-4 bg-hope-red text-white px-4 py-2">
                  🚨 URGENT - Immediate Help Needed
                </Badge>
              )}
              <h1 className="font-lato font-bold text-4xl md:text-5xl text-hope-blue mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-hope-gray mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-6">
                <div className="flex justify-between text-lg mb-3">
                  <span className="font-bold text-hope-blue">
                    ${project.raised.toLocaleString()} raised
                  </span>
                  <span className="text-hope-gray">
                    of ${project.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={percentage} className="h-4" />
                <p className="text-sm text-hope-gray mt-2">
                  {percentage.toFixed(1)}% funded • {Math.ceil((project.target - project.raised) / 50)} more donors needed
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={project.image}
                alt={project.title}
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-lato font-bold text-3xl text-hope-blue mb-6">
            The Full Story
          </h2>
          <p className="text-hope-gray text-lg leading-relaxed">
            {project.fullStory}
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-lato font-bold text-3xl text-hope-blue mb-4">
                  Donate to This Cause
                </h2>
                <p className="text-hope-gray">
                  Your donation will be used exclusively for this cause. 100% of your donation goes directly to relief efforts.
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
                      Monthly Support ❤️
                    </Button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-semibold text-hope-blue mb-3">
                    Choose Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <Button 
                        key={amount}
                        variant="outline" 
                        className="h-16 flex flex-col items-center space-y-1 hover:bg-hope-blue hover:text-white"
                      >
                        <span className="text-lg font-bold">${amount}</span>
                        <span className="text-xs text-center leading-tight">
                          {project.impact[amount as unknown as keyof typeof project.impact]?.substring(0, 30)}...
                        </span>
                      </Button>
                    ))}
                  </div>
                  <Input placeholder="Enter custom amount" className="text-center text-lg font-semibold" />
                </div>

                {/* Impact Description */}
                <div className="bg-hope-blue/5 p-6 rounded-lg">
                  <h3 className="font-lato font-bold text-lg text-hope-blue mb-3">
                    Your Impact
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(project.impact).map(([amount, impact]) => (
                      <div key={amount} className="flex items-start space-x-3">
                        <span className="font-bold text-hope-red">${amount}:</span>
                        <span className="text-hope-gray">{impact}</span>
                      </div>
                    ))}
                  </div>
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
                  // TODO: Implement donation processing logic for this specific project.
                >
                  Complete Secure Donation
                </Button>

                <div className="flex items-center justify-center space-x-4 text-sm text-hope-gray">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                  <span>•</span>
                  <span>Tax Deductible</span>
                  <span>•</span>
                  <span>100% Goes to This Cause</span>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default DonateProject;
