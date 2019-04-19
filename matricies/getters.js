import { curry, map, all, equals } from "ramda";

const isEntireArrayUndefined = array => all(equals(undefined), array);

const getRow = curry((matrix, rowIndex) => {
  const row = matrix[rowIndex];

  return isEntireArrayUndefined(row) ? undefined : row;
});

const getCol = curry((matrix, colIndex) => {
  const col = map(row => row[colIndex], matrix);

  return isEntireArrayUndefined(col) ? undefined : col;
});

export { getRow, getCol };
