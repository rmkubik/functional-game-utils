import { containsLocation } from "../arrays";
import { getLocation } from "../matricies/locations";

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

  if (isLocationValid(getLocation(matrix, location))) {
    // mark location as found
    found.push(location);

    // add all the neighbors
    const neighbors = getNeighbors(matrix, location);

    neighbors.forEach(neighbor => {
      if (
        !containsLocation(closed, neighbor) &&
        !containsLocation(open, neighbor)
      ) {
        // if location not already closed or marked as open, push it into open
        open.push(neighbor);
      }
    });
  }

  // close current location
  closed.push(location);

  return floodFill(getNeighbors, isLocationValid, matrix, open, closed, found);
};

export default floodFill;
