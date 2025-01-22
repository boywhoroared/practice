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
