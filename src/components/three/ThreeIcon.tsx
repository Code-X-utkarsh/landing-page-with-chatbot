"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ThreeIconProps {
    color?: string;
    shape?: "box" | "sphere" | "octahedron";
}

export const ThreeIcon = ({ color = "#FF9800", shape = "box" }: ThreeIconProps) => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <mesh ref={mesh}>
            {shape === "box" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
            {shape === "sphere" && <icosahedronGeometry args={[1, 0]} />}
            {shape === "octahedron" && <octahedronGeometry args={[1]} />}
            <meshStandardMaterial color={color} wireframe />
        </mesh>
    );
};
