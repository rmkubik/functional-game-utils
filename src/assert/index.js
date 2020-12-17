/**
 * @module Assert
 */

/**
 * @description A special error that indicates an assertion has failed.
 *
 * @extends Error
 */
class AssertionError extends Error {
  /**
   * @param {string} message - The message containing more information about a given AssertionError.
   */
  constructor(message) {
    super(`AssertionError: ${message}`);
  }
}

/**
 * @description If the assertion is truthy then nothing will happen. Otherwise, this function throws
 * an {@link AssertionError} with the provided message if the assertion is falsy.
 *
 * @example
 * function example(param) {
 *   assert(typeof param === 'string', 'Param must be of type string!');
 * }
 *
 * @param {boolean} assertion
 * @param {string} message
 */
const assert = (assertion, message) => {
  if (!assertion) {
    throw new AssertionError(message);
  }
};

export { AssertionError };
export default assert;
