import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Field Service Management',
    description: 'An enterprise-grade field service management solution with work order tracking, technician scheduling, and real-time analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['Angular', '.NET', 'PostgreSQL'],
    link: 'restricted',
    github: 'https://github.com/Jasswanth-24',
    color: '#00ff88',
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description: 'An immersive portfolio experience with Three.js animations, custom shaders, and stunning visual effects.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    tags: ['Three.js', 'React'],
    link: 'https://portfolio-jasswanth.vercel.app',
    github: 'https://github.com/Jasswanth-24',
    color: '#00d4ff',
  },
  {
    id: 3,
    title: 'Property Management',
    description: 'Comprehensive property management system with tenant tracking, lease management, and maintenance request handling.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    tags: ['Angular', '.NET', 'PostgreSQL'],
    link: 'restricted',
    github: 'https://github.com/Jasswanth-24',
    color: '#ff00ff',
  },
  {
    id: 4,
    title: 'Event Management',
    description: 'Dynamic event management platform with booking system, attendee management, and interactive event scheduling.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    tags: ['JavaScript', 'CSS', 'HTML'],
    link: 'https://jasswanth-24.github.io/Event-management/',
    github: 'https://github.com/Jasswanth-24',
    color: '#ffaa00',
  },
];

// 3D Floating Box for project cards
function ProjectBox({ color, isHovered }: { color: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isHovered ? 0.4 : 0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </RoundedBox>
    </Float>
  );
}

// Project Card Component
const ProjectCard = ({ project, index, onShowToast }: { project: Project; index: number; onShowToast: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDemoClick = (e: React.MouseEvent) => {
    if (project.link === 'restricted') {
      e.preventDefault();
      onShowToast();
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`project-card glass-card hoverable ${isHovered ? 'hovered' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--project-color': project.color } as React.CSSProperties}
    >
      {/* 3D Element */}
      <div className="project-3d-element">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <ProjectBox color={project.color} isHovered={isHovered} />
          </Suspense>
        </Canvas>
      </div>

      {/* Project Image */}
      <div className="project-image-container">
        {!imageLoaded && <div className="image-placeholder" />}
        <motion.img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        <div className="project-overlay" />
      </div>

      {/* Project Content */}
      <div className="project-content">
        <motion.div
          className="project-number"
          animate={{
            x: isHovered ? 10 : 0,
            color: isHovered ? project.color : '#606080',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <motion.h3
          className="project-title"
          animate={{
            color: isHovered ? project.color : '#ffffff',
          }}
        >
          {project.title}
        </motion.h3>

        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="project-tag"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + tagIndex * 0.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="project-links">
          <motion.a
            href={project.link === 'restricted' ? '#' : project.link}
            target={project.link === 'restricted' ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="project-link hoverable"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDemoClick}
          >
            <span>🔗</span> Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link hoverable"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🐙</span> GitHub
          </motion.a>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="project-glow"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showToast, setShowToast] = useState(false);
  const filters = ['All', 'Angular', 'React', '.NET', 'Three.js'];

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="projects-page page-container grid-pattern">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">My Projects</h1>
        <p className="projects-subtitle">
          Explore my latest work and creative experiments
        </p>

        {/* Filter tabs */}
        <motion.div className="filter-tabs">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-tab hoverable ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onShowToast={handleShowToast} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More CTA */}
      <motion.div
        className="view-more-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://github.com/Jasswanth-24"
          target="_blank"
          rel="noopener noreferrer"
          className="view-more-btn hoverable"
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 136, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🐙</span>
          View All Projects on GitHub
          <span className="btn-arrow">→</span>
        </motion.a>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="toast-icon">🔒</div>
            <div className="toast-content">
              <span className="toast-title">Access Restricted</span>
              <span className="toast-message">This project demo is not publicly available due to official purposes.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
