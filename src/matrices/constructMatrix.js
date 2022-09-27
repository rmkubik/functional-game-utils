/**
 * @module Matrix
 */

import { curry, pipe } from "ramda";
import stripIndents from "common-tags/lib/stripIndents";
import initMatrix from "./initMatrix";
import mapMatrix from "./mapMatrix";

/**
 * @description A function used to construct the value of a given matrix location.
 *
 * @callback MatrixConstructor
 * @param {Location} location - The location of the constructed value.
 *
 * @returns {Object} The value to be created at this location
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

/**
 * @description A function used to construct the value of a given matrix location
 * based on an input character.
 *
 * @callback MatrixCharacterMap
 * @param {string} character - Character for the current location
 * @param {Location} location - The location of the constructed value.
 * @param {Object[][]} - the entire template matrix
 *
 * @returns {Object} The value to be created at this location
 */

/**
 * @description Constructs a matrix from a template string. The template string should
 * represent the matrix. Each line of the template string (separated by newlines)
 * represents a row in the matrix. On each line (or row), a column is indicated by a
 * space between characters.
 *
 * @example This template string would create a 3x3 matrix with a different value for
 * the center cell. The mapCharacter function could initialize different data based on
 * this character.
 * . . .
 * . x .
 * . . .
 *
 * @param {MatrixCharacterMap} mapCharacter - function to construct each location based
 * on the character map
 * @param {string} template - a two dimensional string representing the matrix to be created
 *
 * @returns {Object[][]} Newly created matrix of the constructed values.
 */
const constructMatrixFromTemplate = curry((mapCharacter, template) => {
  const stripped = stripIndents(template);
  const rows = stripped.split("\n");
  const templateMatrix = rows.map((row) => row.split(" "));

  return mapMatrix((char, location) =>
    mapCharacter(char, location, templateMatrix)
  )(templateMatrix);
});

export { constructMatrix, constructMatrixFromTemplate };
