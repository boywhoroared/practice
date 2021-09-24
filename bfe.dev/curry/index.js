exports.join = (a, b, c) => {
  return `${a},${b},${c}`
}

function curry (fn) {
  return function (...x) {
    return function (...y) {
      console.log(x, y)
      return fn.apply(null, x.concat(y))
    }
  } 
}

exports.curry = curry
