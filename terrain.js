const {
  trace,
  pipe,
  constructMatrix,
  updateMatrixLocation,
  isLocationInBoundsFactory,
  getLocationFactory,
  mapMatrix
} = require("./paths");
const { Display } = require("rot-js");

const dimensions = { width: 200, height: 15 };

const createTile = ({ bg = 0, fg = 0 }) => ({
  bg,
  fg
});

const randomSeed = () =>
  Math.random() > 0.5 ? createTile({ bg: 1 }) : createTile({ bg: 0 });
const randomSeedMatrix = constructMatrix(randomSeed);

const getNeighbors = (grid, location) => {
  const isLocationInBounds = isLocationInBoundsFactory(grid);

  if (!isLocationInBounds(location)) {
    console.error("Location isn't in grid");
    return [];
  }

  const neighbors = [];

  const upLocation = { ...location, row: location.row - 1 };
  if (isLocationInBounds(upLocation)) {
    neighbors.push(upLocation);
  }

  const leftLocation = { ...location, col: location.col - 1 };
  if (isLocationInBounds(leftLocation)) {
    neighbors.push(leftLocation);
  }

  const rightLocation = { ...location, col: location.col + 1 };
  if (isLocationInBounds(rightLocation)) {
    neighbors.push(rightLocation);
  }

  const downLocation = { ...location, row: location.row + 1 };
  if (isLocationInBounds(downLocation)) {
    neighbors.push(downLocation);
  }

  const upLeftLocation = { row: location.row - 1, col: location.col - 1 };
  if (isLocationInBounds(upLeftLocation)) {
    neighbors.push(upLeftLocation);
  }

  const upRightLocation = { row: location.row - 1, col: location.col + 1 };
  if (isLocationInBounds(upRightLocation)) {
    neighbors.push(upRightLocation);
  }

  const downRightLocation = { row: location.row + 1, col: location.col + 1 };
  if (isLocationInBounds(downRightLocation)) {
    neighbors.push(downRightLocation);
  }

  const downLeftLocation = { row: location.row + 1, col: location.col - 1 };
  if (isLocationInBounds(downLeftLocation)) {
    neighbors.push(downLeftLocation);
  }

  return neighbors;
};

const iterate = mapMatrix((value, location, grid) => {
  const getLocation = getLocationFactory(grid);
  const neighbors = getNeighbors(grid, location);
  const tile = getLocation(location);
  if (
    neighbors.filter(neighborLocation => getLocation(neighborLocation).bg === 1)
      .length >= 5
  ) {
    return createTile({ ...tile, bg: 1 });
  } else {
    return createTile({ ...tile, bg: 0 });
  }
});

const repeat = cb => times => (...params) => {
  for (let i = 0; i < times; i++) {
    cb(...params);
  }
};

const grid = pipe(
  randomSeedMatrix,
  iterate,
  iterate,
  iterate,
  iterate,
  updateMatrixLocation(createTile({ fg: 1 }))({ row: 3, col: 10 })
)(dimensions);

const getSymbol = ({ fg }) => {
  if (fg === 1) {
    return "⏅";
  }
};
const getFgColor = ({ fg }) => {
  return "white";
};
const getBgColor = ({ bg }) => {
  switch (bg) {
    case 1:
      return "#27ae60";
    case 0:
      return "#2980b9";
    default:
      return "white";
  }
};

const display = new Display({ ...dimensions, layout: "term" });

const drawFactory = display => grid =>
  grid.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) =>
      display.draw(
        colIndex,
        rowIndex,
        getSymbol(col),
        getFgColor(col),
        getBgColor(col)
      )
    )
  );

const draw = drawFactory(display);

draw(grid);
