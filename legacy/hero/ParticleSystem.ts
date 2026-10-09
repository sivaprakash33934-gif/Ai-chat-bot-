import * as THREE from "three";

/**
 * SIGNAL CORE PARTICLE SYSTEM (Production Build)
 *
 * Architecture:
 * - 4-layer topology: Ingest (Amber) -> Organize (Indigo) -> Connect -> Act/Core (Emerald)
 * - Pre-allocated Float32Array buffers for zero per-frame garbage collection
 * - Semi-implicit Euler spring integrator (Stiffness: 220, Damping: 24)
 * - Screen-space 140px pointer repulsion
 * - Inertial drag rotation bounded to +/- 6 deg (+/- 0.1047 rad)
 * - Quad Bezier stream pool for typing trickle & submit beam
 */

export const COLOR_INDIGO = new THREE.Color("#4F46E5");
export const COLOR_EMERALD = new THREE.Color("#10B981");
export const COLOR_AMBER = new THREE.Color("#F59E0B");
export const COLOR_STRUCTURAL = new THREE.Color("#94A3B8");

export const SPRING_STIFFNESS = 220;
export const SPRING_DAMPING = 24;
export const MAX_ROTATION_RAD = THREE.MathUtils.degToRad(6); // 0.10472 rad

export const DESKTOP_STRUCTURAL = 260;
export const DESKTOP_STREAM = 112;
export const MOBILE_STRUCTURAL = 128;
export const MOBILE_STREAM = 64;

export interface StreamParticle {
  active: boolean;
  progress: number;
  speed: number;
  startX: number;
  startY: number;
  startZ: number;
  ctrlX: number;
  ctrlY: number;
  ctrlZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

export interface DragPhysicsState {
  isDragging: boolean;
  lastX: number;
  lastY: number;
  velX: number;
  velY: number;
  rotX: number;
  rotY: number;
}

/**
 * Semi-implicit Euler damped spring integrator
 */
export function dampedSpring(
  position: number,
  velocity: number,
  target: number,
  delta: number
): [nextPosition: number, nextVelocity: number] {
  const acceleration =
    (target - position) * SPRING_STIFFNESS - velocity * SPRING_DAMPING;
  const nextVelocity = velocity + acceleration * delta;
  const nextPosition = position + nextVelocity * delta;
  return [nextPosition, nextVelocity];
}

/**
 * Cubic ease-out curve for particle travel
 */
export function easeOutCubic(t: number): number {
  const inv = 1 - t;
  return 1 - inv * inv * inv;
}

/**
 * Quadratic bezier interpolation between start, control point, and target
 */
export function quadBezier(
  p0x: number, p0y: number, p0z: number,
  cx: number, cy: number, cz: number,
  p1x: number, p1y: number, p1z: number,
  t: number
): [x: number, y: number, z: number] {
  const it = 1 - t;
  const x = it * it * p0x + 2 * it * t * cx + t * t * p1x;
  const y = it * it * p0y + 2 * it * t * cy + t * t * p1y;
  const z = it * it * p0z + 2 * it * t * cz + t * t * p1z;
  return [x, y, z];
}

/**
 * Pre-allocated structural network buffers
 */
export interface StructuralTopology {
  count: number;
  columns: number;
  restPositions: Float32Array;
  livePositions: Float32Array;
  colors: Float32Array;
  velocities: Float32Array;
  phases: Float32Array;
  linePositions: Float32Array;
  maxEdges: number;
}

export function createStructuralTopology(isMobile: boolean): StructuralTopology {
  const count = isMobile ? MOBILE_STRUCTURAL : DESKTOP_STRUCTURAL;
  const columns = 13;
  const restPositions = new Float32Array(count * 3);
  const livePositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const column = i % columns;
    const row = Math.floor(i / columns);
    const colProgress = column / (columns - 1);
    const x = -2.6 + colProgress * 5.2;

    const pseudo = Math.sin(i * 12.9898) * 43758.5453;
    const random = pseudo - Math.floor(pseudo);
    const y = ((row % 9) - 4) * 0.31 + (random - 0.5) * 0.18;
    const z = Math.sin(i * 1.618) * 0.52 + Math.cos(column * 0.7) * 0.16;

    const idx = i * 3;
    restPositions[idx] = x;
    restPositions[idx + 1] = y;
    restPositions[idx + 2] = z;

    livePositions[idx] = x;
    livePositions[idx + 1] = y;
    livePositions[idx + 2] = z;

    // Structural gradient: Ingest (Amber tint) -> Center (Indigo) -> Output (Emerald)
    const color =
      x > 1.45
        ? COLOR_EMERALD
        : Math.abs(x) < 1.4
        ? COLOR_INDIGO
        : COLOR_STRUCTURAL;

    colors[idx] = color.r;
    colors[idx + 1] = color.g;
    colors[idx + 2] = color.b;

    phases[i] = (i * 0.61803398875) % (Math.PI * 2);
  }

