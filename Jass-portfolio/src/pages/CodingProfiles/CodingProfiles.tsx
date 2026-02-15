import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CodingProfiles.css';

interface CodingProfile {
  id: number;
  platform: string;
  username: string;
  icon: string;
  color: string;
  stats: { label: string; value: string }[];
  link: string;
  description: string;
}

const profiles: CodingProfile[] = [
  {
    id: 1,
    platform: 'LeetCode',
    username: '@jasswanth',
    icon: '🧩',
    color: '#ffa116',
    stats: [
      { label: 'Problems Solved', value: '500+' },
      { label: 'Contest Rating', value: '1850' },
      { label: 'Global Rank', value: 'Top 5%' },
      { label: 'Badges', value: '15' },
    ],
    link: 'https://leetcode.com/yourusername',
    description: 'Solving algorithmic challenges and competing in weekly contests.',
  },
  {
    id: 2,
    platform: 'GitHub',
    username: '@jasswanth',
    icon: '🐙',
    color: '#6e5494',
    stats: [
      { label: 'Repositories', value: '80+' },
      { label: 'Contributions', value: '1.2K+' },
      { label: 'Stars Earned', value: '500+' },
      { label: 'Followers', value: '250+' },
    ],
    link: 'https://github.com/Jasswanth-24',
    description: 'Open source contributor and maintainer of various projects.',
  },
  {
    id: 3,
    platform: 'HackerRank',
    username: '@jasswanth',
    icon: '💚',
    color: '#00ea64',
    stats: [
      { label: 'Badges', value: '20+' },
      { label: 'Certifications', value: '5' },
      { label: 'Problem Solving', value: '5 Stars' },
      { label: 'Languages', value: '8' },
    ],
    link: 'https://hackerrank.com/yourusername',
    description: 'Completed certifications in multiple programming domains.',
  },
  {
    id: 4,
    platform: 'CodeForces',
    username: '@jasswanth',
    icon: '🔵',
    color: '#1f8acb',
    stats: [
      { label: 'Rating', value: '1600+' },
      { label: 'Max Rating', value: '1750' },
      { label: 'Contests', value: '50+' },
      { label: 'Rank', value: 'Expert' },
    ],
    link: 'https://codeforces.com/profile/yourusername',
    description: 'Active participant in competitive programming contests.',
  },
  {
    id: 5,
    platform: 'Stack Overflow',
    username: '@jasswanth',
    icon: '📚',
    color: '#f48024',
    stats: [
      { label: 'Reputation', value: '5K+' },
      { label: 'Answers', value: '150+' },
      { label: 'Reached', value: '100K+' },
      { label: 'Gold Badges', value: '3' },
    ],
    link: 'https://stackoverflow.com/users/yourid',
    description: 'Helping developers solve programming challenges worldwide.',
  },
  {
    id: 6,
    platform: 'CodePen',
    username: '@jasswanth',
    icon: '✒️',
    color: '#47cf73',
    stats: [
      { label: 'Pens', value: '100+' },
      { label: 'Followers', value: '500+' },
      { label: 'Hearts', value: '2K+' },
      { label: 'Views', value: '50K+' },
    ],
    link: 'https://codepen.io/yourusername',
    description: 'Creating interactive UI experiments and animations.',
  },
];

// Profile Card Component
const ProfileCard = ({ profile, index }: { profile: CodingProfile; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.a
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      className="profile-card glass-card hoverable"
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        rotateX: 5,
        boxShadow: `0 30px 60px ${profile.color}30`,
      }}
      style={{ '--profile-color': profile.color } as React.CSSProperties}
    >
      {/* Platform Header */}
      <div className="profile-header">
        <motion.div
          className="profile-icon"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        >
          {profile.icon}
        </motion.div>
        <div className="profile-info">
          <h3 className="profile-platform">{profile.platform}</h3>
          <span className="profile-username">{profile.username}</span>
        </div>
        <motion.span
          className="profile-arrow"
          animate={{ x: 0 }}
          whileHover={{ x: 10 }}
        >
          →
        </motion.span>
      </div>

      {/* Description */}
      <p className="profile-description">{profile.description}</p>

      {/* Stats Grid */}
      <div className="profile-stats">
        {profile.stats.map((stat, statIndex) => (
          <motion.div
            key={stat.label}
            className="stat-item"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.3 + index * 0.1 + statIndex * 0.05,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Glow Effect */}
      <motion.div
        className="profile-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
      />

      {/* Corner decoration */}
      <div className="corner-decoration" />
    </motion.a>
  );
};

const CodingProfiles = () => {
  return (
    <div className="profiles-page page-container grid-pattern">
      <motion.div
        className="profiles-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">Coding Profiles</h1>
        <p className="profiles-subtitle">
          Track my competitive programming journey and contributions
        </p>
      </motion.div>

      {/* Achievement Banner */}
      <motion.div
        className="achievement-banner glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="banner-content">
          <motion.span
            className="banner-icon"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🏆
          </motion.span>
          <div className="banner-text">
            <h2>Coding Level: <span className="gradient-text">Expert</span></h2>
            <p>Combined statistics from all platforms</p>
          </div>
          <div className="banner-stats">
            <div className="banner-stat">
              <span className="bs-value">2000+</span>
              <span className="bs-label">Problems</span>
            </div>
            <div className="banner-stat">
              <span className="bs-value">100+</span>
              <span className="bs-label">Contests</span>
            </div>
            <div className="banner-stat">
              <span className="bs-value">50+</span>
              <span className="bs-label">Badges</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profiles Grid */}
      <div className="profiles-grid">
        {profiles.map((profile, index) => (
          <ProfileCard key={profile.id} profile={profile} index={index} />
        ))}
      </div>

      {/* Code Animation Section */}
      <motion.div
        className="code-animation-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="code-window glass-card">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="code-title">competitive_coder.js</span>
          </div>
          <div className="code-content">
            <motion.pre
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <code>
{`const developer = {
  name: "Jasswanth",
  skills: ["DSA", "Algorithms", "Problem Solving"],
  level: "Expert",
  
  solve: async (problem) => {
    const solution = await think(problem);
    return optimize(solution);
  },
  
  compete: () => "Always ready for a challenge! 🚀"
};

// Status: Currently solving problems...`}
              </code>
            </motion.pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodingProfiles;
