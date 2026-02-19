"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
    children: React.ReactNode;
    cameraPosition?: [number, number, number];
    fov?: number;
    className?: string;
    enableControls?: boolean;
}

export const Scene = ({
    children,
    cameraPosition = [0, 0, 8],
    fov = 50,
    className = "absolute inset-0 z-0",
    enableControls = false,
}: SceneProps) => {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: cameraPosition, fov }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Optimize for mobile
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    {children}
                    {enableControls && <OrbitControls enableZoom={false} />}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
};
