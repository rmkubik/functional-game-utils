import floodFill from "./floodFill";
import getNeighbors from "../matricies/getNeighbors";
import { initMatrix } from "../matricies";
import expectToEqualArray from "../testUtils/expectToEqualArray";
import { CROSS_NEIGHBORS } from "../matricies/directions";

describe("floodFill", () => {
  it("should return empty array if open is empty", () => {
    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      initMatrix({ width: 10, height: 10 }),
      [],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });

  it("should return just start node if only node is empty", () => {
    const filled = floodFill(
      getNeighbors(CROSS_NEIGHBORS),
      initMatrix({ width: 10, height: 10 }),
      [{ row: 0, col: 0 }],
      [],
      []
    );

    expectToEqualArray(filled, []);
  });
});
