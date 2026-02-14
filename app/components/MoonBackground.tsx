"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function MoonBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [textureLoaded, setTextureLoaded] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- Three.js setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            200
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0c0e0f, 1);
        container.appendChild(renderer.domElement);

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        // Start with light behind camera → full moon on load
        directionalLight.position.set(0, 0.5, 10);
        scene.add(directionalLight);

        // --- Moon ---
        const moonGeometry = new THREE.SphereGeometry(1.0, 64, 64);
        const moonMaterial = new THREE.MeshStandardMaterial({
            roughness: 1,
            metalness: 0,
        });

        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        // Natural axial tilt (~23°); Y=0 shows the near side (tidally locked face from Earth)
        moon.rotation.x = 0.1;
        moon.rotation.y = -1.3;
        scene.add(moon);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load("/8k_moon.jpg", (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            moonMaterial.map = texture;
            moonMaterial.needsUpdate = true;
            setTextureLoaded(true);
        });

        // =====================
        // --- Starfield ---
        // =====================
        const STAR_COUNT = 2000;
        const positions = new Float32Array(STAR_COUNT * 3);
        const sizes = new Float32Array(STAR_COUNT);
        const phases = new Float32Array(STAR_COUNT);

        // Only place stars within the camera's view frustum
        const fovRad = (45 * Math.PI) / 180;
        const camZ = 5;

        function regenerateStarPositions() {
            const currentAspect = window.innerWidth / window.innerHeight;
            for (let i = 0; i < STAR_COUNT; i++) {
                const z = -(15 + Math.random() * 40);
                const dist = camZ - z;
                const halfH = Math.tan(fovRad / 2) * dist * 1.2;
                const halfW = halfH * currentAspect;

                positions[i * 3 + 0] = (Math.random() * 2 - 1) * halfW;
                positions[i * 3 + 1] = (Math.random() * 2 - 1) * halfH;
                positions[i * 3 + 2] = z;
            }
            // Flag buffer for GPU re-upload
            const posAttr = starGeometry.getAttribute("position");
            if (posAttr) posAttr.needsUpdate = true;
        }

        // Init sizes and phases (these don't change on resize)
        for (let i = 0; i < STAR_COUNT; i++) {
            sizes[i] = 0.5 + Math.random() * 1.5;
            phases[i] = Math.random() * Math.PI * 2;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        starGeometry.setAttribute(
            "aSize",
            new THREE.BufferAttribute(sizes, 1)
        );
        starGeometry.setAttribute(
            "aPhase",
            new THREE.BufferAttribute(phases, 1)
        );

        // Generate initial positions
        regenerateStarPositions();

        // Try ShaderMaterial with twinkle; fall back to PointsMaterial
        let starMaterial: THREE.ShaderMaterial | THREE.PointsMaterial;
        let useShader = false;

        try {
            starMaterial = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uTime: { value: 0 },
                    uPixelRatio: {
                        value: Math.min(window.devicePixelRatio, 2),
                    },
                },
                vertexShader: `
                    attribute float aSize;
                    attribute float aPhase;
                    varying float vPhase;
                    uniform float uTime;
                    uniform float uPixelRatio;

                    void main() {
                        vPhase = aPhase;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        float dist = -mvPosition.z;
                        gl_PointSize = aSize * uPixelRatio * (80.0 / max(dist, 1.0));
                    }
                `,
                fragmentShader: `
                    varying float vPhase;
                    uniform float uTime;

                    float hash(float n) {
                        return fract(sin(n) * 43758.5453123);
                    }

                    void main() {
                        // Circular point sprite
                        vec2 uv = gl_PointCoord - vec2(0.5);
                        float d = length(uv);
                        if (d > 0.5) discard;

                        // Twinkle: layered sine waves for dramatic shimmer
                        float h = hash(vPhase * 100.0);
                        float tw1 = 0.5 + 0.5 * sin(uTime * (0.5 + 1.0 * h) + vPhase);
                        float tw2 = 0.5 + 0.5 * sin(uTime * (1.5 + 3.0 * h) + vPhase * 2.3);
                        float tw3 = 0.85 + 0.15 * sin(uTime * (2.0 + 1.0 * h) + vPhase * 0.7);
                        float twinkle = max(tw1 * tw2 * tw3, 0.35);

                        // Soft glow edge
                        float alpha = smoothstep(0.5, 0.02, d) * twinkle * 1.0;

                        // Vibrant warm/cool color variation
                        vec3 color = mix(
                            vec3(0.7, 0.85, 1.0),
                            vec3(1.0, 0.92, 0.75),
                            h
                        );

                        gl_FragColor = vec4(color, alpha);
                    }
                `,
            });

            // Test that the shader compiles
            renderer.compile(scene, camera);
            useShader = true;
        } catch {
            // Fallback: simple white dots, no twinkle
            starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.15,
                transparent: true,
                opacity: 0.6,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });
        }

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // --- Tuning ---
        const LIGHT_LERP_SPEED = 0.12;       // How quickly the light catches up (0–1)
        const IDLE_ROTATION_SPEED = 0.12;    // Radians/sec when idle

        // --- State ---
        let scrollY = window.scrollY;
        let isIdle = false;
        let idleTimer: ReturnType<typeof setTimeout> | null = null;
        let autoRotationOffset = 0;
        let scrollRotationAtIdleStart = 0;
        let rotationCarryOver = 0; // Accumulated offset from auto-rotations
        let disposed = false;

        function resetIdleTimer() {
            if (isIdle) {
                // carry over the auto-rotation so scroll resumes from current position
                rotationCarryOver += autoRotationOffset;
            }
            isIdle = false;
            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isIdle = true;
                scrollRotationAtIdleStart = scrollY * 0.0015 + rotationCarryOver;
                autoRotationOffset = 0;
            }, 1500);
        }

        function onScroll() {
            scrollY = window.scrollY;
            resetIdleTimer();
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        resetIdleTimer();

        // --- Resize ---
        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            // Regenerate star positions for new aspect ratio
            regenerateStarPositions();
            if (useShader && "uniforms" in starMaterial) {
                (starMaterial as THREE.ShaderMaterial).uniforms.uPixelRatio.value =
                    Math.min(window.devicePixelRatio, 2);
            }
        }

        window.addEventListener("resize", onResize);

        // --- Animation loop ---
        let prevTime = performance.now();

        function animate() {
            if (disposed) return;
            requestAnimationFrame(animate);

            const now = performance.now();
            const delta = (now - prevTime) / 1000;
            prevTime = now;

            // Moon phase – orbit the directional light around the moon
            let targetAngle: number;
            if (isIdle) {
                autoRotationOffset += delta * IDLE_ROTATION_SPEED;
                targetAngle = scrollRotationAtIdleStart + autoRotationOffset;
            } else {
                targetAngle = scrollY * 0.0015 + rotationCarryOver;
            }
            const targetX = 10 * Math.sin(targetAngle);
            const targetZ = 10 * Math.cos(targetAngle);
            // Smooth lerp to avoid jitter on transitions
            directionalLight.position.x += (targetX - directionalLight.position.x) * LIGHT_LERP_SPEED;
            directionalLight.position.z += (targetZ - directionalLight.position.z) * LIGHT_LERP_SPEED;

            // Star twinkle time
            if (useShader && "uniforms" in starMaterial) {
                (starMaterial as THREE.ShaderMaterial).uniforms.uTime.value =
                    now * 0.001;
            }

            renderer.render(scene, camera);
        }

        animate();

        // --- Cleanup ---
        return () => {
            disposed = true;
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (idleTimer) clearTimeout(idleTimer);

            renderer.dispose();
            moonGeometry.dispose();
            moonMaterial.dispose();
            if (moonMaterial.map) moonMaterial.map.dispose();
            starGeometry.dispose();
            starMaterial.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="fixed inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            />
            {/* Dark overlay that fades out once texture is loaded */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 2,
                    backgroundColor: "#0c0e0f",
                    opacity: textureLoaded ? 0 : 1,
                    transition: "opacity 1.5s ease-in-out",
                }}
            />
        </>
    );
}
