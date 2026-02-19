"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const FloatingCharacter = () => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Bobbing animation
            group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
            // Rotation
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group}>
            {/* Head */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#FFCC80" />
            </mesh>

            {/* Body */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1, 1.2, 0.5]} />
                <meshStandardMaterial color="#2D4A1F" />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.7, 0.4, 0]}>
                <boxGeometry args={[0.3, 1, 0.3]} />
                <meshStandardMaterial color="#FFCC80" />
            </mesh>
            <mesh position={[0.7, 0.4, 0]}>
                <boxGeometry args={[0.3, 1, 0.3]} />
                <meshStandardMaterial color="#FFCC80" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.3, -0.8, 0]}>
                <boxGeometry args={[0.35, 1.2, 0.35]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.3, -0.8, 0]}>
                <boxGeometry args={[0.35, 1.2, 0.35]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Floating Icons Ring (simplified) */}
            {[0, 1, 2, 3].map((i) => (
                <mesh
                    key={i}
                    position={[Math.cos(i * Math.PI / 2) * 2, Math.sin(i * Math.PI / 2) * 2, 0]}
                    rotation={[Math.random(), Math.random(), Math.random()]}
                >
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial color="#FF9800" />
                </mesh>
            ))}
        </group>
    );
};
