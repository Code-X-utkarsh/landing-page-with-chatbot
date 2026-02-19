"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

export const ConnectionLines = () => {
    const lines = useMemo(() => {
        const paths = [];
        const count = 10;
        const radius = 3;

        for (let i = 0; i < count; i++) {
            // Random start point
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            const start = new THREE.Vector3().setFromSphericalCoords(radius, phi1, theta1);

            // Random end point
            const theta2 = Math.random() * Math.PI * 2;
            const phi2 = Math.acos(2 * Math.random() - 1);
            const end = new THREE.Vector3().setFromSphericalCoords(radius, phi2, theta2);

            // Control point (midpoint projected out)
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.5);

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const points = curve.getPoints(20);
            paths.push(points);
        }
        return paths;
    }, []);

    return (
        <group rotation-y={0}>
            {lines.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={i % 2 === 0 ? "#FF9800" : "#FFFFFF"}
                    lineWidth={1}
                    transparent
                    opacity={0.6}
                />
            ))}
        </group>
    );
};
