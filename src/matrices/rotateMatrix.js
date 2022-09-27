/**
 * @module Matrix
 */

import { curry } from "ramda";
import { initArray } from "../arrays";
import { getDimensions, getCol } from "./getters";

// TODO: These enum values are not correctly populated in
// the docs, so I've hardcoded them into the enum's
// description.

/**
 * Directions to rotate a matrix:
 * CLOCKWISE, COUNTER_CLOCKWISE
 *
 * @readonly
 * @enum {string}
 */
const MATRIX_ROTATION_DIRECTIONS = {
  CLOCKWISE: "CLOCKWISE",
  COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
};

/**
 * @description Rotate a matrix in the provided direction
 *
 * @param {Object} options - control how the matrix is rotated
 * @param {MATRIX_ROTATION_DIRECTIONS} options.direction - direction to rotate the matrix
 * @param {Object[][]} - matrix to be rotated
 *
 * @returns {Object[][]} newly rotated matrix
 */
const rotateMatrix = curry(({ direction }, matrix) => {
  const { width } = getDimensions(matrix);

  switch (direction) {
    case MATRIX_ROTATION_DIRECTIONS.COUNTER_CLOCKWISE:
      return (
        initArray(width)
          .map((_, index) => {
            // Grab the columns in reverse order
            const col = getCol(matrix, width - 1 - index);

            // We can only operate on a column that exists
            if (col) {
              return col;
            }
          })
          // Filter out rows that are falsy. If a matrix's dimensions are
          // uneven, we'll have this occur when referencing a row or col
          // that does not exist.
          .filter((row) => Boolean(row))
      );
    case MATRIX_ROTATION_DIRECTIONS.CLOCKWISE:
    default:
      return (
        initArray(width)
          .map((_, index) => {
            const col = getCol(matrix, index);

            // We can only operate on a column that exists
            if (col) {
              return col.reverse();
            }
          })
          // Filter out rows that are falsy. If a matrix's dimensions are
          // uneven, we'll have this occur when referencing a row or col
          // that does not exist.
          .filter((row) => Boolean(row))
      );
  }
});

export default rotateMatrix;
export { MATRIX_ROTATION_DIRECTIONS };
