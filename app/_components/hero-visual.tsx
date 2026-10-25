"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { HeroFallback } from "./hero-fallback";

const MINT = "#16c7a0";
const LIME = "#a3f66b";

function useIsDark() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.getAttribute("data-theme") !== "light");

    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return dark;
}

function damp(current: number, target: number, lambda: number, delta: number) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}

function Satellite({
  position,
  rotation,
  size,
  color,
  shape = "box",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  color: string;
  shape?: "box" | "octa";
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.55} floatIntensity={1.1}>
      <mesh position={position} rotation={rotation}>
        {shape === "box" ? (
          <boxGeometry args={[size, size, 0.055]} />
        ) : (
          <octahedronGeometry args={[size * 0.62, 0]} />
        )}
        <meshStandardMaterial
          color="#16212a"
          metalness={0.85}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
        <Edges color={color} threshold={15} />
      </mesh>
    </Float>
  );
}

function Core({
  animate,
  dark,
}: {
  animate: boolean;
  dark: boolean;
}) {
  const rig = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const ringC = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Group>(null);

  const palette = dark
    ? {
        core: "#0e3b34",
        emissive: MINT,
        ring: MINT,
        ringSoft: LIME,
        ringOpacity: 0.55,
        sparkle: LIME,
      }
    : {
        core: "#0b5f52",
        emissive: "#0e9f82",
        ring: "#0e9f82",
        ringSoft: "#6f9e2e",
        ringOpacity: 0.6,
        sparkle: "#16c7a0",
      };

  useFrame((state, delta) => {
    if (rig.current) {
      rig.current.rotation.x = damp(
        rig.current.rotation.x,
        state.pointer.y * 0.16,
        3.4,
        delta,
      );
      rig.current.rotation.y = damp(
        rig.current.rotation.y,
        state.pointer.x * 0.3,
        3.4,
        delta,
      );
      rig.current.position.x = damp(
        rig.current.position.x,
        state.pointer.x * 0.16,
        3,
        delta,
      );
      rig.current.position.y = damp(
        rig.current.position.y,
        state.pointer.y * 0.1,
        3,
        delta,
      );
    }

    if (!animate) return;

    if (core.current) {
      core.current.rotation.y += delta * 0.13;
      core.current.rotation.x += delta * 0.028;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.07;
      wire.current.rotation.z += delta * 0.03;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.075;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.05;
    if (ringC.current) ringC.current.rotation.z += delta * 0.035;
    if (nodes.current) nodes.current.rotation.z += delta * 0.1;
  });

  const orbitNodes = [0, 1, 2, 3, 4].map((index) => {
    const angle = (index / 5) * Math.PI * 2;
    return {
      position: [
        Math.cos(angle) * 2.3,
        Math.sin(angle) * 2.3 * 0.34,
        Math.sin(angle) * 0.7,
      ] as [number, number, number],
      color: index % 2 === 0 ? palette.ring : palette.ringSoft,
      size: index === 0 ? 0.095 : 0.065,
    };
  });

  return (
    <group ref={rig}>
      <ambientLight intensity={dark ? 0.5 : 0.85} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.4 : 2} />
      <pointLight
        position={[4.5, 3, 4]}
        intensity={dark ? 42 : 30}
        distance={16}
        decay={2}
        color={MINT}
      />
      <pointLight
        position={[-4.5, -2.5, 2.5]}
        intensity={dark ? 26 : 18}
        distance={14}
        decay={2}
        color={LIME}
      />
      <pointLight
        position={[0, 3, 6]}
        intensity={12}
        distance={18}
        decay={2}
        color="#ffffff"
      />
      {/* Rim light from behind to separate the core from the background. */}
      <pointLight
        position={[-3.5, 1.5, -4]}
        intensity={dark ? 30 : 22}
        distance={16}
        decay={2}
        color={LIME}
      />

      {/* Central faceted core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshStandardMaterial
          color={palette.core}
          metalness={0.9}
          roughness={0.24}
          flatShading
          emissive={palette.emissive}
          emissiveIntensity={dark ? 0.16 : 0.12}
        />
        <Edges color={palette.emissive} threshold={12} />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wire} scale={1.18}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial
          color={palette.emissive}
          wireframe
          transparent
          opacity={dark ? 0.075 : 0.12}
        />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringA} rotation={[1.24, 0.16, 0.42]}>
        <mesh>
          <torusGeometry args={[2.18, 0.0075, 8, 190]} />
          <meshBasicMaterial
            color={palette.ring}
            transparent
            opacity={palette.ringOpacity}
          />
        </mesh>
      </group>

      <group ref={ringB} rotation={[1.06, -0.36, -0.2]}>
        <mesh>
          <torusGeometry args={[2.48, 0.0055, 8, 190]} />
          <meshBasicMaterial
            color={palette.ringSoft}
            transparent
            opacity={palette.ringOpacity * 0.62}
          />
        </mesh>
      </group>

      <group ref={ringC} rotation={[1.42, 0.6, 0.9]}>
        <mesh>
          <torusGeometry args={[1.74, 0.004, 8, 160]} />
          <meshBasicMaterial
            color={palette.ring}
            transparent
            opacity={palette.ringOpacity * 0.45}
          />
        </mesh>
      </group>

      {/* Small nodes travelling the orbit */}
      <group ref={nodes} rotation={[0.35, 0.1, 0]}>
        {orbitNodes.map((node, index) => (
          <mesh key={index} position={node.position}>
            <octahedronGeometry args={[node.size, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Floating interface fragments */}
      <Satellite
        position={[-1.95, 1.15, 0.35]}
        rotation={[0.2, -0.45, 0.08]}
        size={0.44}
        color={palette.emissive}
      />
      <Satellite
        position={[1.88, -1.2, -0.15]}
        rotation={[0.1, 0.5, -0.12]}
        size={0.36}
        color={palette.ringSoft}
      />
      <Satellite
        position={[1.4, 1.6, -0.8]}
        rotation={[0.4, 0.2, 0.3]}
        size={0.32}
        color={palette.emissive}
        shape="octa"
      />

      <Sparkles
        count={dark ? 46 : 36}
        scale={8}
        size={2.2}
        speed={0.28}
        opacity={dark ? 0.55 : 0.4}
        color={palette.sparkle}
      />
    </group>
  );
}

function supportsWebGL() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const dark = useIsDark();
  const [webgl] = useState(() => supportsWebGL());
  const [ready, setReady] = useState(false);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[560px]"
      role="img"
      aria-label="Interactive 3D visual: a faceted emerald core with orbiting rings and glowing technology fragments."
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <HeroFallback />
      </div>

      {webgl && (
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 0, 7.1], fov: 42 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            frameloop={reduceMotion ? "demand" : "always"}
            onCreated={() => setReady(true)}
          >
            <Suspense fallback={null}>
              <Core animate={!reduceMotion} dark={dark} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}
