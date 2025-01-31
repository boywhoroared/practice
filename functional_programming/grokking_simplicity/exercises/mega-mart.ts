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
export let shopping_cart_total = 0; // action - assign global

function add_item_to_cart(name: string, price: number) {
  shopping_cart = add_item(shopping_cart, name, price); 
  calc_cart_total(shopping_cart); // action: This fn creates side-effects
}

// Extracted from `add_item_to_cart`
export function add_item(cart: CartItem[], name: string, price: number) {
  // The book does this using:
  // let new_cart = cart.slice();
  // new_cart.push({ name: name, price: price })
  const updatedCart = [{ name, price }, ...cart]; // This does the same thing but nicer.

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

function calc_cart_total(cart: Cart) {
  const total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);

  shopping_cart_total = total;
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

export function update_shipping_icons(cart: Cart) {
  const buy_buttons = get_buy_buttons_dom(); // action: side-effect reads from dom, is affected by what the dom is *when* it's called
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    const new_cart = add_item(cart, item.name, item.price);
    if (gets_free_shipping(new_cart))
      // action: reading global state
      button.show_free_shipping_icon(); // action: change the world (dom)
    else button.hide_free_shipping_icon(); // action: change the world (dom)
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

export function set_tax_dom(value: number) {
  console.log("Side Effect with ", value);
}

export function set_cart_total_dom(total: number) {
  console.log("Side Effect with ", total);
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
