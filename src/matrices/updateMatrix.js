/**
 * @module Matrix
 */

import { curry, update } from "ramda";

/**
 * @description Set the cell of the matrix at the location to a value.
 *
 * @param {Location} location
 * @param {Object} value
 * @param {Object[][]} matrix
 *
 * @returns {Object[][]} matrix with the location updated
 */
const updateMatrix = curry(({ row, col }, value, matrix) =>
  update(row, update(col, value, matrix[row]), matrix)
);

export default updateMatrix;
