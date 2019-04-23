import { pipe } from "ramda";
import { initMatrix, updateMatrix } from "./index";

describe("updateMatrix", () => {
  it("should update the value at a location in the matrix", () => {
    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 2, col: 1 }, "update")
    )({ height: 3, width: 2 });

    expect(matrix).toEqual([[0, 0], [0, 0], [0, "update"]]);
  });

  it("should update the value at a location in the matrix when curried", () => {
    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 2, col: 1 })("update")
    )({ height: 3, width: 2 });

    expect(matrix).toEqual([[0, 0], [0, 0], [0, "update"]]);
  });
});
