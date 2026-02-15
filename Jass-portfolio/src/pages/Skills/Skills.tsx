import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'Angular', level: 95, icon: '🅰️', color: '#dd0031', category: 'Frontend' },
  { name: 'TypeScript', level: 90, icon: '📘', color: '#3178c6', category: 'Frontend' },
  { name: 'Three.js', level: 85, icon: '🎮', color: '#00ff88', category: 'Frontend' },
  { name: 'CSS/SCSS', level: 92, icon: '🎨', color: '#cc6699', category: 'Frontend' },
  
  // Backend
  { name: '.NET/C#', level: 90, icon: '🔷', color: '#512bd4', category: 'Backend' },
  { name: 'PostgreSQL', level: 85, icon: '🐘', color: '#336791', category: 'Backend' },
  
  // Tools
  { name: 'Git', level: 92, icon: '🔀', color: '#f05032', category: 'Tools' },
  { name: 'Visual Studio', level: 90, icon: '💜', color: '#5c2d91', category: 'Tools' },
  { name: 'GitHub', level: 88, icon: '🐙', color: '#6e5494', category: 'Tools' },
  { name: 'AI Copilot', level: 85, icon: '🤖', color: '#00d4ff', category: 'Tools' },
  { name: 'VS Code', level: 95, icon: '💻', color: '#007acc', category: 'Tools' },
];

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

// Skill Card Component
const SkillCard = ({ skill, index, immediate = false }: { skill: Skill; index: number; immediate?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldAnimate = immediate || isInView;

  useEffect(() => {
    if (shouldAnimate) {
      controls.start('visible');
    }
  }, [shouldAnimate, controls]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 12,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`skill-card glass-card hoverable ${isHovered ? 'hovered' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{ '--skill-color': skill.color } as React.CSSProperties}
    >
      {/* Icon */}
      <motion.div
        className="skill-icon"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {skill.icon}
      </motion.div>

      {/* Name */}
      <h3 className="skill-name">{skill.name}</h3>

      {/* Progress Ring */}
      <div className="skill-progress-ring">
        <svg viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={skill.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={shouldAnimate ? { 
              strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.level / 100) 
            } : {}}
            transition={{ duration: 1.5, delay: index * 0.05, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 10px ${skill.color})`,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        <div className="skill-percentage">
          <AnimatedCounter target={skill.level} />%
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="skill-glow"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Skill Bar Component
const SkillBar = ({ skill, index, immediate = false }: { skill: Skill; index: number; immediate?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldAnimate = immediate || isInView;

  return (
    <motion.div
      ref={ref}
      className="skill-bar-item"
      initial={{ opacity: 0, x: -50 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="skill-bar-header">
        <span className="skill-bar-icon">{skill.icon}</span>
        <span className="skill-bar-name">{skill.name}</span>
        <span className="skill-bar-level">
          <AnimatedCounter target={skill.level} />%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={shouldAnimate ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          style={{ 
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 20px ${skill.color}50`,
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'bars'>('cards');
  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <div className="skills-page page-container grid-pattern">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">My Skills</h1>
        <p className="skills-subtitle">
          Technologies and tools I work with
        </p>

        {/* View Toggle */}
        <div className="view-toggle">
          <motion.button
            className={`toggle-btn hoverable ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🎴</span> Cards
          </motion.button>
          <motion.button
            className={`toggle-btn hoverable ${viewMode === 'bars' ? 'active' : ''}`}
            onClick={() => setViewMode('bars')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📊</span> Bars
          </motion.button>
        </div>
      </motion.div>

      {viewMode === 'cards' ? (
        // Cards View
        <div className="skills-cards-container">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={catIndex === 0 ? { opacity: 1, y: 0 } : undefined}
              whileInView={catIndex === 0 ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            >
              <motion.h2
                className="category-title"
                initial={{ opacity: 0, x: -30 }}
                animate={catIndex === 0 ? { opacity: 1, x: 0 } : undefined}
                whileInView={catIndex === 0 ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.2 + 0.1 }}
              >
                <span className="category-icon">
                  {category === 'Frontend' ? '🎨' : category === 'Backend' ? '⚙️' : '🛠️'}
                </span>
                {category}
              </motion.h2>
              <div className="skills-grid">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} immediate={catIndex === 0} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Bars View
        <div className="skills-bars-container">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={catIndex === 0 ? { opacity: 1, y: 0 } : undefined}
              whileInView={catIndex === 0 ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            >
              <motion.h2
                className="category-title"
                initial={{ opacity: 0, x: -30 }}
                animate={catIndex === 0 ? { opacity: 1, x: 0 } : undefined}
                whileInView={catIndex === 0 ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.2 + 0.1 }}
              >
                <span className="category-icon">
                  {category === 'Frontend' ? '🎨' : category === 'Backend' ? '⚙️' : '🛠️'}
                </span>
                {category}
              </motion.h2>
              <div className="skills-bars">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} immediate={catIndex === 0} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      <motion.div
        className="skills-stats"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="stats-grid">
          {[
            { value: 8, label: 'Technologies', icon: '💻', suffix: '+' },
            { value: 1000, label: 'Hours Coded', icon: '⏰', suffix: '+' },
            { value: 5, label: 'Projects Built', icon: '🚀', suffix: '' },
            { value: 1, label: 'Years Experience', icon: '📅', suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card glass-card"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">
                <AnimatedCounter target={stat.value} duration={1.5} />
                {stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
