import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home', icon: '⚡' },
  { path: '/projects', label: 'Projects', icon: '💻' },
  { path: '/skills', label: 'Skills', icon: '🎯' },
  { path: '/articles', label: 'Articles', icon: '📝' },
  { path: '/profiles', label: 'Profiles', icon: '🏆' },
  { path: '/contact', label: 'Contact', icon: '✉️' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(false);
  }, [location]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="nav-container">
          {/* Logo */}
          <motion.div className="nav-logo" variants={itemVariants}>
            <Link to="/">
              <motion.span
                className="logo-text"
                animate={{
                  textShadow: [
                    '0 0 10px #00ff88',
                    '0 0 20px #00d4ff',
                    '0 0 10px #ff00ff',
                    '0 0 10px #00ff88',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                {'<JASS />'}
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul className="nav-links" variants={navVariants}>
            {navItems.map((item, index) => (
              <motion.li key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`nav-link ${activeIndex === index ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {activeIndex === index && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="nav-indicator"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <motion.button
            className={`mobile-menu-btn ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="mobile-menu-content">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={mobileItemVariants}
                    className="mobile-menu-item"
                  >
                    <Link
                      to={item.path}
                      className={`mobile-link ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mobile-icon">{item.icon}</span>
                      <span className="mobile-label">{item.label}</span>
                      <motion.span
                        className="mobile-arrow"
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
