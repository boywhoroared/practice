import { expect, test, describe } from "vitest";
import { add_item, gets_free_shipping } from "./mega-mart";
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
});
