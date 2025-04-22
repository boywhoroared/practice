/:/ It's your turn. Refactor: Remove implicit argument
// function multiplyByFour(x) {
//     return x * 4;
// }
//
// function multiplyBy12(x) {
//     return x * 12;
// }
// function multiplyBySix(x) {
//     return x * 6;
// }
//
// function multiplyByPi(x) {
//     return x * 3.14159;
// }


function multiplyBy(x: number, y : number) {
    return x * y;
}

const x = 1;

multiplyBy(x, 4)
multiplyBy(x, 12)
multiplyBy(x, 6)
multiplyBy(x, 3.14159)

