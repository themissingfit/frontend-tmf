import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DressCard from './DressCard';
import DressDetailModal from './DressDetailModal';
import { Dress } from '@/types/dress';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/api';

const categories = [
  { id: 'all', name: 'All Collections' },
  { id: 'lehenga', name: 'Lehengas' },
  { id: 'saree', name: 'Sarees' },
  { id: 'indo-western', name: 'Indo-Western' },
  { id: 'anarkali', name: 'Anarkalis' },
  { id: 'gown', name: 'Gowns' },
  { id: 'sharara', name: 'Sharars' },
];

const HOME_LIMIT = 8;

const CollectionSection = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/dresses/`)
      .then((res) => res.json())
      .then(setDresses)
      .catch(console.error);
  }, []);

  const filtered =
    activeCategory === 'all'
      ? dresses
      : dresses.filter((d) => d.dress_type === activeCategory);

  const visibleDresses = filtered.slice(0, HOME_LIMIT);

  return (
    <section id="collection" className="py-12 md:py-20 bg-background">
      {/* Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading: Smaller on mobile, larger on desktop */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Our <span className="text-gradient-gold">Curated Collection</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Discover outfits crafted for your perfect moment.
          </p>
        </div>

        {/* Category Filters: Horizontal scroll on mobile for better UX */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(c.id)}
              className="text-xs md:text-sm px-3 md:px-4"
            >
              {c.name}
            </Button>
          ))}
        </div>

        {/* Cards Grid: 1 col (mobile) -> 2 cols (tablet) -> 3 cols (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleDresses.map((dress) => (
            <DressCard
              key={dress.id}
              dress={dress}
              onViewDetails={setSelectedDress}
            />
          ))}
        </div>

        {/* View Full Collection Button */}
        {dresses.length > HOME_LIMIT && (
          <div className="text-center mt-10 md:mt-14">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 py-6 text-base rounded-full border-accent text-accent hover:bg-accent hover:text-primary transition-all"
              onClick={() => navigate('/collection')}
            >
              View Full Collection
            </Button>
          </div>
        )}

        {/* Detail Modal */}
        <DressDetailModal
          dress={selectedDress}
          isOpen={!!selectedDress}
          onClose={() => setSelectedDress(null)}
        />
      </div>
    </section>
  );
};

export default CollectionSection;