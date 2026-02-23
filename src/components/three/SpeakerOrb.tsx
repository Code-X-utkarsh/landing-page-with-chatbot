"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";

// ─── Holographic aurora GLSL shaders ───────────────────────────────────────
const VERT = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 viewDir = normalize(-vPosition);

    // Animated aurora wave layers
    float w1 = sin(vUv.x * 10.0 + uTime * 0.7) * 0.5 + 0.5;
    float w2 = sin(vUv.y * 8.0  + uTime * 0.5 + 1.57) * 0.5 + 0.5;
    float w3 = sin((vUv.x + vUv.y) * 6.0 - uTime * 0.35) * 0.5 + 0.5;
    float pattern = w1 * 0.4 + w2 * 0.35 + w3 * 0.25;

    // Color palette: lime-green ↔ cyan ↔ white
    vec3 lime  = vec3(0.545, 0.765, 0.290);   // #8BC34A
    vec3 cyan  = vec3(0.200, 0.950, 0.850);
    vec3 white = vec3(1.000, 1.000, 1.000);

    vec3 col = mix(lime, cyan, w1 * 0.65);
    col = mix(col, white, pattern * 0.22);

    // Fresnel rim glow
    float rim = 1.0 - max(dot(viewDir, normalize(vNormal)), 0.0);
    rim = pow(rim, 2.2);
    col += lime * rim * 1.8;

    // Depth variation
    float alpha = 0.55 + pattern * 0.45;
    gl_FragColor = vec4(col, alpha);
}
`;

// ─── Single orbiting electron particle ─────────────────────────────────────
function OrbitParticle({
    radius, speed, offset, yScale = 0.4, color,
}: {
    radius: number; speed: number; offset: number; yScale?: number; color: string;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime * speed + offset;
        ref.current.position.set(
            radius * Math.cos(t),
            radius * yScale * Math.sin(t * 1.3),
            radius * Math.sin(t),
        );
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} />
        </mesh>
    );
}

// ─── Rotating orbital ring ──────────────────────────────────────────────────
function OrbitalRing({
    rotation, speed, color, radius = 1.8, thickness = 0.014,
}: {
    rotation: [number, number, number]; speed: number; color: string;
    radius?: number; thickness?: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * speed;
    });
    return (
        <mesh ref={ref} rotation={rotation}>
            <torusGeometry args={[radius, thickness, 16, 120]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
    );
}

// ─── Main SpeakerOrb ───────────────────────────────────────────────────────
export const SpeakerOrb = () => {
    const coreRef = useRef<THREE.Mesh>(null);
    const icoRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        side: THREE.FrontSide,
    }), []);

    useFrame((state) => {
        // Feed time into the GLSL shader
        shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;

        // Slow self-rotation of core
        if (coreRef.current) {
            coreRef.current.rotation.y += 0.003;
            coreRef.current.rotation.x += 0.001;
        }

        // Outer wireframe counter-rotates
        if (icoRef.current) {
            icoRef.current.rotation.y -= 0.004;
            icoRef.current.rotation.x += 0.002;
        }

        // Subtle top-level sway
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.14;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.55}>

                {/* ── Core holographic sphere ── */}
                <mesh ref={coreRef}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <primitive object={shaderMaterial} attach="material" />
                </mesh>

                {/* Point lights for inner glow */}
                <pointLight color="#8BC34A" intensity={4} distance={5} />
                <pointLight color="#00f5d4" intensity={2} distance={3} position={[0.6, 0.6, 0.6]} />

                {/* ── Wireframe icosahedron shell ── */}
                <mesh ref={icoRef} scale={[2.45, 2.45, 2.45]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial wireframe color="#8BC34A" transparent opacity={0.07} />
                </mesh>

                {/* ── Orbital rings at different angles / speeds ── */}
                <OrbitalRing
                    rotation={[0, 0, 0]}
                    speed={0.42} color="#8BC34A" radius={1.62} thickness={0.013}
                />
                <OrbitalRing
                    rotation={[Math.PI / 3, 0, Math.PI / 6]}
                    speed={-0.32} color="#C5E1A5" radius={1.88} thickness={0.010}
                />
                <OrbitalRing
                    rotation={[-Math.PI / 4, Math.PI / 4, 0]}
                    speed={0.26} color="#00f0c8" radius={2.12} thickness={0.008}
                />

                {/* ── Orbiting electron particles ── */}
                <OrbitParticle radius={1.62} speed={0.9} offset={0} yScale={0.35} color="#8BC34A" />
                <OrbitParticle radius={1.62} speed={0.9} offset={Math.PI} yScale={0.35} color="#C5E1A5" />
                <OrbitParticle radius={1.88} speed={-0.7} offset={Math.PI / 3} yScale={0.50} color="#00f0c8" />
                <OrbitParticle radius={1.88} speed={-0.7} offset={(4 * Math.PI) / 3} yScale={0.50} color="#ffffff" />
                <OrbitParticle radius={2.12} speed={0.5} offset={Math.PI / 6} yScale={0.30} color="#8BC34A" />
                <OrbitParticle radius={2.12} speed={0.5} offset={(7 * Math.PI) / 6} yScale={0.30} color="#C5E1A5" />

                {/* ── Floating TK monogram ── */}
                <Text
                    position={[0, 0, 1.08]}
                    fontSize={0.36}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.12}
                >
                    TK
                </Text>

            </Float>
        </group>
    );
};
