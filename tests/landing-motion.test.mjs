import test from "node:test";
import assert from "node:assert/strict";

import { getHeaderVisibility, getStoryState } from "../src/lib/landing-motion.ts";

test("story state holds and blends across the specified progress intervals", () => {
  assert.deepEqual(getStoryState(0), { active: 0, opacity: [1, 0, 0] });
  assert.deepEqual(getStoryState(0.3), { active: 1, opacity: [0.5, 0.5, 0] });
  assert.deepEqual(getStoryState(0.5), { active: 1, opacity: [0, 1, 0] });
  assert.deepEqual(getStoryState(0.7), { active: 2, opacity: [0, 0.5, 0.5] });
  assert.deepEqual(getStoryState(1), { active: 2, opacity: [0, 0, 1] });
});

test("story active step uses hysteresis around transition boundaries", () => {
  assert.equal(getStoryState(0.31, 0).active, 0);
  assert.equal(getStoryState(0.33, 0).active, 1);
  assert.equal(getStoryState(0.69, 2).active, 2);
  assert.equal(getStoryState(0.67, 2).active, 1);
});

test("header hides after deliberate downward travel and reveals quickly upward", () => {
  let state = { visible: true, direction: 0, distance: 0, y: 120 };
  state = getHeaderVisibility(state, 150, false);
  assert.equal(state.visible, true);
  state = getHeaderVisibility(state, 180, false);
  assert.equal(state.visible, false);
  state = getHeaderVisibility(state, 170, false);
  assert.equal(state.visible, false);
  state = getHeaderVisibility(state, 160, false);
  assert.equal(state.visible, true);
});

test("header remains visible near the top and while it owns focus", () => {
  const hidden = { visible: false, direction: 1, distance: 80, y: 500 };
  assert.equal(getHeaderVisibility(hidden, 80, false).visible, true);
  assert.equal(getHeaderVisibility(hidden, 540, true).visible, true);
});
