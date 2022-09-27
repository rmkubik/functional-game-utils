/**
 * @module Matrix
 */

import { curry } from "ramda";
import { initArray } from "../arrays";
import { getDimensions, getCol } from "./getters";

/**
 * @description Transpose (flip the columns and rows) the provided matrix.
 *
 * @param {Object[][]} matrix
 *
 * @returns {Object[][]} the transposed matrix
 */
const transposeMatrix = curry((matrix) => {
  const { width } = getDimensions(matrix);

  return initArray(width).map((_, index) => {
    // Grab the columns in reverse order
    return getCol(matrix, index);
  });
});

export default transposeMatrix;
