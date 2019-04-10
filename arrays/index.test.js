import { fillArray, initArray, constructArray } from "./index";

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
