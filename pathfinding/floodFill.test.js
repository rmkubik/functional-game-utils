import { pipe, flatten } from "ramda";
import floodFill from "./floodFill";
import getNeighbors from "../matricies/getNeighbors";
import { initMatrix, mapMatrix } from "../matricies";
import expectToEqualArray from "../testUtils/expectToEqualArray";
import { CROSS_NEIGHBORS } from "../matricies/directions";

describe("floodFill", () => {
  it("should return empty array if open is empty", () => {
    const checkLocation = () => true;

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      checkLocation,
      initMatrix({ width: 10, height: 10 }),
      [],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });

  it("should return entire matrix of locations", () => {
    const checkLocation = () => true;
    const dimensions = { width: 3, height: 3 };

    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      checkLocation,
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
});
