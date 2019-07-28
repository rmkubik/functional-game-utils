import fillMatrix from "./fillMatrix";

describe("fillMatrix", () => {
  it("should fill matrix with provided value and square dimensions", () => {
    const matrix = fillMatrix({ width: 3, height: 3 }, 2);

    expect(matrix).toEqual([[2, 2, 2], [2, 2, 2], [2, 2, 2]]);
  });

  it("should fill matrix with provided value and dimensions when curried", () => {
    const matrix = fillMatrix({ width: 3, height: 3 })(2);

    expect(matrix).toEqual([[2, 2, 2], [2, 2, 2], [2, 2, 2]]);
  });

  it("should fill matrix with provided value and dimensions where width is larger", () => {
    const matrix = fillMatrix({ width: 3, height: 2 }, 2);

    expect(matrix).toEqual([[2, 2, 2], [2, 2, 2]]);
  });

  it("should fill matrix with provided value and dimensions where height is larger", () => {
    const matrix = fillMatrix({ width: 2, height: 3 }, 2);

    expect(matrix).toEqual([[2, 2], [2, 2], [2, 2]]);
  });

  it("should clone objects passed into the matrix", () => {
    const object = { test: "value" };
    const matrix = fillMatrix({ width: 3, height: 3 }, object);

    expect(matrix[0] === matrix[1]).toBe(false);
  });
});
