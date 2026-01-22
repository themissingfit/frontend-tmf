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

  const primaryImage = dress.images?.[0]?.url || '';
  const isAvailable = dress.status === 'available';

  // --- HELPER: Turn "S, M, L" or ["S", "M"] into ['S', 'M'] ---
  const getSizeArray = (sizes: string | string[]): string[] => {
    // 1. If it's already an array, return it
    if (Array.isArray(sizes)) return sizes;

    // 2. If it's a string, clean it and split it
    if (typeof sizes === 'string') {
      // Check for JSON format "['S', 'L']"
      if (sizes.trim().startsWith('[')) {
        try {
          return sizes.replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
        } catch (e) {
          return [sizes];
        }
      }
      // Standard comma format "S, M, L"
      return sizes.split(',').map(s => s.trim());
    }
    return ['Free Size'];
  };

  const sizeList = getSizeArray(dress.sizes);
  // -------------------------------------------------------------

  return (
    <div className="group card-elegant overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {primaryImage && (
          <img
            src={primaryImage}
            alt={dress.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

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

        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className="bg-card/80 backdrop-blur-sm capitalize"
          >
            {dress.dress_type}
          </Badge>
        </div>

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

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display text-lg text-foreground mb-2 line-clamp-1">
          {dress.name}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {dress.description}
        </p>

        {/* --- UPDATED SIZE SECTION --- */}
        <div className="flex flex-col gap-3 mb-4 mt-auto">
          
          {/* 1. SIZES ROW (Rendered as distinct blocks) */}
          <div className="flex items-center gap-2">
             <span className="text-xs text-muted-foreground">Sizes:</span>
             <div className="flex gap-1.5 flex-wrap">
               {sizeList.map((size, index) => (
                 <span 
                   key={index} 
                   // This styling creates the small beige box look from your reference
                   className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#F5F5F4] text-[#44403C] border border-[#E7E5E4]"
                 >
                   {size}
                 </span>
               ))}
             </div>
          </div>

          {/* 2. DATE ROW (Only if rented) */}
          {dress.available_after && (
            <div className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded bg-red-50 border border-red-100 text-xs font-medium text-red-800 w-fit">
              <Calendar className="h-3 w-3" />
              <span>
                Available after: {new Date(dress.available_after).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>
        {/* --------------------------- */}

        <div className="space-y-2 mb-1 pt-2 border-t border-border">
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

          <div className="flex justify-between items-center text-sm pt-2 border-t border-dashed border-border">
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