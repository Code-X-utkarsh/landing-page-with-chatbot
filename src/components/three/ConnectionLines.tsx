"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

export const ConnectionLines = () => {
    const groupRef = useRef<THREE.Group>(null);

    const lines = useMemo(() => {
        const paths = [];
        const count = 12;
        const radius = 3;

        for (let i = 0; i < count; i++) {
            // Random start point on sphere surface
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            const start = new THREE.Vector3().setFromSphericalCoords(radius, phi1, theta1);

            // Random end point on sphere surface
            const theta2 = Math.random() * Math.PI * 2;
            const phi2 = Math.acos(2 * Math.random() - 1);
            const end = new THREE.Vector3().setFromSphericalCoords(radius, phi2, theta2);

            // Control point (arc outward)
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.6);

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const points = curve.getPoints(24);
            paths.push(points);
        }
        return paths;
    }, []);

    // Slow rotation of the arcs to add life
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {lines.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={i % 2 === 0 ? "#8BC34A" : "#C5E1A5"}
                    lineWidth={i % 3 === 0 ? 1.5 : 0.8}
                    transparent
                    opacity={i % 2 === 0 ? 0.55 : 0.35}
                />
            ))}
        </group>
    );
};
