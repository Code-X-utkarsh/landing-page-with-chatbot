"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";

const ATMOSPHERE_VERTEX_SHADER = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ATMOSPHERE_FRAGMENT_SHADER = `
varying vec3 vNormal;
void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 1.5;
}
`;

const GLOBE_VERTEX_SHADER = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Simple noise function for "continents" look
const GLOBE_FRAGMENT_SHADER = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Simple noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    // Generate some "terrain" patterns
    float n = noise(vUv * 10.0 + 2.0); // Scale up noise
    n += noise(vUv * 20.0) * 0.5;
    
    // Mix colors based on noise (Ocean vs Land vs Clouds)
    vec3 oceanColor = vec3(0.02, 0.05, 0.1); // Deep dark blue/black
    vec3 landColor = vec3(0.1, 0.2, 0.1);    // Dark green/grey
    vec3 highlightColor = vec3(0.54, 0.76, 0.29); // #8BC34A brand color
    
    vec3 color = mix(oceanColor, landColor, smoothstep(0.4, 0.6, n));
    
    // Add "City Lights" or "Data Points"
    float grid = step(0.98, fract(vUv.x * 100.0)) * step(0.98, fract(vUv.y * 50.0));
    color += highlightColor * grid * smoothstep(0.5, 0.6, n); // Lights mainly on land
    
    // Fresnel Rim (Inner Atmosphere)
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    color += vec3(0.2, 0.5, 1.0) * intensity; // Blueish rim

    gl_FragColor = vec4(color, 1.0);
}
`;

export const PremiumGlobe = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);

    // Globe Material
    const globeMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: GLOBE_VERTEX_SHADER,
            fragmentShader: GLOBE_FRAGMENT_SHADER,
            uniforms: {
                time: { value: 0 },
            }
        });
    }, []);

    // Atmosphere Material
    const atmosphereMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: ATMOSPHERE_VERTEX_SHADER,
            fragmentShader: ATMOSPHERE_FRAGMENT_SHADER,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
        });
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            // Interactive tilt
            const { x, y } = state.mouse;
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.1, 0.1);
            meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -x * 0.1, 0.1);
        }
    });

    return (
        <group>
            {/* Main Globe */}
            <mesh ref={meshRef} material={globeMaterial}>
                <sphereGeometry args={[2, 64, 64]} />
            </mesh>

            {/* Atmospheric Glow (Outer) */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[2, 64, 64]} />
                <shaderMaterial
                    vertexShader={ATMOSPHERE_VERTEX_SHADER}
                    fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    transparent={true}
                />
            </mesh>

            {/* Stars/Background Particles */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};
