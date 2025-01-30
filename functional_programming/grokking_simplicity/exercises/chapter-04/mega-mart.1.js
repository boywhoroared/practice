// Distinguiah actions, calculations, and data

var shopping_cart = []; // action - assign global 
var shopping_cart_total = 0; // action - assign global

function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price
  }); // action: Write to global state
  calc_cart_total(); // action: This fn creates side-effects
}

function calc_cart_total() {
  shopping_cart_total = 0; // action:
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i]; // action: the contents of the global state shopping cart change
    shopping_cart_total += item.price; // action
  }
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom(); // action: side-effect reads from dom, is affected by what the dom is *when* it's called
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20) // action: reading global state
      button.show_free_shipping_icon();  // action: change the world (dom)
    else
      button.hide_free_shipping_icon(); // action: change the world (dom)
  }
}

function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.10); //action: updates dom
}

function set_tax_dom(value) {
  console.log("Side Effect with ", value);
}

function set_cart_total_dom(value) {
  console.log("Side Effect with ", value);
}

function get_buy_buttons_dom(value) {
  console.log("Side Effect with ", value);
}

// This whole file is actions 
