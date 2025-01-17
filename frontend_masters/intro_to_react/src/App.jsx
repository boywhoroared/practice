import { createRoot } from "react-dom/client";
import { useState } from "react";

import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
  // P/N: Notice how we are *not* destructuring the hook here.
  const cartStateHook = useState([]);

  return (
    <div>
      {/* Apparently in React 19, you won't need the .Provider */}
      <CartContext.Provider value={cartStateHook}>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </CartContext.Provider>
    </div>
  );
};

// Find the empty element to use as the root of the React tree
const container = document.getElementById("root");
// Create the root
const root = createRoot(container);

// Render our application component

// Notice we don't have to do import React from
// 'react' here like we used to.  The latest version of JSX handles that for you
// so you only need to explicitly import the React package when you need to use
// something from it; otherwise feel free to do JSX without having to import
// React!

root.render(<App />);
