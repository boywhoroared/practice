import { expect, test, describe, vi } from "vitest";
import {
  add_item,
  gets_free_shipping,
  buy_buttons,
  get_buy_buttons_dom,
  update_shipping_icons,
  shopping_cart,
  make_cart_item,
  pop, 
  pop1,
  push
} from "./mega-mart";
import type { Cart } from "./mega-mart";

describe("Chapter 5", () => {
  test("calculates free shipping on a cart", () => {
    const cartWithFreeShipping: Cart = [
      make_cart_item("Book", 10.0),
      make_cart_item("Pen", 2.0),
      make_cart_item("Shirt", 8.0),
    ];
    const cartWithoutFreeShipping: Cart = [make_cart_item("Book", 10.0)];

    expect(gets_free_shipping(cartWithoutFreeShipping)).toBe(false);
    expect(gets_free_shipping(cartWithFreeShipping)).toBe(true);
  });

  test("updates shipping icons", () => {
    // setup
    const cart = [make_cart_item("Book", 10.0), make_cart_item("Pen", 2.0)];

    buy_buttons.forEach((b) => {
      b.hide_free_shipping_icon = vi.fn(b.hide_free_shipping_icon);
      b.show_free_shipping_icon = vi.fn(b.show_free_shipping_icon);
    });

    update_shipping_icons(cart);

    expect(buy_buttons[0].hide_free_shipping_icon).not.toHaveBeenCalled();
    expect(buy_buttons[0].show_free_shipping_icon).toHaveBeenCalled();

    expect(buy_buttons[1].hide_free_shipping_icon).not.toHaveBeenCalled();
    expect(buy_buttons[1].show_free_shipping_icon).toHaveBeenCalled();

    expect(buy_buttons[2].hide_free_shipping_icon).toHaveBeenCalled();
    expect(buy_buttons[2].show_free_shipping_icon).not.toHaveBeenCalled();
  });
});

describe("copy-on-write utilities", () => {
  test("pop", () => {
    expect(pop([1, 2, 3])).toEqual([3, [1, 2]])
    expect(pop1([1, 2, 3])).toEqual([3, [1, 2]])
  })

  test("push", () => {
    expect(push([1, 2], 3)).toEqual([1, 2, 3])
  })
})
