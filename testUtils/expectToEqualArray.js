const expectToEqualArray = (actual, expected) => {
  expect(actual).toEqual(expect.arrayContaining(expected));
  expect(actual.length).toBe(expected.length);
};

export default expectToEqualArray;
