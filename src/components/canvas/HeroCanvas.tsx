"use client";

import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CactusScene() {
    const { scene } = useGLTF("/models/cactus.glb");
    const groupRef = useRef<THREE.Group>(null);

    // Gentle floating animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            groupRef.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.8, 0]}>
            <primitive object={scene} scale={1.5} />
            <ContactShadows
                position={[0, -0.01, 0]}
                opacity={0.35}
                scale={10}
                blur={2.5}
                far={4}
                color="#2e231e"
            />
        </group>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [4, 2, 5], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                {/* Warm desert lighting */}
                <ambientLight intensity={0.6} color="#f2e1d0" />
                <directionalLight
                    position={[8, 10, 5]}
                    intensity={2}
                    color="#ffecd2"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight
                    position={[-5, 3, -5]}
                    intensity={0.4}
                    color="#b87333"
                />

                {/* Environment for reflections */}
                <Environment preset="sunset" />

                <Suspense fallback={null}>
                    <CactusScene />
                </Suspense>

                {/* Slow auto-rotate, no zoom/pan */}
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.4}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>

            {/* Gradient fade into next section */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-sand to-transparent pointer-events-none" />
        </div>
    );
}
