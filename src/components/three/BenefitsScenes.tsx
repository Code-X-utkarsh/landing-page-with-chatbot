"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sphere, Cylinder, Box, Torus, Octahedron, Icosahedron } from "@react-three/drei";

// Reusable Materials
const GlassMaterial = ({ color }: { color: string }) => (
    <MeshTransmissionMaterial
        thickness={0.2}
        roughness={0}
        transmission={1}
        ior={1.2}
        chromaticAberration={1}
        backside
        color={color}
        attenuationDistance={0.5}
        attenuationColor={color}
    />
);

const MetalMaterial = ({ color }: { color: string }) => (
    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
);

const MatteMaterial = ({ color }: { color: string }) => (
    <meshStandardMaterial color={color} roughness={0.8} />
);

// Reusable Bot Component (simplified for these scenes)
const SDEBot = ({ color = "#8BC34A" }: { color?: string }) => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Subtle breathing animation
            group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <group ref={group}>
            {/* Head */}
            <group position={[0, 0.6, 0]}>
                <Sphere args={[0.35, 32, 32]}>
                    <GlassMaterial color={color} />
                </Sphere>
                {/* Eyes */}
                <Sphere position={[0.15, 0.05, 0.25]} args={[0.05]}><meshBasicMaterial color="#fff" /></Sphere>
                <Sphere position={[-0.15, 0.05, 0.25]} args={[0.05]}><meshBasicMaterial color="#fff" /></Sphere>
            </group>
            {/* Body */}
            <Cylinder args={[0.25, 0.3, 0.7, 32]} position={[0, 0, 0]}>
                <MatteMaterial color="#222" />
            </Cylinder>
            {/* Chest Light */}
            <Box position={[0, 0, 0.2]} args={[0.2, 0.15, 0.1]}>
                <meshStandardMaterial emissive={color} emissiveIntensity={2} color={color} />
            </Box>
            {/* Arms */}
            <Sphere position={[0.4, 0.1, 0]} args={[0.1]}> <MetalMaterial color="#444" /> </Sphere>
            <Sphere position={[-0.4, 0.1, 0]} args={[0.1]}> <MetalMaterial color="#444" /> </Sphere>
        </group>
    );
};

// --- SCENE 1: NETWORK (The Connector) ---
export const NetworkScene = ({ color = "#FF9800" }) => {
    const nodesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (nodesRef.current) {
            nodesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <group scale={1.2} position={[0, -0.5, 0]}>
            <SDEBot color={color} />

            {/* Orbiting Network Nodes */}
            <group ref={nodesRef}>
                {[...Array(6)].map((_, i) => (
                    <group key={i} rotation={[0, (Math.PI * 2 / 6) * i, 0]}>
                        <mesh position={[1.2, Math.sin(i) * 0.5, 0]}>
                            <Icosahedron args={[0.1, 0]} />
                            <meshStandardMaterial emissive={color} emissiveIntensity={2} color={color} />
                        </mesh>
                        {/* Connecting Line to Center (Visualized as thin cylinder) */}
                        <mesh position={[0.6, Math.sin(i) * 0.25, 0]} rotation={[0, 0, Math.PI / 2]} scale={[0.6, 0.02, 0.02]}>
                            <cylinderGeometry />
                            <meshBasicMaterial color={color} transparent opacity={0.3} />
                        </mesh>
                    </group>
                ))}
            </group>

            <pointLight position={[2, 2, 2]} intensity={2} color={color} />
        </group>
    );
};

// --- SCENE 2: PAY (The Earner) ---
export const PayScene = ({ color = "#8BC34A" }) => {
    const coinsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (coinsRef.current) {
            coinsRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
            // Bobbing coins
            coinsRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group scale={1.2} position={[0, -0.5, 0]}>
            <SDEBot color={color} />

            {/* Floating Wealth Artifacts */}
            <group ref={coinsRef}>
                {[...Array(5)].map((_, i) => (
                    <group key={i} rotation={[0, (Math.PI * 2 / 5) * i, 0]}>
                        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                            <group position={[1.1, i * 0.2 - 0.5, 0]}>
                                {/* Coin Shape */}
                                <Cylinder args={[0.15, 0.15, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
                                    <MetalMaterial color="#FFD700" />
                                </Cylinder>
                                <Octahedron position={[0, 0.3, 0]} args={[0.08]} >
                                    <meshStandardMaterial emissive="#8BC34A" emissiveIntensity={3} color="#8BC34A" />
                                </Octahedron>
                            </group>
                        </Float>
                    </group>
                ))}
            </group>
            <pointLight position={[-2, 2, 2]} intensity={2} color="#FFD700" />
        </group>
    );
};

// --- SCENE 3: WLB (The Zen Master) ---
export const WLBScene = ({ color = "#FF7043" }) => {
    const haloRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (haloRef.current) {
            haloRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group scale={1.2} position={[0, -0.5, 0]}>
            <SDEBot color={color} />

            {/* Zen Halo */}
            <group ref={haloRef} position={[0, 0.6, 0]}>
                <Torus args={[0.6, 0.02, 16, 100]}>
                    <meshStandardMaterial emissive={color} emissiveIntensity={2} color={color} />
                </Torus>
            </group>

            {/* Floating Coffee Cup */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[0.8, 0.2, 0.5]} rotation={[0, -0.5, 0]}>
                    <Cylinder args={[0.15, 0.12, 0.3, 32]}>
                        <MatteMaterial color="#fff" />
                    </Cylinder>
                    <Torus position={[0.1, 0, 0]} args={[0.08, 0.03, 16, 32]}>
                        <MatteMaterial color="#fff" />
                    </Torus>
                    {/* Steam (Particles) */}
                    <Sphere position={[0, 0.25, 0]} args={[0.05]}>
                        <meshBasicMaterial color="#aaa" transparent opacity={0.5} />
                    </Sphere>
                </group>
            </Float>

            <pointLight position={[0, 2, 2]} intensity={1} color={color} />
        </group>
    );
};
