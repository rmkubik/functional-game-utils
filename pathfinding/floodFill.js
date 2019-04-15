import { containsLocation } from "../arrays";

const floodFill = (getNeighbors, matrix, open, closed, found) => {
  // console.log("open: ", open, "closed: ", closed, "found: ", found);

  if (open.length === 0) {
    // exit case, we've found all connected locations
    return found;
  }

  // get next open location
  const location = open.pop();

  // is location valid?
  // currently all locations are valid
  if (true) {
    // mark location as found
    found.push(location);

    // add all the neighbors
    const neighbors = getNeighbors(matrix, location);

    neighbors.forEach(neighbor => {
      if (!containsLocation(closed, neighbor)) {
        // if location not already closed, push it into open
        open.push(neighbor);
      }
    });
  }

  // close current location
  closed.push(location);

  return floodFill(getNeighbors, matrix, open, closed, found);
};

export default floodFill;
