"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Icosahedron, TorusKnot, Sphere, Dodecahedron, Torus } from "@react-three/drei";

interface HolographicShapeProps {
    color?: string;
    shape?: "box" | "sphere" | "octahedron";
}

const GlassMaterial = ({ color }: { color: string }) => (
    <MeshTransmissionMaterial
        thickness={0.2}
        roughness={0}
        transmission={1}
        ior={1.2}
        chromaticAberration={1} // High CA for "Pro" lens look
        backside
        color={color}
        attenuationDistance={0.5}
        attenuationColor={color}
    />
);

const MetalMaterial = ({ color }: { color: string }) => (
    <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        metalness={1}
        roughness={0.2}
        wireframe
    />
);

export const HolographicShape = ({ color = "#FF9800", shape = "box" }: HolographicShapeProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const shellRef = useRef<THREE.Mesh>(null);
    const orbitalRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Global gentle rotation
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1;
        }

        // Core rotation
        if (coreRef.current) {
            coreRef.current.rotation.x = time * 0.2;
            coreRef.current.rotation.z = time * 0.1;
        }

        // Shell/Orbital specific animations
        if (shellRef.current) {
            // Counter-rotation for shell
            shellRef.current.rotation.y = -time * 0.4;
            shellRef.current.rotation.x = time * 0.2;
        }

        if (orbitalRef.current) {
            orbitalRef.current.rotation.z = time * 0.5;
            orbitalRef.current.rotation.x = time * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>

                {/* 1. THE NEXUS (Network) - shape="box" */}
                {shape === "box" && (
                    <group scale={1.2}>
                        {/* Glass Core */}
                        <mesh ref={coreRef}>
                            <Icosahedron args={[0.8, 0]} />
                            <GlassMaterial color={color} />
                        </mesh>

                        {/* Wireframe Shell */}
                        <mesh ref={shellRef} scale={1.4}>
                            <Dodecahedron args={[1, 0]} />
                            <MetalMaterial color={color} />
                        </mesh>

                        {/* Floating Links */}
                        {[...Array(3)].map((_, i) => (
                            <mesh key={i} position={[
                                Math.sin(i * 2) * 1.8,
                                Math.cos(i * 2) * 1.8,
                                0
                            ]}>
                                <sphereGeometry args={[0.08, 16, 16]} />
                                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={4} />
                            </mesh>
                        ))}
                    </group>
                )}

                {/* 2. THE INFINITY (Pay) - shape="octahedron" */}
                {shape === "octahedron" && (
                    <group scale={1.2}>
                        {/* Complex Knot Core */}
                        <mesh ref={coreRef}>
                            <TorusKnot args={[0.6, 0.2, 128, 16]} />
                            <GlassMaterial color={color} />
                        </mesh>

                        {/* Orbiting Crystals */}
                        <group ref={orbitalRef}>
                            {[...Array(4)].map((_, i) => (
                                <mesh key={i} position={[1.5, 0, 0]} rotation={[0, 0, (Math.PI / 2) * i]}>
                                    <octahedronGeometry args={[0.15]} />
                                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
                                </mesh>
                            ))}
                        </group>
                    </group>
                )}

                {/* 3. THE GYROSCOPE (WLB) - shape="sphere" */}
                {shape === "sphere" && (
                    <group scale={1.2}>
                        {/* Perfect Liquid Core */}
                        <mesh>
                            <Sphere args={[0.7, 32, 32]} />
                            <GlassMaterial color={color} />
                        </mesh>

                        {/* Dual Stabilizer Rings */}
                        <group ref={shellRef}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <Torus args={[1.2, 0.02, 16, 100]} />
                                <MetalMaterial color="white" />
                            </mesh>
                            <mesh rotation={[0, Math.PI / 4, 0]}>
                                <Torus args={[1.6, 0.02, 16, 100]} />
                                <MetalMaterial color={color} />
                            </mesh>
                        </group>

                        {/* Inner Core Glow Mesh */}
                        <mesh scale={0.4}>
                            <Sphere args={[1, 16, 16]} />
                            <meshBasicMaterial color={color} />
                        </mesh>
                    </group>
                )}

                {/* Internal dynamic light */}
                <pointLight intensity={3} distance={5} color={color} />

                {/* Ambient Particles for Atmosphere */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 4
                    ]} scale={Math.random() * 0.5 + 0.5}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color={color} transparent opacity={0.4} />
                    </mesh>
                ))}

            </Float>
        </group>
    );
};
