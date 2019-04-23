import initMatrix from "./initMatrix";

describe("initMatrix", () => {
  it("should create matrix of specified dimensions", () => {
    const matrix = initMatrix({ width: 3, height: 3 });

    expect(matrix).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });
});
