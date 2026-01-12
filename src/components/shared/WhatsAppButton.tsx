import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}?text=Hola, necesito información sobre seguros`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-shadow"
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        right: 'max(1.5rem, env(safe-area-inset-right))',
      }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Habla con un ejecutivo por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8" />
    </motion.a>
  );
};

export default WhatsAppButton;