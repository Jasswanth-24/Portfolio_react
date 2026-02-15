import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <svg viewBox="0 0 50 50" className="cursor-svg">
          <motion.circle
            cx="25"
            cy="25"
            r="8"
            fill="none"
            stroke="url(#cursor-gradient)"
            strokeWidth="2"
            animate={{
              r: isHovering ? 15 : 8,
              strokeWidth: isClicking ? 3 : 2,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.circle
            cx="25"
            cy="25"
            r="3"
            fill="url(#cursor-gradient)"
            animate={{
              r: isClicking ? 5 : 3,
            }}
            transition={{ duration: 0.1 }}
          />
          <defs>
            <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cursor trail ring */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="ring-inner"
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? '#ff00ff' : '#00ff88',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Animated particles around cursor */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="cursor-particle"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.2,
          }}
        >
          <motion.span
            style={{
              transform: `rotate(${i * 90}deg) translateX(${isHovering ? 25 : 18}px)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export default CustomCursor;
