import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartContext } from "../contexts";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // P/N: Notice how we are *not* destructuring the hook here.
  const cartStateHook = React.useState([]);

  return (
    <React.Fragment>
      {/* Apparently in React 19, you won't need the .Provider part */}
      <CartContext.Provider value={cartStateHook}>
        <div>
          <Header />
          {/* Outlet is where what changes when the route changes goes. Header
          and Pizza of the Day will be shown on every page/route */}
          <Outlet />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </React.Fragment>
  );
}
