import {
  fillArray,
  initArray,
  constructArray,
  containsLocation,
  findBestMatch,
} from "./index";
import { AssertionError } from "../assert";
import expectToEqualArray from "../../testUtils/expectToEqualArray";

describe("fillArray", () => {
  it("should fill array with provided value and length", () => {
    const array = fillArray(5, "value");

    expect(array).toEqual(["value", "value", "value", "value", "value"]);
  });

  it("should fill array with provided value and length when curried", () => {
    const array = fillArray(5)("value");

    expect(array).toEqual(["value", "value", "value", "value", "value"]);
  });

  it("should clone objects passed into the array", () => {
    const object = { test: "value" };
    const array = fillArray(5)(object);

    expect(array[0] === array[1]).toBe(false);
  });
});

describe("initArray", () => {
  it("should fill array with provided value and length", () => {
    const array = initArray(3);

    expect(array).toEqual([0, 0, 0]);
  });
});

describe("constructArray", () => {
  it("should construct array with provided function and length", () => {
    let i = 0;

    const array = constructArray(() => ++i, 4);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should construct array with provided function and length when curried", () => {
    let i = 0;

    const array = constructArray(() => ++i)(4);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should throw error if constructor isn't a function", () => {
    const build = constructArray("asdf");

    expect(() => {
      build(3);
    }).toThrow(AssertionError);
  });

  it("should throw error if length isn't a positive number", () => {
    const build = constructArray(() => {});

    expect(() => {
      build("test");
    }).toThrow(AssertionError);
  });

  it("should provide array index to constructor function as param", () => {
    const array = constructArray((index) => index, 5);

    expectToEqualArray(array, [0, 1, 2, 3, 4]);
  });
});

describe("containsLocation", () => {
  [
    [
      [
        {
          row: 0,
          col: 0,
        },
      ],
      {
        row: 0,
        col: 0,
      },
    ],
    [
      [
        {
          row: -3,
          col: -1,
        },
        {
          row: 0,
          col: 0,
        },
      ],
      {
        row: -3,
        col: -1,
      },
    ],
  ].forEach(([array, location]) => {
    it(`should return true if location: ${JSON.stringify(
      location
    )} is contained in ${array}`, () => {
      expect(containsLocation(array, location)).toBe(true);
    });
  });

  [
    [
      [],
      {
        row: 10,
        col: 3,
      },
    ],
    [
      [
        {
          row: -1,
          col: -1,
        },
        {
          row: 0,
          col: 0,
        },
      ],
      {
        row: 3,
        col: 14,
      },
    ],
  ].forEach(([array, location]) => {
    it(`should return false if location: ${JSON.stringify(
      location
    )} is NOT contained in ${array}`, () => {
      expect(containsLocation(array, location)).toBe(false);
    });
  });
});

describe("findBestMatch", () => {
  it("should find best fit value at end of array", () => {
    const arrayLength = 5;
    const array = constructArray((index) => index, arrayLength);
    const matchingIndex = findBestMatch(
      (index) => index,
      (currentBest, evaluated) => {
        if (evaluated > currentBest) {
          return true;
        }

        return false;
      },
      array
    );

    expect(matchingIndex).toEqual(arrayLength - 1);
  });

  it("should find best fit value at beginning of array", () => {
    const arrayLength = 5;
    const array = constructArray((index) => index, arrayLength);
    const matchingIndex = findBestMatch(
      (index) => index,
      (currentBest, evaluated) => {
        if (evaluated < currentBest) {
          return true;
        }

        return false;
      },
      array
    );

    expect(matchingIndex).toEqual(0);
  });

  it("should find best fit value closest to middle of array", () => {
    const arrayLength = 5;
    const array = constructArray((index) => index, arrayLength);
    const matchingIndex = findBestMatch(
      (index) => index,
      (currentBest, evaluated) => {
        const currentBestDistance = Math.abs(currentBest - arrayLength / 2);
        const evaluatedDistance = Math.abs(evaluated - arrayLength / 2);

        if (evaluatedDistance < currentBestDistance) {
          return true;
        }

        return false;
      },
      array
    );

    expect(matchingIndex).toEqual(2);
  });

  it("should find best fit value at end of array while using an evaluated prop", () => {
    const arrayLength = 5;
    const array = constructArray(
      (index) => ({ common: "property", value: index }),
      arrayLength
    );
    const matchingIndex = findBestMatch(
      (index) => index.value,
      (currentBest, evaluated) => {
        if (evaluated > currentBest) {
          return true;
        }

        return false;
      },
      array
    );

    expect(matchingIndex).toEqual(arrayLength - 1);
  });

  it("should return the only item if array only has one item", () => {
    const array = constructArray(() => 1, 1);
    const matchingIndex = findBestMatch(
      (item) => item,
      (currentBest, evaluated) => {
        if (evaluated > currentBest) {
          return true;
        }

        return false;
      },
      array
    );

    expect(matchingIndex).toEqual(0);
  });
});
