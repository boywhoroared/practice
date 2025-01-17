import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";
import currencyFormatter from "./currencyFormatter.js";

const intl = currencyFormatter;

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : ""
    );
  }

  async function fetchPizzaTypes() {
    const response = await fetch("/api/pizzas");
    const json = await response.json();
    setPizzaTypes(json);
    setLoading(false);
  }

  // https://react.dev/reference/react/useEffect#specifying-reactive-dependencies

  // The first argument of useEffect is the setup function.
  // The setup function is run before every render of the component.
  useEffect(() => {
    fetchPizzaTypes();

    // The `return` type of `useEffect` is important.
    //
    // If a `function` is returned, it used as a clean-up task/effect and run
    // before and after the component renders.
  }, []);

  // By not passing empty dependencies (an empty array `[]`) to useEffect it
  // will only run the setup and cleanup fns once. It has no dependencies to
  // track, as such it will never pick up any changes, and never run again.
  //
  // If no dependencies argument is ommitted, useEffect runs the setup and
  // cleanup fns after every re-render.
  //
  // If there are dependencies, the setup and cleanup fns are run when the value
  // of a dependency has changed between renders.

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>

        {/* `onSubmit` is more accessible (works whenever and however the submit
      is triggered, for example the Enter key) and is the way browsers work
      (rather than applying the handler on the button) */}

        <form
          // Add to Cart
          onSubmit={(event) => {
            event.preventDefault();
            // This could have also been `cart.push`
            // cart.push(...)
            // setCart(cart)

            // I  think spread is the "immutable" way, because this returns a new array
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(event) => setPizzaType(event.target.value)}
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map((pizzaType) => (
                  <option key={pizzaType.id} value={pizzaType.id}>
                    {pizzaType.name}
                  </option>
                ))}
              </select>
            </div>

            {/* You *could* set an event handler on the parent div because of
          event bubbling but in this case, it's not the best solution. `div`
          semantically and accessibly wouldn't have an onChange event  */}

            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    onChange={(event) => setPizzaSize(event.target.value)}
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    onChange={(event) => setPizzaSize(event.target.value)}
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    onChange={(event) => setPizzaSize(event.target.value)}
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h3>Loading&ellip;</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? (
        <h2>Loading&ellip;</h2>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  );
}
