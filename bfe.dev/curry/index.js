exports.join = (a, b, c) => {
  return `${a},${b},${c}`
}

function curry (fn) {

  let capturedArgs = []

  function captureArgs (x) {
    Array.prototype.push.apply(capturedArgs, x)
    console.log(capturedArgs)
  }

  function partialFn (...y) {
    // accumulate arguments
    captureArgs(y)

    if (capturedArgs.length < fn.length) {
      // if we don't have enough arguments to call the original fn,
      // keep partially applying
      return partialFn
    }
    else {
      // apply the original fn
      return fn.apply(null, capturedArgs)
    }
  }

  return partialFn

}

exports.curry = curry
