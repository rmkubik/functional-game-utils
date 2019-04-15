import { pipe, map, curry } from "ramda";
import { isFunction, isPositive } from "ramda-adjunct";
import { compareLocations } from "../matricies/locations";
import assert from "../assert";

const fillArray = curry((length, value) => Array(length).fill(value));

const initArray = length => fillArray(length, 0);

const constructArray = curry((constructor, length) => {
  assert(isFunction(constructor), "Constructor argument should be a function!");
  assert(isPositive(length), "Length argument should be a positive number!");

  return pipe(
    initArray,
    map(constructor)
  )(length);
});

const containsLocation = curry((array, location) =>
  Boolean(array.find(value => compareLocations(value, location)))
);

export { fillArray, initArray, constructArray, containsLocation };
