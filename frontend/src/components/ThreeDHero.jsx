import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

function Building({ position, scale, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating effect
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
    </mesh>
  );
}

function CityGrid() {
  const buildings = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 25; i++) {
      const x = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      const height = Math.random() * 4 + 1;
      const w = Math.random() * 0.8 + 0.4;
      const color = Math.random() > 0.85 ? '#A97D2F' : '#24423A';
      temp.push({ position: [x, height / 2 - 0.5, z], scale: [w, height, w], color });
    }
    return temp;
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    // Slow rotation of the whole city
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {buildings.map((props, i) => (
        <Building key={i} {...props} />
      ))}
    </group>
  );
}

export default function ThreeDHero() {
  return (
    <div className="threed-container" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, #E4E0D3, #EEEBE2)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)' }}>
      <Canvas camera={{ position: [8, 6, 10], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow shadow-mapSize={1024} />
        <CityGrid />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={25} blur={2.5} far={4} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2 - 0.1} />
      </Canvas>
    </div>
  );
}
