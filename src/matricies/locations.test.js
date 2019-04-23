import { pipe, update } from "ramda";
import { isLocationInBounds, getLocation, compareLocations } from "./locations";
import { initMatrix, updateMatrix } from ".";
import { AssertionError } from "../assert";

describe("isLocationInBounds", () => {
  [
    {
      row: 0,
      col: 0
    },
    {
      row: 1,
      col: 1
    }
  ].forEach(location => {
    it(`should return true if location: ${JSON.stringify(
      location
    )} in bounds`, () => {
      const inBounds = isLocationInBounds(
        initMatrix({ height: 2, width: 2 }),
        location
      );

      expect(inBounds).toBe(true);
    });
  });

  [
    {
      row: -1,
      col: 0
    },
    {
      row: 0,
      col: -1
    },
    {
      row: -1,
      col: -1
    },
    {
      row: 2,
      col: 0
    },
    {
      row: 0,
      col: 2
    },
    {
      row: 2,
      col: 2
    }
  ].forEach(location => {
    it(`should return false if location: ${JSON.stringify(
      location
    )} out of bounds`, () => {
      const inBounds = isLocationInBounds(
        initMatrix({ height: 2, width: 2 }),
        location
      );

      expect(inBounds).toBe(false);
    });
  });

  it(`should return false if matrix row isn't an array`, () => {
    const location = { row: 0, col: 1 };
    const matrix = pipe(
      initMatrix,
      update(location.row, null)
    )({ width: 2, height: 2 });

    const inBounds = isLocationInBounds(matrix, location);

    expect(inBounds).toBe(false);
  });
});

describe("getLocation", () => {
  it("should return a valid location", () => {
    const matrix = pipe(
      initMatrix,
      updateMatrix({ row: 1, col: 1 }, "value")
    )({ height: 2, width: 2 });

    const item = getLocation(matrix, { row: 1, col: 1 });

    expect(item).toBe("value");
  });

  it("should throw AssertionError if location is out of bounds", () => {
    const matrix = initMatrix({ height: 2, width: 2 });

    expect(() => {
      getLocation(matrix, { row: -1, col: 1 });
    }).toThrow(AssertionError);
  });
});

describe("compareLocations", () => {
  [
    [
      {
        row: 0,
        col: 0
      },
      {
        row: 0,
        col: 0
      }
    ],
    [
      {
        row: -6,
        col: -6
      },
      {
        row: -6,
        col: -6
      }
    ],
    [
      {
        row: -12,
        col: 123
      },
      {
        row: -12,
        col: 123
      }
    ]
  ].forEach(([a, b]) => {
    it(`should return true for equal locations: ${JSON.stringify(
      a
    )} === ${JSON.stringify(b)}`, () => {
      expect(compareLocations(a, b)).toBe(true);
    });
  });

  [
    [
      {
        row: 0,
        col: 0
      },
      {
        row: 100,
        col: 123
      }
    ],
    [
      {
        row: -62,
        col: -6
      },
      {
        row: -6,
        col: -2
      }
    ],
    [
      {
        row: 0,
        col: 123
      },
      {
        row: 123,
        col: 123
      }
    ]
  ].forEach(([a, b]) => {
    it(`should return false for not equal locations: ${JSON.stringify(
      a
    )} !== ${JSON.stringify(b)}`, () => {
      expect(compareLocations(a, b)).toBe(false);
    });
  });
});
