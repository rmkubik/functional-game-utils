import { fillArray, initArray, constructArray } from "./index";
import { AssertionError } from "../assert";

describe("fillArray", () => {
  it("should fill array with provided value and length", () => {
    const array = fillArray(5, "value");

    expect(array).toEqual(["value", "value", "value", "value", "value"]);
  });

  it("should fill array with provided value and length when curried", () => {
    const array = fillArray(5)("value");

    expect(array).toEqual(["value", "value", "value", "value", "value"]);
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
});
