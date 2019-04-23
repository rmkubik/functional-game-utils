import mapMatrix from "./mapMatrix";

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
