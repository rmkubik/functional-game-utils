/**
 * @module Matrix
 */

import { curry } from "ramda";

const mapMatrix = curry((cb, matrix) =>
  matrix.map((array, row) =>
    array.map((value, col) => cb(value, { row, col }, matrix))
  )
);

export default mapMatrix;
