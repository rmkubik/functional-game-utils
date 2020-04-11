import { curry, equals } from "ramda";
import { containsLocation, findBestMatch } from "../arrays";
import {
  getLocation,
  compareLocations,
  manhattanDistance,
} from "../matrices/locations";
import { getDimensions, constructMatrix, updateMatrix } from "../matrices";

const createTrackingMatrix = (matrix, start, target, heuristicFn) => {
  const dimensions = getDimensions(matrix);

  const trackingMatrix = constructMatrix(() => ({
    heuristicDistance: Infinity,
    distanceFromStart: Infinity,
  }))(dimensions);

  const trackingMatrixWithStartMarked = updateMatrix(
    start,
    {
      heuristicDistance: heuristicFn(start, target),
      distanceFromStart: 0,
    },
    trackingMatrix
  );

  return trackingMatrixWithStartMarked;
};

/**
 *
 *
 * A-Star Adaptation based on:
 * https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
 *
 * @param {*} getNeighbors
 * @param {*} isLocationValid
 * @param {*} matrix
 * @param {*} trackingMatrix
 * @param {*} target
 * @param {*} open
 * @param {*} closed
 * @param {*} distance
 * @param {*} heuristicFn
 */
const createPath = (
  getNeighbors,
  isLocationValid,
  matrix,
  trackingMatrix,
  target,
  open,
  closed,
  distance,
  heuristicFn
) => {
  if (open.length === 0) {
    // exit case, could not find target
    return undefined;
  }

  let updatedTrackingMatrix;

  // get next open location nearest to current location
  const locationIndex = findBestMatch(
    (openLocation) => {
      const { heuristicDistance, distanceFromStart } = getLocation(
        trackingMatrix,
        openLocation
      );

      // console.log(
      //   "matching -- ",
      //   openLocation,
      //   trackingMatrix,
      //   heuristicDistance,
      //   distanceFromStart
      // );

      return heuristicDistance + distanceFromStart;
    },
    // find location with shortest distance from start + expected distance (heuristic)
    (currentBest, evaluated) => {
      if (evaluated < currentBest) {
        return true;
      }

      return false;
    },
    open
  );

  // remove found location from open list
  const [location] = open.splice(locationIndex, 1);

  // console.log("location -- ", location, open, closed, trackingMatrix);

  if (isLocationValid(getLocation(matrix, location), location, matrix)) {
    // record our distance somehow

    if (compareLocations(location, target)) {
      // exit case, we found our destination, return the end of our path
      return [location];
    }

    // open all the neighbors
    const neighbors = getNeighbors(matrix, location);

    neighbors.forEach((neighbor) => {
      if (!containsLocation(closed, neighbor)) {
        let isNewDistanceShortest = false;
        let neighborHeuristicDistance = heuristicFn(neighbor, target);
        let neighborDistanceFromStart =
          getLocation(trackingMatrix, location).distanceFromStart + 1;

        // console.log(
        //   neighbor,
        //   getLocation(trackingMatrix, location),
        //   getLocation(trackingMatrix, location).distanceFromStart + 1
        // );

        if (!containsLocation(open, neighbor)) {
          // no other distance tracked for this neighbor, it must be shortest
          isNewDistanceShortest = true;

          // if location not already closed or open, push it into open
          open.push(neighbor);
        }

        // is neighbor's tracked distanceFromStart worse than the one we just calcuated?
        if (
          neighborDistanceFromStart <
          getLocation(matrix, neighbor).distanceFromStart
        ) {
          // we have found a shorter path to our neighbor
          isNewDistanceShortest = true;
        }

        if (isNewDistanceShortest) {
          // updateTracking data
          updatedTrackingMatrix = updateMatrix(
            neighbor,
            {
              heuristicDistance: neighborHeuristicDistance,
              distanceFromStart: neighborDistanceFromStart,
            },
            trackingMatrix
          );
        }
      }
    });
  }

  // close this location so we don't evaluate it again
  closed.push(location);

  // evaluate next location
  const path = createPath(
    getNeighbors,
    isLocationValid,
    matrix,
    updatedTrackingMatrix ? updatedTrackingMatrix : trackingMatrix,
    target,
    open,
    closed,
    distance + 1,
    heuristicFn
  );

  // a path was found to target node, add our current location as a member of the path
  if (path) {
    return [location, ...path];
  }

  // there is no path to the target along this node
  return undefined;
};

const getPath = curry(
  (getNeighbors, isLocationValid, matrix, start, target) => {
    const heuristicFn = manhattanDistance;
    const trackingMatrix = createTrackingMatrix(
      matrix,
      start,
      target,
      heuristicFn
    );

    return createPath(
      getNeighbors,
      isLocationValid,
      matrix,
      trackingMatrix,
      target,
      [start],
      [],
      0,
      heuristicFn
    );
  }
);

export default getPath;
