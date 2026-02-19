"use client";

import { useMemo, useRef } from "react";
import * as ONE from "three";
import { useFrame } from "@react-three/fiber";

interface ParticleSystemProps {
    count?: number;
    color?: string;
}

export const ParticleSystem = ({ count = 500, color = "#8BC34A" }: ParticleSystemProps) => {
    const mesh = useRef<ONE.Points>(null);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = ONE.MathUtils.randFloatSpread(360);
            const phi = ONE.MathUtils.randFloatSpread(360);

            const r = 4 + Math.random() * 4; // Radius range 4-8

            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);

            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={color}
                sizeAttenuation
                transparent
                opacity={0.6}
                blending={ONE.AdditiveBlending}
            />
        </points>
    );
};
