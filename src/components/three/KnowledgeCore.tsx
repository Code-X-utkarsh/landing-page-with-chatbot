"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Octahedron, Torus } from "@react-three/drei";

export const KnowledgeCore = () => {
    const outerRing = useRef<THREE.Group>(null);
    const middleRing = useRef<THREE.Group>(null);
    const innerRing = useRef<THREE.Group>(null);
    const core = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (outerRing.current) {
            outerRing.current.rotation.x = t * 0.1;
            outerRing.current.rotation.y = t * 0.05;
        }
        if (middleRing.current) {
            middleRing.current.rotation.x = t * -0.15;
            middleRing.current.rotation.z = t * 0.1;
        }
        if (innerRing.current) {
            innerRing.current.rotation.y = t * 0.2;
            innerRing.current.rotation.x = t * 0.2;
        }
        if (core.current) {
            core.current.rotation.y = t * 0.5;
            core.current.rotation.z = t * 0.3;
            // Pulse effect
            core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        }
    });

    const CyanColor = "#00E5FF";
    const BlueColor = "#2979FF";

    return (
        <group scale={1.2}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                {/* Outer Ring */}
                <group ref={outerRing}>
                    <Torus args={[2.2, 0.02, 16, 100]}>
                        <meshStandardMaterial emissive={BlueColor} emissiveIntensity={2} color={BlueColor} />
                    </Torus>
                </group>

                {/* Middle Ring (Glass) */}
                <group ref={middleRing}>
                    <Torus args={[1.6, 0.15, 16, 64]}>
                        <MeshTransmissionMaterial
                            thickness={0.5}
                            roughness={0}
                            transmission={1}
                            ior={1.2}
                            chromaticAberration={2} // High abberation for cyber look
                            backside
                            color={CyanColor}
                            attenuationDistance={0.5}
                            attenuationColor={BlueColor}
                        />
                    </Torus>
                    {/* Tech details on ring */}
                    <Torus args={[1.85, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshBasicMaterial color={CyanColor} transparent opacity={0.3} />
                    </Torus>
                </group>

                {/* Inner Ring */}
                <group ref={innerRing}>
                    <Torus args={[1.0, 0.05, 16, 100]}>
                        <meshStandardMaterial color="white" metalness={1} roughness={0.2} />
                    </Torus>
                </group>

                {/* The Core */}
                <Octahedron ref={core} args={[0.6]} >
                    <meshStandardMaterial emissive={CyanColor} emissiveIntensity={4} color={CyanColor} />
                </Octahedron>

                {/* Core Glow halo */}
                <mesh scale={1.5}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color={CyanColor} transparent opacity={0.2} />
                </mesh>

                {/* Ambient Particles */}
                <group>
                    {[...Array(8)].map((_, i) => (
                        <mesh key={i} position={[
                            Math.sin(i) * 3,
                            Math.cos(i * 2) * 3,
                            Math.sin(i * 3) * 2
                        ]}>
                            <sphereGeometry args={[0.03]} />
                            <meshBasicMaterial color={BlueColor} />
                        </mesh>
                    ))}
                </group>

                <pointLight position={[2, 2, 2]} intensity={2} color={CyanColor} distance={5} />
                <pointLight position={[-2, -2, 2]} intensity={2} color={BlueColor} distance={5} />
            </Float>
        </group>
    );
};
