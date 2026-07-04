import { useEffect, useRef } from "react";
import * as THREE from "three";

// A lightweight animated 3D backdrop: a wireframe icosahedron core wrapped in
// a slowly-rotating orbit of particles, tinted to the brand orange. Reacts
// gently to pointer movement for a subtle parallax feel. Pure three.js
// (no @react-three/fiber) to keep the bundle small.
export default function Scene3D({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 768;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: !isSmallScreen, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const violet = new THREE.Color(0x8b5cf6);
    const cyan = new THREE.Color(0x22d3ee);

    // Wireframe icosahedron core
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.55 });
    const core = new THREE.LineSegments(coreEdges, coreMat);
    scene.add(core);

    // Inner faint solid for depth
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.05 });
    const solid = new THREE.Mesh(coreGeo, solidMat);
    scene.add(solid);

    // Particle field orbiting around (fewer particles on small screens for performance)
    const particleCount = isSmallScreen ? 130 : 260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient each particle between violet and cyan for an aurora feel
      const mixed = violet.clone().lerp(cyan, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      vertexColors: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = prefersReduced ? 0.05 : 1;

      core.rotation.y = t * 0.18 * speed;
      core.rotation.x = t * 0.09 * speed;
      solid.rotation.copy(core.rotation);

      particles.rotation.y = -t * 0.07 * speed;
      particles.rotation.x = t * 0.04 * speed;

      camera.position.x += (pointerX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-pointerY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      coreGeo.dispose();
      coreEdges.dispose();
      coreMat.dispose();
      solidMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`scene3d ${className}`} aria-hidden="true" />;
}
