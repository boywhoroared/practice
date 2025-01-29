import { createContext } from "react";

// The thing that we want to share between components is the cart **state**.
// We want to be able to view the contents of the cart, and possibly add and
// remove items from the cart from any component.
// We can use a context to share the cart state between components.

// As we are using the `useState` hook to manage the cart state, we are going to share the hook itself.
// This will enable components to access the cart state and the function to update the cart state.
// Our **default** value for the context will be the shape of the cart state hook.
const defaultEmptyCartHook = [[], () => { }]

// [] - default state of the empty cart
// () => { } - default function; this does nothing but we want the shape of the
// hook to be consistent. the hook would return the updater function

// I could have simply used [[], () => {}] in place of defaultEmptyCart but I
// wanted to name it for clarity
export const CartContext = createContext(defaultEmptyCartHook);
