import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, Box, Stars, Trail } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import SocialLinks from '../../components/SocialLinks';
import './HeroAbout.css';

// 3D Code Symbol Component
function CodeSymbol({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[0.1, 0.8, 0.1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

// 3D Floating Code Block
function FloatingCodeBlock({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Code bracket < */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Code bracket > */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
        </mesh>

        {/* Slash / */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Orbiting Sphere with Trail
function OrbitingSphere({ radius, speed, color, size }: { radius: number; speed: number; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = Math.sin(t * 2) * 0.5;
  });

  return (
    <Trail
      width={2}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Trail>
  );
}

// Main Distort Sphere
function MainSphere() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) * 0.15;
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1, 64, 64]} scale={scale}>
        <MeshDistortMaterial
          color="#0a0a15"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// 3D DNA Helix Simulation
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 30;
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 4;
    const y = (i / particleCount) * 6 - 3;
    return {
      pos1: [Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5] as [number, number, number],
      pos2: [Math.cos(angle + Math.PI) * 1.5, y, Math.sin(angle + Math.PI) * 1.5] as [number, number, number],
    };
  });

  return (
    <group ref={groupRef} position={[4, 0, -3]}>
      {particles.map((p, i) => (
        <group key={i}>
          <mesh position={p.pos1}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={p.pos2}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
          </mesh>
          {/* Connection line */}
          {i % 3 === 0 && (
            <mesh position={[(p.pos1[0] + p.pos2[0]) / 2, (p.pos1[1] + p.pos2[1]) / 2, (p.pos1[2] + p.pos2[2]) / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
              <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} transparent opacity={0.5} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Cube Grid Simulation
function CubeGrid() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={groupRef} position={[-4, 0, -3]}>
      {Array.from({ length: 27 }, (_, i) => {
        const x = (i % 3 - 1) * 0.8;
        const y = (Math.floor(i / 3) % 3 - 1) * 0.8;
        const z = (Math.floor(i / 9) - 1) * 0.8;
        return (
          <Box key={i} position={[x, y, z]} args={[0.3, 0.3, 0.3]}>
            <meshStandardMaterial
              color={i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00d4ff' : '#ff00ff'}
              emissive={i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00d4ff' : '#ff00ff'}
              emissiveIntensity={0.3}
              wireframe={i % 2 === 0}
            />
          </Box>
        );
      })}
    </group>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight position={[0, 10, 0]} intensity={0.5} color="#00d4ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <MainSphere />
      <FloatingCodeBlock position={[0, 2, 0]} />
      <DNAHelix />
      <CubeGrid />
      
      <OrbitingSphere radius={3} speed={0.5} color="#00ff88" size={0.1} />
      <OrbitingSphere radius={4} speed={0.3} color="#00d4ff" size={0.08} />
      <OrbitingSphere radius={5} speed={0.2} color="#ff00ff" size={0.12} />
      
      {/* Code symbols */}
      <CodeSymbol position={[-2, 1, -2]} rotation={[0, 0.5, 0]} color="#00ff88" />
      <CodeSymbol position={[2, -1, -2]} rotation={[0, -0.5, 0]} color="#00d4ff" />
      <CodeSymbol position={[0, 2, -3]} rotation={[0, 0, 0.3]} color="#ff00ff" />
      
      <Environment preset="night" />
    </>
  );
}

const HeroAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const glowVariants = {
    animate: {
      textShadow: [
        '0 0 20px rgba(0, 255, 136, 0.5)',
        '0 0 40px rgba(0, 212, 255, 0.5)',
        '0 0 20px rgba(255, 0, 255, 0.5)',
        '0 0 20px rgba(0, 255, 136, 0.5)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  const achievements = [
    { icon: '🏆', title: '5+', subtitle: 'Projects Completed' },
    { icon: '⭐', title: '1+', subtitle: 'Years Experience' },
    { icon: '💻', title: '5+', subtitle: 'Technologies' },
    { icon: '🎯', title: '100%', subtitle: 'Client Satisfaction' },
  ];

  return (
    <div className="hero-page">
      {/* 3D Canvas Background */}
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="badge-dot" />
          Available for Work
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          <motion.span className="greeting">Hello, I'm</motion.span>
          <motion.span className="name gradient-text" variants={glowVariants} animate="animate">
            Jasswanth
          </motion.span>
        </motion.h1>

        <motion.div className="hero-roles" variants={itemVariants}>
          <motion.span
            className="role"
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          >
            Full Stack Developer
          </motion.span>
        </motion.div>

        <motion.p className="hero-description" variants={itemVariants}>
          Building scalable, high-performance applications that solve real-world problems.
          From sleek frontends to robust backends, I deliver end-to-end solutions
          that drive business growth and elevate user experiences.
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <motion.div
              className="cta-button primary hoverable"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="cta-icon">💬</span>
              Let's Talk
            </motion.div>
          </Link>
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <motion.div
              className="cta-button secondary hoverable"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="cta-icon">🚀</span>
              View Projects
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          variants={itemVariants}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <span className="scroll-text">Scroll Down</span>
          <span className="scroll-arrow">↓</span>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.section
        className="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="about-container">
          <motion.h2
            className="section-title gradient-text"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                I'm <span className="highlight">Jasswanth</span>, a Full Stack Developer who turns ideas 
                into powerful, production-ready applications. I specialize in building seamless user experiences 
                backed by clean, scalable code.
              </p>
              <p>
                My stack includes <span className="highlight">Angular</span>, <span className="highlight">React</span>, 
                <span className="highlight">.NET</span>, and <span className="highlight">Three.js</span> — 
                enabling me to deliver everything from enterprise solutions to interactive 3D web experiences.
              </p>
            </motion.div>

            <motion.div
              className="achievements-grid"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-card glass-card hoverable"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <span className="achievement-icon">{achievement.icon}</span>
                  <span className="achievement-title">{achievement.title}</span>
                  <span className="achievement-subtitle">{achievement.subtitle}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Social Links Section */}
      <SocialLinks />
    </div>
  );
};

export default HeroAbout;
