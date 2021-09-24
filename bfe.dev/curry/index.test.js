const curry = require('./index').curry
const join = require('./index').join

describe("curry", () => {
  test('1,2,3', () => {
    const curriedJoin = curry(join)
    expect(curriedJoin(1,2,3)).toEqual('1,2,3')
  });

  test('(1)(2,3)', () => {
    const curriedJoin = curry(join)
    expect(curriedJoin(1)(2,3)).toEqual('1,2,3')
  });

  test('(1,2)(3)', () => {
    const curriedJoin = curry(join)
    expect(curriedJoin(1,2)(3)).toEqual('1,2,3')
  });
})
