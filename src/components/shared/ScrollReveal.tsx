import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { usePreview } from '@/context/PreviewContext';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isPreview = usePreview();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // If in Preview Mode (detected via Context), bypass Framer Motion completely.
  // We use a plain div with opacity-100 to ensure content is visible.
  if (isPreview) {
    return (
      <div className={`${className} scroll-reveal-item opacity-100 flex-shrink-0`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} scroll-reveal-item`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;