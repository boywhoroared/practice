// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  var time = 0;
  switch(name) {
    case "Pure Strawberry Joy":
      time = 0.5;
      break;
    case "Energizer":
    case "Green Garden":
      time = 1.5;
      break;
    case "Tropical Island":
      time = 3;
      break;
    case "All or Nothing":
      time = 5;
      break;
    default:
      time = 2.5;
  } 

  return time;
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
  let wedgesYielded = 0;
  let toCut = 0;
  // let yieldFromSize = {
  //   'small
  // }

  while (wedgesYielded < wedgesNeeded && limes.length > 0) {
    let size = limes.shift()
    toCut++;

    switch (size) {
      case 'small':
        wedgesYielded += 6;
        break;
      case 'medium':
        wedgesYielded += 8;
        break;
      case 'large':
        wedgesYielded += 10;
        break;
    }
  }

  return toCut;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  while (timeLeft > 0) {
    let order = orders.shift()
    let timeToMix = timeToMixJuice(order)
    timeLeft -= timeToMix;
  }

  return orders;
}
