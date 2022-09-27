/**
 * @module Matrix
 */

import { pipe, curry } from "ramda";
import { fillArray } from "../arrays";

/**
 * @description Creates a matrix of the specified dimensions filled
 * with the provided value at every location.
 *
 * @param {Dimensions} dimensions - width and height of this matrix
 * @param {Object} value - any value to fill the matrix with
 *
 * @returns {Object[][]} the newly created array
 */
const fillMatrix = curry(({ width, height }, value) =>
  pipe(fillArray(width), fillArray(height))(value)
);

export default fillMatrix;
