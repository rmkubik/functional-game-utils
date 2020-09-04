import { curry, map, all, equals } from "ramda";

const getRow = curry((matrix, rowIndex) => matrix[rowIndex]);

const isEntireArrayUndefined = (array) => all(equals(undefined), array);

const getCol = curry((matrix, colIndex) => {
  const col = map((row) => row[colIndex], matrix);

  return isEntireArrayUndefined(col) ? undefined : col;
});

const getDimensions = (matrix) => {
  return {
    height: getCol(matrix, 0).length,
    width: getRow(matrix, 0).length,
  };
};

export { getRow, getCol, getDimensions };
