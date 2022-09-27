/**
 * @module Pathfinding
 */

import { containsLocation } from "../arrays";
import { getLocation } from "../matrices/locations";

/**
 * @description Returns an array of all locations connected to
 * the starting open locations. Connections defined by getNeighbors
 * and isLocationValid functions.
 *
 * @param {getNeighbors} getNeighbors
 * @param {CellComparator} isLocationValid
 * @param {Object[][]} matrix
 * @param {Location[]} open - locations to start floodfilling from
 * @param {Location[]} closed - usually empty, locations here will not
 * be checked by the floodfill algorithm.
 * @param {Location[]} found - usually empty, locations here will be
 * returned by the floodfill function. If this array contains locations
 * that the algorithm will find on its own, these values will be
 * duplicated. This function does not guarantee uniqueness in that case.
 *
 * @returns {Location[]} flooded locations
 */
const floodFill = (
  getNeighbors,
  isLocationValid,
  matrix,
  open,
  closed,
  found
) => {
  if (open.length === 0) {
    // exit case, we've found all connected locations
    return found;
  }

  // get next open location
  const location = open.pop();

  if (isLocationValid(getLocation(matrix, location), location, matrix)) {
    // mark location as found
    found.push(location);

    // add all the neighbors
    const neighbors = getNeighbors(matrix, location);

    neighbors.forEach((neighbor) => {
      if (
        !containsLocation(closed, neighbor) &&
        !containsLocation(open, neighbor)
      ) {
        // if location not already closed or open, push it into open
        open.push(neighbor);
      }
    });
  }

  // close current location
  closed.push(location);

  return floodFill(getNeighbors, isLocationValid, matrix, open, closed, found);
};

export default floodFill;
