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

  // Reset active image when the dress changes
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {dress.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* --- LEFT COLUMN: IMAGES --- */}
          <div>
            {/* MAIN IMAGE FRAME */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-border/50">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={dress.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300" 
                />
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge 
                  className={isAvailable ? "bg-accent text-primary" : "bg-burgundy text-cream"}
                >
                  {isAvailable ? 'Available' : 'Currently Rented'}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-card/90 backdrop-blur-sm capitalize border-none shadow-sm"
                >
                  {dress.dress_type}
                </Badge>
              </div>
            </div>

            {/* THUMBNAILS GRID */}
            {dress.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {dress.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative h-20 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img.url
                        ? 'border-accent shadow-md scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: DETAILS --- */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-base">
              {dress.description}
            </p>

            {/* PRICING CARD */}
            <div className="bg-secondary/30 border border-border/50 rounded-xl p-6 space-y-4">
              <h4 className="font-display text-lg text-foreground">
                Rental Pricing
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Outfit Only</span>
                  <span className="text-lg font-semibold text-foreground">
                    ₹{Number(dress.price_without_jewelry).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    With Matching Jewelry
                  </span>
                  <span className="text-lg font-bold text-accent">
                    ₹{Number(dress.price_with_jewelry).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3 border-t border-border/50 mt-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Security Deposit
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      ₹{Number(dress.security_deposit).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 ml-6">
                    Fully refundable upon safe return
                  </p>
                </div>
              </div>
            </div>

            {/* SIZE INFO */}
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wider">Available Size</h4>
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 border border-border text-sm font-medium">
                {dress.sizes}
              </div>
            </div>

            {/* DATE AVAILABILITY NOTICE */}
            {!isAvailable && dress.available_after && (
               <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                 <Calendar className="h-5 w-5 text-red-800 mt-0.5" />
                 <div>
                   <p className="font-medium text-red-900">Currently Rented</p>
                   <p className="text-sm text-red-700">
                     Available after{' '}
                     {new Date(dress.available_after).toLocaleDateString('en-IN', {
                       day: 'numeric',
                       month: 'long',
                       year: 'numeric',
                     })}
                   </p>
                 </div>
               </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-auto">
              <Button
                variant="whatsapp"
                size="lg"
                className="flex-1 shadow-sm"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Book via WhatsApp
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => (window.location.href = 'tel:+917225994009')}
              >
                <Phone className="h-5 w-5 mr-2" />
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