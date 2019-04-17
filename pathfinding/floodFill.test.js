import { pipe, flatten, identity, always, __ as gap } from "ramda";
import floodFill from "./floodFill";
import getNeighbors from "../matricies/getNeighbors";
import { initMatrix, mapMatrix, fillMatrix, updateMatrix } from "../matricies";
import expectToEqualArray from "../testUtils/expectToEqualArray";
import { CROSS_NEIGHBORS } from "../matricies/directions";

describe("floodFill", () => {
  it("should return empty array if open is empty", () => {
    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      always(true),
      initMatrix({ width: 10, height: 10 }),
      [],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });

  it("should return entire matrix of locations", () => {
    const dimensions = { width: 3, height: 3 };

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      always(true),
      initMatrix(dimensions),
      [{ row: 0, col: 0 }],
      [],
      []
    );

    expectToEqualArray(
      filled,
      pipe(
        initMatrix,
        mapMatrix((value, location) => location),
        flatten
      )(dimensions)
    );
  });

  it("should return empty array if start location fails checkLocation", () => {
    const dimensions = { width: 3, height: 3 };

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      always(false),
      initMatrix(dimensions),
      [{ row: 0, col: 0 }],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });

  it("should return empty array if start location fails checkLocation", () => {
    const dimensions = { width: 3, height: 3 };

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      always(false),
      initMatrix(dimensions),
      [{ row: 0, col: 0 }],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });

  it("should return only locations connected to start", () => {
    const dimensions = { width: 3, height: 3 };
    const splitMatrix = pipe(
      fillMatrix(gap, true),
      updateMatrix({ row: 0, col: 1 }, false),
      updateMatrix({ row: 1, col: 1 }, false),
      updateMatrix({ row: 2, col: 1 }, false)
    )(dimensions);

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      identity,
      splitMatrix,
      [{ row: 0, col: 0 }],
      [],
      []
    );

    expectToEqualArray(filled, [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 }
    ]);
  });
});
