// pg 273
// It's Your Turn
// Refactor copy-on-write array functions
//

function arraySet(array: unknown[], idx: number, value: unknown) {
  return withArrayCopy(array, (copy) => {
    copy[idx] = value;
  });
}


// 1. Extract to a new function
// 2. Replace body with callback
function withArrayCopy(array: unknown[], modify: (copy: unknown[]) => void) {
  // before
  let copy = array.slice();

  // body
  modify(copy);

  // after
  return copy;
}
