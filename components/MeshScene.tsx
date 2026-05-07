import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Box, Environment, Stars, Sphere, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const ServerNode = ({ position, color, type, label }: { position: [number, number, number]; color: string; type: string; label?: string }) => {
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
      {label && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.25}
          color="#f5f5f4"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1c1917"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const DataPacket = ({ start, end, duration, delay, color }: { start: [number, number, number], end: [number, number, number], duration: number, delay: number, color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.getElapsedTime() - delay) % duration;
      if (t < 0) {
        ref.current.visible = false;
      } else {
        ref.current.visible = true;
        const progress = t / duration; // 0 to 1
        ref.current.position.set(
          start[0] + (end[0] - start[0]) * progress,
          start[1] + (end[1] - start[1]) * progress,
          start[2] + (end[2] - start[2]) * progress
        );
      }
    }
  });

  return (
    <Sphere ref={ref} args={[0.08, 16, 16]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
};

export const InteractiveMeshScene: React.FC = () => {
  const gpuNode1 = [ -2, 0, 0 ] as [number, number, number];
  const gpuNode2 = [ 2, 0, 0 ] as [number, number, number];
  
  const cpuNode1 = [ -3.5, 1, -2.5 ] as [number, number, number];
  const cpuNode2 = [ 3.5, 1, -2.5 ] as [number, number, number];
  const cpuNode3 = [ 0, 1, 3 ] as [number, number, number];

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-[#111] shadow-2xl border border-stone-800 relative cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-xs text-stone-300 font-mono p-4 rounded-xl border border-stone-700/50 pointer-events-none">
        <div className="flex items-center gap-3 mb-3"><div className="w-3 h-3 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> <span>GPU Node (Fast Compute)</span></div>
        <div className="flex items-center gap-3 mb-3"><div className="w-3 h-3 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> <span>CPU Node (Large Memory)</span></div>
        <div className="flex items-center gap-3 mb-3"><div className="w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.8)]"></div> <span>Dynamic Token Offloading</span></div>
        <div className="text-[10px] text-stone-500 mt-4 uppercase tracking-[0.2em] font-bold border-t border-stone-700/50 pt-2">Interactive: Rotate & Zoom</div>
      </div>
      
      <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 1.8} minDistance={5} maxDistance={15} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#60a5fa" />
        
        {/* GPU Nodes */}
        <ServerNode position={gpuNode1} color="#064e3b" type="GPU" label="GPU 1" />
        <ServerNode position={gpuNode2} color="#064e3b" type="GPU" label="GPU 2" />
        
        {/* CPU Nodes */}
        <ServerNode position={cpuNode1} color="#1e3a8a" type="CPU" label="CPU A" />
        <ServerNode position={cpuNode2} color="#1e3a8a" type="CPU" label="CPU B" />
        <ServerNode position={cpuNode3} color="#1e3a8a" type="CPU" label="CPU C" />
        
        {/* Connections */}
        <Line points={[gpuNode1, cpuNode1]} color="#60a5fa" lineWidth={1} transparent opacity={0.2} dashed />
        <Line points={[gpuNode1, cpuNode3]} color="#60a5fa" lineWidth={1} transparent opacity={0.2} dashed />
        <Line points={[gpuNode2, cpuNode2]} color="#60a5fa" lineWidth={1} transparent opacity={0.2} dashed />
        <Line points={[gpuNode2, cpuNode3]} color="#60a5fa" lineWidth={1} transparent opacity={0.2} dashed />
        <Line points={[gpuNode1, gpuNode2]} color="#10b981" lineWidth={1.5} transparent opacity={0.4} />

        {/* Data Packets (Offloading kv cache etc) */}
        {/* Flow from GPU1 to CPU1 */}
        <DataPacket start={gpuNode1} end={cpuNode1} duration={2} delay={0} color="#a78bfa" />
        <DataPacket start={gpuNode1} end={cpuNode1} duration={2} delay={0.5} color="#a78bfa" />
        
        {/* Flow from CPU1 back to GPU1 */}
        <DataPacket start={cpuNode1} end={gpuNode1} duration={1.5} delay={1} color="#60a5fa" />
        
        {/* Flow from GPU2 to CPU2 */}
        <DataPacket start={gpuNode2} end={cpuNode2} duration={2.5} delay={0.2} color="#a78bfa" />
        
        {/* Flow from GPU1 to CPU3 */}
        <DataPacket start={gpuNode1} end={cpuNode3} duration={1.8} delay={0.7} color="#a78bfa" />
        
        {/* Flow from CPU3 back to GPU2 */}
        <DataPacket start={cpuNode3} end={gpuNode2} duration={1.7} delay={1.5} color="#60a5fa" />
        
        {/* GPU to GPU direct transfer */}
        <DataPacket start={gpuNode1} end={gpuNode2} duration={1.2} delay={0.3} color="#10b981" />
        <DataPacket start={gpuNode2} end={gpuNode1} duration={1.2} delay={0.8} color="#10b981" />

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
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
