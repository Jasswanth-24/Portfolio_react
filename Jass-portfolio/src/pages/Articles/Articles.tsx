import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Articles.css';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Google Agent Development Kit: Unlocking the Future of AI Agents',
    excerpt: 'Explore how Google\'s Agent Development Kit is revolutionizing the way we build and deploy intelligent AI agents for next-generation applications.',
    date: 'Feb 12, 2026',
    readTime: '8 min read',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    tags: ['AI', 'Google', 'Agents'],
    link: 'https://medium.com/@jasswanth.24/google-agent-development-kit-unlocking-the-future-of-ai-agents-c01e37b3e24f',
  },
  {
    id: 2,
    title: 'Breaking Down Vector Embeddings: How Machines Understand Text, Audio & Video',
    excerpt: 'A deep dive into vector embeddings and how they enable machines to comprehend and process text, audio, and video data effectively.',
    date: 'Feb 08, 2026',
    readTime: '10 min read',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    tags: ['AI', 'ML', 'Embeddings'],
    link: 'https://medium.com/@jasswanth.24/breaking-down-vector-embeddings-how-machines-understand-text-audio-video-0ec7d36165ce',
  },
  {
    id: 3,
    title: 'From Roadside Incident to Hackathon Innovation: My Journey with PurseFinder',
    excerpt: 'The inspiring story of how a real-world problem sparked innovation and led to building PurseFinder at a hackathon.',
    date: 'Jan 25, 2026',
    readTime: '6 min read',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    tags: ['Hackathon', 'Innovation', 'Journey'],
    link: 'https://medium.com/@jasswanth.24/%EF%B8%8F-from-roadside-incident-to-hackathon-innovation-my-journey-with-pursefinder-33e5774876c1',
  },
];

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const categories = ['All', 'Insights', 'Best Practices', 'Performance'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const articleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="articles-page page-container grid-pattern">
      <motion.div
        className="articles-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">Featured Articles</h1>
        <p className="articles-subtitle">
          Thoughts and insights on web development
        </p>

        {/* Category Filter */}
        <motion.div className="category-filter">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn hoverable ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Featured Article */}
      <motion.div
        className="featured-article glass-card hoverable"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="featured-image">
          <img src={articles[0].image} alt={articles[0].title} />
          <div className="featured-overlay" />
          <span className="featured-badge">Featured</span>
        </div>
        <div className="featured-content">
          <div className="featured-meta">
            <span className="article-category">{articles[0].category}</span>
            <span className="article-date">{articles[0].date}</span>
            <span className="article-read-time">{articles[0].readTime}</span>
          </div>
          <h2 className="featured-title">{articles[0].title}</h2>
          <p className="featured-excerpt">{articles[0].excerpt}</p>
          <div className="featured-tags">
            {articles[0].tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
          <motion.a
            href={articles[0].link}
            className="read-more-btn hoverable"
            whileHover={{ x: 10 }}
          >
            Read Article <span>→</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        className="articles-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.article
              key={article.id}
              className={`article-card glass-card hoverable ${hoveredArticle === article.id ? 'hovered' : ''}`}
              variants={articleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onMouseEnter={() => setHoveredArticle(article.id)}
              onMouseLeave={() => setHoveredArticle(null)}
            >
              <div className="article-image">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  animate={{
                    scale: hoveredArticle === article.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="article-overlay" />
                <span className="article-number">{String(index + 2).padStart(2, '0')}</span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-footer">
                  <span className="article-read-time">⏱️ {article.readTime}</span>
                  <motion.a
                    href={article.link}
                    className="read-link hoverable"
                    whileHover={{ x: 5 }}
                  >
                    Read →
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      <motion.div
        className="load-more-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://medium.com/@jasswanth.24"
          target="_blank"
          rel="noopener noreferrer"
          className="load-more-btn hoverable"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>📚</span>
          View All Articles
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Articles;
