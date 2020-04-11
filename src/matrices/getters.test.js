import { constructMatrix, initMatrix } from "./index";
import expectToEqualArray from "../../testUtils/expectToEqualArray";
import { getRow, getCol, getDimensions } from "./getters";

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

describe("getDimensions", () => {
  it("should return correct width and height for square matrix", () => {
    const dimensions = { width: 3, height: 3 };
    const matrix = initMatrix(dimensions);

    expect(getDimensions(matrix)).toEqual(dimensions);
  });
});
