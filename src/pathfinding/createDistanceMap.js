/**
 * @module Pathfinding
 */

import {
  initMatrix,
  getDimensions,
  mapMatrix,
  compareLocations,
  getLocation,
  updateMatrix,
} from "../matrices";
import { Queue } from "../queues";
import { ComparableSet } from "../sets";

function createBaseMap(matrix, goals) {
  return mapMatrix((value, location) => {
    if (goals.some((goal) => compareLocations(goal, location))) {
      return 0;
    }

    return Infinity;
  }, matrix);
}

function createDistanceMap(getNeighbors, isLocationValid, matrix, goals) {
  let distances = createBaseMap(matrix, goals);
  let cameFrom = initMatrix(getDimensions(matrix));

  const open = new Queue(goals);
  const closed = new ComparableSet(compareLocations);

  // close all goals so we don't revisit them
  goals.forEach((goal) => closed.add(goal));

  while (!open.isEmpty()) {
    const current = open.dequeue();

    const neighbors = getNeighbors(matrix, current);

    neighbors.forEach((neighbor) => {
      if (!closed.contains(neighbor)) {
        closed.add(neighbor);

        if (isLocationValid(getLocation(matrix, neighbor), neighbor, matrix)) {
          open.enqueue(neighbor);
          cameFrom = updateMatrix(neighbor, current, cameFrom);

          const distance = getLocation(distances, current) + 1;

          // if another path is a shorter distance, use that instead
          if (distance < getLocation(distances, neighbor)) {
            distances = updateMatrix(neighbor, distance, distances);
          }
        }
      }
    });
  }

  return distances;
}

export default createDistanceMap;
