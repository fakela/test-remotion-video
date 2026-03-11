// SVG path generators for geometric shapes, all centered at origin, radius ~30
// These return path strings compatible with flubber

export function pentagon(): string {
  return polygon(5, 30);
}

export function triangle(): string {
  return polygon(3, 30);
}

export function square(): string {
  const s = 26;
  return `M ${-s} ${-s} L ${s} ${-s} L ${s} ${s} L ${-s} ${s} Z`;
}

export function circle(): string {
  const r = 28;
  // Approximate circle with many-sided polygon for flubber compatibility
  return polygon(64, r);
}

export function hexagon(): string {
  return polygon(6, 30);
}

export function diamond(): string {
  const s = 32;
  return `M 0 ${-s} L ${s} 0 L 0 ${s} L ${-s} 0 Z`;
}

function polygon(sides: number, radius: number): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    points.push(`${x.toFixed(4)} ${y.toFixed(4)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

// Bold block letter paths for REMOTION (each approx 50x60 centered at origin)
export function letterPaths(): Record<string, string> {
  return {
    R: blockLetter_R(),
    E: blockLetter_E(),
    M: blockLetter_M(),
    O: blockLetter_O(),
    T: blockLetter_T(),
    I: blockLetter_I(),
    N: blockLetter_N(),
  };
}

// Block letter paths - bold geometric letters centered at origin
function blockLetter_R(): string {
  return `M -20 -30 L -20 30 L -8 30 L -8 2 L 2 2 L 14 30 L 28 30 L 14 0
    Q 20 -4 20 -14 Q 20 -30 4 -30 Z
    M -8 -18 L 2 -18 Q 8 -18 8 -14 Q 8 -8 2 -8 L -8 -8 Z`;
}

function blockLetter_E(): string {
  return `M -18 -30 L -18 30 L 18 30 L 18 18 L -6 18 L -6 6 L 14 6 L 14 -6 L -6 -6 L -6 -18 L 18 -18 L 18 -30 Z`;
}

function blockLetter_M(): string {
  return `M -24 -30 L -24 30 L -12 30 L -12 -4 L -2 16 L 2 16 L 12 -4 L 12 30 L 24 30 L 24 -30 L 14 -30 L 0 -2 L -14 -30 Z`;
}

function blockLetter_O(): string {
  return `M -18 -18 Q -18 -30 0 -30 Q 18 -30 18 -18 L 18 18 Q 18 30 0 30 Q -18 30 -18 18 Z
    M -6 -18 L 6 -18 Q 6 -18 6 -14 L 6 14 Q 6 18 0 18 Q -6 18 -6 14 L -6 -14 Q -6 -18 -6 -18 Z`;
}

function blockLetter_T(): string {
  return `M -20 -30 L -20 -18 L -6 -18 L -6 30 L 6 30 L 6 -18 L 20 -18 L 20 -30 Z`;
}

function blockLetter_I(): string {
  return `M -16 -30 L -16 -18 L -6 -18 L -6 18 L -16 18 L -16 30 L 16 30 L 16 18 L 6 18 L 6 -18 L 16 -18 L 16 -30 Z`;
}

function blockLetter_N(): string {
  return `M -18 -30 L -18 30 L -6 30 L -6 -2 L 8 30 L 18 30 L 18 -30 L 6 -30 L 6 2 L -8 -30 Z`;
}

// Shape order matching the 8 shapes: Pentagon, Triangle, Square, Circle, Hexagon, Diamond, Circle, Triangle
export const shapeGenerators = [
  pentagon,
  triangle,
  square,
  circle,
  hexagon,
  diamond,
  circle,
  triangle,
];

export const LETTERS = ["R", "E", "M", "O", "T", "I", "O", "N"];

export const SHAPE_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#F0876A", // Coral
  "#58D68D", // Green
  "#85C1E9", // Light Blue
];
