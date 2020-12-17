/**
 * @module Matrix
 */

import fillMatrix from "./fillMatrix";

const initMatrix = (dimensions) => fillMatrix(dimensions)(0);

export default initMatrix;
