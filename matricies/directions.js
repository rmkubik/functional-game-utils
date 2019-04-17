const getCrossNeighbors = () => [
  { up: true },
  { left: true },
  { right: true },
  { down: true }
];

const getDiagonalNeighbors = () => [
  { up: true, left: true },
  { up: true, right: true },
  { down: true, right: true },
  { down: true, left: true }
];

const getAllNeighbors = () => [
  ...getCrossNeighbors(),
  ...getDiagonalNeighbors()
];

export { getCrossNeighbors, getDiagonalNeighbors, getAllNeighbors };
