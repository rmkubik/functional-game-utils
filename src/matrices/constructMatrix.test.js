import constructMatrix from "./constructMatrix";

describe("constructMatrix", () => {
  it("should create a matrix with provided function and dimensions", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 2, height: 2 });

    expect(matrix).toEqual([[1, 2], [3, 4]]);
  });

  it("should create a matrix with provided function and dimensions when curried", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i)({ width: 2, height: 2 });

    expect(matrix).toEqual([[1, 2], [3, 4]]);
  });

  it("should create a matrix with provided function and dimensions where width is larger", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 3, height: 2 });

    expect(matrix).toEqual([[1, 2, 3], [4, 5, 6]]);
  });

  it("should create a matrix with provided function and dimensions where height is larger", () => {
    let i = 0;
    const matrix = constructMatrix(() => ++i, { width: 2, height: 3 });

    expect(matrix).toEqual([[1, 2], [3, 4], [5, 6]]);
  });
});
