import { initMatrix } from "./index";
import getNeighbors from "./getNeighbors";

describe("getNeighbors", () => {
  [
    {
      // top left
      location: { row: 0, col: 0 },
      expectedNeighbors: [{ row: 1, col: 0 }, { row: 0, col: 1 }]
    },
    {
      // top
      location: { row: 0, col: 6 },
      expectedNeighbors: [
        { row: 1, col: 6 },
        { row: 0, col: 5 },
        { row: 0, col: 7 }
      ]
    },
    {
      // top right
      location: { row: 0, col: 9 },
      expectedNeighbors: [{ row: 1, col: 9 }, { row: 0, col: 8 }]
    },
    {
      // right
      location: { row: 4, col: 9 },
      expectedNeighbors: [
        { row: 5, col: 9 },
        { row: 3, col: 9 },
        { row: 4, col: 8 }
      ]
    },
    {
      // bottom right
      location: { row: 9, col: 9 },
      expectedNeighbors: [{ row: 8, col: 9 }, { row: 9, col: 8 }]
    },
    {
      // bottom
      location: { row: 9, col: 7 },
      expectedNeighbors: [
        { row: 9, col: 6 },
        { row: 9, col: 8 },
        { row: 8, col: 7 }
      ]
    },
    {
      // bottom left
      location: { row: 9, col: 0 },
      expectedNeighbors: [{ row: 9, col: 1 }, { row: 8, col: 0 }]
    },
    {
      // left
      location: { row: 2, col: 0 },
      expectedNeighbors: [
        { row: 1, col: 0 },
        { row: 3, col: 0 },
        { row: 2, col: 1 }
      ]
    },
    {
      // center
      location: { row: 5, col: 5 },
      expectedNeighbors: [
        { row: 5, col: 6 },
        { row: 5, col: 4 },
        { row: 6, col: 5 },
        { row: 4, col: 5 }
      ]
    }
  ].forEach(({ location, expectedNeighbors }) => {
    it("should get all cross neighbors", () => {
      const crossNeighbors = [
        { up: true },
        { left: true },
        { right: true },
        { down: true }
      ];
      const matrix = initMatrix({ width: 10, height: 10 });

      const neighbors = getNeighbors(crossNeighbors, matrix, location);

      expect(neighbors).toEqual(expect.arrayContaining(expectedNeighbors));
      expect(neighbors.length).toBe(expectedNeighbors.length);
    });
  });
});
