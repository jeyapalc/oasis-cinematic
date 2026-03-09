"use client";

import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Scroll tracker – maps window scroll to 0→1
   ────────────────────────────────────────────── */
function useScrollProgress() {
    const progress = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progress.current = h > 0 ? window.scrollY / h : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return progress;
}

/* ──────────────────────────────────────────────
   Layer wrapper – applies per-frame parallax
   ────────────────────────────────────────────── */
function ParallaxLayer({
    children,
    speed,
    baseY,
}: {
    children: React.ReactNode;
    speed: number;
    baseY: number;
}) {
    const ref = useRef<THREE.Group>(null);
    const scrollProgress = useScrollProgress();

    useFrame(() => {
        if (ref.current) {
            // Parallax: deeper layers move slower
            ref.current.position.y = baseY - scrollProgress.current * speed;
        }
    });

    return <group ref={ref}>{children}</group>;
}

/* ──────────────────────────────────────────────
   Camera rig – scroll-driven camera movement
   ────────────────────────────────────────────── */
function ScrollCamera() {
    const { camera } = useThree();
    const scrollProgress = useScrollProgress();
    const initialPos = useMemo(() => new THREE.Vector3(0, 1.5, 10), []);

    useFrame(() => {
        const t = scrollProgress.current;
        // Push camera forward and down as the user scrolls
        camera.position.x = initialPos.x + t * 2;
        camera.position.y = initialPos.y - t * 3;
        camera.position.z = initialPos.z - t * 4;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

/* ──────────────────────────────────────────────
   Cactus scene – splits pack into 3 depth layers
   ────────────────────────────────────────────── */
function CactusScene() {
    const { scene } = useGLTF("/models/cactus.glb");

    // Clone meshes and distribute into layers
    const { foreground, midground, background } = useMemo(() => {
        const meshes: THREE.Object3D[] = [];
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                meshes.push(child.clone());
            }
        });

        // Distribute meshes across layers
        const fg: THREE.Object3D[] = [];
        const mg: THREE.Object3D[] = [];
        const bg: THREE.Object3D[] = [];

        meshes.forEach((mesh, i) => {
            const layer = i % 3;
            if (layer === 0) fg.push(mesh);
            else if (layer === 1) mg.push(mesh);
            else bg.push(mesh);
        });

        return { foreground: fg, midground: mg, background: bg };
    }, [scene]);

    return (
        <>
            {/* ── BACKGROUND cacti ── far away, small, subtle */}
            <ParallaxLayer speed={1} baseY={0}>
                <group position={[0, -1, -8]} scale={0.6}>
                    {background.map((mesh, i) => (
                        <primitive
                            key={`bg-${i}`}
                            object={mesh}
                            position={[(i - background.length / 2) * 4, 0, -2 * i]}
                        />
                    ))}
                </group>
            </ParallaxLayer>

            {/* ── MIDGROUND cacti ── medium distance, mid-scale */}
            <ParallaxLayer speed={3} baseY={0}>
                <group position={[0, -1, -2]} scale={1}>
                    {midground.map((mesh, i) => (
                        <primitive
                            key={`mg-${i}`}
                            object={mesh}
                            position={[(i - midground.length / 2) * 3.5, 0, -1.5 * i]}
                        />
                    ))}
                </group>
            </ParallaxLayer>

            {/* ── FOREGROUND cacti ── close, large, partially obstructs text */}
            <ParallaxLayer speed={6} baseY={0}>
                <group position={[0, -1, 4]} scale={1.8}>
                    {foreground.map((mesh, i) => (
                        <primitive
                            key={`fg-${i}`}
                            object={mesh}
                            position={[
                                (i % 2 === 0 ? -3.5 : 3.5) + i * 0.5,
                                0,
                                i * 1.5,
                            ]}
                        />
                    ))}
                </group>
            </ParallaxLayer>

            <ContactShadows
                position={[0, -1.01, 0]}
                opacity={0.3}
                scale={30}
                blur={2.5}
                far={8}
                color="#2e231e"
            />
        </>
    );
}

/* ──────────────────────────────────────────────
   Main canvas export
   ────────────────────────────────────────────── */
export function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 1.5, 10], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                {/* Warm desert lighting */}
                <ambientLight intensity={0.5} color="#f2e1d0" />
                <directionalLight
                    position={[8, 12, 5]}
                    intensity={2.2}
                    color="#ffecd2"
                    castShadow
                />
                <directionalLight
                    position={[-6, 4, -3]}
                    intensity={0.5}
                    color="#b87333"
                />
                {/* Rim light for depth */}
                <pointLight position={[0, 5, -10]} intensity={0.8} color="#2a9d8f" />

                <Environment preset="sunset" />

                <Suspense fallback={null}>
                    <CactusScene />
                </Suspense>

                <ScrollCamera />
            </Canvas>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-sand to-transparent pointer-events-none" />
        </div>
    );
}
