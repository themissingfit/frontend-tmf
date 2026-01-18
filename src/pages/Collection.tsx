import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DressCard from '@/components/DressCard';
import DressDetailModal from '@/components/DressDetailModal';
import { Dress } from '@/types/dress';

const categories = [
  { id: 'all', name: 'All Collections' },
  { id: 'lehenga', name: 'Lehengas' },
  { id: 'saree', name: 'Sarees' },
  { id: 'indo-western', name: 'Indo-Western' },
  { id: 'anarkali', name: 'Anarkalis' },
  { id: 'gown', name: 'Gowns' },
  { id: 'sharara', name: 'Sharars' },
];

const ITEMS_PER_LOAD = 9;

const Collection = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dresses/')
      .then((res) => res.json())
      .then(setDresses)
      .catch(console.error);
  }, []);

  const filtered =
    activeCategory === 'all'
      ? dresses
      : dresses.filter((d) => d.dress_type === activeCategory);

  const visibleDresses = filtered.slice(0, visibleCount);

  const canLoadMore = visibleCount < filtered.length;

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            Explore <span className="text-gradient-gold">Our Collection</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete range of outfits curated for every occasion.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? 'gold' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveCategory(c.id);
                setVisibleCount(ITEMS_PER_LOAD);
              }}
            >
              {c.name}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDresses.map((dress) => (
            <DressCard
              key={dress.id}
              dress={dress}
              onViewDetails={setSelectedDress}
            />
          ))}
        </div>

        {/* Load More */}
        {canLoadMore && (
          <div className="flex justify-center mt-14">
            <Button
              variant="gold"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
            >
              Load More
            </Button>
          </div>
        )}

        {/* Modal */}
        <DressDetailModal
          dress={selectedDress}
          isOpen={!!selectedDress}
          onClose={() => setSelectedDress(null)}
        />
      </div>
    </section>
  );
};

export default Collection;
