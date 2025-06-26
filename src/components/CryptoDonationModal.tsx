import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Check } from 'lucide-react'; // Import Copy and Check icons
import { Input } from '@/components/ui/input'; // Import Input component
import { useState } from 'react'; // Import useState


interface CryptoDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: string;
  address: string;
  network?: string;
}

export const CryptoDonationModal = ({
  isOpen,
  onClose,
  method,
  address,
  network,
}: CryptoDonationModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
  };

 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donate with {method}</DialogTitle>
          <DialogDescription>
            Scan the QR code below to send your donation.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center space-y-4">
          {address ? (
            <QRCodeCanvas
              id="qrcode-canvas" // Add an ID to the canvas for downloading
              value={address}
              size={192} // Equivalent to w-48 h-48 (192px)
               // High error correction level
                      includeMargin={true}
                      className="rounded-lg bg-white p-2 border" // Apply existing styling
            />
          ) : (
            <p className="text-red-500">Wallet address not available.</p>
          )}
          <p className="text-sm text-hope-gray text-center mt-2">
            Scan to donate
          </p>
          {network && (
            <div className="text-center bg-yellow-100 text-yellow-800 p-2 rounded-md text-sm w-full">
              <strong>Important:</strong> Only send funds via the <strong>{network}</strong> network.
            </div>
          )}
            <div className="w-full flex items-center space-x-2">
            <Input id="crypto-address" value={address} readOnly className="font-mono text-sm" />
            <Button type="button" size="icon" onClick={handleCopy} aria-label="Copy address">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};