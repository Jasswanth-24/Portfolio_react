import { motion } from 'framer-motion';
import './CodingProfiles.css';

const floatingIcons = ['🧩', '🐙', '💚', '🔵', '📚', '✒️', '⚡', '💻', '🏆', '🎯', '🚀', '✨'];

const CodingProfiles = () => {
  return (
    <div className="profiles-page page-container grid-pattern">
      {/* Floating background icons */}
      <div className="coming-soon-particles">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="cs-particle"
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${10 + ((i * 13) % 70)}%`,
              fontSize: `${1.5 + (i % 3) * 0.8}rem`,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="profiles-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">Coding Profiles</h1>
      </motion.div>

      {/* Main Coming Soon Card */}
      <motion.div
        className="coming-soon-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <div className="coming-soon-card glass-card">
          {/* Animated Rocket */}
          <motion.div
            className="cs-rocket"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="rocket-emoji">🚀</span>
            {/* Flame trail */}
            <motion.div
              className="rocket-trail"
              animate={{
                opacity: [0.4, 1, 0.4],
                scaleY: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="orbit-dot"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                width: `${180 + i * 60}px`,
                height: `${180 + i * 60}px`,
              }}
            >
              <span
                className="dot"
                style={{
                  background: i === 0 ? '#00ff88' : i === 1 ? '#00d4ff' : '#bf00ff',
                  boxShadow: `0 0 15px ${i === 0 ? '#00ff88' : i === 1 ? '#00d4ff' : '#bf00ff'}`,
                }}
              />
            </motion.div>
          ))}

          {/* Main text */}
          <div className="cs-text-content">
            <motion.div
              className="cs-badge"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.2)',
                  '0 0 40px rgba(0, 212, 255, 0.3)',
                  '0 0 20px rgba(191, 0, 255, 0.2)',
                  '0 0 20px rgba(0, 255, 136, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span>🔧</span> Under Construction
            </motion.div>

            <motion.h2
              className="cs-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Will Reveal{' '}
              <motion.span
                className="cs-highlight"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Soon
              </motion.span>
            </motion.h2>

            <motion.p
              className="cs-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I'm currently setting up my competitive programming profiles.<br />
              This section will showcase my coding journey across multiple platforms.
            </motion.p>

            {/* Animated progress bar */}
            <motion.div
              className="cs-progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="cs-progress-label">
                <span>Building something awesome</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </div>
              <div className="cs-progress-bar">
                <motion.div
                  className="cs-progress-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '65%' }}
                  transition={{ delay: 1, duration: 2, ease: 'easeOut' }}
                />
                <motion.div
                  className="cs-progress-glow"
                  animate={{
                    left: ['0%', '65%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </div>
            </motion.div>

            {/* Platform icons teaser */}
            <motion.div
              className="cs-platforms-teaser"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="cs-platforms-label">Platforms coming:</span>
              <div className="cs-platform-icons">
                {['🧩', '🐙', '💚', '🔵', '📚', '✒️'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="cs-platform-icon"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.2 + i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotate: 15,
                      y: -5,
                    }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Glow background */}
          <motion.div
            className="cs-card-glow"
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(0,255,136,0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 50%, rgba(0,212,255,0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 30%, rgba(191,0,255,0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 50%, rgba(0,255,136,0.08) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Code Window at bottom */}
      <motion.div
        className="code-animation-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="code-window glass-card">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="code-title">reveal_profiles.js</span>
          </div>
          <div className="code-content">
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <code>
{`const codingProfiles = {
  status: "🔧 Setting up...",
  platforms: ["LeetCode", "GitHub", "HackerRank",
              "CodeForces", "StackOverflow", "CodePen"],
  
  reveal: async () => {
    await preparingAwesomeContent();
    return "Coming very soon! Stay tuned 🎉";
  }
};

// ETA: Loading... ⏳`}
              </code>
            </motion.pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodingProfiles;
