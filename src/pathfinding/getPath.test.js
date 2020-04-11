import { pipe, flatten, identity, always, __ as gap } from "ramda";
import getPath from "./getPath";
import getNeighbors from "../matrices/getNeighbors";
import { initMatrix, mapMatrix, fillMatrix, updateMatrix } from "../matrices";
import expectToEqualArray from "../../testUtils/expectToEqualArray";
import { getCrossDirections } from "../matrices/directions";

describe("getPath", () => {
  it("should find straight path", () => {
    /**
     *  S X .
     *  . X .
     *  T X .
     */
    const dimensions = { width: 3, height: 3 };
    const splitMatrix = pipe(
      fillMatrix(gap, true),
      updateMatrix({ row: 0, col: 1 }, false),
      updateMatrix({ row: 1, col: 1 }, false),
      updateMatrix({ row: 2, col: 1 }, false),
      updateMatrix({ row: 2, col: 0 }, "target")
    )(dimensions);

    const path = getPath(
      getNeighbors(getCrossDirections),
      identity, // use identity function as checkLocation so location values determine if they should be found
      splitMatrix,
      { row: 0, col: 0 },
      { row: 2, col: 0 }
    );

    expect(path).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ]);
  });

  it("should find path around a corner", () => {
    /**
     *  S X T
     *  . X .
     *  . . .
     */
    const dimensions = { width: 3, height: 3 };
    const splitMatrix = pipe(
      fillMatrix(gap, true),
      updateMatrix({ row: 0, col: 1 }, false),
      updateMatrix({ row: 1, col: 1 }, false),
      updateMatrix({ row: 0, col: 2 }, "target")
    )(dimensions);

    const path = getPath(
      getNeighbors(getCrossDirections),
      identity, // use identity function as checkLocation so location values determine if they should be found
      splitMatrix,
      { row: 0, col: 0 },
      { row: 0, col: 2 }
    );

    expect(path).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 1, col: 2 },
      { row: 0, col: 2 },
    ]);
  });
});
