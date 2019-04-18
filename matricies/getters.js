import { curry } from "ramda";

const getRow = curry((matrix, row) => matrix[row]);

export { getRow };
