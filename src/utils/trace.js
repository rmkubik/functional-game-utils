/**
 * @module Util
 */

import { curry } from "ramda";

/**
 *
 */
const trace = curry((msg, x) => (console.log(msg, x), x));

export default trace;
