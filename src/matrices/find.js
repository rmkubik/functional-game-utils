/**
 * @module Matrix
 */

import { find, curry, pipe, flatten, findIndex, any } from "ramda";
import { maxWidth, height } from "./dimensions";

const findValue = curry((comparator, matrix) => {
  let found;

  for (let row = 0; row < height(matrix) && !found; row++) {
    for (let col = 0; col < maxWidth(matrix) && !found; col++) {
      if (comparator(matrix[row][col], { row, col })) {
        found = matrix[row][col];
      }
    }
  }

  return found;
});

const findLocation = curry((comparator, matrix) => {
  let found = false;
  let location = {};

  for (let row = 0; row < height(matrix) && !found; row++) {
    for (let col = 0; col < maxWidth(matrix) && !found; col++) {
      if (comparator(matrix[row][col], { row, col })) {
        found = true;
        location = { row, col };
      }
    }
  }

  return found ? location : undefined;
});

const findLocations = curry((comparator, matrix) => {
  const matches = [];

  for (let row = 0; row < height(matrix); row++) {
    for (let col = 0; col < maxWidth(matrix); col++) {
      if (comparator(matrix[row][col], { row, col })) {
        matches.push({ row, col });
      }
    }
  }

  return matches;
});

export { findValue, findLocation, findLocations };
