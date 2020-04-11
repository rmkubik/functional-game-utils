import { pipe, __ as gap } from "ramda";
import {
  constructMatrix,
  constructMatrixFromTemplate,
} from "./constructMatrix";
import expectToEqualArray from "../../testUtils/expectToEqualArray";
import fillMatrix from "./fillMatrix";
import updateMatrix from "./updateMatrix";

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

describe("constructMatrix", () => {
  it("should create a matrix from the provided string", () => {
    const matrix = constructMatrixFromTemplate(
      (char) => char,
      `
        . X .
        . X .
        . . .
      `
    );

    const dimensions = { width: 3, height: 3 };
    const expectedMatrix = pipe(
      fillMatrix(gap, "."),
      updateMatrix({ row: 0, col: 1 }, "X"),
      updateMatrix({ row: 1, col: 1 }, "X")
    )(dimensions);

    expect(matrix).toEqual(expectedMatrix);
  });

  it("should create a matrix from the provided string using a mapper", () => {
    const matrix = constructMatrixFromTemplate(
      (char) => {
        if (char === ".") {
          return { tile: "empty" };
        }

        if (char === "X") {
          return { tile: "wall" };
        }
      },
      `
        . X .
        . X .
        . . .
      `
    );

    const dimensions = { width: 3, height: 3 };
    const expectedMatrix = pipe(
      fillMatrix(gap, { tile: "empty" }),
      updateMatrix({ row: 0, col: 1 }, { tile: "wall" }),
      updateMatrix({ row: 1, col: 1 }, { tile: "wall" })
    )(dimensions);

    expect(matrix).toEqual(expectedMatrix);
  });
});
