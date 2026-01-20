import { motion } from 'framer-motion';
import { INSURANCE_PARTNERS } from '@/config/contact';

const PartnerMarquee = () => {
  // Duplicate the array for seamless infinite scroll
  const duplicatedPartners = [...INSURANCE_PARTNERS, ...INSURANCE_PARTNERS];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-8 lg:gap-12"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 h-14 w-32 lg:h-16 lg:w-40 flex items-center justify-center bg-card rounded-lg px-4"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-10 lg:max-h-12 w-auto max-w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PartnerMarquee;
