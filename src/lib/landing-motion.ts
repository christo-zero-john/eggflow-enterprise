/**
 * When the pinned story layout is active.
 *
 * MUST stay identical to the media query in src/app/globals.css that sets
 * `.story-track { height }` and `.story-stage { position: sticky }`. If the two
 * disagree, the component renders a pinned sequence into a layout that is not
 * pinned, and the whole story collapses into a single viewport.
 *
 * Width is deliberately not part of this: the sequence is the clearest way to
 * explain the product and phones benefit from it most. Only genuinely short
 * viewports (landscape phones) fall back to the stacked version, because a
 * pinned full-height stage has nowhere to put the copy there.
 */
export const STORY_PINNED_QUERY = "(min-height: 560px)";

export type StoryState = {
  active: 0 | 1 | 2;
  opacity: [number, number, number];
};

export type HeaderMotionState = {
  visible: boolean;
  direction: -1 | 0 | 1;
  distance: number;
  y: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const stableOpacity = (value: number) => Math.round(value * 10_000) / 10_000;

/**
 * Which of the three story steps a scroll position belongs to.
 *
 * Each step owns an equal third of the track. The boundaries carry a small
 * hysteresis so a step does not flicker when the reader stops exactly on one,
 * and the crossfade is deliberately narrow — a wide blend made two images
 * visible at once for most of the scroll, which read as a smear rather than a
 * change.
 */
const FIRST_BOUNDARY = 1 / 3;
const SECOND_BOUNDARY = 2 / 3;
const HYSTERESIS = 0.02;
const BLEND = 0.06;

export function getStoryState(progress: number, previousActive?: 0 | 1 | 2): StoryState {
  const p = clamp(progress);

  // Moving forward, a boundary is crossed slightly late; moving back, slightly
  // early. Both keep the current step until the reader has clearly left it.
  const first = previousActive !== undefined && previousActive > 0 ? FIRST_BOUNDARY - HYSTERESIS : FIRST_BOUNDARY + HYSTERESIS;
  const second = previousActive === 2 ? SECOND_BOUNDARY - HYSTERESIS : SECOND_BOUNDARY + HYSTERESIS;

  const active: 0 | 1 | 2 = p < first ? 0 : p < second ? 1 : 2;

  const firstBlend = clamp((p - (FIRST_BOUNDARY - BLEND / 2)) / BLEND);
  const secondBlend = clamp((p - (SECOND_BOUNDARY - BLEND / 2)) / BLEND);

  return {
    active,
    opacity: [
      stableOpacity(1 - firstBlend),
      stableOpacity(firstBlend * (1 - secondBlend)),
      stableOpacity(secondBlend),
    ],
  };
}

/**
 * Where in the track a given step sits, as a fraction of the scrollable
 * travel. Aimed at the middle of each band so a click lands solidly inside the
 * step rather than on its edge.
 */
export function getStepTarget(index: number): number {
  return [1 / 6, 1 / 2, 5 / 6][index] ?? 0;
}

export function getHeaderVisibility(
  previous: HeaderMotionState,
  nextY: number,
  ownsFocus: boolean,
): HeaderMotionState {
  const y = Math.max(0, nextY);

  if (ownsFocus || y <= 96) {
    return { visible: true, direction: 0, distance: 0, y };
  }

  const delta = y - previous.y;
  if (Math.abs(delta) < 3) return { ...previous, y };

  const direction: -1 | 1 = delta > 0 ? 1 : -1;
  const distance = previous.direction === direction ? previous.distance + Math.abs(delta) : Math.abs(delta);
  const threshold = direction === 1 ? 48 : 16;

  return {
    visible: distance >= threshold ? direction === -1 : previous.visible,
    direction,
    distance,
    y,
  };
}
