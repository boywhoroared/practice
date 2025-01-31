import { expect, test, describe, vi } from "vitest";
import { add_item, gets_free_shipping, buy_buttons, get_buy_buttons_dom, update_shipping_icons, shopping_cart } from "./mega-mart";
import type { Cart, CartItem } from "./mega-mart";

describe("Chapter 5", () => {
  test("calculates free shipping on a cart", () => {
    const cartWithFreeShipping: Cart = [
      { name: "Book", price: 10.0 },
      { name: "Pen", price: 2.0 },
      { name: "Shirt", price: 8.0 },
    ];
    const cartWithoutFreeShipping: Cart = [{ name: "Book", price: 10.0 }];

    expect(gets_free_shipping(cartWithoutFreeShipping)).toBe(false);
    expect(gets_free_shipping(cartWithFreeShipping)).toBe(true);
  });

  test("updates shipping icons", () => {
    // setup
   shopping_cart.push(
      { name: "Book", price: 10.0 },
      { name: "Pen", price: 2.0 },
   )  

    buy_buttons.forEach(b => {
      b.hide_free_shipping_icon = vi.fn(b.hide_free_shipping_icon)
      b.show_free_shipping_icon = vi.fn(b.show_free_shipping_icon)
    })


    update_shipping_icons();

    expect(buy_buttons[0].hide_free_shipping_icon).not.toHaveBeenCalled()
    expect(buy_buttons[0].show_free_shipping_icon).toHaveBeenCalled()

    expect(buy_buttons[1].hide_free_shipping_icon).not.toHaveBeenCalled()
    expect(buy_buttons[1].show_free_shipping_icon).toHaveBeenCalled()

    expect(buy_buttons[2].hide_free_shipping_icon).toHaveBeenCalled()
    expect(buy_buttons[2].show_free_shipping_icon).not.toHaveBeenCalled()
  })
});
