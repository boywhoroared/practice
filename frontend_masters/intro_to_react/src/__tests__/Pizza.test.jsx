import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

// NOTE: This file uses JSX so it must have the .jsx extension
// If it does not, then you'll get an "Expression expected" error
// you try to run this test

test("alt text renders on image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const result = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );

  const img = result.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});
