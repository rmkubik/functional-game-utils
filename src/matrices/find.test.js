import { pipe, pathEq, clone } from "ramda";
import { findValue, findLocation, findLocations } from "./find";
import { initMatrix, updateMatrix } from ".";
import expectToEqualArray from "../../testUtils/expectToEqualArray";

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

describe("findLocations", () => {
  it("should return found locations", () => {
    const target = { thing: { prop: true } };
    const targetLocation1 = { row: 3, col: 7 };
    const targetLocation2 = { row: 2, col: 1 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation1, target),
      updateMatrix(targetLocation2, target)
    )({ width: 10, height: 10 });

    const locations = findLocations(pathEq(["thing", "prop"], true), matrix);

    expectToEqualArray(locations, [targetLocation1, targetLocation2]);
  });

  it("should return found location for irregular matrix", () => {
    const target = { thing: { prop: true } };
    const targetLocation1 = { row: 3, col: 7 };
    const targetLocation2 = { row: 2, col: 1 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation1, target),
      updateMatrix(targetLocation2, target)
    )({ width: 10, height: 10 });

    matrix[0] = [];

    const locations = findLocations(pathEq(["thing", "prop"], true), matrix);

    expectToEqualArray(locations, [targetLocation1, targetLocation2]);
  });

  it("should return undefined if target not in matrix", () => {
    const target = { incorrect: { value: false } };
    const targetLocation1 = { row: 3, col: 7 };
    const targetLocation2 = { row: 2, col: 1 };

    const matrix = pipe(
      initMatrix,
      updateMatrix(targetLocation1, target),
      updateMatrix(targetLocation2, target)
    )({ width: 10, height: 10 });

    const locations = findLocations(pathEq(["thing", "prop"], true), matrix);

    expectToEqualArray(locations, []);
  });
});
