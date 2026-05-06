import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const AgentNode = ({ position, color, label }: { position: [number, number, number]; color: string; label: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} transparent opacity={0.9} />
      </Sphere>
      <Text position={[0, -0.7, 0]} fontSize={0.2} color="#stone-800" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
};

export const MoMHeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Central Consensus State */}
          <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} wireframe />
          </Sphere>
          <Text position={[0, 1.2, 0]} fontSize={0.25} color="#8b5cf6" anchorX="center" anchorY="middle">
            Consensus State
          </Text>

          {/* Expert Agents */}
          <AgentNode position={[-3, 1.5, 0]} color="#ec4899" label="Agent 1 (Creative)" />
          <AgentNode position={[3, 1.5, 0]} color="#3b82f6" label="Agent 2 (Analytical)" />
          <AgentNode position={[-2, -2, 1]} color="#1aa260" label="Agent 3 (Builder)" />
          <AgentNode position={[2, -2, 1]} color="#f59e0b" label="Agent 4 (Reviewer)" />
          
          {/* Connections to central state */}
          <Line points={[[-3, 1.5, 0], [0, 0, 0]]} color="#ec4899" lineWidth={1} transparent opacity={0.4} />
          <Line points={[[3, 1.5, 0], [0, 0, 0]]} color="#3b82f6" lineWidth={1} transparent opacity={0.4} />
          <Line points={[[-2, -2, 1], [0, 0, 0]]} color="#1aa260" lineWidth={1} transparent opacity={0.4} />
          <Line points={[[2, -2, 1], [0, 0, 0]]} color="#f59e0b" lineWidth={1} transparent opacity={0.4} />
          
          {/* Peer to peer cross evaluations */}
          <Line points={[[-3, 1.5, 0], [3, 1.5, 0]]} color="#94a3b8" lineWidth={0.5} transparent opacity={0.2} dashed />
          <Line points={[[-2, -2, 1], [2, -2, 1]]} color="#94a3b8" lineWidth={0.5} transparent opacity={0.2} dashed />
          <Line points={[[-3, 1.5, 0], [-2, -2, 1]]} color="#94a3b8" lineWidth={0.5} transparent opacity={0.2} dashed />
          <Line points={[[3, 1.5, 0], [2, -2, 1]]} color="#94a3b8" lineWidth={0.5} transparent opacity={0.2} dashed />

        </Float>
      </Canvas>
    </div>
  );
};
