import { pipe, pathEq, clone } from "ramda";
import { findValue, findLocation } from "./find";
import { initMatrix, updateMatrix } from ".";

describe("findValue", () => {
  it("should find value in matrix if comparator matches", () => {
    const target = { node: { start: true } };

    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 3, col: 7 }, target)
    )({ width: 10, height: 10 });

    const value = findValue(pathEq(["node", "start"], true), matrix);

    expect(value).toEqual(clone(target));
  });

  it("should return found value for irregular matrix", () => {
    const target = { node: { start: true } };

    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 3, col: 7 }, target)
    )({ width: 10, height: 10 });

    matrix[0] = [];

    const value = findValue(pathEq(["node", "start"], true), matrix);

    expect(value).toEqual(clone(target));
  });

  it("should return undefined if comparator has no match", () => {
    const target = { thing: { prop: true } };

    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 3, col: 7 }, target)
    )({ width: 10, height: 10 });

    const value = findValue(pathEq(["node", "start"], true), matrix);

    expect(value).toBe(undefined);
  });
});

describe("findLocation", () => {
  it("should return found location", () => {
    const target = { thing: { prop: true } };
    const targetLocation = { row: 3, col: 7 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation, target)
    )({ width: 10, height: 10 });

    const location = findLocation(pathEq(["thing", "prop"], true), matrix);

    expect(location).toEqual(targetLocation);
  });

  it("should return found location for irregular matrix", () => {
    const target = { thing: { prop: true } };
    const targetLocation = { row: 3, col: 7 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation, target)
    )({ width: 10, height: 10 });

    matrix[0] = [];

    const location = findLocation(pathEq(["thing", "prop"], true), matrix);

    expect(location).toEqual(targetLocation);
  });

  it("should return undefined if target not in matrix", () => {
    const target = { incorrect: { value: false } };
    const targetLocation = { row: 3, col: 7 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation, target)
    )({ width: 10, height: 10 });

    const location = findLocation(pathEq(["thing", "prop"], true), matrix);

    expect(location).toBe(undefined);
  });
});
