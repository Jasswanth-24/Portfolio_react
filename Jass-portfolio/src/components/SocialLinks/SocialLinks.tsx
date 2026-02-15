import { motion } from 'framer-motion';
import './SocialLinks.css';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/Jasswanth-24',
    color: '#6e5494',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/jasswanth-s',
    color: '#0077b5',
  },
  {
    name: 'Instagram',
    icon: '📸',
    url: 'https://www.instagram.com/jass_.aesthetic?igsh=MTQ0N2Z4ZTNzZ3F5eQ==',
    color: '#e4405f',
  },
];

const SocialLinks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="social-links-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="social-title">Connect With Me</h3>
      <div className="social-links">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link hoverable"
            variants={itemVariants}
            whileHover={{
              scale: 1.2,
              rotate: 10,
              boxShadow: `0 0 30px ${link.color}80`,
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              '--social-color': link.color,
            } as React.CSSProperties}
          >
            <motion.span
              className="social-icon"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {link.icon}
            </motion.span>
            <span className="social-name">{link.name}</span>
            <motion.div
              className="social-glow"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;
