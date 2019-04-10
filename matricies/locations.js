import { curry } from "ramda";

const isLocationInBounds = curry(
  (grid, { row, col }) =>
    row < grid.length && row >= 0 && col < grid[row].length && col >= 0
);

export { isLocationInBounds };
