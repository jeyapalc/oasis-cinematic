"use client";

import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Scene() {
    const { scene } = useGLTF("/models/oasis-model.glb");

    return (
        <group position={[0, -1, 0]}>
            {/* 
        The provided STL wasn't pre-textured, so we'll assign a basic cinematic sand/terracotta material
        to all its meshes by traversing the scene graph. 
      */}
            <primitive
                object={scene}
                scale={0.05} // Scale down the raw STL conversion which is often huge
            />
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.4}
                scale={50}
                blur={2}
                far={10}
            />
        </group>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0 bg-dune">
            <Canvas camera={{ position: [5, 2, 8], fov: 45 }}>
                <color attach="background" args={["#f2e1d0"]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-bias={-0.0001}
                />

                {/* Soft studio lighting to feel high-end */}
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Scene />
                </Suspense>

                {/* Cinematic slow pan controls */}
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 + 0.1}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
            {/* Overlay gradient to blend bottom of canvas into the next section */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-sand to-transparent pointer-events-none" />
        </div>
    );
}
