"use client";

import { useRef, useMemo, useEffect } from "react";
import * as ONE from "three";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import gsap from "gsap";

// Define strict color palette from Design System
const COLORS = ["#4A6B32", "#5A7B42", "#6A8B52", "#7A9B62", "#8BC34A"];
const tempColor = new ONE.Color();
const tempObject = new ONE.Object3D();

export const PixelatedGlobe = () => {
    const meshRef = useRef<ONE.InstancedMesh>(null);
    const groupRef = useRef<ONE.Group>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (groupRef.current) {
                gsap.to(groupRef.current.position, {
                    y: -2, // Move down
                    scrollTrigger: {
                        trigger: "#hero-section",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
                gsap.to(groupRef.current.scale, {
                    x: 0.5, y: 0.5, z: 0.5,
                    scrollTrigger: {
                        trigger: "#hero-section",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            }
        });
        return () => ctx.revert();
    }, []);
    const hoverRef = useRef<number | null>(null);

    // Generate sphere points
    // TODO: Replace with actual map data sampling in future
    const data = useMemo(() => {
        const points = [];
        const phiSpan = Math.PI;
        const thetaSpan = Math.PI * 2;
        const count = 2000; // Number of voxels

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const r = 3; // Radius
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Simple noise to simulate "continents" (placeholder)
            // In reality, we'd check if lat/lon is land
            if (Math.sin(x * 2) + Math.cos(y * 2) > 0) {
                points.push({ position: [x, y, z], color: COLORS[Math.floor(Math.random() * COLORS.length)] });
            }
        }
        return points;
    }, []);

    useFrame((state) => {
        // Rotation logic
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            // Interactive tilt
            const { x, y } = state.mouse;
            meshRef.current.rotation.x = ONE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.1, 0.1);
            meshRef.current.rotation.z = ONE.MathUtils.lerp(meshRef.current.rotation.z, -x * 0.1, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <Instances range={data.length} ref={meshRef}>
                <boxGeometry args={[0.08, 0.08, 0.08]} />
                <meshStandardMaterial color="#8BC34A" roughness={0.8} />

                {data.map((point, i) => (
                    <Instance
                        key={i}
                        position={point.position as [number, number, number]}
                        color={point.color}
                    />
                ))}
            </Instances>
        </group>
    );
};
