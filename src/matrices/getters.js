/**
 * @module Matrix
 */

import { curry, map, all, equals } from "ramda";

/**
 * @description Get a row of the provided matrix
 *
 * @param {Object[][]} matrix
 * @param {number} rowIndex - row index to be gotten
 *
 * @returns {Object[]} a single row of the matrix
 */
const getRow = curry((matrix, rowIndex) => matrix[rowIndex]);

const isEntireArrayUndefined = (array) => all(equals(undefined), array);

/**
 * @description Get a column of the provided matrix
 *
 * @param {Object[][]} matrix
 * @param {number} colIndex - column index to be gotten
 *
 * @returns {Object[]} a single column of the matrix
 */
const getCol = curry((matrix, colIndex) => {
  const col = map((row) => row[colIndex], matrix);

  return isEntireArrayUndefined(col) ? undefined : col;
});

/**
 * @description Get the dimensions objet describing the
 * provided matrix.
 *
 * @param {Object[][]} matrix
 *
 * @returns {Dimensions} width and height of the provided matrix
 */
const getDimensions = (matrix) => {
  return {
    height: getCol(matrix, 0).length,
    width: getRow(matrix, 0).length,
  };
};

export { getRow, getCol, getDimensions };
