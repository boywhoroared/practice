// Extract calculations from actions

const shopping_cart = []; // action - assign global 
let shopping_cart_total = 0; // action - assign global

function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price
  }); // action: Write to global state
  calc_cart_total(); // action: This fn creates side-effects
}

function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);  // still an action: we're writing the calculation result to a global
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

// Extracted from `calc_cart_total` into a calculation
function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = shopping_cart[i]
    total += item.price;
  }

  return total;
}

function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom(); // action: side-effect reads from dom, is affected by what the dom is *when* it's called
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    if (item.price + shopping_cart_total >= 20) // action: reading global state
      button.show_free_shipping_icon();  // action: change the world (dom)
    else
      button.hide_free_shipping_icon(); // action: change the world (dom)
  }
}

function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.10); //action: updates dom
}

function set_tax_dom(value: number) {
  console.log("Side Effect with ", value);
}

function set_cart_total_dom() {
  console.log("Side Effect with ");
}


interface BuyButton extends HTMLButtonElement {
  item: { name: string, price: number }
  hide_free_shipping_icon: () => void
  show_free_shipping_icon: () => void
}

function get_buy_buttons_dom(): BuyButton[] {
  return []
}
