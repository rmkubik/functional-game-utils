import { pipe, curry } from "ramda";
import { fillArray } from "../arrays";

const fillMatrix = curry(({ width, height }, value) =>
  pipe(
    fillArray(width),
    fillArray(height)
  )(value)
);

export default fillMatrix;
