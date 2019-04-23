import { pipe, update, curry } from "ramda";
import { fillArray } from "../arrays";

const fillMatrix = curry(({ width, height }, value) =>
  pipe(
    fillArray(width),
    fillArray(height)
  )(value)
);

const initMatrix = dimensions => fillMatrix(dimensions)(0);

const mapMatrix = curry((cb, matrix) =>
  matrix.map((array, row) =>
    array.map((value, col) => cb(value, { row, col }, matrix))
  )
);

const constructMatrix = curry((constructor, dimensions) =>
  pipe(
    initMatrix,
    mapMatrix(constructor)
  )(dimensions)
);

const updateMatrix = curry(({ row, col }, value, matrix) =>
  update(row, update(col, value, matrix[row]), matrix)
);

export { fillMatrix, initMatrix, mapMatrix, constructMatrix, updateMatrix };
