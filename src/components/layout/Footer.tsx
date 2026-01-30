import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { CONTACT, COMPANY } from '@/config/contact';
import logoHorizontal from '@/assets/logo-horizontal-blanco.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16 border-b border-background/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Column 1: Logo y descripción - Wider column for logo */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-start">
              <img
                src={logoHorizontal}
                alt="Seguros Gaete"
                className="h-24 lg:h-32 w-auto object-contain -ml-2"
              />
            </div>
            <div className="space-y-4 max-w-sm">
              <p className="text-secondary-foreground/90 text-lg lg:text-xl font-medium leading-relaxed">
                {COMPANY.tagline}
              </p>
              <p className="text-background/60 text-sm">
                {CONTACT.registration}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 2: Enlaces Rápidos */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-primary-light uppercase tracking-wider">Enlaces</h4>
              <nav className="space-y-4">
                <Link to="/" className="block text-background/70 hover:text-white transition-colors">
                  Inicio
                </Link>
                <Link to="/seguros/edificio" className="block text-background/70 hover:text-white transition-colors">
                  Seguro de Edificio
                </Link>
                <Link to="/seguros/guardias" className="block text-background/70 hover:text-white transition-colors">
                  Vida Guardias DS-93
                </Link>
              </nav>
            </div>

            {/* Column 3: Contacto */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-primary-light uppercase tracking-wider">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-light flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    {CONTACT.addresses.map((addr, index) => (
                      <span key={index} className="block text-background/70 text-sm leading-snug">{addr}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-light flex-shrink-0" />
                  <div className="space-y-1">
                    <a
                      href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                      className="block text-background/70 hover:text-white text-sm transition-colors"
                    >
                      {CONTACT.phones[0]}
                    </a>
                    <a
                      href={`tel:${CONTACT.phones[1].replace(/\s/g, '')}`}
                      className="block text-background/70 hover:text-white text-sm transition-colors"
                    >
                      {CONTACT.phones[1]}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-light flex-shrink-0" />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-background/70 hover:text-white text-sm transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-light flex-shrink-0 mt-1" />
                  <span className="text-background/70 text-sm leading-snug">{CONTACT.schedule}</span>
                </div>
              </div>
            </div>

            {/* Column 4: Redes Sociales */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-primary-light uppercase tracking-wider">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-background/40 text-sm">
          © {currentYear} {COMPANY.name}. Todos los derechos reservados.
        </p>
        <Link to="/admin/login" className="text-background/30 hover:text-white text-xs transition-colors opacity-70 hover:opacity-100">
          Acceso Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;