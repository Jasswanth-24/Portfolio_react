import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 5000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  const colors = useMemo(() => {
    const colors = new Float32Array(particlesCount * 3);
    const color1 = new THREE.Color('#00ff88');
    const color2 = new THREE.Color('#00d4ff');
    const color3 = new THREE.Color('#ff00ff');
    
    for (let i = 0; i < particlesCount; i++) {
      const mixedColor = new THREE.Color();
      const random = Math.random();
      
      if (random < 0.33) {
        mixedColor.copy(color1);
      } else if (random < 0.66) {
        mixedColor.copy(color2);
      } else {
        mixedColor.copy(color3);
      }
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.03;
    
    // Mouse interaction
    const mouseX = (state.mouse.x * state.viewport.width) / 2;
    const mouseY = (state.mouse.y * state.viewport.height) / 2;
    
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX * 0.1, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY * 0.1, 0.05);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.z = (time * 2) % 2;
  });

  return (
    <gridHelper
      ref={ref}
      args={[100, 50, '#00ff88', '#00ff8820']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function FloatingGeometries() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    
    group.current.children.forEach((child, index) => {
      child.rotation.x = time * 0.3 + index;
      child.rotation.y = time * 0.2 + index;
      child.position.y = Math.sin(time + index) * 0.5 + (index - 2) * 3;
    });
  });

  return (
    <group ref={group}>
      {/* Floating Octahedron */}
      <mesh position={[-8, 0, -5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#00ff88" wireframe />
      </mesh>
      
      {/* Floating Icosahedron */}
      <mesh position={[8, 2, -8]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#00d4ff" wireframe />
      </mesh>
      
      {/* Floating Torus */}
      <mesh position={[-6, -2, -10]}>
        <torusGeometry args={[1, 0.3, 8, 16]} />
        <meshBasicMaterial color="#ff00ff" wireframe />
      </mesh>
      
      {/* Floating Dodecahedron */}
      <mesh position={[6, -1, -6]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#ffaa00" wireframe />
      </mesh>
      
      {/* Floating Tetrahedron */}
      <mesh position={[0, 3, -12]}>
        <tetrahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#00ff88" wireframe />
      </mesh>
    </group>
  );
}

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(180deg, #0a0a0f 0%, #050510 50%, #0a0515 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0a0f', 10, 50]} />
        <ambientLight intensity={0.1} />
        <ParticleField />
        <FloatingGeometries />
        <GridFloor />
      </Canvas>
      
      {/* Scanline effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        opacity: 0.3
      }} />
      
      {/* Vignette effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
      }} />
    </div>
  );
};

export default Background3D;
