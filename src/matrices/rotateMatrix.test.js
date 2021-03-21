import rotateMatrix, { MATRIX_ROTATION_DIRECTIONS } from "./rotateMatrix";

describe("rotateMatrix", () => {
  it("should default to a clockwise 90 degree rotation", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const output1 = rotateMatrix({}, input1);
    const output2 = rotateMatrix({}, input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [5, 3, 1],
      [6, 4, 2],
    ]);
    expect(output2).toEqual([
      [4, 1],
      [5, 2],
      [6, 3],
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
  });

  it("should support counterclockwise 90 degree rotation", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const rotateMatrixCounterClockwise = rotateMatrix({
      direction: MATRIX_ROTATION_DIRECTIONS.COUNTER_CLOCKWISE,
    });
    const output1 = rotateMatrixCounterClockwise(input1);
    const output2 = rotateMatrixCounterClockwise(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [2, 4, 6],
      [1, 3, 5],
    ]);
    expect(output2).toEqual([
      [3, 6],
      [2, 5],
      [1, 4],
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
  });
});
