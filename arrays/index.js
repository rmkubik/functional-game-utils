import { pipe, map, curry } from "ramda";

const fillArray = curry((length, value) => Array(length).fill(value));

const initArray = length => fillArray(length, 0);

const constructArray = constructor =>
  pipe(
    initArray,
    map(constructor)
  );

export { fillArray, initArray, constructArray };
