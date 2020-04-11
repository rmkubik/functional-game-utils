import { curry, pipe } from "ramda";
import initMatrix from "./initMatrix";
import mapMatrix from "./mapMatrix";

/**
 * @description A function used to construct the value of a given matrix location.
 *
 * @callback MatrixConstructor
 * @param {Location} location - The location of the constructed value.
 */

/**
 * @description Creates a matrix of the specified dimensions where each location is filled with the
 * result of running the constructor function.
 *
 * @param {MatrixConstructor} constructor - The function used to construct each value of the array.
 * @param {Dimensions} dimensions - The length of the array to be filled.
 * @returns {Object[][]} Newly created matrix of the constructed values.
 */
const constructMatrix = curry((constructor, dimensions) =>
  pipe(
    initMatrix,
    mapMatrix((_, location) => constructor(location))
  )(dimensions)
);

const constructMatrixFromString = curry((constructor, string) =>
  pipe(
    initMatrix,
    mapMatrix((_, location) => constructor(location))
  )(dimensions)
);

export { constructMatrix, constructMatrixFromString };
