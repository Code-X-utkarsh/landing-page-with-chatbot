"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const ATMOSPHERE_VERTEX_SHADER = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Green-tinted atmosphere to match brand palette
const ATMOSPHERE_FRAGMENT_SHADER = `
varying vec3 vNormal;
void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.2, 0.75, 0.3, 1.0) * intensity * 1.5;
}
`;

const BASE_SCALE = 2.9;

interface RealisticGlobeProps {
    scrollRef?: React.MutableRefObject<number>;
}

export const RealisticGlobe = ({ scrollRef }: RealisticGlobeProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Reusable vectors to avoid GC pressure in animation loop
    const _targetScale = useRef(new THREE.Vector3(BASE_SCALE, BASE_SCALE, BASE_SCALE));
    const _targetPos = useRef(new THREE.Vector3(0, 0, 0));

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

                    float sunOrientation = dot(normal, sunDir);
                    float dayMix = smoothstep(-0.25, 0.25, sunOrientation);

                    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
                    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
                    vec3 clouds = texture2D(cloudsMap, vUv).rgb;
                    float specular = texture2D(specularMap, vUv).r;

                    dayColor = mix(dayColor, vec3(1.0), clouds.r * 0.4);
                    nightColor = mix(nightColor, vec3(0.0), clouds.r * 0.9);

                    vec3 reflection = normalize(sunDir + viewDir);
                    float spec = pow(max(dot(normal, reflection), 0.0), 32.0) * specular;
                    dayColor += vec3(0.5) * spec * dayMix;

                    vec3 finalColor = mix(nightColor, dayColor, dayMix);

                    // Green-tinted atmosphere rim for brand consistency
                    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
                    vec3 atmosphere = vec3(0.2, 0.75, 0.35) * pow(rim, 3.0);
                    
                    gl_FragColor = vec4(finalColor + atmosphere * 0.35, 1.0);
                }
            `
        });
    }, [dayMap, nightMap, normalMap, specularMap, cloudsMap]);

    useFrame(() => {
        // Continuous slow rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }

        // 3D scroll parallax — globe grows & drifts up as hero scrolls away
        if (groupRef.current && scrollRef) {
            const p = Math.min(Math.max(scrollRef.current, 0), 1);
            const s = BASE_SCALE + p * 0.9; // slightly zooms in
            _targetScale.current.set(s, s, s);
            _targetPos.current.set(0, -p * 1.8, 0); // drifts upward
            groupRef.current.scale.lerp(_targetScale.current, 0.05);
            groupRef.current.position.lerp(_targetPos.current, 0.05);
        }
    });

    return (
        <group ref={groupRef} scale={[BASE_SCALE, BASE_SCALE, BASE_SCALE]}>
            {/* Earth mesh */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 128, 128]} />
                <primitive object={shaderMaterial} attach="material" />
            </mesh>

            {/* Outer Atmosphere Glow — green tinted */}
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
