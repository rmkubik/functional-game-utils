import { height, minWidth, maxWidth } from "./dimensions";

describe("maxWidth", () => {
  it("should return longest row's length when it is last", () => {
    const matrix = [[], [0], [1, 2, 3]];

    expect(maxWidth(matrix)).toBe(3);
  });

  it("should return longest row's length when it is first", () => {
    const matrix = [[1, 2, 3, 4], [1, 2], [0]];

    expect(maxWidth(matrix)).toBe(4);
  });

  it("should return correctly if all rows equal length", () => {
    const matrix = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

    expect(maxWidth(matrix)).toBe(3);
  });
});

describe("minWidth", () => {
  it("should return 0 if row is empty", () => {
    const matrix = [[], [0], [1, 2, 3]];

    expect(minWidth(matrix)).toBe(0);
  });

  it("should return correctly if all rows equal length", () => {
    const matrix = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

    expect(minWidth(matrix)).toBe(3);
  });
});

describe("height", () => {
  it("should return correctly if a row is empty", () => {
    const matrix = [[], [0], [1, 2, 3]];

    expect(height(matrix)).toBe(3);
  });

  it("should return correctly if all rows equal length", () => {
    const matrix = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

    expect(height(matrix)).toBe(3);
  });

  it("should return correctly if all rows empty", () => {
    const matrix = [[], [], [], []];

    expect(height(matrix)).toBe(4);
  });
});
