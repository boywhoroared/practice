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


function push(array: unknown[], elem: unknown) {
  var copy = array.slice();
  copy.push(elem);
  return copy;
}

function push1(array: unknown[], elem: unknown) {
  return withArrayCopy(array, (copy) => {
    copy.push(elem)
  });
}

function drop_last(array: unknown[]) {
  var array_copy = array.slice();
  array_copy.pop();
  return array_copy;
}

function drop_last1(array: unknown[]) {
  return withArrayCopy(array, (copy) => {
    copy.pop();
  });
}

function drop_first(array: unknown[]) {
  var array_copy = array.slice();
  array_copy.shift();
  return array_copy;
}

function drop_first2(array: unknown[]) {
  return withArrayCopy(array, (copy) => {
    copy.shift();
  })
}
