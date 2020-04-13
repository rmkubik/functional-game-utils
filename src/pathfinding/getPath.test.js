import { pipe, flatten, identity, always, __ as gap } from "ramda";
import getPath from "./getPath";
import getNeighbors from "../matrices/getNeighbors";
import { findLocation, constructMatrixFromTemplate } from "../matrices";
import expectToEqualArray from "../../testUtils/expectToEqualArray";
import { getCrossDirections } from "../matrices/directions";

describe("getPath", () => {
  it("should find straight path", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        S X .
        . X .
        T X .
      `
    );

    const path = getPath(
      getNeighbors(getCrossDirections),
      (char) => {
        switch (char) {
          case "S":
          case "T":
          case ".":
            return true;
          case "X":
            return false;
        }
      },
      matrix,
      findLocation((value) => value === "S", matrix),
      findLocation((value) => value === "T", matrix)
    );

    expect(path).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ]);
  });

  it("should find path around a corner", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        S X T
        . X .
        . . .
      `
    );

    const path = getPath(
      getNeighbors(getCrossDirections),
      (char) => {
        switch (char) {
          case "S":
          case "T":
          case ".":
            return true;
          case "X":
            return false;
        }
      },
      matrix,
      findLocation((value) => value === "S", matrix),
      findLocation((value) => value === "T", matrix)
    );

    expect(path).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 1, col: 2 },
      { row: 0, col: 2 },
    ]);
  });

  it("should find best path when two choices available", () => {
    const matrix = constructMatrixFromTemplate(
      identity,
      `
        . . . .
        S X . .
        . . . T
        . X . .
      `
    );

    const path = getPath(
      getNeighbors(getCrossDirections),
      (char) => {
        switch (char) {
          case "S":
          case "T":
          case ".":
            return true;
          case "X":
            return false;
        }
      },
      matrix,
      findLocation((value) => value === "S", matrix),
      findLocation((value) => value === "T", matrix)
    );

    expect(path).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
    ]);
  });

  it("should find best path when when matrix values are objects or null", () => {
    const matrix = constructMatrixFromTemplate(
      (char) => {
        switch (char) {
          case "S":
          case "T":
          case ".":
            return { icon: char, passable: true };
          case "X":
            return null;
        }
      },
      `
        . . . .
        S X . .
        . . . T
        . X . .
      `
    );

    const path = getPath(
      getNeighbors(getCrossDirections),
      (tile) => (tile ? tile.passable : false),
      matrix,
      findLocation((tile) => (tile ? tile.icon === "S" : false), matrix),
      findLocation((tile) => (tile ? tile.icon === "T" : false), matrix)
    );

    expect(path).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
    ]);
  });
});
