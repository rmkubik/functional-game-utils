/**
 * @module Matrix
 */

import { curry } from "ramda";
import { initArray, constructArray } from "../arrays";
import transposeMatrix from "./transposeMatrix";
import { getDimensions, getRow, getCol } from "./getters";

// TODO: These enum values are not correctly populated in
// the docs, so I've hardcoded them into the enum's
// description.

/**
 * Directions to translate a matrix:
 * UP, DOWN, LEFT, RIGHT
 *
 * @readonly
 * @enum {string}
 */
const MATRIX_TRANSLATE_DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

/**
 * @description Translate a matrix in the provided direction
 *
 * @param {Object} options - control how the matrix is translated
 * @param {boolean} [options.shouldWrap=false] - should the edge of the matrix at the end of the
 * translation be placed on the opposite side of the matrix, or should it be removed entirely
 * @param {MatrixConstructor} [options.constructFn=()=>undefined] - if wrapping is disabled, this
 * constructor function is used to create the row at the newly exposed edge of the matrix.
 * @param {MATRIX_TRANSLATE_DIRECTIONS} options.direction - direction to translate the matrix
 * @param {Object[][]} - matrix to be translated
 *
 * @returns {Object[][]} newly translated matrix
 */
const translateMatrix = curry(
  (
    { shouldWrap = false, constructFn = () => undefined, direction },
    matrix
  ) => {
    const { height, width } = getDimensions(matrix);

    switch (direction) {
      case MATRIX_TRANSLATE_DIRECTIONS.UP:
        return matrix.map((_, rowIndex) => {
          const nextRow = getRow(matrix, rowIndex + 1);

          // If there is not next row, we're on the last row in our matrix
          if (!nextRow) {
            if (shouldWrap) {
              // If we should wrap, our last row should become the original first row
              return getRow(matrix, 0);
            }

            // If nothing else, use the provided construct function to build a new final row
            return constructArray(constructFn, width);
          }

          return nextRow;
        });
      case MATRIX_TRANSLATE_DIRECTIONS.DOWN:
        return matrix.map((_, rowIndex) => {
          const prevRow = getRow(matrix, rowIndex - 1);

          // If there is not next row, we're on the first row in our matrix
          if (!prevRow) {
            if (shouldWrap) {
              // If we should wrap, our first row should become the original last row
              return getRow(matrix, height - 1);
            }

            // If nothing else, use the provided construct function to build a new final row
            return constructArray(constructFn, width);
          }

          return prevRow;
        });
      case MATRIX_TRANSLATE_DIRECTIONS.RIGHT: {
        const translatedColumns = initArray(width).map((_, colIndex) => {
          const prevCol = getCol(matrix, colIndex - 1);

          // If there is not prev column, we're on the first col in our matrix
          if (!prevCol) {
            if (shouldWrap) {
              // If we should wrap, our first column should become the original last column
              return getCol(matrix, width - 1);
            }

            // If nothing else, use the provided construct function to build a new final column
            return constructArray(constructFn, height);
          }

          return prevCol;
        });

        return transposeMatrix(translatedColumns);
      }
      case MATRIX_TRANSLATE_DIRECTIONS.LEFT: {
        const translatedColumns = initArray(width).map((_, colIndex) => {
          const nextCol = getCol(matrix, colIndex + 1);

          // If there is not next column, we're on the last col in our matrix
          if (!nextCol) {
            if (shouldWrap) {
              // If we should wrap, our last column should become the original first column
              return getCol(matrix, 0);
            }

            // If nothing else, use the provided construct function to build a new final column
            return constructArray(constructFn, height);
          }

          return nextCol;
        });

        return transposeMatrix(translatedColumns);
      }
      default:
        break;
    }
  }
);

export default translateMatrix;
export { MATRIX_TRANSLATE_DIRECTIONS };
