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

// Bold block letter paths for UNDERGROUND (each approx 50x60 centered at origin)
export function letterPaths(): Record<string, string> {
  return {
    U: blockLetter_U(),
    N: blockLetter_N(),
    D: blockLetter_D(),
    E: blockLetter_E(),
    R: blockLetter_R(),
    G: blockLetter_G(),
    O: blockLetter_O(),
  };
}

// Block letter paths - bold geometric letters centered at origin
function blockLetter_R(): string {
  return `M -20 -30 L -20 30 L -8 30 L -8 2 L 2 2 L 14 30 L 28 30 L 14 0
    Q 20 -4 20 -14 Q 20 -30 4 -30 Z
    M -8 -18 L 2 -18 Q 8 -18 8 -14 Q 8 -8 2 -8 L -8 -8 Z`;
}

function blockLetter_U(): string {
  return `M -18 -30 L -18 18 Q -18 30 0 30 Q 18 30 18 18 L 18 -30 L 6 -30 L 6 16 Q 6 18 0 18 Q -6 18 -6 16 L -6 -30 Z`;
}

function blockLetter_E(): string {
  return `M -18 -30 L -18 30 L 18 30 L 18 18 L -6 18 L -6 6 L 14 6 L 14 -6 L -6 -6 L -6 -18 L 18 -18 L 18 -30 Z`;
}

function blockLetter_D(): string {
  return `M -18 -30 L -18 30 L 4 30 Q 18 30 18 18 L 18 -18 Q 18 -30 4 -30 Z
    M -6 -18 L 2 -18 Q 6 -18 6 -14 L 6 14 Q 6 18 2 18 L -6 18 Z`;
}

function blockLetter_G(): string {
  return `M -18 -18 Q -18 -30 0 -30 Q 18 -30 18 -18 L 18 -12 L 6 -12 L 6 -16 Q 6 -18 0 -18 Q -6 -18 -6 -14 L -6 14 Q -6 18 0 18 Q 6 18 6 14 L 6 2 L 0 2 L 0 -8 L 18 -8 L 18 18 Q 18 30 0 30 Q -18 30 -18 18 Z`;
}

function blockLetter_O(): string {
  return `M -18 -18 Q -18 -30 0 -30 Q 18 -30 18 -18 L 18 18 Q 18 30 0 30 Q -18 30 -18 18 Z
    M -6 -18 L 6 -18 Q 6 -18 6 -14 L 6 14 Q 6 18 0 18 Q -6 18 -6 14 L -6 -14 Q -6 -18 -6 -18 Z`;
}

function blockLetter_N(): string {
  return `M -18 -30 L -18 30 L -6 30 L -6 -2 L 8 30 L 18 30 L 18 -30 L 6 -30 L 6 2 L -8 -30 Z`;
}

// Shape order matching the 11 shapes for UNDERGROUND
export const shapeGenerators = [
  pentagon,
  triangle,
  square,
  circle,
  hexagon,
  diamond,
  circle,
  triangle,
  pentagon,
  hexagon,
  diamond,
];

export const LETTERS = ["U", "N", "D", "E", "R", "G", "R", "O", "U", "N", "D"];

export const SHAPE_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#F0876A", // Coral
  "#58D68D", // Green
  "#85C1E9", // Light Blue
  "#F1948A", // Salmon
  "#7DCEA0", // Mint
  "#F5B041", // Amber
];
