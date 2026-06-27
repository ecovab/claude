"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function GlowingGem() {
  const ref = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.05;
    // gentle parallax tilt toward the cursor
    ref.current.rotation.z += (pointer.x * 0.15 - ref.current.rotation.z) * 0.02;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={ref} position={[1.6, 0.2, -1]}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial
            color="#c9a24b"
            emissive="#ff7a3c"
            emissiveIntensity={0.35}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        <mesh scale={1.35}>
          <icosahedronGeometry args={[1.15, 0]} />
          <meshBasicMaterial color="#e8cd87" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig() {
  const { pointer, camera } = useThree();
  useFrame(() => {
    // eslint-disable-next-line react-hooks/immutability -- per-frame mutation of the three.js camera is the standard R3F imperative pattern
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} color="#3a2a1a" />
        <pointLight position={[3, 2, 3]} intensity={3} color="#ff7a3c" />
        <pointLight position={[-4, -1, 2]} intensity={1.4} color="#c9a24b" />
        <Sparkles count={140} scale={[11, 7, 6]} size={2.6} speed={0.25} color="#e8cd87" opacity={0.55} />
        <GlowingGem />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
