// pg 277

// Wrap more syntax with replace body with callback refactoring

function when(predicate: boolean, then: () => unknown) {
  if (predicate) {
    return then();
  }
}

when(hasItem(cart, "shoes"), () => {
  return setPriceByName(cart, "shoes", 0);
})

// pg 278
function ifThenElse(predicate: boolean, thenFn: () => unknown, elseFn: () => unknown) {
  return predicate ? thenFn() : elseFn();
}
