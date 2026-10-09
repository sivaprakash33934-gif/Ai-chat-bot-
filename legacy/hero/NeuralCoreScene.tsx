"use client";

import {
  type MutableRefObject,
  useEffect,
  useRef,
} from "react";
import * as THREE from "three";
import {
  COLOR_INDIGO,
  COLOR_EMERALD,
  COLOR_AMBER,
  COLOR_STRUCTURAL,
  SPRING_STIFFNESS,
  SPRING_DAMPING,
  DESKTOP_STRUCTURAL,
  DESKTOP_STREAM,
  MOBILE_STRUCTURAL,
  MOBILE_STREAM,
  dampedSpring,
  easeOutCubic,
  type StreamParticle,
} from "./ParticleSystem";

export interface NeuralCoreSceneProps {
  typingTick: number;
  submitTick: number;
  intensityRef: MutableRefObject<number>;
  onWebGLFailure?: () => void;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2", {
        failIfMajorPerformanceCaveat: true,
      }) ||
        canvas.getContext("webgl", {
          failIfMajorPerformanceCaveat: true,
        }),
    );
  } catch {
    return false;
  }
}

export function NeuralCoreScene({
  typingTick,
  submitTick,
  intensityRef,
  onWebGLFailure,
}: NeuralCoreSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const latestTyping = useRef(typingTick);
  const latestSubmit = useRef(submitTick);

  useEffect(() => {
    latestTyping.current = typingTick;
  }, [typingTick]);

  useEffect(() => {
    latestSubmit.current = submitTick;
  }, [submitTick]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lowPower =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency < 4;

    if (reducedMotion || lowPower || !hasWebGL()) {
      onWebGLFailure?.();
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: true,
      });
    } catch {
      onWebGLFailure?.();
      return;
    }

    const canvas = renderer.domElement;
    canvas.setAttribute(
      "aria-label",
      "Interactive Neural Commerce network showing data entering, organizing, connecting and producing an output.",
    );
    canvas.setAttribute("role", "img");

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 7.7);

    const network = new THREE.Group();
    scene.add(network);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const structuralCount = isMobile ? MOBILE_STRUCTURAL : DESKTOP_STRUCTURAL;
    const streamCount = isMobile ? MOBILE_STREAM : DESKTOP_STREAM;

    /*
     * ----------------------------------------
     * 1. STRUCTURAL NETWORK (1 draw call)
     * ----------------------------------------
     */
    const restPositions = new Float32Array(structuralCount * 3);
    const structuralPositions = new Float32Array(structuralCount * 3);
    const structuralColors = new Float32Array(structuralCount * 3);
    const velocities = new Float32Array(structuralCount * 3);
    const phases = new Float32Array(structuralCount);
    const columns = 13;

    for (let i = 0; i < structuralCount; i++) {
      const column = i % columns;
      const row = Math.floor(i / columns);
      const columnProgress = column / (columns - 1);
      const x = -2.6 + columnProgress * 5.2;

      const pseudo = Math.sin(i * 12.9898) * 43758.5453;
      const random = pseudo - Math.floor(pseudo);
      const y = ((row % 9) - 4) * 0.31 + (random - 0.5) * 0.18;
      const z = Math.sin(i * 1.618) * 0.52 + Math.cos(column * 0.7) * 0.16;

      const index = i * 3;
      restPositions[index] = x;
      restPositions[index + 1] = y;
      restPositions[index + 2] = z;

      structuralPositions[index] = x;
      structuralPositions[index + 1] = y;
      structuralPositions[index + 2] = z;

      const color =
        x > 1.45
          ? COLOR_EMERALD
          : Math.abs(x) < 1.4
          ? COLOR_INDIGO
          : COLOR_STRUCTURAL;

      structuralColors[index] = color.r;
      structuralColors[index + 1] = color.g;
      structuralColors[index + 2] = color.b;

      phases[i] = (i * 0.61803398875) % (Math.PI * 2);
    }

    const structuralGeometry = new THREE.BufferGeometry();
    const structuralPositionAttribute = new THREE.BufferAttribute(
      structuralPositions,
      3,
    );
    structuralPositionAttribute.setUsage(THREE.DynamicDrawUsage);
    structuralGeometry.setAttribute("position", structuralPositionAttribute);
    structuralGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(structuralColors, 3),
    );

    const structuralMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.065 : 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
      vertexColors: true,
      depthWrite: false,
    });

    const structuralPoints = new THREE.Points(
      structuralGeometry,
      structuralMaterial,
    );
    network.add(structuralPoints);

    /*
     * ----------------------------------------
     * 2. HAIRLINE BACKBONE (1 draw call)
     * ----------------------------------------
     */
    const maxEdges = structuralCount - columns;
    const linePositions = new Float32Array(maxEdges * 6);
    let edgeCount = 0;

    for (let i = 0; i < structuralCount - columns; i++) {
      const a = i;
      const b = i + columns;
      const lineIndex = edgeCount * 6;

      linePositions[lineIndex] = structuralPositions[a * 3];
      linePositions[lineIndex + 1] = structuralPositions[a * 3 + 1];
      linePositions[lineIndex + 2] = structuralPositions[a * 3 + 2];
      linePositions[lineIndex + 3] = structuralPositions[b * 3];
      linePositions[lineIndex + 4] = structuralPositions[b * 3 + 1];
      linePositions[lineIndex + 5] = structuralPositions[b * 3 + 2];
      edgeCount++;
    }

    const lineGeometry = new THREE.BufferGeometry();
    const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
    lineAttribute.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute("position", lineAttribute);
    lineGeometry.setDrawRange(0, edgeCount * 2);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    network.add(lines);

    /*
     * ----------------------------------------
     * 3. INGEST / TRANSIT PARTICLES (1 draw call)
     * ----------------------------------------
     */
    const streamPositions = new Float32Array(streamCount * 3);
    const streamColors = new Float32Array(streamCount * 3);
    const streamParticles: StreamParticle[] = new Array(streamCount);

    for (let i = 0; i < streamCount; i++) {
      streamParticles[i] = {
        active: false,
        progress: 1,
        speed: 1,
        startX: -3.7,
        startY: 0,
        startZ: 0,
        ctrlX: -1.2,
        ctrlY: -0.3,
        ctrlZ: 0.4,
        targetX: 1.75,
        targetY: 0,
        targetZ: 0,
      };

      const index = i * 3;
      streamPositions[index] = -100;
      streamPositions[index + 1] = -100;
      streamPositions[index + 2] = -100;

      streamColors[index] = COLOR_AMBER.r;
      streamColors[index + 1] = COLOR_AMBER.g;
      streamColors[index + 2] = COLOR_AMBER.b;
    }

    const streamGeometry = new THREE.BufferGeometry();
    const streamPositionAttribute = new THREE.BufferAttribute(
      streamPositions,
      3,
    );
    const streamColorAttribute = new THREE.BufferAttribute(streamColors, 3);

    streamPositionAttribute.setUsage(THREE.DynamicDrawUsage);
    streamColorAttribute.setUsage(THREE.DynamicDrawUsage);

    streamGeometry.setAttribute("position", streamPositionAttribute);
    streamGeometry.setAttribute("color", streamColorAttribute);

    const streamMaterial = new THREE.PointsMaterial({
      size: 0.075,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.94,
      vertexColors: true,
      depthWrite: false,
    });

    const streamPoints = new THREE.Points(streamGeometry, streamMaterial);
    network.add(streamPoints);

    /*
     * ----------------------------------------
     * 4 & 5. CORE + OUTPUT RING (2 draw calls)
     * ----------------------------------------
     */
    const coreGeometry = new THREE.IcosahedronGeometry(0.19, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: COLOR_EMERALD,
      transparent: true,
      opacity: 0.76,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(1.75, 0, 0);
    network.add(core);

    const ringGeometry = new THREE.RingGeometry(0.28, 0.3, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: COLOR_EMERALD,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const outputRing = new THREE.Mesh(ringGeometry, ringMaterial);
    outputRing.position.set(1.75, 0, -0.02);
    network.add(outputRing);

    /*
     * ----------------------------------------
     * POINTER & INERTIAL DRAG
     * ----------------------------------------
     */
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    let dragging = false;
    let previousDragX = 0;
    let previousDragY = 0;
    let dragRotationX = 0;
    let dragRotationY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetPointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (dragging) {
        const deltaX = event.clientX - previousDragX;
        const deltaY = event.clientY - previousDragY;

        dragVelocityY = deltaX * 0.0016;
        dragVelocityX = deltaY * 0.0016;

        dragRotationY += dragVelocityY;
        dragRotationX += dragVelocityX;

        const max = THREE.MathUtils.degToRad(6);
        dragRotationX = THREE.MathUtils.clamp(dragRotationX, -max, max);
        dragRotationY = THREE.MathUtils.clamp(dragRotationY, -max, max);

        previousDragX = event.clientX;
        previousDragY = event.clientY;
      }
    };

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      previousDragX = event.clientX;
      previousDragY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };

    const pointerUp = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const pointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
      dragging = false;
    };

    canvas.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("pointerleave", pointerLeave);

    /*
     * ----------------------------------------
     * RESIZE OBSERVER
     * ----------------------------------------
     */
    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    /*
     * ----------------------------------------
     * PARTICLE SPAWN LOGIC
     * ----------------------------------------
     */
    let poolCursor = 0;

    const spawn = (count: number, beam: boolean) => {
      for (let amount = 0; amount < count; amount++) {
        let particle: StreamParticle | undefined;
        let selected = -1;

        for (let search = 0; search < streamCount; search++) {
          const index = (poolCursor + search) % streamCount;
          if (!streamParticles[index].active) {
            selected = index;
            particle = streamParticles[index];
            poolCursor = (index + 1) % streamCount;
            break;
          }
        }

        if (!particle || selected < 0) break;

        const seed =
          selected * 1.618 + amount * 0.77 + performance.now() * 0.0001;

        particle.active = true;
        particle.progress = 0;
        particle.speed = beam
          ? 1.75 + (amount % 7) * 0.035
          : 0.8 + (amount % 5) * 0.05;

        particle.startX = -3.65 - (amount % 4) * 0.06;
        particle.startY = Math.sin(seed * 4.3) * (beam ? 0.16 : 0.75);
        particle.startZ = Math.cos(seed * 3.7) * (beam ? 0.12 : 0.45);

        particle.targetX = 1.72;
        particle.targetY = Math.sin(seed) * 0.12;
        particle.targetZ = Math.cos(seed * 1.7) * 0.1;
      }
    };

    let observedTyping = latestTyping.current;
    let observedSubmit = latestSubmit.current;
    let lastTypingSpawn = 0;

    let ingestMode = false;
    let ingestStartedAt = 0;

    const projected = new THREE.Vector3();
    const world = new THREE.Vector3();
    const clock = new THREE.Clock();

    let running = true;
    let disposed = false;
    let raf = 0;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(mount);

    /*
     * ----------------------------------------
     * ANIMATION LOOP (Zero per-frame allocations)
     * ----------------------------------------
     */
    const render = () => {
      if (disposed) return;

      raf = window.requestAnimationFrame(render);
      if (!running) {
        clock.getDelta();
        return;
      }

      const delta = Math.min(clock.getDelta(), 1 / 30);
      const elapsed = clock.elapsedTime;

      pointerX = THREE.MathUtils.lerp(pointerX, targetPointerX, 0.1);
      pointerY = THREE.MathUtils.lerp(pointerY, targetPointerY, 0.1);

      // Drag inertia + spring return
      if (!dragging) {
        dragRotationX += dragVelocityX;
        dragRotationY += dragVelocityY;
        dragVelocityX *= 0.9;
        dragVelocityY *= 0.9;

        dragRotationX = THREE.MathUtils.lerp(dragRotationX, 0, 0.08);
        dragRotationY = THREE.MathUtils.lerp(dragRotationY, 0, 0.08);
      }

      const pointerTiltX = -pointerY * THREE.MathUtils.degToRad(2.1);
      const pointerTiltY = pointerX * THREE.MathUtils.degToRad(2.8);

      currentRotationX = THREE.MathUtils.lerp(
        currentRotationX,
        pointerTiltX + dragRotationX,
        0.09,
      );
      currentRotationY = THREE.MathUtils.lerp(
        currentRotationY,
        pointerTiltY + dragRotationY,
        0.09,
      );

      network.rotation.x = currentRotationX;
      network.rotation.y = currentRotationY;

      // Typing trickle (throttled to 100ms)
      if (latestTyping.current !== observedTyping) {
        observedTyping = latestTyping.current;
        const now = performance.now();
        if (now - lastTypingSpawn >= 100) {
          lastTypingSpawn = now;
          spawn(3 + (observedTyping % 3), false);
        }
      }

      // Submit burst beam
      if (latestSubmit.current !== observedSubmit) {
        observedSubmit = latestSubmit.current;
        ingestMode = true;
        ingestStartedAt = performance.now();
        spawn(isMobile ? 28 : 52, true);
      }

      const intensity = THREE.MathUtils.clamp(intensityRef.current, 0, 1);

      /*
       * Screen-space 140px pointer repulsion
       */
      const rect = canvas.getBoundingClientRect();
      const pointerPixelX = (pointerX * 0.5 + 0.5) * rect.width;
      const pointerPixelY = (-pointerY * 0.5 + 0.5) * rect.height;

      for (let i = 0; i < structuralCount; i++) {
        const index = i * 3;
        const idleX = Math.sin(elapsed * 0.42 + phases[i]) * 0.012;
        const idleY = Math.cos(elapsed * 0.5 + phases[i]) * 0.018;

        let targetX = restPositions[index] + idleX;
        let targetY = restPositions[index + 1] + idleY;
        let targetZ = restPositions[index + 2];

        world.set(
          structuralPositions[index],
          structuralPositions[index + 1],
          structuralPositions[index + 2],
        );
        network.localToWorld(world);
        projected.copy(world).project(camera);

        const pixelX = (projected.x * 0.5 + 0.5) * rect.width;
        const pixelY = (-projected.y * 0.5 + 0.5) * rect.height;
        const dx = pixelX - pointerPixelX;
        const dy = pixelY - pointerPixelY;
        const distanceSquared = dx * dx + dy * dy;
        const radius = 140;

        if (distanceSquared < radius * radius && distanceSquared > 0.01) {
          const distance = Math.sqrt(distanceSquared);
          const strength = 1 - distance / radius;
          const scale = (strength * 0.24) / distance;
          targetX += dx * scale;
          targetY -= dy * scale;
        }

        const [nextX, velocityX] = dampedSpring(
          structuralPositions[index],
          velocities[index],
          targetX,
          delta,
        );
        const [nextY, velocityY] = dampedSpring(
          structuralPositions[index + 1],
          velocities[index + 1],
          targetY,
          delta,
        );
        const [nextZ, velocityZ] = dampedSpring(
          structuralPositions[index + 2],
          velocities[index + 2],
          targetZ,
          delta,
        );

        structuralPositions[index] = nextX;
        structuralPositions[index + 1] = nextY;
        structuralPositions[index + 2] = nextZ;

        velocities[index] = velocityX;
        velocities[index + 1] = velocityY;
        velocities[index + 2] = velocityZ;
      }
      structuralPositionAttribute.needsUpdate = true;

      // Update merged hairline lines
      edgeCount = 0;
      for (let i = 0; i < structuralCount - columns; i++) {
        const a = i;
        const b = i + columns;
        const lineIndex = edgeCount * 6;

        linePositions[lineIndex] = structuralPositions[a * 3];
        linePositions[lineIndex + 1] = structuralPositions[a * 3 + 1];
        linePositions[lineIndex + 2] = structuralPositions[a * 3 + 2];
        linePositions[lineIndex + 3] = structuralPositions[b * 3];
        linePositions[lineIndex + 4] = structuralPositions[b * 3 + 1];
        linePositions[lineIndex + 5] = structuralPositions[b * 3 + 2];
        edgeCount++;
      }
      lineAttribute.needsUpdate = true;
      lineMaterial.opacity =
        0.17 + Math.sin(elapsed * 0.9) * 0.045 + intensity * 0.06;

      // Stream particles update
      const streamSpeed = 1 + intensity * 1.1;

      for (let i = 0; i < streamCount; i++) {
        const particle = streamParticles[i];
        const index = i * 3;

        if (!particle.active) {
          streamPositions[index] = -100;
          streamPositions[index + 1] = -100;
          streamPositions[index + 2] = -100;
          continue;
        }

        particle.progress += delta * particle.speed * streamSpeed;
        const normalized = Math.min(particle.progress, 1);
        const progress = easeOutCubic(normalized);
        const converge = Math.sin(normalized * Math.PI);

        streamPositions[index] = THREE.MathUtils.lerp(
          particle.startX,
          particle.targetX,
          progress,
        );
        streamPositions[index + 1] =
          THREE.MathUtils.lerp(particle.startY, particle.targetY, progress) *
          (1 - converge * 0.55);
        streamPositions[index + 2] =
          THREE.MathUtils.lerp(particle.startZ, particle.targetZ, progress) *
          (1 - converge * 0.45);

        // Amber -> Indigo -> Emerald color trajectory
        if (normalized < 0.5) {
          const p = normalized * 2;
          streamColors[index] = THREE.MathUtils.lerp(
            COLOR_AMBER.r,
            COLOR_INDIGO.r,
            p,
          );
          streamColors[index + 1] = THREE.MathUtils.lerp(
            COLOR_AMBER.g,
            COLOR_INDIGO.g,
            p,
          );
          streamColors[index + 2] = THREE.MathUtils.lerp(
            COLOR_AMBER.b,
            COLOR_INDIGO.b,
            p,
          );
        } else {
          const p = (normalized - 0.5) * 2;
          streamColors[index] = THREE.MathUtils.lerp(
            COLOR_INDIGO.r,
            COLOR_EMERALD.r,
            p,
          );
          streamColors[index + 1] = THREE.MathUtils.lerp(
            COLOR_INDIGO.g,
            COLOR_EMERALD.g,
            p,
          );
          streamColors[index + 2] = THREE.MathUtils.lerp(
            COLOR_INDIGO.b,
            COLOR_EMERALD.b,
            p,
          );
        }

        if (normalized >= 1) {
          particle.active = false;
        }
      }
      streamPositionAttribute.needsUpdate = true;
      streamColorAttribute.needsUpdate = true;

      // Core pulse & output ring envelope
      if (ingestMode) {
        const since = performance.now() - ingestStartedAt;
        const coreProgress = THREE.MathUtils.clamp((since - 420) / 600, 0, 1);
        const pulse = Math.sin(coreProgress * Math.PI);
        const coreScale = 1 + pulse * 0.08;

        core.scale.setScalar(coreScale);
        coreMaterial.opacity = 0.76 + pulse * 0.24;

        const ringProgress = THREE.MathUtils.clamp((since - 700) / 650, 0, 1);
        const ringScale = 1 + ringProgress * 2.4;
        outputRing.scale.setScalar(ringScale);
        ringMaterial.opacity = Math.max(0, 0.58 * (1 - ringProgress));

        if (since > 1400) {
          ingestMode = false;
          core.scale.setScalar(1);
          coreMaterial.opacity = 0.76;
          ringMaterial.opacity = 0;
          outputRing.scale.setScalar(1);
        }
      }

      // Scroll condensation
      const condense = intensity * 0.08;
      network.scale.setScalar(1 - condense);

      renderer.render(scene, camera);
    };

    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("pointerleave", pointerLeave);

      structuralGeometry.dispose();
      structuralMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      streamGeometry.dispose();
      streamMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();

      renderer.renderLists.dispose();
      renderer.dispose();
      scene.clear();

      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
    };
  }, [intensityRef, onWebGLFailure]);

  return (
    <div
      ref={mountRef}
      data-cursor="DRAG"
      className="absolute inset-0 touch-none w-full h-full"
    />
  );
}

export default NeuralCoreScene;
