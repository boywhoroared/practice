exports.join = (a, b, c) => {
  return `${a},${b},${c}`
}

function curry (fn) {
  return function (...x) {

    // handles the case where all arguments are given
    if (x.length == fn.length) {
      return fn.apply(null, x)
    }

    // ...if not, we allow partial application for *all* the remaining arguments (currying)
    return function (...y) {
      return fn.apply(null, x.concat(y))
    }
  } 
}

exports.curry = curry
