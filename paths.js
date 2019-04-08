const createPath = ({
  up = false,
  down = false,
  left = false,
  right = false
} = {}) => ({
  up,
  down,
  left,
  right
});

const trace = msg => x => (console.log(msg, x), x);
const pipeWithMultipleArgsInFirstFn = (fn1, ...fns) => (...x) =>
  fns.reduce((acc, fn) => fn(acc), fn1(...x));
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const map = cb => array => array.map(cb);

const fillArray = length => value => Array(length).fill(value);
const initArray = length => fillArray(length)(0);
const constructArray = constructor =>
  pipe(
    initArray,
    map(constructor)
  );

// test constructArray
// console.log(constructArray(x => x + 1)(10));

const createPathArray = constructArray(createPath);

// test createPathArray
// const arr = createPathArray(10);
// console.log(arr);
// arr[0].up = true;
// console.log(arr);

const fillMatrix = ({ width, height }) =>
  pipe(
    fillArray(width),
    fillArray(height)
  );
const initMatrix = dimensions => fillMatrix(dimensions)(0);
const mapMatrix = cb => matrix => matrix.map(array => array.map(cb));
const constructMatrix = constructor =>
  pipe(
    initMatrix,
    mapMatrix(constructor)
  );

const createPathMatrix = constructMatrix(createPath);

// test createPathMatrix
// console.log(createPathMatrix({ width: 10, height: 10 }));

// const paths = createPathMatrix({ width: 2, height: 2 });
// console.log(paths);

const cloneArray = array => [...array];
const cloneMatrix = matrix => matrix.map(cloneArray);

const updateArrayIndex = value => index => array => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1)
];

const updateMatrixLocation = value => location => matrix => [
  ...matrix.slice(0, location.row).map(cloneArray),
  updateArrayIndex(value)(location.col)(matrix[location.row]),
  ...matrix.slice(location.row + 1).map(cloneArray)
];

// test updateMatrix location
// const m = pipe(
//   trace("1: "),
//   initMatrix,
//   trace("2: "),
//   updateMatrixLocation(1)({ row: 1, col: 1 }),
//   trace("3: "),
//   updateMatrixLocation(3)({ row: 0, col: 1 }),
//   trace("4: ")
// )({ width: 3, height: 3 });

// console.log(grid);

const isLocationInBoundsFactory = grid => location =>
  location.row < grid.length &&
  location.row >= 0 &&
  location.col < grid[location.row].length &&
  location.col >= 0;
const getLocationFactory = grid => location => grid[location.row][location.col];
const getNeighbors = (grid, location) => {
  const isLocationInBounds = isLocationInBoundsFactory(grid);
  const getLocation = getLocationFactory(grid);

  if (!isLocationInBounds(location)) {
    console.error("Location isn't in grid");
    return [];
  }

  const item = getLocation(location);
  const neighbors = [];

  const upLocation = { ...location, row: location.row - 1 };
  if (item.up && isLocationInBounds(upLocation)) {
    neighbors.push(upLocation);
  }

  const leftLocation = { ...location, col: location.col - 1 };
  if (item.left && isLocationInBounds(leftLocation)) {
    neighbors.push(leftLocation);
  }

  const rightLocation = { ...location, col: location.col + 1 };
  if (item.right && isLocationInBounds(rightLocation)) {
    neighbors.push(rightLocation);
  }

  const downLocation = { ...location, row: location.row + 1 };
  if (item.down && isLocationInBounds(downLocation)) {
    neighbors.push(downLocation);
  }

  return neighbors;
};
const comparePaths = (a, b) =>
  a.up === b.up &&
  a.right === b.right &&
  a.down === b.down &&
  a.left === b.left;
const compareLocations = (a, b) => a.row === b.row && a.col === b.col;
const containsLocation = (array, location) =>
  array.find(value => compareLocations(value, location));

// test getNeighbors
// console.log(getNeighbors(grid, { row: 1, col: 0 }));

const floodFill = (getNeighbors, grid, open, closed, found) => {
  // console.log("open: ", open, "closed: ", closed, "found: ", found);

  if (open.length === 0) {
    // exit case, we've found all connected locations
    return found;
  }

  // get next open location
  const location = open.pop();

  // is location valid?
  // currently all locations are valid
  if (true) {
    // mark location as found
    found.push(location);

    // add all the neighbors
    const neighbors = getNeighbors(grid, location);

    neighbors.forEach(neighbor => {
      if (!containsLocation(closed, neighbor)) {
        // if location not already closed, push it into open
        open.push(neighbor);
      }
    });
  }

  // close current location
  closed.push(location);

  return floodFill(getNeighbors, grid, open, closed, found);
};

const floodFillFactory = getNeighbors => (grid, startLocation) =>
  floodFill(getNeighbors, grid, [startLocation], [], []);

// const found = floodFill(grid, [{ row: 0, col: 0 }], [], []);
// const found = floodFillFactory(getNeighbors)(grid, { row: 0, col: 0 });
// console.log(found);

// const marked = floodFill(grid, [], [], [], { row: 0, col: 0 });

module.exports = {
  floodFill: floodFillFactory(getNeighbors),
  floodFillFactory,
  createPath,
  trace,
  pipe,
  map,
  createPathMatrix,
  updateArrayIndex,
  updateMatrixLocation,
  comparePaths,
  containsLocation
};
