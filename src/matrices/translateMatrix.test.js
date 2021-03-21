import translateMatrix, {
  MATRIX_TRANSLATE_DIRECTIONS,
} from "./translateMatrix";

describe("translateMatrix", () => {
  it("should translate a matrix up one row", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixUp = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.UP,
    });
    const output1 = translateMatrixUp(input1);
    const output2 = translateMatrixUp(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [3, 4],
      [5, 6],
      [undefined, undefined],
    ]);
    expect(output2).toEqual([
      [4, 5, 6],
      [undefined, undefined, undefined],
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

  it("should translate a matrix up one row with wrap", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixUp = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.UP,
      shouldWrap: true,
    });
    const output1 = translateMatrixUp(input1);
    const output2 = translateMatrixUp(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [3, 4],
      [5, 6],
      [1, 2],
    ]);
    expect(output2).toEqual([
      [4, 5, 6],
      [1, 2, 3],
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

  it("should translate a matrix up one row with custom constructFn", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixUp = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.UP,
      constructFn: (index) => `newRow-${index}`,
    });
    const output1 = translateMatrixUp(input1);
    const output2 = translateMatrixUp(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [3, 4],
      [5, 6],
      ["newRow-0", "newRow-1"],
    ]);
    expect(output2).toEqual([
      [4, 5, 6],
      ["newRow-0", "newRow-1", "newRow-2"],
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

  it("should translate a matrix down one row", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixDown = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.DOWN,
    });
    const output1 = translateMatrixDown(input1);
    const output2 = translateMatrixDown(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [undefined, undefined],
      [1, 2],
      [3, 4],
    ]);
    expect(output2).toEqual([
      [undefined, undefined, undefined],
      [1, 2, 3],
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

  it("should translate a matrix down one row with wrap", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixDown = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.DOWN,
      shouldWrap: true,
    });
    const output1 = translateMatrixDown(input1);
    const output2 = translateMatrixDown(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [5, 6],
      [1, 2],
      [3, 4],
    ]);
    expect(output2).toEqual([
      [4, 5, 6],
      [1, 2, 3],
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

  it("should translate a matrix down one row with custom constructFn", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixDown = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.DOWN,
      constructFn: (index) => `newRow-${index}`,
    });
    const output1 = translateMatrixDown(input1);
    const output2 = translateMatrixDown(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      ["newRow-0", "newRow-1"],
      [1, 2],
      [3, 4],
    ]);
    expect(output2).toEqual([
      ["newRow-0", "newRow-1", "newRow-2"],
      [1, 2, 3],
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

  it("should translate a matrix right one col", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixRight = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.RIGHT,
    });
    const output1 = translateMatrixRight(input1);
    const output2 = translateMatrixRight(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [undefined, 1],
      [undefined, 3],
      [undefined, 5],
    ]);
    expect(output2).toEqual([
      [undefined, 1, 2],
      [undefined, 4, 5],
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

  it("should translate a matrix right one col with wrap", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixRight = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.RIGHT,
      shouldWrap: true,
    });
    const output1 = translateMatrixRight(input1);
    const output2 = translateMatrixRight(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [2, 1],
      [4, 3],
      [6, 5],
    ]);
    expect(output2).toEqual([
      [3, 1, 2],
      [6, 4, 5],
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

  it("should translate a matrix right one col with custom constructFn", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixRight = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.RIGHT,
      constructFn: (index) => `newCol-${index}`,
    });
    const output1 = translateMatrixRight(input1);
    const output2 = translateMatrixRight(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      ["newCol-0", 1],
      ["newCol-1", 3],
      ["newCol-2", 5],
    ]);
    expect(output2).toEqual([
      ["newCol-0", 1, 2],
      ["newCol-1", 4, 5],
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

  it("should translate a matrix left one col", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixLeft = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.LEFT,
    });
    const output1 = translateMatrixLeft(input1);
    const output2 = translateMatrixLeft(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [2, undefined],
      [4, undefined],
      [6, undefined],
    ]);
    expect(output2).toEqual([
      [2, 3, undefined],
      [5, 6, undefined],
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

  it("should translate a matrix left one col with wrap", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixLeft = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.LEFT,
      shouldWrap: true,
    });
    const output1 = translateMatrixLeft(input1);
    const output2 = translateMatrixLeft(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [2, 1],
      [4, 3],
      [6, 5],
    ]);
    expect(output2).toEqual([
      [2, 3, 1],
      [5, 6, 4],
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

  it("should translate a matrix left one col with custom constructFn", () => {
    const input1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const input2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const translateMatrixLeft = translateMatrix({
      direction: MATRIX_TRANSLATE_DIRECTIONS.LEFT,
      constructFn: (index) => `newCol-${index}`,
    });
    const output1 = translateMatrixLeft(input1);
    const output2 = translateMatrixLeft(input2);

    // expect map function to apply correctly
    expect(output1).toEqual([
      [2, "newCol-0"],
      [4, "newCol-1"],
      [6, "newCol-2"],
    ]);
    expect(output2).toEqual([
      [2, 3, "newCol-0"],
      [5, 6, "newCol-1"],
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
