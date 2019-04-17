import { getConnectedDirections } from "./directions";
import expectToEqualArray from "../testUtils/expectToEqualArray";

describe("getConnectedNeighbors", () => {
  it("should get directions from connection", () => {
    const connectedDirections = getConnectedDirections({
      up: true,
      left: true,
      right: true,
      down: true
    });

    expectToEqualArray(connectedDirections, [
      { up: true },
      { left: true },
      { right: true },
      { down: true }
    ]);
  });

  it("should ignore irrelevant properties", () => {
    const connectedDirections = getConnectedDirections({
      up: true,
      left: true,
      right: true,
      down: true,
      notADirection: true
    });

    expectToEqualArray(connectedDirections, [
      { up: true },
      { left: true },
      { right: true },
      { down: true }
    ]);
  });

  it("should work if only subset of directions provided", () => {
    const connectedDirections = getConnectedDirections({
      up: true,
      left: true
    });

    expectToEqualArray(connectedDirections, [{ up: true }, { left: true }]);
  });

  it("should omit a false direction", () => {
    const connectedDirections = getConnectedDirections({
      right: true,
      down: false
    });

    expectToEqualArray(connectedDirections, [{ right: true }]);
  });
});
