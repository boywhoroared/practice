import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

// NOTE: This file uses JSX so it must have the .jsx extension
// If it does not, then you'll get an "Expression expected" error
// you try to run this test

// Prevent memory leaks from occuring when rendering vai react-testing-library
// It's automatically called in other frameworks but not vitest
// p/n: I actually didn't get an error or warning from vitest but including to be safe
// and actually, in vitest issues, it seems fixed
afterEach(cleanup);

test("alt text renders on image", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const result = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );

  const img = result.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("to have a default image if none is provided", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const result = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );
  const img = result.getByRole("img");
  expect(img.src).not.toBe("");
});
