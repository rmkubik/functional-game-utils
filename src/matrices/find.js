/**
 * @module Matrix
 */

import { find, curry, pipe, flatten, findIndex, any } from "ramda";
import { maxWidth, height } from "./dimensions";

/**
 * @callback CellComparator
 *
 * @param {Object} cell - the cell's value at the current location
 * @param {Location} location - the location being checked
 *
 * @returns {boolean} true if this cell/location satisfies the condition
 */

/**
 * @description Search a provided matrix for the first cell that satisfies
 * the provided comparator's condition. Returns that cell's value.
 *
 * @param {CellComparator} comparator - callback to check if any given cell
 * or location should be found.
 * @param {Object[][]} matrix - matrix to be searched
 *
 * @returns {(Object|undefined)} the found value or undefined if nothing
 * matching the comparator was found.
 */
const findValue = curry((comparator, matrix) => {
  let found;

  for (let row = 0; row < height(matrix) && !found; row++) {
    for (let col = 0; col < maxWidth(matrix) && !found; col++) {
      if (comparator(matrix[row][col], { row, col })) {
        found = matrix[row][col];
      }
    }
  }

  return found;
});

/**
 * @description Search a provided matrix for the first cell that satisfies
 * the provided comparator's condition. Return's that cell's location.
 *
 * @param {CellComparator} comparator - callback to check if any given cell
 * or location should be found.
 * @param {Object[][]} matrix - matrix to be searched
 *
 * @returns {(Location|undefined)} the found value or undefined if nothing
 * matching the comparator was found.
 */
const findLocation = curry((comparator, matrix) => {
  let found = false;
  let location = {};

  for (let row = 0; row < height(matrix) && !found; row++) {
    for (let col = 0; col < maxWidth(matrix) && !found; col++) {
      if (comparator(matrix[row][col], { row, col })) {
        found = true;
        location = { row, col };
      }
    }
  }

  return found ? location : undefined;
});

/**
 * @description Search a provided matrix for the all cell that satisfy
 * the provided comparator's condition. Returns all matching locations.
 *
 * @param {CellComparator} comparator - callback to check if any given cell
 * or location should be found.
 * @param {Object[][]} matrix - matrix to be searched
 *
 * @returns {Location[]} array containing all matching locations in the
 * provided matrix.
 */
const findLocations = curry((comparator, matrix) => {
  const matches = [];

  for (let row = 0; row < height(matrix); row++) {
    for (let col = 0; col < maxWidth(matrix); col++) {
      if (comparator(matrix[row][col], { row, col })) {
        matches.push({ row, col });
      }
    }
  }

  return matches;
});

export { findValue, findLocation, findLocations };
