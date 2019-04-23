import { curry, pipe } from "ramda";
import { initMatrix, mapMatrix } from "./index";

const constructMatrix = curry((constructor, dimensions) =>
  pipe(
    initMatrix,
    mapMatrix(constructor)
  )(dimensions)
);

export default constructMatrix;
