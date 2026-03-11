import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { interpolate as flubberInterpolate } from "flubber";
import { GridBackground } from "./GridBackground";
import {
  shapeGenerators,
  letterPaths,
  LETTERS,
  SHAPE_COLORS,
} from "./shapes";
import { RemotionLogo } from "./RemotionLogo";

// Timeline (30fps, 300 frames = 10s)
const SCENE1_START = 0;
const SCENE1_END = 75; // 0-2.5s: shapes idle
const SCENE2_START = 75;
const SCENE2_END = 165; // 2.5-5.5s: morph to letters
const SCENE3_START = 165;
const SCENE3_END = 210; // 5.5-7s: logo fly-in
const SCENE4_START = 210;
const SCENE4_END = 300; // 7-10s: wipe exit

const TOTAL_SHAPES = 11;
const SPACING = 70;
const CENTER_X = 1920 / 2;
const CENTER_Y = 1080 / 2;

function getShapeX(index: number): number {
  const totalWidth = (TOTAL_SHAPES - 1) * SPACING;
  return CENTER_X - totalWidth / 2 + index * SPACING;
}

export const MotionGraphicsIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = useMemo(() => letterPaths(), []);

  // Pre-compute flubber interpolators for each shape->letter morph
  const morphInterpolators = useMemo(() => {
    return shapeGenerators.map((gen, i) => {
      const shapePath = gen();
      const letter = LETTERS[i];
      const letterPath = letters[letter];
      return flubberInterpolate(shapePath, letterPath, {
        maxSegmentLength: 2,
      });
    });
  }, [letters]);

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Shapes / Letters */}
      {shapeGenerators.map((_, i) => (
        <ShapeElement
          key={i}
          index={i}
          frame={frame}
          fps={fps}
          morphInterpolator={morphInterpolators[i]}
          color={SHAPE_COLORS[i]}
        />
      ))}

      {/* Remotion Logo - Scene 3 & 4 */}
      {frame >= SCENE3_START && <LogoElement frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

// Individual shape/letter element
const ShapeElement: React.FC<{
  index: number;
  frame: number;
  fps: number;
  morphInterpolator: (t: number) => string;
  color: string;
}> = ({ index, frame, fps, morphInterpolator, color }) => {
  const x = getShapeX(index);
  const y = CENTER_Y;

  // Scene 1: Breathing idle animation
  const breatheScale =
    frame < SCENE2_START
      ? 1 + 0.06 * Math.sin((frame * 0.08) + index * 0.8)
      : 1;

  // Scene 2: Jump, spin, morph
  const jumpDelay = index * 4; // stagger
  const jumpFrame = frame - SCENE2_START - jumpDelay;

  let jumpY = 0;
  let rotation = 0;
  let morphT = 0;
  let trailOpacity = 0;
  let scaleBoost = 1;

  if (frame >= SCENE2_START && jumpFrame >= 0) {
    // Jump up with spring
    const jumpProgress = spring({
      frame: jumpFrame,
      fps,
      config: { damping: 14, stiffness: 120, mass: 0.8 },
    });

    // Jump arc: go up then come back down
    const jumpArc = jumpFrame < 15
      ? interpolate(jumpFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" })
      : interpolate(jumpFrame, [15, 30], [1, 0], { extrapolateRight: "clamp" });

    jumpY = -120 * jumpArc;

    // Spin 180 degrees during jump
    const spinProgress = interpolate(jumpFrame, [0, 25], [0, 1], {
      extrapolateRight: "clamp",
    });
    rotation = spinProgress * 180;

    // Ghost trail during jump
    trailOpacity = jumpArc * 0.4;

    // Morph from shape to letter
    morphT = interpolate(jumpFrame, [8, 28], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Scale boost on landing
    const landBounce = jumpFrame > 25
      ? spring({
          frame: jumpFrame - 25,
          fps,
          config: { damping: 10, stiffness: 200 },
        })
      : 0;
    scaleBoost = 1 + 0.15 * (1 - landBounce) * (jumpFrame > 25 ? 1 : 0);
  }

  // Scene 4: Wipe - each letter vanishes as logo passes over it
  let wipeScale = 1;
  let wipeOpacity = 1;

  if (frame >= SCENE4_START) {
    const logoX = getLogoX(frame, fps);
    const distFromLogo = logoX - x;

    if (distFromLogo > -30) {
      const vanishProgress = interpolate(distFromLogo, [-30, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      wipeScale = 1 - vanishProgress * 0.8;
      wipeOpacity = 1 - vanishProgress;
    }
  }

  // Get current path (morphed between shape and letter)
  const currentPath = morphT > 0
    ? morphInterpolator(Math.min(morphT, 1))
    : morphInterpolator(0);

  const finalScale = breatheScale * scaleBoost * wipeScale;

  return (
    <>
      {/* Ghost trail */}
      {trailOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            left: x - 40,
            top: y - 40 + jumpY * 0.5,
            width: 80,
            height: 80,
            opacity: trailOpacity,
            filter: "blur(4px)",
          }}
        >
          <g transform="translate(40, 40)">
            <path d={currentPath} fill={color} />
          </g>
        </svg>
      )}
      {/* Second ghost */}
      {trailOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            left: x - 40,
            top: y - 40 + jumpY * 0.25,
            width: 80,
            height: 80,
            opacity: trailOpacity * 0.5,
            filter: "blur(8px)",
          }}
        >
          <g transform="translate(40, 40)">
            <path d={currentPath} fill={color} />
          </g>
        </svg>
      )}

      {/* Main shape/letter */}
      <svg
        style={{
          position: "absolute",
          left: x - 40,
          top: y - 40 + jumpY,
          width: 80,
          height: 80,
          opacity: wipeOpacity,
        }}
      >
        <g
          transform={`translate(40, 40) scale(${finalScale}) rotate(${rotation})`}
        >
          <path d={currentPath} fill={color} />
        </g>
      </svg>
    </>
  );
};

// Compute logo X position for Scene 3 & 4
function getLogoX(frame: number, fps: number): number {
  if (frame < SCENE3_START) return -200;

  // Scene 3: Fly in from left to near the 'U'
  if (frame < SCENE4_START) {
    const targetX = getShapeX(0) - 80;
    const flyProgress = spring({
      frame: frame - SCENE3_START,
      fps,
      config: { damping: 14, stiffness: 80, mass: 1 },
    });
    return interpolate(flyProgress, [0, 1], [-200, targetX]);
  }

  // Scene 4: Slow wipe from left to right across screen
  const wipeProgress = spring({
    frame: frame - SCENE4_START,
    fps,
    config: { damping: 300, stiffness: 8, mass: 1 },
  });
  const startX = getShapeX(0) - 80;
  return interpolate(wipeProgress, [0, 1], [startX, 2100]);
}

// Logo element for Scene 3 & 4
const LogoElement: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const x = getLogoX(frame, fps);

  // Scene 3: 360 spin after snap into place
  let logoRotation = 0;
  if (frame >= SCENE3_START && frame < SCENE4_START) {
    const snapFrame = frame - SCENE3_START;
    if (snapFrame > 15) {
      const spinProgress = spring({
        frame: snapFrame - 15,
        fps,
        config: { damping: 14, stiffness: 60, mass: 1.2 },
      });
      logoRotation = spinProgress * 360;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x - 30,
        top: CENTER_Y - 30,
        width: 60,
        height: 60,
        transform: `rotate(${logoRotation}deg)`,
      }}
    >
      <RemotionLogo />
    </div>
  );
};
