/**
 * @module Matrix
 */

import { curry } from "ramda";
import assert from "../assert";

const isLocationInBounds = curry((matrix, { row, col }) =>
  Boolean(
    row < matrix.length &&
      row >= 0 &&
      matrix[row] &&
      col < matrix[row].length &&
      col >= 0
  )
);

const getLocation = curry((matrix, location) => {
  assert(
    isLocationInBounds(matrix, location),
    `Location: ${JSON.stringify(location)} isn't in bounds!`
  );

  return matrix[location.row][location.col];
});

const compareLocations = curry((a, b) => {
  return a.row === b.row && a.col === b.col;
});

const manhattanDistance = curry((a, b) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
});

export { isLocationInBounds, getLocation, compareLocations, manhattanDistance };
