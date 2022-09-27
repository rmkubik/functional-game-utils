/**
 * @module Matrix
 */

import fillMatrix from "./fillMatrix";

/**
 * @description Creates a matrix of the specified dimensions
 * with all cells set to a value of 0.
 *
 * @param {Dimensions} dimensions
 *
 * @returns {number[][]} the initialized matrix
 */
const initMatrix = (dimensions) => fillMatrix(dimensions)(0);

export default initMatrix;
