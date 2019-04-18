import { pipe, pathEq, clone } from "ramda";
import { findInMatrix } from "./find";
import { initMatrix, updateMatrix } from ".";

describe("findInMatrix", () => {
  it("should find value in matrix if comparator matches", () => {
    const target = { node: { start: true } };

    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 3, col: 7 }, target)
    )({ width: 10, height: 10 });

    const value = findInMatrix(pathEq(["node", "start"], true), matrix);

    expect(value).toEqual(clone(target));
  });

  it("should return undefined if comparator has no match", () => {
    const target = { node: { start: true } };

    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 3, col: 7 }, target)
    )({ width: 10, height: 10 });

    const value = findInMatrix(pathEq(["node", "start"], false), matrix);

    expect(value).toBe(undefined);
  });
});
