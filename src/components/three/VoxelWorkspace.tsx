"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Box } from "@react-three/drei";

// Reusable Voxel Component
const Voxel = ({ position, color }: { position: [number, number, number], color: string }) => (
    <Box position={position} args={[0.9, 0.9, 0.9]}>
        <meshStandardMaterial color={color} roughness={0.5} />
    </Box>
);

export const VoxelWorkspace = () => {
    const laptopRef = useRef<THREE.Group>(null);
    const planeRef = useRef<THREE.Group>(null);
    const coinRef = useRef<THREE.Group>(null);
    const visaRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Reveal animation
        if (laptopRef.current) {
            laptopRef.current.position.y = Math.sin(t * 0.5) * 0.1;
            laptopRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
        }

        // Orbiting elements
        if (planeRef.current) {
            planeRef.current.position.x = Math.cos(t * 0.8) * 1.5;
            planeRef.current.position.z = Math.sin(t * 0.8) * 1.5;
            planeRef.current.rotation.y = -t * 0.8 + Math.PI / 2;
            // Bank turn
            planeRef.current.rotation.z = -0.3;
        }

        if (coinRef.current) {
            coinRef.current.rotation.y = t * 2;
        }

    });

    const themeCyan = "#00E5FF";
    const themeBlue = "#2979FF";
    const themeDark = "#111";
    const themeScreen = "#E0F7FA";

    return (
        <group scale={1.2}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>

                {/* --- VOXEL LAPTOP --- */}
                <group ref={laptopRef} position={[0, -0.2, 0]}>
                    {/* Base */}
                    <group>
                        {/* Width 5, Depth 3 */}
                        {[...Array(5)].map((_, x) =>
                            [...Array(3)].map((_, z) => (
                                <Voxel key={`base-${x}-${z}`} position={[x - 2, 0, z - 1]} color={themeDark} />
                            ))
                        )}
                    </group>
                    {/* Screen (Hinge at back) */}
                    <group position={[0, 0.5, -1.5]} rotation={[-0.2, 0, 0]}>
                        {/* Frame */}
                        {[...Array(5)].map((_, x) =>
                            [...Array(4)].map((_, y) => (
                                <Voxel key={`screen-${x}-${y}`} position={[x - 2, y, 0]} color={themeDark} />
                            ))
                        )}
                        {/* Display */}
                        {[...Array(3)].map((_, x) =>
                            [...Array(2)].map((_, y) => (
                                <Box key={`display-${x}-${y}`} position={[x - 1, y + 1.2, 0.4]} args={[0.8, 0.8, 0.1]}>
                                    <meshStandardMaterial color={themeCyan} emissive={themeCyan} emissiveIntensity={2} />
                                </Box>
                            ))
                        )}
                    </group>
                </group>

                {/* --- VOXEL PLANE (Relocation) --- */}
                <group ref={planeRef} position={[1.5, 1, 0]}>
                    {/* Fuselage */}
                    <Voxel position={[0, 0, 0]} color="white" />
                    <Voxel position={[0, 0, 0.5]} color="white" />
                    <Voxel position={[0, 0, 1.0]} color="white" />
                    {/* Wings */}
                    <Voxel position={[0.8, 0, 0.5]} color="white" />
                    <Voxel position={[-0.8, 0, 0.5]} color="white" />
                    {/* Tail */}
                    <Voxel position={[0, 0.4, -0.2]} color={themeCyan} />
                </group>

                {/* --- VOXEL COIN (Salary) --- */}
                <group ref={coinRef} position={[-1.2, 1.5, 1.0]}>
                    <Voxel position={[0, 0, 0]} color="#FFD700" />
                    <Voxel position={[0, 0.5, 0]} color="#FFD700" />
                    <Voxel position={[0, -0.5, 0]} color="#FFD700" />
                    <Voxel position={[0.5, 0, 0]} color="#FFD700" />
                    <Voxel position={[-0.5, 0, 0]} color="#FFD700" />
                </group>

                {/* --- VOXEL VISA (Docs) --- */}
                <group ref={visaRef} position={[1.2, -0.5, 1.2]} rotation={[0.2, -0.5, 0]}>
                    {[...Array(3)].map((_, x) =>
                        [...Array(4)].map((_, y) => (
                            <Voxel key={`visa-${x}-${y}`} position={[x * 0.6 - 0.6, y * 0.6, 0]} color={themeBlue} />
                        ))
                    )}
                    {/* Text lines */}
                    <Box position={[0, 1.5, 0.5]} args={[1, 0.1, 0.1]}>
                        <meshBasicMaterial color={themeCyan} />
                    </Box>
                    <Box position={[0, 1.0, 0.5]} args={[1, 0.1, 0.1]}>
                        <meshBasicMaterial color="white" />
                    </Box>
                    <Box position={[0, 0.5, 0.5]} args={[1, 0.1, 0.1]}>
                        <meshBasicMaterial color="white" />
                    </Box>
                </group>

                {/* Lighting */}
                <pointLight position={[2, 3, 2]} intensity={2} color={themeCyan} distance={6} />
                <pointLight position={[-2, 2, -2]} intensity={1} color={themeBlue} distance={6} />

            </Float>
        </group>
    );
};
