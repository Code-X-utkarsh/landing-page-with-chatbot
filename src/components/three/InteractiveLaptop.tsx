"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Html } from "@react-three/drei";
import gsap from "gsap";

export const InteractiveLaptop = () => {
    const group = useRef<THREE.Group>(null);
    const lidRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useCursor(hovered);

    useFrame((state) => {
        if (group.current) {
            // Floating animation
            group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
            // Rotate towards mouse slightly
            const { x, y } = state.mouse;
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.1, 0.1);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.1, 0.1);
        }
    });

    // GSAP Animation for Lid
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (lidRef.current && screenRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#about-section",
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    }
                });

                tl.to(lidRef.current.rotation, {
                    x: -Math.PI / 1.5, // Open lid ~120 degrees
                })
                    .to(screenRef.current.material, {
                        opacity: 1, // Simulate screen turning on (if we had specific material logic)
                    }, "<");
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            {/* Base */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[3, 0.2, 2]} />
                <meshStandardMaterial color="#2d2d2d" />
            </mesh>

            {/* Lid Group - Pivots at the back */}
            <group ref={lidRef} position={[0, -0.4, -1]}>
                {/* Lid Screen Housing */}
                <mesh position={[0, 1, 0]}> {/* Centered relative to pivot */}
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshStandardMaterial color="#3d3d3d" />
                </mesh>

                {/* Screen Content */}
                <mesh ref={screenRef} position={[0, 1, 0.06]}>
                    <planeGeometry args={[2.8, 1.8]} />
                    <meshBasicMaterial color="#000000">
                        {/* We could use a texture here or HTML */}
                    </meshBasicMaterial>
                </mesh>

                {/* Floating HTML UI on Screen */}
                <Html transform wrapperClass="laptop-html" position={[0, 1, 0.07]} distanceFactor={1.5} rotation-x={-0.1}>
                    <div className="bg-[#1e1e1e] p-4 w-[300px] h-[200px] overflow-hidden rounded text-xs text-green-400 font-mono">
                        <p>{">"} Initiating system...</p>
                        <p>{">"} Loading salaries...</p>
                        <p>{">"} Visa check: OK</p>
                        <p className="animate-pulse mt-2">_</p>
                    </div>
                </Html>
            </group>
        </group>
    );
};
