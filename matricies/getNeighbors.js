import { curry, pipe, map, filter } from "ramda";
import { isLocationInBounds } from "./locations";

const convertDirection = curry((location, direction) => {
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
    col
  };
});

const getNeighbors = curry(
  (
    directions = [
      { up: true },
      { left: true },
      { right: true },
      { down: true }
    ],
    matrix,
    location
  ) => {
    const isLocationInBoundsWithMatrix = isLocationInBounds(matrix);

    if (!isLocationInBoundsWithMatrix(location)) {
      // Location out of bounds has no neighbors
      return [];
    }

    const convertDirectionWithLocation = convertDirection(location);

    return pipe(
      map(convertDirectionWithLocation),
      filter(isLocationInBoundsWithMatrix)
    )(directions);
  }
);

export default getNeighbors;
