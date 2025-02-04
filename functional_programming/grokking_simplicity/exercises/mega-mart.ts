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
function calc_total(cart: Cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }

  return total;
}

export const totalElement = document.createElement("div");

function set_cart_total_dom(total: number) {
  totalElement.innerHTML = `$${total.toString()}`;
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

// B
export function calc_tax(amount: number): number {
  return amount * 0.1;
}

function update_tax_dom(amount: number) {
  set_tax_dom(calc_tax(amount)); //action: updates dom
}

const taxElement = document.createElement("div");
export function set_tax_dom(value: number) {
  taxElement.innerHTML = `$${value.toString()}`;
}

// NOTE: I'm pretending I have DOM available
// This is so I can verify some of these side-effecting fns actually work.

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
  const copy = [...array]
  copy.splice(index, count)
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
  return add_element_last(mailing_list, email)
}

function submit_form_handler(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  mailing_list = add_contact(mailing_list, email);
}

// Splitting a function that does read & write `.shift`
// This is the read
function first_element<T>(array: T[]) {
  return array[0]
}

// This is the write 
function drop_first<T>(array: T[]) {
  // We're calling the `shift` for it's side-effect, so we're not using the return value
  const copy = [...array] // make the copy so we don't mutate the original
  copy.shift(); // now we can mutate

  return copy;
}

// The alternative approach is to return 2 values (a tuple) from the function
function shift<T>(array: T[]) {
  const copy = [...array]
  const first_element = copy.shift()

  return [
    first_element,
    copy
  ]
}

// or, we could **compose** the two functions we created to separate the read & write
function shift1<T>(array: T[]) {
  return [
    first_element(array),
    drop_first(array)
  ]
}
