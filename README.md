# functional-game-utils

This library is a collection of functional utilities that are useful for JavaScript game development.

## Installation

```bash
npm install functional-game-utils
```

## Usage

Functional Game Utils is built on top of [ramda.js](https://ramdajs.com), a functional JavaScript library. Ramda and Ramda-Adjunct are both peer dependencies of this project.

Functional Game Utils has several main categories of functions.

- [Arrays](#arrays)
- [Matrices](#matrices)
- [Pathfinding](#pathfinding)

### Arrays

- fillArray
- initArray
- constructArray
- containsLocation
- findBestMatch

### Matrices

- fillMatrix
- initMatrix
- constructMatrix
- constructMatrixFromTemplate
- updateMatrix
- getNeighbors
- getCrossDirections
- getDiagonalDirections
- getAllDirections
- getConnectedDirections
- findLocation
- findLocations
- findValue
- getRow
- getCol
- getDimensions
- isLocationInBounds
- getLocation
- compareLocations

### Pathfinding

- floodFill
- getPath
- createDistanceMap

### Queues

- Queue

### Sets

- ComparableSet

## Development

To run this package's test suite once:

```bash
npm test
```

To run this package's test suite as you develop:

```bash
npm test -- --watch
```

To publish the latest version to NPM

1. Update the package.json version
2. Run `npm publish`
