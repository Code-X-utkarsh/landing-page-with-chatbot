"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sphere, Cylinder, Box, Torus, Cone } from "@react-three/drei";

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
    <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
    />
);

const MatteMaterial = ({ color }: { color: string }) => (
    <meshStandardMaterial
        color={color}
        roughness={0.8}
    />
);

export const CommunityScene = () => {
    const robotRef = useRef<THREE.Group>(null);
    const laptopRef = useRef<THREE.Group>(null);
    const planeRef = useRef<THREE.Group>(null);
    const coinRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Robot Hover
        if (robotRef.current) {
            robotRef.current.position.y = Math.sin(time * 2) * 0.1;
            robotRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
        }

        // Orbiting Items
        if (laptopRef.current) {
            laptopRef.current.position.x = Math.sin(time * 0.8) * 3;
            laptopRef.current.position.z = Math.cos(time * 0.8) * 3;
            laptopRef.current.rotation.y = time;
        }
        if (planeRef.current) {
            planeRef.current.position.x = Math.sin(time * 0.6 + 2) * 3.5;
            planeRef.current.position.z = Math.cos(time * 0.6 + 2) * 3.5;
            planeRef.current.rotation.y = -time + Math.PI / 2;
            // Bank angle for plane
            planeRef.current.rotation.z = Math.sin(time) * 0.2;
        }
        if (coinRef.current) {
            coinRef.current.position.x = Math.sin(time * 0.7 + 4) * 3;
            coinRef.current.position.z = Math.cos(time * 0.7 + 4) * 3;
            coinRef.current.rotation.y = time * 2;
        }
    });

    return (
        <group scale={0.8} position={[0, -0.5, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#8BC34A" />
            <pointLight position={[-5, 5, -5]} intensity={2} color="#FF9800" />

            {/* --- ROBOT CHARACTER --- */}
            <group ref={robotRef}>
                {/* HEAD */}
                <group position={[0, 1.6, 0]}>
                    <Sphere args={[0.6, 32, 32]}>
                        <GlassMaterial color="#8BC34A" />
                    </Sphere>
                    {/* Eyes */}
                    <Sphere position={[0.25, 0.1, 0.45]} args={[0.08]}><meshBasicMaterial color="#fff" /></Sphere>
                    <Sphere position={[-0.25, 0.1, 0.45]} args={[0.08]}><meshBasicMaterial color="#fff" /></Sphere>
                    <Torus position={[0, -0.1, 0.45]} args={[0.1, 0.02, 16, 32]} rotation={[Math.PI, 0, 0]}><meshBasicMaterial color="#fff" /></Torus>
                    {/* Antenna */}
                    <Cylinder position={[0, 0.6, 0]} args={[0.02, 0.02, 0.4]}><MetalMaterial color="#444" /></Cylinder>
                    <Sphere position={[0, 0.8, 0]} args={[0.08]}><meshStandardMaterial emissive="#FF9800" emissiveIntensity={2} color="#FF9800" /></Sphere>
                </group>

                {/* BODY */}
                <group position={[0, 0.6, 0]}>
                    <Cylinder args={[0.4, 0.5, 1.2, 32]}>
                        <MatteMaterial color="#222" />
                    </Cylinder>
                    {/* Chest Plate */}
                    <Box position={[0, 0.2, 0.35]} args={[0.4, 0.3, 0.1]}>
                        <MetalMaterial color="#8BC34A" />
                    </Box>
                </group>

                {/* ARMS (Floating) */}
                <Sphere position={[0.7, 0.8, 0]} args={[0.2]}>
                    <MetalMaterial color="#222" />
                </Sphere>
                <Sphere position={[-0.7, 0.8, 0]} args={[0.2]}>
                    <MetalMaterial color="#222" />
                </Sphere>

                {/* BASE (Hover Disk) */}
                <group position={[0, -0.2, 0]}>
                    <Cylinder args={[0.6, 0.8, 0.1, 32]}>
                        <MetalMaterial color="#333" />
                    </Cylinder>
                    <Cylinder position={[0, -0.1, 0]} args={[0.8, 0.8, 0.05, 32]}>
                        <meshStandardMaterial emissive="#8BC34A" emissiveIntensity={1} color="#8BC34A" />
                    </Cylinder>
                </group>
            </group>

            {/* --- FLOATING ARTIFACTS --- */}

            {/* 1. LAPTOP */}
            <group ref={laptopRef} position={[3, 1, 0]}>
                <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                    {/* Base */}
                    <Box args={[0.8, 0.05, 0.5]}>
                        <MetalMaterial color="#888" />
                    </Box>
                    {/* Screen */}
                    <group position={[0, 0.25, -0.25]} rotation={[0.4, 0, 0]}>
                        <Box args={[0.8, 0.5, 0.05]}>
                            <MetalMaterial color="#888" />
                        </Box>
                        <Box position={[0, 0, 0.03]} args={[0.7, 0.4, 0.01]}>
                            <meshStandardMaterial emissive="#8BC34A" emissiveIntensity={2} color="#000" />
                        </Box>
                    </group>
                </Float>
            </group>

            {/* 2. PAPER PLANE */}
            <group ref={planeRef} position={[-3, 2, 0]}>
                <Float speed={5} rotationIntensity={2} floatIntensity={0.5}>
                    <Cone args={[0.4, 1, 4]} rotation={[Math.PI / 2, 0, 0]} scale={[0.5, 1, 1]}>
                        <meshStandardMaterial color="#fff" side={THREE.DoubleSide} />
                    </Cone>
                </Float>
            </group>

            {/* 3. COIN */}
            <group ref={coinRef} position={[0, 2, 3]}>
                <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                    <Cylinder args={[0.4, 0.4, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]}>
                        <MetalMaterial color="#FFD700" />
                    </Cylinder>
                    <Torus args={[0.3, 0.05, 16, 32]}>
                        <MetalMaterial color="#FFD700" />
                    </Torus>
                </Float>
            </group>

        </group>
    );
};
