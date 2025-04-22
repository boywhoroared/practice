// pg 286

function makeAdder(x: number): (n: number) => number {
  return (n: number) => {
    return x + n;
  }
}

const increment = makeAdder(1);
console.log(increment(10)) // 11

const plus10 = makeAdder(10);
console.log(plus10(12))  // 22
