/**
 * @module Matrix
 */

import { curry } from "ramda";
import { initArray } from "../arrays";
import { getDimensions, getCol } from "./getters";

const MATRIX_ROTATION_DIRECTIONS = {
  CLOCKWISE: "CLOCKWISE",
  COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
};
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
