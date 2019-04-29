import { pick, map, pipe, toPairs, filter } from "ramda";

/**
 * @description An object describing a direction. It should contain no more than 2 truthy properties.
 * @typedef {Object} Direction
 *
 * @property {boolean} up - Is a component of this direction facing up.
 * @property {boolean} down - Is a component of this direction facing down.
 * @property {boolean} left - Is a component of this direction facing left.
 * @property {boolean} right - Is a component of this direction facing right.
 */

/**
 * @description Creates an array of directions representing the cross-shaped
 * neighbors of a cell.
 *
 * The following diagram describes the neighboring directions represented by X's.
 * | |X| |
 * -------
 * |X| |X|
 * -------
 * | |X| |
 *
 * @returns {Direction[]} Directions representing up, down, left, and right.
 */
const getCrossDirections = () => [
  { up: true },
  { left: true },
  { right: true },
  { down: true }
];

/**
 * @description Creates an array of directions representing the X-shaped diagonal
 * neighbors of a cell.
 *
 * The following diagram describes the neighboring directions represented by X's.
 * |X| |X|
 * -------
 * | | | |
 * -------
 * |X| |X|
 *
 * @returns {Direction[]} Directions representing upper left, upper right, lower left, and lower right.
 */
const getDiagonalDirections = () => [
  { up: true, left: true },
  { up: true, right: true },
  { down: true, right: true },
  { down: true, left: true }
];

/**
 * @description Creates an array of directions representing the all diagonal and cross-shaped
 * neighbors of a cell.
 *
 * The following diagram describes the neighboring directions represented by X's.
 * |X|X|X|
 * -------
 * |X| |X|
 * -------
 * |X|X|X|
 *
 * @returns {Direction[]} Directions representing upper left, up, upper right, right,
 * lower right, down, lower left, and left.
 */
const getAllDirections = () => [
  ...getCrossDirections(),
  ...getDiagonalDirections()
];

const isPairConnected = ([, connected]) => connected;
const buildDirection = ([direction]) => ({
  [direction]: true
});

/**
 * @description An object describing the connections of a cell.
 * @typedef {Object} Connections
 *
 * @property {boolean} up - Is this cell connected to its upper neighbor.
 * @property {boolean} down - Is this cell connected to its lower neighbor.
 * @property {boolean} left - Is this cell connected to its left neighbor.
 * @property {boolean} right - Is this cell connected to its right neighbor.
 */

/**
 * @description Creates an array of the directions connected to this object in a cross-shaped
 * pattern. A connection is determined by the connections object passed into this function.
 * If a connection direction is truthy then it is counted as connected.
 *
 * @param {Connections} connections - An object that describes which neighbors this cell is
 * connected to.
 * @returns {Directions[]} All directions connected to the cell.
 */
const getConnectedDirections = pipe(
  pick(["up", "down", "left", "right"]),
  toPairs,
  filter(isPairConnected),
  map(buildDirection)
);

export {
  getCrossDirections,
  getDiagonalDirections,
  getAllDirections,
  getConnectedDirections
};
