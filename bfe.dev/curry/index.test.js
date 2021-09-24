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
   
  test('(1)(2)(3)', () => {
    // partially apply unary (unarily?)
    const curriedJoin = curry(join)
    expect(curriedJoin(1)(2)(3)).toEqual('1,2,3')
  });

  test('(1,2,3,4)', () => {
    const curriedJoin = curry(join)
    expect(curriedJoin(1,2,3,4)).toEqual('1,2,3')
  });

  test('', () => {
    const curried = curry(join)(1, 2)
    expect(curried(3)).toBe('1,2,3')
    expect(curried(4)).toBe('1,2,4')
  })
})

