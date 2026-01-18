import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';
import { Dress } from '@/types/dress';

interface DressCardProps {
  dress: Dress;
  onViewDetails: (dress: Dress) => void;
}

const DressCard = ({ dress, onViewDetails }: DressCardProps) => {
  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in renting the "${dress.name}" from The Missing Fit.`;
    window.open(
      `https://wa.me/917225994009?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // ✅ Django backend image mapping
  const primaryImage = dress.images?.[0]?.url || '';

  const isAvailable = dress.status === 'available';

  return (
    <div className="group card-elegant overflow-hidden">
      {/* Image Container — EXACT OG SIZE */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {primaryImage && (
          <img
            src={primaryImage}
            alt={dress.name}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={
              isAvailable
                ? 'bg-accent text-primary'
                : 'bg-burgundy text-cream'
            }
          >
            {isAvailable ? 'Available' : 'Currently Rented'}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className="bg-card/80 backdrop-blur-sm capitalize"
          >
            {dress.dress_type}
          </Badge>
        </div>

        {/* Quick Actions Overlay — OG */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/90 via-chocolate/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full flex gap-2">
            <Button
              variant="hero"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(dress)}
            >
              View Details
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content — untouched */}
      <div className="p-5">
        <h3 className="font-display text-lg text-foreground mb-2 line-clamp-1">
          {dress.name}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {dress.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Without Jewelry</span>
            <span className="font-semibold text-foreground">
              ₹{Number(dress.price_without_jewelry).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">With Jewelry</span>
            <span className="font-semibold text-accent">
              ₹{Number(dress.price_with_jewelry).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm pt-2 border-t border-border">
            <span className="text-muted-foreground">Security Deposit</span>
            <span className="font-medium text-foreground">
              ₹{Number(dress.security_deposit).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressCard;
