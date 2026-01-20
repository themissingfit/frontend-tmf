import { Button } from '@/components/ui/button';
import { Heart, Recycle, DollarSign, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Give Your Outfit New Life',
    description: 'Your beautiful pieces deserve to be worn and celebrated again.',
  },
  {
    icon: Recycle,
    title: 'Sustainable Fashion',
    description: 'Join the movement towards conscious, sustainable fashion choices.',
  },
  {
    icon: DollarSign,
    title: 'Earn From Your Closet',
    description: 'Turn unused outfits into earnings while helping others look fabulous.',
  },
];

const ShareOutfitSection = () => {
  const handleContact = () => {
    const message = "Hi! I'd like to share my outfit with The Missing Fit. Can you tell me more about the process?";
    window.open(`https://wa.me/917225994009?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="share-outfit" className="py-12 md:py-20 bg-gradient-to-br from-cream via-champagne to-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Share Your <span className="text-gradient-gold">Beautiful Outfits</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg px-2">
              Have stunning pieces sitting in your wardrobe? Let them shine again. 
              We welcome women who wish to pass on their unused or once-worn outfits and jewelry.
            </p>
            <div className="section-divider mt-6" />
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="text-center p-6 rounded-2xl bg-card shadow-card hover:shadow-elegant transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10 mb-4">
                  <benefit.icon className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          {/* FIX: Reduced padding to p-4 for small mobile screens. Added overflow-hidden to contain children. */}
          <div className="bg-primary rounded-2xl p-4 sm:p-6 md:p-12 text-center shadow-2xl overflow-hidden">
            <h3 className="font-display text-2xl md:text-3xl text-cream mb-4">
              Ready to Share?
            </h3>
            <p className="text-cream/70 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
              We accept lehengas, sarees, gowns, and jewelry in excellent condition. 
              Reach out to us for a consultation — we'd love to see your pieces.
            </p>
            {/* FIX: Added 'whitespace-normal' and 'h-auto' to allow text to wrap on small screens. */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full md:w-auto whitespace-normal h-auto py-3 text-center" 
              onClick={handleContact}
            >
              <MessageCircle className="h-5 w-5 mr-2 shrink-0" />
              <span>Let's Talk About Your Outfit</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareOutfitSection;