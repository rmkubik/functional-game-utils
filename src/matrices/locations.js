/**
 * @module Matrix
 */

import { curry } from "ramda";
import assert from "../assert";

/**
 * @description Checks if the given matrix includes the given
 * location
 *
 * @param {Object[][]} matrix
 * @param {Location} location
 *
 * @returns {Boolean} true if the given location exists within
 * the matrix.
 */
const isLocationInBounds = curry((matrix, { row, col }) =>
  Boolean(
    row < matrix.length &&
      row >= 0 &&
      matrix[row] &&
      col < matrix[row].length &&
      col >= 0
  )
);

/**
 * @description Gets the cell's value at the specified location
 * from the matrix.
 *
 * @param {Object[][]} matrix
 * @param {Location} location
 *
 * @throws {AssertionError} the target location is not contained
 * in the provided matrix's bounds
 * @returns {Object} the retrieved object
 */
const getLocation = curry((matrix, location) => {
  assert(
    isLocationInBounds(matrix, location),
    `Location: ${JSON.stringify(location)} isn't in bounds!`
  );

  return matrix[location.row][location.col];
});

/**
 * @description Check if two locations are equal. Determined by
 * a comparison of row and col values of each location.
 *
 * @param {Location} a
 * @param {Location} b
 *
 * @returns {boolean} true if both locations are equal
 */
const compareLocations = curry((a, b) => {
  return a.row === b.row && a.col === b.col;
});

/**
 * @description Calculates the Manhattan Distance between two
 * provided locations
 *
 * @param {Location} a
 * @param {Location} b
 *
 * @returns {number} the integer value of the calculated distance
 */
const manhattanDistance = curry((a, b) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
});

export { isLocationInBounds, getLocation, compareLocations, manhattanDistance };
