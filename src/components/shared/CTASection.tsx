import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  showWhatsApp?: boolean;
}

const CTASection = ({
  title = "¿Listo para proteger lo que más valoras?",
  description = "Cotiza sin compromiso y encuentra el seguro perfecto para tus necesidades",
  primaryButtonText = "Solicitar cotización",
  primaryButtonLink = "/seguros/edificio",
  showWhatsApp = true,
}: CTASectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 w-full sm:w-auto"
            >
              <Link to={primaryButtonLink}>
                {primaryButtonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            {showWhatsApp && (
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BD5A] w-full sm:w-auto"
              >
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp {CONTACT.phones[0]}
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;