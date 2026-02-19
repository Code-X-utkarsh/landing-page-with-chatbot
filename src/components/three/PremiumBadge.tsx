"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Text } from "@react-three/drei";

export const PremiumBadge = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
        if (outerRef.current) {
            outerRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
            outerRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group scale={[0.8, 0.8, 0.8]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Central Diamond/Crystal */}
                <mesh ref={meshRef}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={2}
                        chromaticAberration={1}
                        anisotropy={1}
                        distortion={0.5}
                        distortionScale={1}
                        temporalDistortion={0.5}
                        iridescence={1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[0, 1400]}
                        roughness={0.1}
                        color="#8BC34A"
                    />
                </mesh>

                {/* Inner Glow */}
                <pointLight intensity={2} distance={5} color="#8BC34A" />

                {/* Outer Rings */}
                <group ref={outerRef}>
                    <mesh>
                        <torusGeometry args={[2.2, 0.02, 16, 100]} />
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[2.8, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#8BC34A" emissive="#8BC34A" emissiveIntensity={2} />
                    </mesh>
                </group>

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6
                    ]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="#FF9800" emissive="#FF9800" emissiveIntensity={4} />
                    </mesh>
                ))}
            </Float>
        </group>
    );
};
