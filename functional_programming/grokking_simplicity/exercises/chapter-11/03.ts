// pg 275
// It's Your Turn
// Refactor copy-on-write object functions

/*
function objectSet(object: {}, key: string, value: unknown) {
  const copy = Object.assign({}, object)
  copy[key] = value;
  return copy;
}

// 1. Extract to function
// 2. Identify before, body, and after
function withObjectCopy() {
  // before
  const copy = Object.assign({}, object)

  // body
  copy[key] = value;

  // after
  return copy;
}

*/


// 3. extract body to function
function withObjectCopy(object: {}, modify: (copy: {}) => void) {
  // before
  const copy = Object.assign({}, object)

  // body
  modify(copy);

  // after
  return copy;
}

function objectSet(object: {}, key: string, value: unknown) {
  return withObjectCopy(object, (copy) => {
    copy[key] = value;
  });
}

function objectDelete(object: {}, key: string) {
  return withObjectCopy(object, (copy) => {
    delete copy[key]
  });
}