  const maxEdges = count - columns;
  const linePositions = new Float32Array(maxEdges * 6);

  return {
    count,
    columns,
    restPositions,
    livePositions,
    colors,
    velocities,
    phases,
    linePositions,
    maxEdges,
  };
}

/**
 * Pre-allocated stream particle pool
 */
export interface StreamParticlePool {
  count: number;
  particles: StreamParticle[];
  positions: Float32Array;
  colors: Float32Array;
  cursor: number;
}

export function createStreamPool(isMobile: boolean): StreamParticlePool {
  const count = isMobile ? MOBILE_STREAM : DESKTOP_STREAM;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const particles: StreamParticle[] = new Array(count);

  for (let i = 0; i < count; i++) {
    particles[i] = {
      active: false,
      progress: 1,
      speed: 1,
      startX: -3.7,
      startY: 0,
      startZ: 0,
      ctrlX: -1.2,
      ctrlY: -0.4,
      ctrlZ: 0.5,
      targetX: 1.75,
      targetY: 0,
      targetZ: 0,
    };

    const idx = i * 3;
    positions[idx] = -100;
    positions[idx + 1] = -100;
    positions[idx + 2] = -100;

    colors[idx] = COLOR_AMBER.r;
    colors[idx + 1] = COLOR_AMBER.g;
    colors[idx + 2] = COLOR_AMBER.b;
  }

  return {
    count,
    particles,
    positions,
    colors,
    cursor: 0,
  };
}

/**
 * Spawns particles into the pre-allocated pool
 */
export function spawnStreamParticles(
  pool: StreamParticlePool,
  count: number,
  beam: boolean
): void {
  for (let amount = 0; amount < count; amount++) {
    let particle: StreamParticle | undefined;
    let selected = -1;

    for (let s = 0; s < pool.count; s++) {
      const idx = (pool.cursor + s) % pool.count;
      if (!pool.particles[idx].active) {
        selected = idx;
        particle = pool.particles[idx];
        pool.cursor = (idx + 1) % pool.count;
        break;
      }
    }

    if (!particle || selected < 0) break;

    const seed = selected * 1.618 + amount * 0.77 + performance.now() * 0.0001;

    particle.active = true;
    particle.progress = 0;
    particle.speed = beam ? 1.75 + (amount % 7) * 0.035 : 0.8 + (amount % 5) * 0.05;

    particle.startX = -3.65 - (amount % 4) * 0.06;
    particle.startY = Math.sin(seed * 4.3) * (beam ? 0.16 : 0.75);
    particle.startZ = Math.cos(seed * 3.7) * (beam ? 0.12 : 0.45);

    particle.ctrlX = particle.startX * 0.35;
    particle.ctrlY = -0.3 + Math.sin(seed) * 0.2;
    particle.ctrlZ = 0.4;

    particle.targetX = 1.75;
    particle.targetY = Math.sin(seed) * 0.12;
    particle.targetZ = Math.cos(seed * 1.7) * 0.1;
  }
}
