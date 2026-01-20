import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, AlertTriangle, Info, IndianRupee } from 'lucide-react';

// Hardcoded data with numeric values for cleaner handling
const customDamagePenalties = [
  {
    type: 'Minor Stain',
    price: 250,
    description: 'Small stains that can be removed with standard dry cleaning methods (e.g., food drops, light dirt).',
  },
  {
    type: 'Major Stain',
    price: 600,
    description: 'Stubborn stains requiring specialized treatment or multiple cleaning cycles (e.g., oil, wine, mud).',
  },
  {
    type: 'Tears & Rips',
    price: 1500,
    description: 'Visible tears in the fabric, lining, or seams that require professional mending.',
  },
  {
    type: 'Missing Jewelry / Embellishments',
    price: 500,
    perPiece: true, // Flag to show "per piece" text
    description: 'Loss of accompanying jewelry pieces (earrings, maang tikka, etc.) or significant loss of stone/sequin work.',
  },
  {
    type: 'Severe Damage',
    isSevere: true, // Flag for special "Actual Cost" handling
    description: 'Irreparable damage such as burns, large holes, or chemical stains that render the outfit unwearable.',
  },
];

const PoliciesSection = () => {
  return (
    <section id="policies" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Rental <span className="text-gradient-gold">Policies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in transparency. Here's everything you need to know about our rental terms, 
            security deposits, and damage policies.
          </p>
          <div className="section-divider mt-6" />
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Security Deposit */}
          <div className="card-elegant p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl text-foreground">Security Deposit</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Required at the time of booking confirmation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Amount varies based on outfit value (₹1,000 - ₹2,000)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Fully refundable within 3-5 business days after return inspection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Accepted via UPI, bank transfer, or cash</span>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="card-elegant p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Info className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl text-foreground">Important Notes</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Standard rental period is 3 days (pick-up day + event day + return day)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Extensions available at ₹300-₹1,500 per additional day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Professional dry cleaning is included in the rental</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Please avoid perfumes, deodorants, and makeup near the outfit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Damage Penalties */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="card-elegant p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-burgundy/10">
                <AlertTriangle className="h-6 w-6 text-burgundy" />
              </div>
              <h3 className="font-display text-xl text-foreground">Damage Penalty Structure</h3>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {customDamagePenalties.map((penalty, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-center justify-between flex-1 pr-4">
                      <span className="font-medium text-foreground text-lg">{penalty.type}</span>
                      
                      {/* PRICE DISPLAY FIX */}
                      <span className="flex items-center gap-1 font-bold text-accent whitespace-nowrap">
                        {penalty.isSevere ? (
                          <span>Actual Cost</span>
                        ) : (
                          <>
                            {/* Using Icon for Rupee to ensure visibility */}
                            <IndianRupee className="h-4 w-4" strokeWidth={2.5} />
                            <span>{penalty.price?.toLocaleString()}</span>
                            {penalty.perPiece && <span className="text-xs font-normal text-muted-foreground ml-1">per piece</span>}
                          </>
                        )}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {penalty.description}
                    {penalty.isSevere && (
                      <p className="mt-2 text-burgundy font-medium bg-burgundy/5 p-3 rounded-md">
                        Charges will be equivalent to the full outfit purchase price.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-6 text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg border border-border/50">
              <strong className="text-foreground">Note:</strong> All damages are assessed upon return. 
              Any applicable charges will be deducted from your security deposit. 
              If damages exceed the deposit amount, the balance will need to be paid before future rentals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliciesSection;