import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Box, Environment, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ServerNode = ({ position, color, type }: { position: [number, number, number]; color: string; type: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Box args={type === 'GPU' ? [1.5, 0.4, 1.2] : [1.2, 0.3, 1.0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
      </Box>
      {/* Node indicator */}
      <Sphere args={[0.05, 16, 16]} position={[-0.4, 0.25, 0.4]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[-0.2, 0.25, 0.4]}>
        <meshBasicMaterial color={type === 'GPU' ? '#10b981' : '#3b82f6'} />
      </Sphere>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Heterogeneous Nodes */}
          <ServerNode position={[-3, 0, 0]} color="#1f2937" type="GPU" />
          <ServerNode position={[3, 1, -2]} color="#374151" type="CPU" />
          <ServerNode position={[0, -2, -1]} color="#1f2937" type="GPU" />
          <ServerNode position={[-1, 2, -4]} color="#374151" type="CPU" />
          
          {/* Connecting Mesh Lines */}
          <Line points={[[-3, 0, 0], [3, 1, -2]]} color="#C5A059" lineWidth={1} transparent opacity={0.3} />
          <Line points={[[-3, 0, 0], [0, -2, -1]]} color="#C5A059" lineWidth={1} transparent opacity={0.3} />
          <Line points={[[3, 1, -2], [0, -2, -1]]} color="#C5A059" lineWidth={1} transparent opacity={0.3} />
          <Line points={[[3, 1, -2], [-1, 2, -4]]} color="#C5A059" lineWidth={1} transparent opacity={0.3} />
          <Line points={[[-3, 0, 0], [-1, 2, -4]]} color="#C5A059" lineWidth={1} transparent opacity={0.3} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
