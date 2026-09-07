"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BACK_X,
  EGG_RX,
  EGG_RY,
  FOOT_Y,
  FRONT_X,
  POST_OVERLAP,
  POST_W,
  TILT_DEG,
  railY,
} from "./rack-geometry";

/**
 * The drawing primitives for the rack: gradients, the moulded frame, a single
 * channel, and an egg. Shared by the hero demo and the scroll sequence so the
 * product looks like one object across the whole page.
 *
 * It is drawn in three-quarter side view because that is the only angle from
 * which the slope is visible.
 */

export function RackDefs({ id, tone }: { id: string; tone: "light" | "dark" }) {
  const plasticTop = tone === "light" ? "#f2f4f5" : "#8e969c";
  const plasticMid = tone === "light" ? "#ccd3d7" : "#5f696f";
  const plasticLow = tone === "light" ? "#a3adb3" : "#3f484e";
  const postTop = tone === "light" ? "#dde2e5" : "#6f787e";
  const postLow = tone === "light" ? "#9aa4aa" : "#394247";

  return (
    <defs>
      {/* Moulded polypropylene: a bright top edge, a body, a shaded underside. */}
      <linearGradient id={`${id}-rail`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={plasticTop} />
        <stop offset="0.42" stopColor={plasticMid} />
        <stop offset="1" stopColor={plasticLow} />
      </linearGradient>

      <linearGradient id={`${id}-post`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={postLow} />
        <stop offset="0.45" stopColor={postTop} />
        <stop offset="1" stopColor={postLow} />
      </linearGradient>

      {/* An egg: warm shell, light from the upper left, warm bounce underneath. */}
      <radialGradient id={`${id}-egg`} cx="0.33" cy="0.26" r="0.92">
        <stop offset="0" stopColor="#f7e3c1" />
        <stop offset="0.34" stopColor="#e6c390" />
        <stop offset="0.7" stopColor="#c9954f" />
        <stop offset="1" stopColor="#8f6224" />
      </radialGradient>

      <radialGradient id={`${id}-gloss`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0.34" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>

      <linearGradient id={`${id}-shadow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.16" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/**
 * The two uprights and the foot.
 *
 * Each post is positioned so the rail ends land on it with a fixed overlap —
 * hand-tuned offsets meant the joints did not meet, which read as rails
 * floating past the frame.
 */
export function RackFrame({ id }: { id: string }) {
  const topFrontY = railY(0, FRONT_X);
  const topBackY = railY(0, BACK_X);

  return (
    <g>
      {/* Back upright. Taller, because the back of every rail is raised. */}
      <rect
        x={BACK_X - POST_OVERLAP}
        y={topBackY - 26}
        width={POST_W}
        height={FOOT_Y - (topBackY - 26)}
        rx={POST_W / 2}
        fill={`url(#${id}-post)`}
      />
      {/* Front upright. */}
      <rect
        x={FRONT_X + POST_OVERLAP - POST_W}
        y={topFrontY - 26}
        width={POST_W}
        height={FOOT_Y - (topFrontY - 26)}
        rx={POST_W / 2}
        fill={`url(#${id}-post)`}
      />
      {/* Foot. */}
      <rect
        x={FRONT_X + POST_OVERLAP - POST_W - 4}
        y={FOOT_Y - 9}
        width={BACK_X - FRONT_X + 2 * (POST_W - POST_OVERLAP) + 8}
        height={10}
        rx={5}
        fill={`url(#${id}-post)`}
      />
    </g>
  );
}

/**
 * One channel: a sloped tray with real thickness, and the shadow it casts on
 * the tier below. Drawn BEFORE the eggs.
 */
export function Channel({ id, tier }: { id: string; tier: number }) {
  const frontY = railY(tier, FRONT_X);
  const backY = railY(tier, BACK_X);
  const fx = FRONT_X - POST_OVERLAP;
  const bx = BACK_X + POST_OVERLAP;

  return (
    <g>
      {/* Shadow onto the tier below. */}
      <path
        d={`M ${fx} ${frontY + 9} L ${bx} ${backY + 9} L ${bx} ${backY + 20} L ${fx} ${frontY + 22} Z`}
        fill={`url(#${id}-shadow)`}
      />
      {/* The tray, with thickness. */}
      <path
        d={`M ${fx} ${frontY} L ${bx} ${backY} L ${bx} ${backY + 9} L ${fx} ${frontY + 9} Z`}
        fill={`url(#${id}-rail)`}
      />
      {/* The bright moulded top edge. */}
      <path
        d={`M ${fx} ${frontY + 1} L ${bx} ${backY + 1}`}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * The near side wall of the channel, plus the front lip and the back stop.
 *
 * Drawn AFTER the eggs, because from this angle the wall is between you and
 * them. It is what makes the eggs look seated in a groove rather than balanced
 * on a plank.
 */
export function ChannelWall({ id, tier }: { id: string; tier: number }) {
  const frontY = railY(tier, FRONT_X);
  const backY = railY(tier, BACK_X);
  const fx = FRONT_X - POST_OVERLAP;
  const bx = BACK_X + POST_OVERLAP;

  return (
    <g>
      <path
        d={`M ${fx} ${frontY - 1} L ${bx} ${backY - 1} L ${bx} ${backY + 9} L ${fx} ${frontY + 9} Z`}
        fill={`url(#${id}-rail)`}
      />
      <path
        d={`M ${fx} ${frontY} L ${bx} ${backY}`}
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* The front lip. This is the gap the leading egg is lifted out through. */}
      <path
        d={`M ${FRONT_X - 2} ${frontY + 9} L ${FRONT_X - 2} ${frontY - 14} q 0 -4.5 5 -4.5 q 5 0 5 4.5 L ${FRONT_X + 8} ${frontY + 9} Z`}
        fill={`url(#${id}-rail)`}
      />
      {/* The raised back stop, so the last egg cannot roll off the high end. */}
      <path
        d={`M ${BACK_X - 9} ${backY + 9} L ${BACK_X - 9} ${backY - 17} q 0 -4.5 5 -4.5 q 5 0 5 4.5 L ${BACK_X + 1} ${backY + 9} Z`}
        fill={`url(#${id}-rail)`}
      />
    </g>
  );
}

/** A single egg, seated in the channel and lying along the slope. */
export function Egg({
  id,
  x,
  y,
  seed = 0,
  animate = true,
  enter,
  delay = 0,
}: {
  id: string;
  x: number;
  y: number;
  /** Stable per-egg number. Real eggs are not identical; identical ones read as clip art. */
  seed?: number;
  animate?: boolean;
  /** Where this egg enters from — the raised back of the rail, so it rolls down. */
  enter?: { x: number; y: number };
  delay?: number;
}) {
  // The stagger applies to the arrival only. Once an egg has landed it must
  // react to a removal immediately, so the delay is dropped after the entry.
  const [landed, setLanded] = useState(false);
  const stagger = landed ? 0 : delay;
  const wobble = (((seed * 37) % 7) - 3) * 0.5;
  const rx = EGG_RX + (((seed * 13) % 5) - 2) * 0.3;
  const ry = EGG_RY + (((seed * 29) % 5) - 2) * 0.35;

  return (
    <motion.g
      initial={enter && animate ? { x: enter.x, y: enter.y, opacity: 0 } : false}
      animate={animate ? { x, y, opacity: 1 } : undefined}
      style={animate ? undefined : { x, y }}
      exit={{ y: y - 46, opacity: 0 }}
      onAnimationComplete={() => setLanded(true)}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        delay: stagger,
        opacity: { duration: 0.18, delay: stagger },
      }}
    >
      <g transform={`rotate(${TILT_DEG + wobble})`}>
        {/* Contact shadow in the channel. */}
        <ellipse cx="1" cy={ry * 0.84} rx={rx * 0.8} ry="3.2" fill="#000" opacity="0.22" />
        <ellipse rx={rx} ry={ry} fill={`url(#${id}-egg)`} />
        {/* Specular highlight — what makes it read as a shell rather than a disc. */}
        <ellipse
          cx={-rx * 0.34}
          cy={-ry * 0.4}
          rx={rx * 0.34}
          ry={ry * 0.26}
          fill={`url(#${id}-gloss)`}
          transform="rotate(-24)"
        />
        {/* Warm light bouncing off the tray into the underside. */}
        <path
          d={`M ${-rx * 0.8} ${ry * 0.42} a ${rx} ${ry} 0 0 0 ${rx * 1.6} 0`}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.2"
          strokeWidth="1.6"
        />
      </g>
    </motion.g>
  );
}
