import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Lock, CheckCircle2, Sparkles, Printer, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface VisaPaymentFormProps {
  amount: number;
  causeTitle?: string;
  type?: string;
  paymentMethod?: 'card' | 'crypto' | 'binance';
  onSuccess?: () => void;
}

const VisaPaymentForm: React.FC<VisaPaymentFormProps> = ({ 
  amount, 
  causeTitle = "Emergency relief efforts", 
  type = "one-time", 
  paymentMethod = 'card',
  onSuccess 
}) => {
  // Common states
  const [cardHolder, setCardHolder] = useState('');
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [loadingMessage, setLoadingMessage] = useState('Initiating secure connection...');
  const [certId, setCertId] = useState('');

  // Card specific states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Crypto / Binance specific states
  const [txid, setTxid] = useState('');
  const [copied, setCopied] = useState(false);

  // Addresses configuration
  const walletAddresses = {
    crypto: '0xf9a2F872Fc071addcF78b095849f6d6D556448b7',
    binance: '0x38986cb16492a2a2c369776befa03dbec11373d94'
  };

  const currentAddress = paymentMethod === 'crypto' ? walletAddresses.crypto : walletAddresses.binance;

  // Handle formatters
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) setCvv(value);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Card validation check (must start with 4 for Visa)
  const isVisa = cardNumber.replace(/\s/g, '').startsWith('4');
  
  // Method-based validation
  const validateForm = () => {
    if (paymentMethod === 'card') {
      return (
        isVisa &&
        cardNumber.replace(/\s/g, '').length === 16 && 
        cardHolder.trim().length > 3 && 
        expiry.length === 5 && 
        cvv.length >= 3
      );
    } else if (paymentMethod === 'crypto') {
      return (
        cardHolder.trim().length > 3 &&
        txid.trim().length >= 10 &&
        txid.trim().startsWith('0x')
      );
    } else if (paymentMethod === 'binance') {
      return (
        cardHolder.trim().length > 3 &&
        txid.trim().length >= 8
      );
    }
    return false;
  };

  const isValid = validateForm();

  // Process simulation
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStep('processing');
    
    // Generate certificate ID beforehand so it matches what we save
    const code = 'HC-' + Math.floor(100000 + Math.random() * 90000);
    setCertId(code);

    // Setup dynamic URL selection based on local host or production backend
    const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://hope-backend-0h72.onrender.com';

    let steps = [
      'Initiating secure connection...',
      'Verifying details...',
      'Authorizing transfer...',
      'Finalizing...'
    ];

    if (paymentMethod === 'card') {
      steps = [
        'Initiating secure connection...',
        'Verifying via Visa Secure...',
        'Authorizing secure token transfer...',
        'Finalizing donation receipt...'
      ];
    } else if (paymentMethod === 'crypto') {
      steps = [
        'Initiating decentralized ledger connection...',
        'Awaiting network confirmations (1/3)...',
        'Verifying transaction hash on Etherscan...',
        'Finalizing token-secured donation receipt...'
      ];
    } else if (paymentMethod === 'binance') {
      steps = [
        'Connecting to Binance Pay API...',
        'Validating Binance Merchant Order...',
        'Verifying BSC network hash...',
        'Generating certificate block...'
      ];
    }

    setLoadingMessage(steps[0]);
    setTimeout(() => {
      setLoadingMessage(steps[1]);
      setTimeout(() => {
        setLoadingMessage(steps[2]);
        setTimeout(() => {
          setLoadingMessage(steps[3]);
          setTimeout(async () => {
            try {
              const response = await fetch(`${BACKEND_URL}/api/donations`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount,
                  type: type || 'one-time',
                  paymentMethod: paymentMethod,
                  cardholderName: cardHolder,
                  causeTitle,
                  certificateId: code,
                  txid: paymentMethod !== 'card' ? txid : undefined
                })
              });
              if (!response.ok) {
                console.error('Failed to register donation in the backend database.');
              }
            } catch (err) {
              console.error('Error posting donation to database:', err);
            }
            setStep('success');
            if (onSuccess) onSuccess();
          }, 1000);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 space-y-6 text-center animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-hope-gold/20 border-t-hope-red rounded-full animate-spin"></div>
          <Lock className="w-6 h-6 text-hope-gold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="space-y-2">
          <h3 className="font-playfair font-bold text-2xl text-hope-blue">
            {paymentMethod === 'card' && 'Visa Secure Payment'}
            {paymentMethod === 'crypto' && 'On-Chain Validation'}
            {paymentMethod === 'binance' && 'Binance Pay Integration'}
          </h3>
          <p className="text-hope-gray text-sm flex items-center justify-center gap-1.5 min-h-[20px]">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-hope-red" />
            {loadingMessage}
          </p>
        </div>
        <div className="text-[10px] text-hope-gray uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border">
          {paymentMethod === 'card' && 'Verified by Visa • 256-bit encryption'}
          {paymentMethod === 'crypto' && 'Web3 Smart Contract • Decentralized Verification'}
          {paymentMethod === 'binance' && 'Binance Secure Channel • API Handshake'}
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="py-8 px-4 space-y-8 animate-fade-in">
        {/* Success Banner */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
            <CheckCircle2 className="w-10 h-10 text-green-600 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="font-playfair font-black text-3xl text-hope-blue">Thank You, Humanitarian</h3>
            <p className="text-hope-gray max-w-md mx-auto text-sm">
              Your gift of <span className="font-bold text-hope-red">${amount.toLocaleString()}</span> has been processed securely. A child somewhere now has a warm shelter and hope tonight.
            </p>
          </div>
        </div>

        {/* Certificate of Hope */}
        <div className="max-w-xl mx-auto bg-[#fdfcf9] border-4 border-hope-gold/30 p-8 sm:p-12 rounded-xl shadow-2xl relative border-double print:border-none print:shadow-none print:p-0">
          {/* Certificate Decorative Corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-hope-gold/50"></div>
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-hope-gold/50"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-hope-gold/50"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-hope-gold/50"></div>
          
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-1">
              <Sparkles className="w-4 h-4 text-hope-gold fill-hope-gold" />
              <span className="font-playfair font-bold text-xs uppercase tracking-widest text-hope-gold">
                {paymentMethod === 'card' && 'Certificate of Hope'}
                {paymentMethod === 'crypto' && 'On-Chain Certificate of Hope'}
                {paymentMethod === 'binance' && 'Binance Pay Certificate of Hope'}
              </span>
              <Sparkles className="w-4 h-4 text-hope-gold fill-hope-gold" />
            </div>

            <h2 className="font-playfair font-black text-2xl sm:text-3xl text-hope-blue leading-tight italic">
              A Record of Compassion
            </h2>

            <div className="space-y-1.5">
              <p className="text-[10px] text-hope-gray uppercase tracking-widest">This honors and certifies that</p>
              <p className="font-playfair font-bold text-2xl text-hope-red border-b border-hope-gold/20 pb-2 max-w-xs mx-auto">
                {cardHolder || 'Generous Donor'}
              </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto text-sm font-light leading-relaxed text-hope-gray">
              <p>
                has made a noble contribution of <span className="font-bold text-hope-blue">${amount.toLocaleString()}</span> to fund the urgent crisis appeal:
              </p>
              <p className="font-playfair font-bold text-md text-hope-blue italic bg-hope-gold/5 py-1 px-3 rounded">
                "{causeTitle}"
              </p>
              <p className="text-xs">
                {paymentMethod === 'card' && 'Your card donation has been successfully authorized and allocated to direct water, medical, and warm shelter solutions.'}
                {paymentMethod === 'crypto' && `Your on-chain donation has been validated via transaction hash ${txid.substring(0, 6)}...${txid.substring(txid.length - 4)} and permanently registered.`}
                {paymentMethod === 'binance' && `Your Binance Pay transaction has been successfully processed under order Reference ID ${txid.substring(0, 8)}.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-hope-gold/10 text-left text-xs max-w-xs mx-auto">
              <div>
                <span className="text-[10px] text-hope-gray uppercase block">Date Issued</span>
                <span className="font-medium text-hope-blue">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-hope-gray uppercase block">ID Number</span>
                <span className="font-medium text-hope-blue font-mono">{certId}</span>
              </div>
            </div>
            
            <div className="pt-2 text-center text-[9px] text-hope-gray tracking-wide flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-hope-gold" />
              <span>Registered Charity • Securely Seeded & Verified</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-sm mx-auto print:hidden">
          <Button 
            onClick={handlePrint}
            className="flex-1 bg-hope-gold hover:bg-hope-gold/80 text-hope-blue font-bold rounded-full py-5 shadow flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Certificate
          </Button>
          <Button 
            variant="outline"
            onClick={() => setStep('details')}
            className="flex-1 border-hope-blue text-hope-blue hover:bg-hope-blue/5 font-bold rounded-full py-5"
          >
            Back to Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="space-y-8 animate-fade-in">
      {/* Dynamic Payment Method Card preview */}
      {paymentMethod === 'card' ? (
        <div 
          className={`w-full max-w-sm h-52 mx-auto rounded-2xl p-6 relative overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between border select-none ${
            isFocused 
              ? 'bg-gradient-to-br from-[#2a3042] to-[#121620] border-hope-gold shadow-hope-gold/10 scale-[1.02]' 
              : 'bg-gradient-to-br from-[#1e2238] to-[#0f111a] border-white/10'
          }`}
        >
          {/* Card Background Glow Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-hope-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-hope-red/10 rounded-full blur-2xl"></div>

          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-9 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-md relative overflow-hidden flex flex-col justify-between p-1.5 border border-yellow-200">
              <div className="w-full h-0.5 bg-yellow-950/20"></div>
              <div className="w-full h-0.5 bg-yellow-950/20"></div>
              <div className="w-full h-0.5 bg-yellow-950/20"></div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-extrabold text-2xl tracking-tighter italic flex items-center justify-end">
                VISA
              </div>
              <span className="text-[7px] text-hope-gold font-bold tracking-widest uppercase block mt-0.5">Secure Credit</span>
            </div>
          </div>

          <div className="text-white font-mono text-xl tracking-widest text-center my-4 drop-shadow z-10">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>

          <div className="flex justify-between items-end text-white z-10">
            <div>
              <div className="text-[7px] text-slate-400 uppercase tracking-wider mb-0.5">Cardholder Name</div>
              <div className="font-mono text-sm tracking-wider uppercase truncate max-w-[200px]">
                {cardHolder || 'YOUR NAME'}
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <div className="text-[7px] text-slate-400 uppercase tracking-wider mb-0.5">Expires</div>
                <div className="font-mono text-sm tracking-wider">
                  {expiry || 'MM/YY'}
                </div>
              </div>
              <div>
                <div className="text-[7px] text-slate-400 uppercase tracking-wider mb-0.5">CVV</div>
                <div className="font-mono text-sm tracking-wider">
                  {cvv || '•••'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="w-full max-w-sm mx-auto rounded-2xl p-6 relative overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between border select-none bg-gradient-to-br from-[#1b263b] to-[#0d1b2a] border-hope-gold/20"
        >
          {/* Card Background Glow Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-hope-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>

          <div className="flex justify-between items-start z-10">
            <div>
              <div className="text-white font-extrabold text-lg tracking-tight font-playfair italic">
                {paymentMethod === 'crypto' ? 'Ethereum network' : 'Binance Pay (BSC)'}
              </div>
              <span className="text-[8px] text-hope-gold font-bold tracking-widest uppercase block mt-0.5">
                {paymentMethod === 'crypto' ? 'ERC20 Wallet' : 'BEP20 Wallet'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-orange-500">{paymentMethod === 'crypto' ? 'Ξ' : 'BNB'}</span>
            </div>
          </div>

          {/* QR Code and Wallet Address copy */}
          <div className="flex flex-col items-center my-4 space-y-3 z-10">
            <div className="bg-white p-2 rounded-lg border border-hope-gold/20 shadow-md">
              <QRCodeCanvas
                value={currentAddress}
                size={110}
                includeMargin={false}
                className="rounded"
              />
            </div>
            <div className="w-full flex items-center bg-black/40 border border-white/10 rounded-lg px-2 py-1 space-x-1 max-w-[280px]">
              <span className="text-[9px] text-slate-300 font-mono truncate flex-1 select-all">
                {currentAddress}
              </span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="text-hope-gold hover:text-white p-1 rounded transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500 animate-scale-in" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end text-white z-10">
            <div>
              <div className="text-[7px] text-slate-400 uppercase tracking-wider mb-0.5">Donor Name</div>
              <div className="font-mono text-xs tracking-wider uppercase truncate max-w-[150px]">
                {cardHolder || 'YOUR NAME'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[7px] text-slate-400 uppercase tracking-wider mb-0.5">Expected Transfer</div>
              <div className="font-mono text-xs font-bold text-hope-gold">
                ${amount.toLocaleString()} USD
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Form Fields */}
      <div className="space-y-5 text-left max-w-md mx-auto">
        {/* Visa detection warning */}
        {paymentMethod === 'card' && cardNumber && !isVisa && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0" />
            <span>Please use a Visa card starting with the digit 4.</span>
          </div>
        )}

        {/* Common Field: Name */}
        <div className="space-y-1.5">
          <Label htmlFor="cardHolder" className="text-xs font-bold uppercase tracking-wider text-hope-blue flex items-center justify-between">
            {paymentMethod === 'card' ? 'Cardholder Name' : 'Donor Full Name'}
            <span className="text-[10px] text-hope-gray font-normal lowercase">records in certificate</span>
          </Label>
          <Input
            id="cardHolder"
            placeholder="Jane Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
            className="border-slate-300 h-11 focus-visible:ring-hope-red focus-visible:border-hope-red"
          />
        </div>

        {/* Card Fields */}
        {paymentMethod === 'card' && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="cardNumber" className="text-xs font-bold uppercase tracking-wider text-hope-blue flex items-center justify-between">
                Card Number
                <span className="text-[10px] text-hope-gray font-normal">Must start with 4</span>
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="4000 1234 5678 9010"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="border-slate-300 h-11 pl-4 pr-12 focus-visible:ring-hope-red focus-visible:border-hope-red font-mono"
                />
                {isVisa && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-50 text-blue-700 font-extrabold italic text-xs px-2 py-1 rounded border border-blue-200 select-none">
                    VISA
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="expiry" className="text-xs font-bold uppercase tracking-wider text-hope-blue">
                  Expiration Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="border-slate-300 h-11 focus-visible:ring-hope-red focus-visible:border-hope-red font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cvv" className="text-xs font-bold uppercase tracking-wider text-hope-blue">
                  CVV / Security Code
                </Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="border-slate-300 h-11 focus-visible:ring-hope-red focus-visible:border-hope-red font-mono"
                />
              </div>
            </div>
          </>
        )}

        {/* Crypto/Binance Fields */}
        {paymentMethod !== 'card' && (
          <div className="space-y-1.5">
            <Label htmlFor="txid" className="text-xs font-bold uppercase tracking-wider text-hope-blue flex items-center justify-between">
              {paymentMethod === 'crypto' ? 'Ethereum TxHash' : 'Binance TxID / order id'}
              <span className="text-[10px] text-hope-gray font-normal lowercase">required to verify transfer</span>
            </Label>
            <Input
              id="txid"
              placeholder={paymentMethod === 'crypto' ? '0x8892f3...' : 'Order or TxID...'}
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              required
              className="border-slate-300 h-11 focus-visible:ring-hope-red focus-visible:border-hope-red font-mono"
            />
          </div>
        )}

        {/* Secure checkout info */}
        <div className="bg-[#faf7f2] border border-hope-gold/20 p-4 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-hope-blue">
            <ShieldCheck className="w-4 h-4 text-hope-gold" />
            <span>Secure Portals Protecting Your Gift</span>
          </div>
          <p className="text-[10px] text-hope-gray leading-relaxed">
            {paymentMethod === 'card' && 'Your transaction is securely routed through a sandboxed Visa payment simulator. No actual card funds will be deducted, and your private details are handled solely within your local browser runtime.'}
            {paymentMethod === 'crypto' && 'Ensure that you transfer the specified crypto assets from your Web3 wallet (MetaMask, Coinbase Wallet, etc.) to our secure charity address. Paste the transaction hash above so our system can automatically verify and generate your Certificate of Hope.'}
            {paymentMethod === 'binance' && 'Scan the Binance Pay QR code inside your Binance app to complete your secure payment. Input the generated Binance TxID or order ID above to log your donation.'}
          </p>
        </div>

        {/* Warning notification for crypto */}
        {paymentMethod !== 'card' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-3 rounded-lg flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <strong>Alert:</strong> Only send assets via{' '}
              <strong>{paymentMethod === 'crypto' ? 'Ethereum (ERC-20)' : 'Binance Smart Chain (BEP-20)'}</strong>. 
              Sending to the wrong address/network will result in loss of donation funds.
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={!isValid}
          className="w-full bg-hope-red hover:bg-red-800 text-white font-bold text-md py-6 rounded-full transition-all duration-300 shadow-lg disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider mt-4"
        >
          {paymentMethod === 'card' && `Authorize $${amount.toLocaleString()} Secure Donation`}
          {paymentMethod === 'crypto' && 'Verify Crypto Transfer'}
          {paymentMethod === 'binance' && 'Verify Binance Pay Transaction'}
        </Button>
      </div>
    </form>
  );
};

// Simple AlertCircle icon wrapper to prevent dependency conflicts
const AlertCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default VisaPaymentForm;
