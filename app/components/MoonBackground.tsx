"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MoonBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- Three.js setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 0.5, 5);
        scene.add(directionalLight);

        // --- Moon (smaller sphere) ---
        const geometry = new THREE.SphereGeometry(1.0, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            roughness: 1,
            metalness: 0,
        });

        const moon = new THREE.Mesh(geometry, material);
        moon.rotation.x = 0.1;
        scene.add(moon);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load("/8k_moon.jpg", (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.needsUpdate = true;
        });

        // --- State ---
        let scrollY = window.scrollY;
        let isIdle = false;
        let idleTimer: ReturnType<typeof setTimeout> | null = null;
        let autoRotationOffset = 0;
        let scrollRotationAtIdleStart = 0;
        let disposed = false;

        function resetIdleTimer() {
            isIdle = false;
            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isIdle = true;
                scrollRotationAtIdleStart = scrollY * 0.002;
                autoRotationOffset = 0;
            }, 3000);
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

            if (isIdle) {
                autoRotationOffset += delta * 0.15;
                moon.rotation.y =
                    scrollRotationAtIdleStart + autoRotationOffset;
            } else {
                moon.rotation.y = scrollY * 0.002;
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
            geometry.dispose();
            material.dispose();
            if (material.map) material.map.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
