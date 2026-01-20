import { Search, Calendar, Sparkles, Truck, RotateCcw } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse & Choose',
    description: 'Explore our curated collection and find the perfect outfit for your occasion.',
  },
  {
    icon: Calendar,
    title: 'Book Your Dates',
    description: 'Select your rental period and confirm availability via WhatsApp or call.',
  },
  {
    icon: Truck,
    title: 'Try & Enjoy',
    description: 'Receive your outfit, try it on, and shine at your event with confidence.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Return the outfit after your event. Security deposit refunded upon safe return.',
  },
];

const HowItWorksSection = () => {
  return (
    // FIX: Reduced padding from py-20 to py-12 for mobile to save space
    <section id="how-it-works" className="py-12 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-cream/10 rounded-full px-4 py-2 mb-4 md:mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-cream text-sm font-medium">Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            How <span className="text-gradient-gold">Renting Works</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-sm md:text-base px-2">
            We've made fashion rental as simple as possible. No complicated processes, just style delivered to you.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative text-center group"
            >
              {/* Connector Line (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              )}
              
              {/* Icon */}
              {/* FIX: Slightly smaller icon container on mobile if needed, but 24/24 is fine. Adjusted margins. */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/20 border-2 border-accent mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="h-8 w-8 md:h-10 md:w-10 text-accent" />
                <span className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent text-primary font-bold text-xs md:text-sm flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg md:text-xl text-cream mb-2 md:mb-3">{step.title}</h3>
              <p className="text-cream/60 leading-relaxed text-sm md:text-base px-4 md:px-0">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;