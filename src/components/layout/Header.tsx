import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import logo from '@/assets/logo-horizontal-color.png';
import { useQuery } from '@tanstack/react-query';
import { landingService } from '@/services/api';

const DesktopMenuItem = ({ item }: { item: any }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  if (!hasSubmenu) {
    return (
      <Link
        to={item.path || '#'}
        className="text-foreground hover:text-primary transition-colors font-medium link-underline"
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium py-2">
        {item.name}
        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-max">
        <div className="bg-white rounded-lg shadow-xl border border-border py-2 min-w-[220px]">
          {item.submenu.map((subItem: any, idx: number) => {
            // Check for Level 3
            if (subItem.submenu && subItem.submenu.length > 0) {
              return (
                <div key={idx} className="relative group/sub px-4 py-3 hover:bg-slate-50">
                  <button className="flex items-center justify-between w-full text-foreground hover:text-primary">
                    <span>{subItem.name}</span>
                    <span className="ml-2">›</span>
                  </button>
                  {/* Level 3 Dropdown */}
                  <div className="absolute left-full top-0 ml-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-xl border border-border py-2 min-w-[220px]">
                      {subItem.submenu.map((lvl3: any, i: number) => (
                        <Link
                          key={i}
                          to={lvl3.path || '#'}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-slate-50"
                        >
                          {lvl3.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={idx}
                to={subItem.path || '#'}
                className="block px-4 py-3 text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {subItem.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const { data: menuConfig } = useQuery({
    queryKey: ['menu'],
    queryFn: landingService.getMenu
  });

  // Default menu if API fails or is empty, ensuring 'Seguros' exists
  const defaultItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Seguros', href: '#', items: [] },
    { label: 'Contacto', href: '/#contacto' }
  ];

  const rawItems = (menuConfig?.items && menuConfig.items.length > 0) ? menuConfig.items : defaultItems;

  // Map API structure (label/href/items) to Component structure (name/path/submenu)
  // The API sends { label, href, items: [] }
  // The Component expects { name, path, submenu: [] } based on original code
  // Let's adapt here or change component to use API keys. 
  // Changing strict keys is better for long term, but let's map for minimal regression risk to existing styles.
  // Recursive mapping function
  const mapMenuItem = (item: any): any => ({
    name: item.label,
    path: item.href,
    submenu: item.items && item.items.length > 0 ? item.items.map(mapMenuItem) : undefined
  });

  const menuItems = rawItems.map(mapMenuItem);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [location]);


  const handleSubmenuToggle = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-background/80 backdrop-blur-sm'
          }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Seguros Gaete"
                className="h-14 lg:h-20 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {/* {console.log("Rendering Menu Items:", menuItems)} */}
              {menuItems.map((item: any, index: number) => (
                <DesktopMenuItem key={index} item={item} />
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 ml-4">
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
                  className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20BD5A] transition-colors font-medium"
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
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-background z-50 lg:hidden shadow-2xl"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <img src={logo} alt="Seguros Gaete" className="h-12" />
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
                  <div className="space-y-1">
                    {menuItems.map((item: any) => (
                      item.submenu ? (
                        <div key={item.name}>
                          <button
                            onClick={() => handleSubmenuToggle(item.name)}
                            className="flex items-center justify-between w-full py-3 px-4 text-foreground hover:bg-primary/5 rounded-lg transition-colors font-medium"
                          >
                            {item.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {item.submenu.map((subItem: any) => (
                                  subItem.submenu ? (
                                    <div key={subItem.name} className="pl-4">
                                      <div className="py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        {subItem.name}
                                      </div>
                                      {subItem.submenu.map((lvl3: any) => (
                                        <Link
                                          key={lvl3.path + lvl3.name}
                                          to={lvl3.path || '#'}
                                          className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors text-sm border-l border-border ml-1"
                                        >
                                          {lvl3.name}
                                        </Link>
                                      ))}
                                    </div>
                                  ) : (
                                    <Link
                                      key={subItem.path + subItem.name}
                                      to={subItem.path || '#'}
                                      className="block py-3 px-4 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  )
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={item.path}
                          to={item.path || '#'}
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
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 w-full border border-primary text-primary py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
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
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;