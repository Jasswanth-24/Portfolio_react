import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 30,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    y: -30,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const overlayVariants = {
  initial: {
    scaleX: 1,
  },
  animate: {
    scaleX: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  exit: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        style={{ minHeight: '100vh' }}
      >
        {/* Page transition overlays */}
        <motion.div
          className="page-transition-overlay"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff00ff 100%)',
            transformOrigin: 'right',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          className="page-transition-overlay-2"
          initial={{ scaleX: 1 }}
          animate={{ 
            scaleX: 0,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            },
          }}
          exit={{ 
            scaleX: 1,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            },
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--bg-dark)',
            transformOrigin: 'right',
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
