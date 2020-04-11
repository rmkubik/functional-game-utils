import { constructMatrix } from "./constructMatrix";
import expectToEqualArray from "../../testUtils/expectToEqualArray";

describe("constructMatrix", () => {
  it("should create a matrix with provided function and dimensions", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 2, height: 2 });

    expect(matrix).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("should create a matrix with provided function and dimensions when curried", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i)({ width: 2, height: 2 });

    expect(matrix).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("should create a matrix with provided function and dimensions where width is larger", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 3, height: 2 });

    expect(matrix).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it("should create a matrix with provided function and dimensions where height is larger", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 2, height: 3 });

    expect(matrix).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("should expose the current location as a prop to the constructor", () => {
    const matrix = constructMatrix((location) => location, {
      width: 2,
      height: 2,
    });

    expectToEqualArray(matrix, [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ],
    ]);
  });
});
