import { pick } from "ramda";

const getCrossDirections = () => [
  { up: true },
  { left: true },
  { right: true },
  { down: true }
];

const getDiagonalDirections = () => [
  { up: true, left: true },
  { up: true, right: true },
  { down: true, right: true },
  { down: true, left: true }
];

const getAllDirections = () => [
  ...getCrossDirections(),
  ...getDiagonalDirections()
];

const getConnectedDirections = connections => {
  return pick(["up", "down", "left", "right"], connections);
};

export {
  getCrossDirections,
  getDiagonalDirections,
  getAllDirections,
  getConnectedDirections
};
