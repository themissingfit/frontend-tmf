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

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* IMAGE SECTION */}
          <div>
            {/* MAIN IMAGE (FIXED – SAME AS OG) */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={dress.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-accent text-primary">Available</Badge>
                <Badge
                  variant="outline"
                  className="bg-card/80 backdrop-blur-sm capitalize"
                >
                  {dress.dress_type}
                </Badge>
              </div>
            </div>

            {/* THUMBNAILS */}
            {dress.images?.length > 1 && (
              <div className="flex gap-2 mt-4">
                {dress.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img.url)}
                    className={`h-20 w-14 rounded-lg overflow-hidden border transition
                      ${
                        activeImage === img.url
                          ? 'border-accent'
                          : 'border-border'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS (UNCHANGED) */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {dress.description}
            </p>

            <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
              <h4 className="font-display text-lg text-foreground">
                Rental Pricing
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Outfit Only</span>
                  <span className="text-xl font-semibold">
                    ₹{Number(dress.price_without_jewelry).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    With Matching Jewelry
                  </span>
                  <span className="text-xl font-semibold text-accent">
                    ₹{Number(dress.price_with_jewelry).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Security Deposit
                      </span>
                    </div>
                    <span>
                      ₹{Number(dress.security_deposit).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fully refundable upon safe return
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="whatsapp"
                size="lg"
                className="flex-1"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => (window.location.href = 'tel:+917225994009')}
              >
                <Phone className="h-5 w-5" />
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
