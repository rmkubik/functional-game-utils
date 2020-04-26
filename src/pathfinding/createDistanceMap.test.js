import { pipe, flatten, identity, always, __ as gap } from "ramda";
import createDistanceMap from "./createDistanceMap";
import getNeighbors from "../matrices/getNeighbors";
import { initMatrix, mapMatrix, fillMatrix, updateMatrix } from "../matrices";
import expectToEqualArray from "../../testUtils/expectToEqualArray";
import {
  getCrossDirections,
  constructMatrixFromTemplate,
  findLocation,
  findLocations,
} from "../matrices";

describe("createDistanceMap", () => {
  it("should create a map with one goal", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        G . .
        . . .
        . . .
      `
    );
    const map = createDistanceMap(
      getNeighbors(getCrossDirections),
      always(true),
      matrix,
      findLocations((value) => value === "G", matrix)
    );

    expect(map).toEqual([
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
    ]);
  });

  it("should map around a wall with one goal", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        G X .
        . X .
        . . .
      `
    );
    const map = createDistanceMap(
      getNeighbors(getCrossDirections),
      (char) => char !== "X",
      matrix,
      findLocations((value) => value === "G", matrix)
    );

    expect(map).toEqual([
      [0, Infinity, 6],
      [1, Infinity, 5],
      [2, 3, 4],
    ]);
  });

  it("should navigate multiple branches with one goal", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        . . . .
        G X . .
        . . . .
        . X . .
      `
    );
    const map = createDistanceMap(
      getNeighbors(getCrossDirections),
      (char) => char !== "X",
      matrix,
      findLocations((value) => value === "G", matrix)
    );

    expect(map).toEqual([
      [1, 2, 3, 4],
      [0, Infinity, 4, 5],
      [1, 2, 3, 4],
      [2, Infinity, 4, 5],
    ]);
  });

  it("should navigate multiple branches with multiple goals", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        . . . .
        G X . .
        . . . .
        . X . G
      `
    );
    const map = createDistanceMap(
      getNeighbors(getCrossDirections),
      (char) => char !== "X",
      matrix,
      findLocations((value) => value === "G", matrix)
    );

    expect(map).toEqual([
      [1, 2, 3, 3],
      [0, Infinity, 3, 2],
      [1, 2, 2, 1],
      [2, Infinity, 1, 0],
    ]);
  });
});
