exports.join = (a, b, c) => {
  return `${a},${b},${c}`
}

function curry (fn) {

  function partialFn (...capturedArgs) {
    // using the ... rest operator here collects
    // all the arguments as an array

    if (capturedArgs.length < fn.length) {
      // If we don't have enough arguments to call the original fn,
      // keep partially applying (asking for the remaining params)
      return (...remainingArgs) => partialFn(...capturedArgs, ...remainingArgs)

      // using the spread operator spreads the array items out as arguments
      // like it would if we used `apply`
    }
    else {
      // apply the original fn
      return fn.apply(null, capturedArgs)
    }
  }

  return partialFn

}

exports.curry = curry
