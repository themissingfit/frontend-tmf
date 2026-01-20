import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  return (
    // FIX: Removed 'justify-center'. Used 'pt-32' to ensure content starts clearly below navbar.
    // Added 'pb-12' so content doesn't touch the bottom edge on scroll.
    <section className="relative min-h-[100dvh] h-auto flex flex-col justify-start md:justify-center overflow-hidden pt-32 pb-12 md:py-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-chocolate/95 via-chocolate/80 to-chocolate/40 md:to-chocolate/60" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-0 md:top-20 md:right-10 w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-0 md:bottom-20 md:left-10 w-32 h-32 md:w-48 md:h-48 bg-gold-light/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
            <span className="text-cream text-xs md:text-sm font-medium">Premium Fashion Rentals</span>
          </div>

          {/* Heading */}
          {/* FIX: Reduced base text size to text-3xl/4xl to fit small mobile screens better */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-4 md:mb-6 animate-slide-up">
            Because One Style is{' '}
            <span className="text-gradient-gold italic block md:inline mt-1 md:mt-0">Never Enough</span>
          </h1>

          {/* Subheading */}
          <p className="text-cream/80 text-sm sm:text-base md:text-xl leading-relaxed mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover a curated collection of exquisite lehengas, sarees, and Indo-western wear. 
            Look stunning for every occasion — without the commitment of ownership.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-slide-up w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#collection">
                Explore Collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#how-it-works">
                How It Works
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-cream/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-display text-accent">50+</p>
              <p className="text-cream/60 text-[10px] md:text-sm">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-display text-accent">50+</p>
              <p className="text-cream/60 text-[10px] md:text-sm">Designer Outfits</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-display text-accent">4.5★</p>
              <p className="text-cream/60 text-[10px] md:text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;