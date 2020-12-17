/**
 * @module Matrix
 */

import { curry, update } from "ramda";

const updateMatrix = curry(({ row, col }, value, matrix) =>
  update(row, update(col, value, matrix[row]), matrix)
);

export default updateMatrix;
