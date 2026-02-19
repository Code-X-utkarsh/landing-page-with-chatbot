"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
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

export const RealisticGlobe = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    const [dayMap, normalMap, specularMap, cloudsMap, nightMap] = useLoader(TextureLoader, [
        "/textures/earth_daymap.jpg",
        "/textures/earth_normal_map.jpg",
        "/textures/earth_specular_map.jpg",
        "/textures/earth_clouds.png",
        "/textures/earth_lights_2048.png",
    ]);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                dayTexture: { value: dayMap },
                nightTexture: { value: nightMap },
                normalMap: { value: normalMap },
                specularMap: { value: specularMap },
                cloudsMap: { value: cloudsMap },
                sunDirection: { value: new THREE.Vector3(2, 0.5, 2).normalize() },
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D dayTexture;
                uniform sampler2D nightTexture;
                uniform sampler2D normalMap;
                uniform sampler2D specularMap;
                uniform sampler2D cloudsMap;
                uniform vec3 sunDirection;

                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;

                void main() {
                    vec3 viewDir = normalize(-vPosition);
                    vec3 normal = normalize(vNormal);
                    vec3 sunDir = normalize(sunDirection);

                    // Day/Night mixing factor based on dot product
                    float sunOrientation = dot(normal, sunDir);
                    float dayMix = smoothstep(-0.25, 0.25, sunOrientation);

                    // Textures
                    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
                    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
                    vec3 clouds = texture2D(cloudsMap, vUv).rgb;
                    float specular = texture2D(specularMap, vUv).r;

                    // Apply clouds to day/night
                    dayColor = mix(dayColor, vec3(1.0), clouds.r * 0.4);
                    nightColor = mix(nightColor, vec3(0.0), clouds.r * 0.9); // Clouds obscure city lights

                    // Specular reflection (Oceans only)
                    vec3 reflection = normalize(sunDir + viewDir);
                    float spec = pow(max(dot(normal, reflection), 0.0), 32.0) * specular;
                    dayColor += vec3(0.5) * spec * dayMix;

                    // Final color blend
                    vec3 finalColor = mix(nightColor, dayColor, dayMix);

                    // Atmosphere Rim
                    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
                    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(rim, 3.0);
                    
                    gl_FragColor = vec4(finalColor + atmosphere * 0.3, 1.0);
                }
            `
        });
    }, [dayMap, nightMap, normalMap, specularMap, cloudsMap]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
        if (groupRef.current) {
            // Create a slow orbit or "breathing" effect if desired
        }
    });

    return (
        <group ref={groupRef} scale={[2.9, 2.9, 2.9]}> {/* Refined Scale for Balanced Visuals */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 128, 128]} /> {/* High poly for smooth rim */}
                <primitive object={shaderMaterial} attach="material" />
            </mesh>

            {/* Outer Atmosphere Glow */}
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[1, 64, 64]} />
                <shaderMaterial
                    vertexShader={ATMOSPHERE_VERTEX_SHADER}
                    fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    transparent={true}
                />
            </mesh>
        </group>
    );
};
