const CROSS_NEIGHBORS = [
  { up: true },
  { left: true },
  { right: true },
  { down: true }
];

const DIAGONAL_NEIGHBORS = [
  { up: true, left: true },
  { up: true, right: true },
  { down: true, right: true },
  { down: true, left: true }
];

const ALL_NEIGHBORS = [...CROSS_NEIGHBORS, ...DIAGONAL_NEIGHBORS];

export { CROSS_NEIGHBORS, DIAGONAL_NEIGHBORS, ALL_NEIGHBORS };
