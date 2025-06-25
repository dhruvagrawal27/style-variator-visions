
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const AnimatedWire = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[3, 0.5, 100, 16]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        wireframe 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
};

export default AnimatedWire;
