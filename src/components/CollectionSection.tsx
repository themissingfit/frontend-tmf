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
    <section id="collection" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            Our <span className="text-gradient-gold">Curated Collection</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </Button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDresses.map((dress) => (
            <DressCard
              key={dress.id}
              dress={dress}
              onViewDetails={setSelectedDress}
            />
          ))}
        </div>

        {/* View Full Collection */}
        {dresses.length > HOME_LIMIT && (
          <div className="text-center mt-14">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 text-base rounded-full border-accent text-accent hover:bg-accent hover:text-primary transition-all"
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
