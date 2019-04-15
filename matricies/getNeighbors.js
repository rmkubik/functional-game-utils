import { curry, pipe, map, filter } from "ramda";
import { isLocationInBounds } from "./locations";

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

    const getLocationFromDirectionWithLocation = getLocationFromDirection(
      location
    );

    return pipe(
      map(getLocationFromDirectionWithLocation),
      filter(isLocationInBoundsWithMatrix)
    )(directions);
  }
);

export default getNeighbors;
