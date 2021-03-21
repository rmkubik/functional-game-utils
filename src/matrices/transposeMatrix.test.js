import transposeMatrix from "./transposeMatrix";

describe("transposeMatrix", () => {
  it("should transpose a matrix", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const input3 = [
      [1, 2],
      [3, 4],
    ];

    const output1 = transposeMatrix(input1);
    const output2 = transposeMatrix(input2);
    const output3 = transposeMatrix(input3);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
    expect(output2).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
    expect(output3).toEqual([
      [1, 3],
      [2, 4],
    ]);

    // expect original matrix not to be modified
    expect(input1).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(input2).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(input3).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
