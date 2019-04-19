import { constructMatrix, initMatrix } from "./index";
import expectToEqualArray from "../testUtils/expectToEqualArray";
import { getRow, getCol } from "./getters";

describe("getRow", () => {
  it("should return a specified row", () => {
    let i = 0;

    const matrix = constructMatrix(() => ++i, { width: 3, height: 3 });

    expectToEqualArray(getRow(matrix, 2), [7, 8, 9]);
  });

  it("should return undefined if a specified row doesn't exist", () => {
    const matrix = initMatrix({ width: 3, height: 3 });

    expect(getRow(matrix, -1)).toBe(undefined);
  });
});

describe("getCol", () => {
  it("should return a specified column", () => {
    let i = 0;

    const matrix = constructMatrix(() => ++i, { width: 3, height: 3 });

    expectToEqualArray(getCol(matrix, 2), [3, 6, 9]);
  });

  it("should return undefined if a specified column doesn't exist", () => {
    const matrix = initMatrix({ width: 3, height: 3 });

    expect(getCol(matrix, -1)).toBe(undefined);
  });
});
