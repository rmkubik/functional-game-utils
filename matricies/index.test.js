import { AssertionError } from "../assert";
import { fillMatrix, initMatrix, mapMatrix } from "./index";

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
});

describe("initMatrix", () => {
  it("should create matrix of specified dimensions", () => {
    const matrix = initMatrix({ width: 3, height: 3 });

    expect(matrix).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });
});

describe("mapMatrix", () => {
  it("should create a matrix that matches map function", () => {
    const input = [[1, 2], [3, 4]];

    const output = mapMatrix(x => x + 1, input);

    // expect map function to apply correctly
    expect(output).toEqual([[2, 3], [4, 5]]);
    // expect original matrix not to be modified
    expect(input).toEqual([[1, 2], [3, 4]]);
  });

  it("should create a matrix that matches map function when curried", () => {
    const input = [[1, 2], [3, 4]];

    const output = mapMatrix(x => x + 1)(input);

    // expect map function to apply correctly
    expect(output).toEqual([[2, 3], [4, 5]]);
    // expect original matrix not to be modified
    expect(input).toEqual([[1, 2], [3, 4]]);
  });
});
