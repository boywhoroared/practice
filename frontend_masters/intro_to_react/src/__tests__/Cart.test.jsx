import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);

  // The first time this test is run, it will create a snapshot.

  // Subsequent runs will compare the rendered fragment to the contents of the
  // snapshot

  // You will want to commit the snapshots in your repo so the snapshots are
  // present and changes can be tracked.
  expect(asFragment()).toMatchSnapshot();

  // After running this test once, go to `Cart.jsx`
  // and change the heading from `Cart` to `Fart`
  // When test runs again, it should fail.

  // If this change is what you intended, and not
  // actually a failure, you can press 'u' to update
  // the snapshot (then commit it to your repo).
});

test("API snaphot", () => {
  // Response from backend
  const pizzaOfTheDayAPIResponse = {
    id: "calabrese",
    name: "The Calabrese Pizza",
    category: "Supreme",
    description: "Pizza from Calabria",
    image: "/public/pizzas/calabrese.webp",
    size: { S: 12.25, M: 16.25, L: 20.25 },
  };

  // Assume that `pizzaOfTheDayAPIRespose` is the result of running your API
  // library code (might be a mock? or staging service with fake data, or against a real service)
  //
  // This functions like an acceptance or end-to-end test where we can see if the
  // API contracts are satisfied/broken. Can help keeping FE and BE in sync.
  expect(pizzaOfTheDayAPIResponse).toMatchSnapshot();
});
