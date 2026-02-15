import { useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Box } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useRef } from 'react';
import './Resume.css';

// 3D Document Animation
function Document3D({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef as any}>
        {/* Main document */}
        <Box args={[2.5, 3.5, 0.1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1a1a25"
            attach="material"
            distort={isHovered ? 0.1 : 0}
            speed={2}
            roughness={0.3}
            metalness={0.5}
          />
        </Box>
        
        {/* Document lines */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[-0.6, 1.2 - i * 0.35, 0.06]}>
            <boxGeometry args={[1.2 - (i % 3) * 0.2, 0.08, 0.01]} />
            <meshStandardMaterial
              color={i === 0 ? '#00ff88' : '#404060'}
              emissive={i === 0 ? '#00ff88' : '#000'}
              emissiveIntensity={i === 0 ? 0.3 : 0}
            />
          </mesh>
        ))}
        
        {/* Corner fold */}
        <mesh position={[0.9, 1.4, 0.06]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#00ff88" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Download particles effect
function DownloadParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = Math.random() * 5 - 2.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  
  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] -= 0.05;
      if (positions[i * 3 + 1] < -2.5) {
        positions[i * 3 + 1] = 2.5;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff88"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const Resume = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      
      // Create download link (replace with actual PDF URL)
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Jasswanth_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 2000);
  };

  const resumeData = {
    experience: [
      { company: 'Tech Corp', role: 'Senior Developer', period: '2024 - Present' },
      { company: 'StartupXYZ', role: 'Full Stack Developer', period: '2022 - 2024' },
      { company: 'WebAgency', role: 'Frontend Developer', period: '2020 - 2022' },
    ],
    education: [
      { school: 'University of Technology', degree: 'B.S. Computer Science', year: '2020' },
    ],
    certifications: [
      'AWS Certified Developer',
      'Google Cloud Professional',
      'Meta Frontend Developer',
    ],
  };

  return (
    <div className="resume-page page-container grid-pattern">
      <motion.div
        className="resume-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title gradient-text">My Resume</h1>
        <p className="resume-subtitle">
          Download my professional resume or view the highlights below
        </p>
      </motion.div>

      <div className="resume-content">
        {/* 3D Document Preview */}
        <motion.div
          className="resume-3d-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="document-canvas">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
                <Document3D isHovered={isHovered} />
                {isDownloading && <DownloadParticles />}
              </Suspense>
            </Canvas>
          </div>

          {/* Download Button */}
          <motion.div className="download-section">
            <AnimatePresence mode="wait">
              {downloadComplete ? (
                <motion.div
                  className="download-success"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <span className="success-icon">✅</span>
                  <span>Download Complete!</span>
                </motion.div>
              ) : (
                <motion.button
                  className={`download-btn hoverable ${isDownloading ? 'downloading' : ''}`}
                  onClick={handleDownload}
                  disabled={isDownloading}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 136, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {isDownloading ? (
                    <>
                      <motion.span
                        className="download-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⚡
                      </motion.span>
                      <span>Downloading...</span>
                      <motion.div
                        className="progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📄</span>
                      <span>Download Resume</span>
                      <span className="btn-format">PDF</span>
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <p className="download-info">
              Last updated: February 2026 • 2 pages • 245 KB
            </p>
          </motion.div>
        </motion.div>

        {/* Resume Highlights */}
        <motion.div
          className="resume-highlights"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Experience Section */}
          <motion.div
            className="highlight-section glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <span className="section-icon">💼</span>
              <h3>Experience</h3>
            </div>
            <div className="experience-list">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="experience-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="exp-marker" />
                  <div className="exp-content">
                    <span className="exp-role">{exp.role}</span>
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            className="highlight-section glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="section-header">
              <span className="section-icon">🎓</span>
              <h3>Education</h3>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <span className="edu-degree">{edu.degree}</span>
                <span className="edu-school">{edu.school}</span>
                <span className="edu-year">{edu.year}</span>
              </div>
            ))}
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            className="highlight-section glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <span className="section-icon">🏆</span>
              <h3>Certifications</h3>
            </div>
            <div className="cert-list">
              {resumeData.certifications.map((cert, index) => (
                <motion.span
                  key={index}
                  className="cert-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  ✓ {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="resume-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>Want to know more about my experience?</p>
        <motion.a
          href="/contact"
          className="cta-link hoverable"
          whileHover={{ scale: 1.05 }}
        >
          <span>💬</span> Let's Talk
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Resume;
