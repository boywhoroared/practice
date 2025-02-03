// Extract calculations from actions

export type CartItem = {
  name: string;
  price: number;
};

export type Cart = CartItem[];

// A better cart?
// type ItemId = string;
// type BetterCart = {[key: ItemId]: number} // where number is the quantiy of the item in the cart

export let shopping_cart: Cart = []; // action - assign global

function add_item_to_cart(name: string, price: number) {
  shopping_cart = add_item(shopping_cart, make_cart_item(name, price));
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  // Changed because extracting buttons from update_shipping_icons
  update_shipping_icons(shopping_cart, get_buy_buttons_dom());
  update_tax_dom(total);
}

// Extracted out the concept/operation of constructing the cart item
export function make_cart_item(name: string, price: number) {
  return { name, price };
}

function add_element_last<T>(array: T[], element: T): T[] {
  return [...array, element];
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

// Extracted from `calc_cart_total` into a calculation
function calc_total(cart: Cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }

  return total;
}

export const totalElement = document.createElement('div');

function set_cart_total_dom (total: number) {
  totalElement.innerHTML = `$${total.toString()}` 
}

// I B
export function update_shipping_icons(cart: Cart, buy_buttons: BuyButton[]) {
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    const has_free_shipping = gets_free_shipping_with_item(cart, item);
    set_free_shipping_icon(button, has_free_shipping);
  }
}

export function gets_free_shipping_with_item(cart: Cart, item: CartItem) {
  const new_cart = add_item(cart, item);
  return gets_free_shipping(new_cart);
}

export function set_free_shipping_icon(button: BuyButton, isShown: boolean) {
  if (isShown) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
}

// Extracted calculation
export function gets_free_shipping(cart: Cart) {
  return calc_total(cart) >= 20;
}

function update_tax_dom(amount: number) {
  set_tax_dom(calc_tax(amount)); //action: updates dom
}

export function calc_tax(amount: number): number {
  return amount * 0.1;
}

const taxElement = document.createElement('div');
export function set_tax_dom(value: number) {
  taxElement.innerHTML = `$${value.toString()}`
}


// NOTE: I'm pretending I have DOM available
// This is so I can verify some of these side-effecting fns actually work.

interface BuyButton extends HTMLButtonElement {
  item: { name: string; price: number };
  hide_free_shipping_icon: () => void;
  show_free_shipping_icon: () => void;
}

export const createBuyButton = (item: CartItem) => {
  const button = document.createElement('button') as BuyButton;
  Object.assign(button, {
    item: {...item},
    hide_free_shipping_icon: () => {},
    show_free_shipping_icon: () => {}
  })
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
