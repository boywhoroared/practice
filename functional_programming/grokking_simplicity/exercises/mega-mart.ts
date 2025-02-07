// Extract calculations from actions

export type CartItem = {
  name: string;
  price: number;
  quantity?: number;
};

export type Cart = CartItem[];

// A better cart?
// type ItemId = string;
// type BetterCart = {[key: ItemId]: number} // where number is the quantiy of the item in the cart

// A
export let shopping_cart: Cart = []; // action - assign global

// A
function add_item_to_cart(name: string, price: number) {
  shopping_cart = add_item(shopping_cart, make_cart_item(name, price));
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  // Changed because extracting buttons from update_shipping_icons
  update_shipping_icons(shopping_cart, get_buy_buttons_dom());
  update_tax_dom(total);

  shopping_cart = black_friday_promotion_safe(shopping_cart);
}

// C
export function make_cart_item(name: string, price: number) {
  return { name, price };
}

// C
function add_element_last<T>(array: T[], element: T): T[] {
  return push(array, element);
}

// Extracted from `add_item_to_cart`
// C I
export function add_item(cart: CartItem[], item: CartItem) {
  // The book does this using:
  // let new_cart = cart.slice();
  // new_cart.push({ name: name, price: price })
  const updatedCart = add_element_last(cart, item); // This does the same thing but nicer.

  // This copy-on-write, or rather, copy before write.
  // It is way to implement immutability by copying the
  // data and modifying the copy, not the original/source.

  // We avoid modifying the array that was passed in.
  // That is a side-effect that mutates data which some
  // other parts of the code could be using.

  // If we didn't copy it, the `push` message would
  // modify the original array that was passed.

  // return the copy
  return updatedCart;
}

// A List is not a great way to implement a Cart
function remove_item_by_name(cart: Cart, name: string) {
  let index: number | null = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      index = i;
    }
  }

  // Bonus: We don't create a copy of the array if we don't have to modify it
  if (index !== null) {
    return removeItems(cart, index, 1);
  }

  return cart;
}

// Extracted from `calc_cart_total` into a calculation
// C I B
function calc_total(cart: Cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }

  return total;
}

// A
export const totalElement = document.createElement("div");

// A
function set_cart_total_dom(total: number) {
  totalElement.innerHTML = `$${total.toString()}`;
}

// A I B
export function update_shipping_icons(cart: Cart, buy_buttons: BuyButton[]) {
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    const has_free_shipping = gets_free_shipping_with_item(cart, item);
    // This executes an Action, so this function becomes an Action
    set_free_shipping_icon(button, has_free_shipping);
  }
}

// C B
export function gets_free_shipping_with_item(cart: Cart, item: CartItem) {
  const new_cart = add_item(cart, item);
  return gets_free_shipping(new_cart);
}

// A
export function set_free_shipping_icon(button: BuyButton, isShown: boolean) {
  if (isShown) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
}

// C B
export function gets_free_shipping(cart: Cart) {
  return calc_total(cart) >= 20;
}

// C B
export function calc_tax(amount: number): number {
  return amount * 0.1;
}

// A
function update_tax_dom(amount: number) {
  set_tax_dom(calc_tax(amount));
}

// A
const taxElement = document.createElement("div");

// A
export function set_tax_dom(value: number) {
  taxElement.innerHTML = `$${value.toString()}`;
}

interface BuyButton extends HTMLButtonElement {
  item: { name: string; price: number };
  hide_free_shipping_icon: () => void;
  show_free_shipping_icon: () => void;
}

export const createBuyButton = (item: CartItem) => {
  const button = document.createElement("button") as BuyButton;
  Object.assign(button, {
    item: { ...item },
    hide_free_shipping_icon: () => {},
    show_free_shipping_icon: () => {},
  });
  return button;
};

export const buy_buttons = [
  createBuyButton({ name: "Book", price: 10.0 }),
  createBuyButton({ name: "Shoes", price: 15.0 }),
  createBuyButton({ name: "Pen", price: 2.0 }),
];

export function get_buy_buttons_dom(): BuyButton[] {
  return buy_buttons;
}

