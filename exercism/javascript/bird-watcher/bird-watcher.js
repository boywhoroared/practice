// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
  // I suppose this is cheating
  return birdsPerDay.reduce((sum, count) => {
    return sum + count;
  }, 0);
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
  let daysInWeek = 7;
  // when it is week 2, we should start on position/index 7
  let start = week == 1 ? 0 : daysInWeek * (week - 1);
  let end = start + daysInWeek;

  let birdsInWeek = birdsPerDay.slice(start, end);
  return totalBirdCount(birdsInWeek);

  /* 
  // using a foor loop
  let sum = 0;
  for (let index = start; index < end; index++) {
    sum += birdsPerDay[index]
  }

  return sum;
  */
}

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {number[]} corrected bird count data
 */
export function fixBirdCountLog(birdsPerDay) {
  const totalDays = birdsPerDay.length;
  // NOTE: we adjust how much the loop increments by rather than incrementing by 1 as 
  // one would usually do
  for (let index = 0; index < totalDays; index+=2) {
    birdsPerDay[index]++;
  }

  return birdsPerDay;
}
