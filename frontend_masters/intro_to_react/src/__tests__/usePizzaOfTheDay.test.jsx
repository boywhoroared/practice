import { expect, test, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";

import { usePizzaOfTheDay } from "../usePizzaOfTheDay.js";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "Pizza from Calabria",
  image: "/public/pizzas/calabrese.webp",
  size: { S: 12.25, M: 16.25, L: 20.25 },
};

// You can't test hooks outside of a component, so create a component to test it

function pizzaOfTheDay() {
  let pizza;

  function TestComponent() {
    // `TestComponent` has access to `pizza` because of context / closure
    pizza = usePizzaOfTheDay();
    return null;
  }

  render(<TestComponent />);

  // `pizza` is populated after rendering `TestComponent` because the hook has been called.
  return pizza;
}

test("gives null when first called", () => {
  fetchMock.mockResponseOnce(JSON.stringify(testPizza));
  const pizza = pizzaOfTheDay();
  expect(pizza).toBeNull();
});

test("gives null when first called w/ renderHook", () => {
  // Alternatively you can use `renderHook` that will do all of the boilerplate
  // of creating a dummy component and calling the hook
  fetchMock.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

// TODO: How would we test the effect?

test("call the api and get the pizza of the day", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());

  // essentially, waitFor runs this function until there isn't an error.
  // since we've triggered an API call with the hook (via useEffect inside of it), when the
  // request returns, it has our mock response and pizza is updated

  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });

  /*
  Workshop Notes:
  waitFor is a handy trick where you need to wait for React to settle. You give
  it a body that throws errors until it's true. expect when it doesn't work
  throws an error so that's how this works.

  Once it resolves to true, it passes the test and moves on. If it fails like 20
  times (that's configurable) it will then fail the test.  
  
  Some people this is too into the implementation details and I half agree.
  However it is useful from the perspective that this hook needs to work in a
  certain way and it has an expectation of an API to call which does affect user
  behavior so it could be useful. If this was truly our codebase, I'd just test
  the PizzaOfTheDay component and call it good. But if we used this hook in lots
  of places, I'd probably a test just for it.
  */

  expect(fetchMock).toBeCalledWith("/api/pizza-of-the-day");
});