function delete_handler(name) {
  shopping_cart = remove_item_by_name(shopping_cart, name);
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

function removeItems<T>(array: T[], index: number, count: number) {
  const copy = [...array];
  copy.splice(index, count);
  return copy;
}

// copy-on-write "its your turn exercise"
let mailing_list: string[] = [];

function add_contact(mailing_list: string[], email: string): string[] {
  // We already extracted a function for this!
  // The book has you repeat the same:
  //
  // copy = [...mailing_list]  // mailing_list.slice()
  // copy.push(email)
  // return copy.
  //
  return push(mailing_list, email);
}

function submit_form_handler(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  mailing_list = add_contact(mailing_list, email);
}

// Splitting a function that does read & write `.shift`
// This is the read
function first_element<T>(array: T[]) {
  return array[0];
}

// This is the write
function drop_first<T>(array: T[]) {
  // We're calling the `shift` for it's side-effect, so we're not using the return value
  const copy = [...array]; // make the copy so we don't mutate the original
  copy.shift(); // now we can mutate

  return copy;
}

// The alternative approach is to return 2 values (a tuple) from the function
function shift<T>(array: T[]) {
  const copy = [...array];
  const first_element = copy.shift();

  return [first_element, copy];
}

// or, we could **compose** the two functions we created to separate the read & write
function shift1<T>(array: T[]) {
  return [first_element(array), drop_first(array)];
}

function last_element<T>(array: T[]) {
  const copy = [...array];

  return copy.pop();
}

function drop_last<T>(array: T[]) {
  const copy = [...array];
  copy.pop();

  return copy;
}

export function pop<T>(array: T[]) {
  return [last_element(array), drop_last(array)];
}

// This is more space efficient because we only create a single copy
// the array.
export function pop1<T>(array: T[]) {
  const copy = [...array];
  const first_element = copy.pop();

  return [first_element, copy];
}

export function push<T>(array: T[], element: T) {
  // (1) copy the original
  const copy = array.slice();

  // (2) add the element to the end of the list
  copy.push(element);

  // (3) return copy
  return copy;

  // It seems destructuring is slower than using slice
  // In this case it wouldn't matter though
}

export function arraySet<T>(array: T[], index: number, value: T) {
  const copy = array.slice();
  copy[index] = value;

  return copy;
}

// function setPrice(item: CartItem, new_price: number) {
//   item.price = new_price;
// }

function setPrice(item: CartItem, new_price: number) {
  const updatedItem = objectSet(item, "price", new_price);
  return updatedItem;
}

function setQuantity(item: CartItem, new_quantity: number) {
  return objectSet(item, "quantity", new_quantity);
}

// keyof takes an object type and produces a union of all it's keys

// ({} & T): Create an intersection of empty object & the object T

// ({} & T)[keyof T]: Create a union type by getting the types of all the properties referenced by the list of keys
// Creating an intersection of objects is the same as `extends` but stricter
// See <https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types>

// See <https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html>

function objectSet<T>(object: T, key: keyof T, value: ({} & T)[keyof T]) {
  // Rather than using ({} & T)[keyof T], we could use type assertion `as T`:
  // const copy = Object.assign({}, object) as T
  // to tell the compiler the object produced is certainly an object of type T
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

function objectDelete<T>(object: T, key: keyof T) {
  const copy = Object.assign({}, object);
  delete object[key];

  return copy;
}

function setPriceByName(cart: Cart, name: string, price: number) {
  const new_cart = cart.slice();

  // find item imperatively :roll eyes:
  for (let i = 0; i < new_cart.length; i++) {
    if (new_cart[i].name == name) {
      new_cart[i] = setPrice(new_cart[i], price);
    }
  }

  return new_cart;
}

function setQuantityByName(cart: Cart, name: string, quantity: number) {
  const new_cart = cart.slice();

  // find item imperatively :roll eyes:
  for (let i = 0; i < new_cart.length; i++) {
    if (new_cart[i].name == name) {
      new_cart[i] = setQuantity(new_cart[i], quantity);
    }
  }

  return new_cart;
}

function black_friday_promotion(cart: Cart) {
  // does side-effects here
  cart.push({ name: "Black Friday Gift", price: 100, quantity: 1 });
}

function black_friday_promotion_safe(cart: Cart) {
  // 1. Deep Copy the data, as it leaves, before sharing it to an unsafe
  // function
  const cart_copy = deepCopy(cart);

  // 2. Send the copy of the data to the unsafe function.
  //
  // The unsafe function will mutate the copy of the data This is so it can't
  // change our data via the shared structure references
  black_friday_promotion(cart_copy);

  // 3. Create a copy of the mutated data.
  //
  // This prevents the data from being unexpectedly changed by the unsafe code
  // when we read it.  For example `black_friday_promotion` might schedule some
  // task (setTimeout or setImmediate) or Promise (like a fetch all) that later
  // changes the data
  return deepCopy(cart_copy);
}

function payRollCalc(employees: object[]) {
  //  ...pretend this fn does something with employees to create `payRollChecks`
  const payRollChecks:object[] = employees.map(e => ({}));
  return payRollChecks;
}

function payRollCalcSafe(employees: object[]) {
  // 1. Deepy copy the original data
  const unsafeCopyEmployees = deepCopy(employees)
  // 2. Send copy to untrusted code
  payRollCalc(unsafeCopyEmployees);
  // 3. Copy the result
  return deepCopy(unsafeCopyEmployees)
}

function deepCopy<T>(o: T) {
  // TODO: A deep copy, not a shared copy, of `o`
const userChanges = { 
  subscribe: (user: object) => undefined
}


userChanges.subscribe((user: object) => {
  // 1. Deep copy the data
  const userCopy = deepCopy(user);
  // 2. Send the copy out
  processUser(userCopy)
})

