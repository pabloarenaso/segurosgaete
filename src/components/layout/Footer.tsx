import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { CONTACT, COMPANY } from '@/config/contact';
import logoHorizontal from '@/assets/logo-horizontal-blanco.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo y descripción */}
          <div className="space-y-4">
            <img 
              src={logoHorizontal} 
              alt="Seguros Gaete" 
              className="h-8 md:h-10 w-auto"
            />
            <p className="text-background/80 text-sm leading-relaxed">
              {COMPANY.tagline}
            </p>
            <p className="text-background/60 text-sm">
              {CONTACT.registration}
            </p>
          </div>

          {/* Column 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-background/80 hover:text-background transition-colors">
                Inicio
              </Link>
              <Link to="/seguros/edificio" className="block text-background/80 hover:text-background transition-colors">
                Seguro de Edificio
              </Link>
              <Link to="/seguros/guardias" className="block text-background/80 hover:text-background transition-colors">
                Vida Guardias DS-93
              </Link>
            </nav>
          </div>

          {/* Column 3: Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-light flex-shrink-0 mt-0.5" />
                <span className="text-background/80 text-sm">{CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-light flex-shrink-0" />
                <div className="space-y-1">
                  <a 
                    href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                    className="block text-background/80 hover:text-background text-sm transition-colors"
                  >
                    {CONTACT.phones[0]}
                  </a>
                  <a 
                    href={`tel:${CONTACT.phones[1].replace(/\s/g, '')}`}
                    className="block text-background/80 hover:text-background text-sm transition-colors"
                  >
                    {CONTACT.phones[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-light flex-shrink-0" />
                <a 
                  href={`mailto:${CONTACT.email}`}
                  className="text-background/80 hover:text-background text-sm transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-light flex-shrink-0 mt-0.5" />
                <span className="text-background/80 text-sm">{CONTACT.schedule}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Redes Sociales */}
          <div>
            <h4 className="font-bold text-lg mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-background/60 text-sm">
            © {currentYear} {COMPANY.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;