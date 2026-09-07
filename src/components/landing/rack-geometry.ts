/**
 * The rack, as measurements.
 *
 * Everything that draws the product — the hero demo and the scroll sequence —
 * derives from these numbers, so the two can never disagree about what the
 * object looks like. Coordinates are SVG user units.
 */

export const TIERS = 4;
export const PER_TIER = 7;

/** A rail runs from the open front (low, left) to the raised back (high, right). */
export const FRONT_X = 58;
export const RUN = 320;
export const RISE = 26; // how much higher the back end sits than the front
export const BACK_X = FRONT_X + RUN;

export const TOP_Y = 74;
export const TIER_GAP = 68;

export const SLOT = 43.5; // centre-to-centre spacing of eggs along a rail
export const FIRST_SLOT_X = FRONT_X + 19;

export const EGG_RX = 14;
export const EGG_RY = 19.5;

/** Uprights. They sit UNDER the rail ends so the joints read as one moulding. */
export const POST_W = 14;
export const POST_OVERLAP = 4; // how far a post reaches past the rail end

/** The angle of the rails, in degrees. Negative because the front end is low. */
export const TILT_DEG = -(Math.atan2(RISE, RUN) * 180) / Math.PI;

/** Y of the top surface of tier `t` at horizontal position `x`. */
export function railY(t: number, x: number): number {
  const frontY = TOP_Y + t * TIER_GAP;
  return frontY - ((x - FRONT_X) / RUN) * RISE;
}

/** Centre of egg slot `i` on tier `t`. Slot 0 is the front, at the open slot. */
export function slotCentre(t: number, i: number): { x: number; y: number } {
  const x = FIRST_SLOT_X + i * SLOT;
  // Seated in the channel rather than balanced on top of it. The factor is how
  // deep it sits: lower numbers bury the egg further behind the near wall.
  return { x, y: railY(t, x) - EGG_RY * 0.82 };
}

/** Where the foot of the frame sits. */
export const FOOT_Y = TOP_Y + (TIERS - 1) * TIER_GAP + 36;

/** The drawing's own bounds, derived rather than guessed. */
export const VIEW_X = FRONT_X - POST_W - 12;
export const VIEW_Y = TOP_Y - RISE - EGG_RY * 1.82 - 16;
export const VIEW_W = BACK_X + POST_W + 12 - VIEW_X;
export const VIEW_H = FOOT_Y + 16 - VIEW_Y;
