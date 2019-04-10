import { curry } from "ramda";
import assert from "../assert";

const isLocationInBounds = curry((grid, { row, col }) =>
  Boolean(
    row < grid.length &&
      row >= 0 &&
      grid[row] &&
      col < grid[row].length &&
      col >= 0
  )
);

const getLocation = curry((grid, location) => {
  assert(
    isLocationInBounds(grid, location),
    `Location: ${JSON.stringify(location)} isn't in bounds!`
  );

  return grid[location.row][location.col];
});

export { isLocationInBounds, getLocation };
