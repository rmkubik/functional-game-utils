import { isLocationInBounds } from "./locations";
import { initMatrix } from ".";

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
});
