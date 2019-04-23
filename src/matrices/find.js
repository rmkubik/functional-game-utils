import { find, curry, pipe, flatten, findIndex, any } from "ramda";
import { getRow } from "./getters";

const findValue = curry((comparator, matrix) =>
  pipe(
    flatten,
    find(comparator)
  )(matrix)
);

const findLocation = curry((comparator, matrix) => {
  const row = findIndex(row => any(comparator, row), matrix);

  if (row === -1) {
    return undefined;
  }

  const col = findIndex(comparator, getRow(matrix, row));

  return {
    row,
    col
  };
});

export { findValue, findLocation };
