/**
 * @module Matrix
 */

import { curry } from "ramda";
import { initArray, constructArray } from "../arrays";
import transposeMatrix from "./transposeMatrix";
import { getDimensions, getRow, getCol } from "./getters";

const MATRIX_TRANSLATE_DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
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
