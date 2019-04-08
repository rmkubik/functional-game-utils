const {
  pipe,
  createPathMatrix,
  updateMatrixLocation,
  createPath,
  comparePaths,
  containsLocation,
  floodFill
} = require("./paths");
const { Display } = require("rot-js");

const dimensions = { width: 3, height: 3 };

const grid = pipe(
  createPathMatrix,
  updateMatrixLocation(createPath({ down: true }))({ row: 0, col: 0 }),
  updateMatrixLocation(createPath({ up: true, down: true, right: true }))({
    row: 1,
    col: 0
  }),
  updateMatrixLocation(createPath({ left: true, down: true }))({
    row: 1,
    col: 1
  }),
  updateMatrixLocation(createPath({ up: true, right: true }))({
    row: 2,
    col: 0
  })
)(dimensions);

// console.log(grid);

const display = new Display({ ...dimensions, layout: "term" });

const getPathSymbol = path => {
  switch (true) {
    case comparePaths(createPath({ up: true }), path):
      return "╀";
    case comparePaths(createPath({ down: true }), path):
      return "╁";
    case comparePaths(createPath({ left: true }), path):
      return "┽";
    case comparePaths(createPath({ right: true }), path):
      return "┾";
    case comparePaths(createPath({ up: true, down: true }), path):
      return "╂";
    case comparePaths(createPath({ up: true, left: true }), path):
      return "╃";
    case comparePaths(createPath({ up: true, right: true }), path):
      return "╄";
    case comparePaths(createPath({ down: true, left: true }), path):
      return "╅";
    case comparePaths(createPath({ down: true, right: true }), path):
      return "╆";
    case comparePaths(createPath({ left: true, right: true }), path):
      return "┿";
    case comparePaths(createPath({ up: true, down: true, left: true }), path):
      return "╉";
    case comparePaths(createPath({ up: true, down: true, right: true }), path):
      return "╊";
    case comparePaths(createPath({ up: true, left: true, right: true }), path):
      return "╇";
    case comparePaths(
      createPath({ down: true, left: true, right: true }),
      path
    ):
      return "╈";
    case comparePaths(
      createPath({ up: true, down: true, left: true, right: true }),
      path
    ):
      return "╋";
    default:
      return ".";
  }
};

const drawFactory = display => (grid, colored = []) =>
  grid.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) =>
      display.draw(
        colIndex,
        rowIndex,
        getPathSymbol(col),
        containsLocation(colored, { row: rowIndex, col: colIndex })
          ? "red"
          : "white"
      )
    )
  );

const draw = drawFactory(display);

const startLocation = { row: 0, col: 0 };
const found = floodFill(grid, startLocation);
const colored = [];

const drawColored = () => {
  if (found.length === 0) {
    return;
  }

  colored.push(found.shift());
  draw(grid, colored);
  setTimeout(drawColored, 1000);
};

drawColored();
