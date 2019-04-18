import { find, curry, pipe, flatten } from "ramda";

const findInMatrix = curry((comparator, matrix) =>
  pipe(
    flatten,
    find(comparator)
  )(matrix)
);

export { findInMatrix };
