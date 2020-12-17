/**
 * @module Matrix
 */

import { curry, pipe } from "ramda";

/**
 * The width and height of a matrix
 * @typedef Dimensions
 *
 * @param {number} width - How many columns are in a matrix
 * @param {number} height - How many rows are in a matrix
 */

/**
 * Find the length of the longest row in the provided matrix.
 * @param {Object} matrix
 */
const maxWidth = (matrix) => {
  return matrix.reduce((greatest, row) => {
    return row.length > greatest ? row.length : greatest;
  }, 0);
};

/**
 * Find the length of the shortest row in the provided matrix.
 * @param {Object} matrix
 */
const minWidth = (matrix) => {
  return matrix.reduce((shortest, row) => {
    return row.length < shortest ? row.length : shortest;
  }, Infinity);
};

/**
 * Get the height of a matrix.
 * @param {Object} matrix
 */
const height = (matrix) => matrix.length;

export { height, maxWidth, minWidth };
