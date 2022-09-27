/**
 * @module Matrix
 */

import { curry } from "ramda";

/**
 * Takes in the value, location, and matrix being mapped
 * and returns a new object.
 *
 * @callback CellMapper
 *
 * @param {Object} value
 * @param {Location} location
 * @param {Object[][]} matrix
 *
 * @returns {Object}
 */

/**
 * @description Maps over the provided matrix with the provided
 * callback and returns a new matrix.
 *
 * @param {CellMapper} callback
 * @param {Object[][]} matrix
 *
 * @returns {Object[][]} the newly mapped matrix
 */
const mapMatrix = curry((cb, matrix) =>
  matrix.map((array, row) =>
    array.map((value, col) => cb(value, { row, col }, matrix))
  )
);

export default mapMatrix;
