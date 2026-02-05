import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout = ({ children, hideHeader = false, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
      {!hideFooter && <WhatsAppButton />}
    </div>
  );
};

export default Layout;