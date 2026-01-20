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

  const sizeList = dress.sizes 
    ? (Array.isArray(dress.sizes) ? dress.sizes : dress.sizes.split(',').map(s => s.trim()))
    : ['Free Size'];

  // Mobile buttons: Kept exactly as requested (h-11, text-sm)
  const ActionButtons = () => (
    <div className="flex gap-3 w-full">
      <Button 
        className="flex-1 bg-[#25D366] hover:bg-[#1ebc57] text-white shadow-md h-11 text-sm font-semibold rounded-lg" 
        onClick={handleWhatsApp}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Book via WhatsApp
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 border-gray-300 text-gray-700 h-11 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-black" 
        onClick={() => window.location.href = 'tel:+917225994009'}
      >
        <Phone className="h-4 w-4 mr-2" />
        Call Now
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* LAYOUT STRATEGY:
         Mobile: Fixed height (max-h-[92vh]), Flex col, internal scroll.
         Desktop: Auto height (fit content), Max width reduced for "Card" feel, No internal scroll bar.
      */}
      <DialogContent className="
        w-[95vw] bg-white rounded-xl shadow-2xl border-none gap-0 outline-none p-0
        max-h-[92vh] overflow-hidden flex flex-col
        md:max-w-[900px] md:h-auto md:block md:overflow-visible
      ">
        
        {/* DESKTOP TITLE: Sits at the very top, above columns. Hidden on mobile to preserve mobile flow. */}
        <div className="hidden md:block p-6 pb-2">
           <DialogTitle className="font-display text-3xl text-[#2D2D2D] tracking-tight">
              {dress.name}
           </DialogTitle>
        </div>

        {/* WRAPPER:
           Mobile: Flex Col (Image -> Details).
           Desktop: Flex Row (Image Left | Details Right).
        */}
        <div className="
          flex-1 flex flex-col overflow-y-auto custom-scrollbar
          md:flex-row md:p-6 md:pt-2 md:gap-8 md:overflow-visible md:h-auto
        ">
          
          {/* ================= LEFT COLUMN (IMAGES) ================= */}
          <div className="
            w-full bg-gray-50 flex flex-col shrink-0 relative
            md:w-[40%] md:bg-transparent md:block
          ">
            
            {/* MAIN IMAGE */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 group md:rounded-xl">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={dress.name}
                  className="w-full h-full object-cover object-top"
                />
              )}
              
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <Badge 
                  className={isAvailable 
                    ? "bg-[#F59E0B] text-white border-none shadow-sm px-3 py-1" 
                    : "bg-burgundy text-cream border-none shadow-sm px-3 py-1"
                  }
                >
                  {isAvailable ? 'Available Now' : 'Rented'}
                </Badge>
                {dress.dress_type && (
                   <Badge variant="secondary" className="bg-white/90 backdrop-blur text-black capitalize shadow-sm px-3 py-1">
                      {dress.dress_type}
                   </Badge>
                )}
              </div>
            </div>

            {/* THUMBNAILS - Desktop: Hidden or Small underneath? Kept basic to match "Blush Pink" card style */}
            {dress.images?.length > 1 && (
              <div 
                className="flex p-4 bg-white border-t border-gray-100 gap-3 overflow-x-auto justify-start md:justify-center whitespace-nowrap shrink-0 z-10 md:border-none md:p-0 md:mt-3 md:justify-start"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {dress.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative h-16 w-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === img.url 
                        ? 'border-gray-800 opacity-100 scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                  >
                    <img 
                      src={img.url} 
                      alt={`View ${index + 1}`} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN (DETAILS) ================= */}
          <div className="
            flex-1 flex flex-col bg-white
            md:w-[60%] md:block md:h-auto
          ">
            
            {/* CONTENT */}
            <div className="p-6 space-y-6 flex-grow md:p-0 md:space-y-5">
              
              {/* MOBILE TITLE: Visible only on mobile, keeping your original phone layout */}
              <div className="md:hidden">
                <DialogHeader className="p-0 space-y-1 text-left">
                  <DialogTitle className="font-display text-3xl text-[#2D2D2D] tracking-tight">
                    {dress.name}
                  </DialogTitle>
                </DialogHeader>
              </div>

              <p className="text-gray-500 text-sm md:text-sm leading-relaxed">
                {dress.description}
              </p>

              {/* Pricing Box */}
              <div className="bg-[#F9F8F6] rounded-xl p-5 border border-[#EBE9E4] space-y-3">
                <h4 className="font-display text-base text-[#4A4A4A]">Rental Pricing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center border-b border-[#EBE9E4] pb-2">
                    <span className="text-gray-500 font-medium">Outfit Only</span>
                    <span className="font-bold text-gray-900 text-base">
                      ₹{Number(dress.price_without_jewelry).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#EBE9E4] pb-2">
                    <span className="text-gray-500 font-medium">With Matching Jewelry</span>
                    <span className="font-bold text-[#D4AF37] text-base">
                      ₹{Number(dress.price_with_jewelry).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-1 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-xs uppercase tracking-wide text-gray-500">Security Deposit</span>
                    </div>
                    <span className="font-medium text-gray-700">
                      ₹{Number(dress.security_deposit).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 pl-6">
                    Fully refundable upon safe return
                  </p>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-display text-sm text-[#4A4A4A] mb-2">Available Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {sizeList.map((size, i) => (
                    <span 
                      key={i} 
                      className="min-w-[3rem] h-9 flex items-center justify-center border border-gray-200 rounded-md text-xs font-medium text-gray-700 bg-white shadow-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Date Notice */}
              {!isAvailable && dress.available_after && (
                 <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3 border border-red-100">
                   <div className="bg-white p-1.5 rounded-full shadow-sm">
                      <Calendar className="h-4 w-4 text-red-600" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-red-800 uppercase tracking-wide">Currently Rented</p>
                     <p className="text-xs text-red-600 mt-0.5">
                       Available from <span className="font-semibold">{new Date(dress.available_after).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                     </p>
                   </div>
                 </div>
              )}

              {/* DESKTOP BUTTONS: Inline to match card layout */}
              <div className="hidden md:flex gap-3 pt-2">
                 <ActionButtons />
              </div>

              {/* Mobile spacer for sticky footer */}
              <div className="h-24 md:hidden"></div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY FOOTER */}
        <div className="md:hidden p-4 border-t border-gray-100 bg-white z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           <ActionButtons />
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default DressDetailModal;