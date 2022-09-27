/**
 * @module Matrix
 */

import { curry, pipe, map, filter } from "ramda";
import { isLocationInBounds, getLocation } from "./locations";

const getLocationFromDirection = curry((location, direction) => {
  let { row, col } = location;

  if (direction.up) {
    row -= 1;
  } else if (direction.down) {
    row += 1;
  }

  if (direction.left) {
    col -= 1;
  } else if (direction.right) {
    col += 1;
  }

  return {
    row,
    col,
  };
});

/**
 * @description Get all the neighboring locations of the provided location from
 * the provided matrix that are in bounds.
 *
 * @param {function} - getDirections - this function should return a
 * {Connections} object defining how matrix cells are connected.
 * @param {Object[][]} - matrix - the matrix to be checked
 * @param {Location} - location - location in the matrix whose neighbors
 * should be returned.
 *
 * @returns {Location[]} array of all valid neighboring locations
 */
const getNeighbors = curry((getDirections, matrix, location) => {
  const isLocationInBoundsWithMatrix = isLocationInBounds(matrix);

  if (!isLocationInBoundsWithMatrix(location)) {
    // Location out of bounds has no neighbors
    return [];
  }

  const getLocationFromDirectionWithLocation =
    getLocationFromDirection(location);

  return pipe(
    map(getLocationFromDirectionWithLocation),
    filter(isLocationInBoundsWithMatrix)
  )(getDirections(getLocation(matrix, location)));
});

export default getNeighbors;
