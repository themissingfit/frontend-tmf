import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Calendar, Shield } from 'lucide-react';
import { Dress } from '@/types/dress';
import { useEffect, useState } from 'react';

interface DressDetailModalProps {
  dress: Dress | null;
  isOpen: boolean;
  onClose: () => void;
}

const DressDetailModal = ({ dress, isOpen, onClose }: DressDetailModalProps) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (dress?.images?.length) {
      setActiveImage(dress.images[0].url);
    }
  }, [dress]);

  if (!dress) return null;

  const isAvailable = dress.status === 'available';

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in renting the "${dress.name}" from The Missing Fit. Can you help me with the booking?`;
    window.open(
      `https://wa.me/917225994009?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // --- THE FIX STARTS HERE ---
  // This helper handles both Arrays ["S", "L"] and Strings "S, L"
  const getSizeList = (sizes: string | string[]): string[] => {
    if (Array.isArray(sizes)) {
      return sizes; // It's already an array, perfect!
    }
    if (typeof sizes === 'string') {
      // If it looks like a JSON array string "['S', 'L']", clean it
      if (sizes.trim().startsWith('[')) {
        try {
           // Try to parse it as real JSON
           const parsed = JSON.parse(sizes.replace(/'/g, '"'));
           if (Array.isArray(parsed)) return parsed;
        } catch (e) {
           // If parsing fails, just strip brackets and split
           return sizes.replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
        }
      }
      // Standard comma separated string "S, M, L"
      return sizes.split(',').map(s => s.trim());
    }
    return ['Free Size']; // Fallback
  };

  const sizeList = getSizeList(dress.sizes);
  // --- THE FIX ENDS HERE ---

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] w-[95vw] max-h-[85vh] p-5 overflow-hidden flex flex-col bg-white rounded-xl shadow-2xl border-none gap-0">
        
        <div className="grid md:grid-cols-2 gap-6 h-full overflow-hidden">
          
          {/* --- LEFT COLUMN: IMAGES --- */}
          <div className="flex flex-col h-full max-h-[60vh] md:max-h-full">
            <div className="relative flex-grow rounded-lg overflow-hidden bg-gray-50 aspect-[3/4] md:aspect-auto">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={dress.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}

              <div className="absolute top-3 left-3 flex gap-2">
                <Badge 
                  className={isAvailable 
                    ? "bg-[#F59E0B] text-white border-none px-2.5 py-0.5 text-xs shadow-sm" 
                    : "bg-burgundy text-cream border-none px-2.5 py-0.5 text-xs shadow-sm"
                  }
                >
                  {isAvailable ? 'Available' : 'Rented'}
                </Badge>
                {dress.dress_type && (
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur text-black text-xs capitalize shadow-sm">
                    {dress.dress_type}
                  </Badge>
                )}
              </div>
            </div>

            {dress.images?.length > 1 && (
              <div 
                className="flex gap-2 mt-3 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {dress.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative h-14 w-12 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${
                      activeImage === img.url
                        ? 'border-gray-800 opacity-100 scale-105'
                        : 'border-transparent opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: DETAILS --- */}
          <div className="flex flex-col h-full overflow-hidden">
            
            <div 
              className="overflow-y-auto pr-2 flex-grow"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#EBE9E4 transparent' }}
            >
              <DialogHeader className="mb-1 p-0 space-y-1 text-left">
                <DialogTitle className="font-display text-2xl md:text-3xl text-[#2D2D2D] tracking-tight">
                  {dress.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                <p className="text-gray-500 leading-relaxed text-sm">
                  {dress.description}
                </p>

                <div className="bg-[#F9F8F6] rounded-lg p-4 border border-[#EBE9E4] space-y-3">
                  <h4 className="font-display text-base text-[#4A4A4A]">Rental Pricing</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center border-b border-[#EBE9E4] pb-2">
                      <span className="text-gray-500 font-medium">Outfit Only</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{Number(dress.price_without_jewelry).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-[#EBE9E4] pb-2">
                      <span className="text-gray-500 font-medium">With Matching Jewelry</span>
                      <span className="text-lg font-bold text-[#D4AF37]">
                        ₹{Number(dress.price_with_jewelry).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="pt-1 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-[11px] text-gray-500 uppercase tracking-wide">Security Deposit</span>
                      </div>
                      <span className="font-medium text-gray-700">
                        ₹{Number(dress.security_deposit).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SIZES SECTION */}
                <div>
                  <h4 className="font-display text-sm text-[#4A4A4A] mb-2">Available Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizeList.map((size) => (
                      <span
                        key={size}
                        className="min-w-[3rem] h-9 flex items-center justify-center border border-gray-200 rounded text-xs font-medium text-gray-700 bg-white shadow-sm cursor-default"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {!isAvailable && dress.available_after && (
                   <div className="bg-red-50 rounded-lg p-3 flex items-center gap-3 border border-red-100">
                     <div className="bg-white p-1.5 rounded-full shadow-sm">
                       <Calendar className="h-4 w-4 text-red-600" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-red-800 uppercase tracking-wide">Currently Rented</p>
                       <p className="text-xs text-red-600 mt-0.5">
                         Available from <span className="font-semibold">{new Date(dress.available_after).toLocaleDateString('en-IN', {
                           day: 'numeric', month: 'short', year: 'numeric'
                         })}</span>
                       </p>
                     </div>
                   </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 mt-3 border-t border-gray-100 bg-white">
              <Button
                className="flex-1 bg-[#25D366] hover:bg-[#1ebc57] text-white border-none shadow-md h-10 text-sm font-semibold rounded-md"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Book via WhatsApp
              </Button>

              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black h-10 text-sm font-medium rounded-md"
                onClick={() => (window.location.href = 'tel:+917225994009')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DressDetailModal;