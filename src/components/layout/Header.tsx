import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSubmenuOpen(false);
  }, [location]);

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { 
      name: 'Seguros', 
      submenu: [
        { name: 'Seguro de Edificio', path: '/seguros/edificio' },
        { name: 'Vida Guardias DS-93', path: '/seguros/guardias' },
      ]
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-md' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logo} 
                alt="Seguros Gaete" 
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                item.submenu ? (
                  <div key={item.name} className="relative group">
                    <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-card rounded-lg shadow-elevated border border-border py-2 min-w-[220px]">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-4 py-3 text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path!}
                    className="text-foreground hover:text-primary transition-colors font-medium link-underline"
                  >
                    {item.name}
                  </Link>
                )
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{CONTACT.phones[0]}</span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background z-50 lg:hidden shadow-2xl"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <img src={logo} alt="Seguros Gaete" className="h-8" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-foreground hover:text-primary"
                    aria-label="Cerrar menú"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      item.submenu ? (
                        <div key={item.name}>
                          <button
                            onClick={() => setSubmenuOpen(!submenuOpen)}
                            className="flex items-center justify-between w-full py-3 px-4 text-foreground hover:bg-primary/5 rounded-lg transition-colors font-medium"
                          >
                            {item.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {submenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="block py-3 px-4 text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={item.path}
                          to={item.path!}
                          className="block py-3 px-4 text-foreground hover:bg-primary/5 rounded-lg transition-colors font-medium"
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-border space-y-3" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 w-full border border-primary text-primary py-3 rounded-lg font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    {CONTACT.phones[0]}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;