class AssertionError extends Error {
  constructor(message) {
    super(`AssertionError: ${message}`);
  }
}

const assert = (assertion, message) => {
  if (!assertion) {
    throw new AssertionError(message);
  }
};

export { AssertionError };
export default assert;
