// Page 249 - Replace Body with Call Back

/// Preparing and eating

for(var i = 0; i < foods.length; i++) {
  var food = foods[i];
  cook(food);
  eat(food);
}

/// Washing up

for(var i = 0; i < dishes.length; i++) {
  var dish = dishes[];
  wash(dish);
  dry(dish);
  putAway(dish);
}


// 1. Name the blocks using a function
// 2. Rename `food` and `dish` to `item.

function cookAndEatFoods() {
  for(var i = 0; i < foods.length; i++) {
    var item = foods[i];
    cook(item);
    eat(item);
  }
}

function cleanDishes() {
  for (var i = 0; i < dishes.length; i++) {
    var item = dishes[i];
    wash(item);
    dry(item);
    putAway(item);
  }
}

// 3. Rename and express the implicit argument 
// We're operating on a list/array of things "foods" and "dishes"

function cookAndEatArray(array) {
  for(var i = 0; i < array.length; i++) {
    var item = array[i];
    cook(item);
    eat(item);
  }
}

function cleanArray(array) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    wash(item);
    dry(item);
    putAway(item);
  }
}

// 4. Now, the only thing changes is the body. 
// The loop is the same, and we're operating on an array.
// The body is now the implicit argument that we need to express.

function cookAndEat(item) {
  cook(item);
  eat(item);
}

function cookAndEatArray(array) {
  for(var i = 0; i < array.length; i++) {
    var item = array[i];
    cookAndEat(item)
  }
}

function clean(item) {
  wash(item);
  dry(item);
  putAway(item);
}

function cleanArray(array) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    clean(item)
  }
}

// We do have the implict argument in the name 'cookAndEat' and 'clean',
// So we make these functions first class arguments

function operateOnArray(array, f) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    f(item)
  }
}

operateOnArray(foods, cookAndEat)
operateOnArray(dishes, clean)

var forEach = operateOnArray;


