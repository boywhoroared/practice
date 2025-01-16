import React from "react"
import { createRoot } from "react-dom/client"

const Pizza = (props) => {
  return React.createElement("div", {}, [
    // createElement can take null or empty object for props
    React.createElement("h1", null, props.name),
    React.createElement("p", null, props.description),
  ])
}

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Padre Ginos"),
    React.createElement(Pizza, {
      name: "Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni"
    }),
    React.createElement(Pizza, {
      name: "Americano",
      description: "French Fries and Hot Dogs"
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian",
      description: "Sliced Hame, Pineapple, Mozzarella Cheese"
    }),
    React.createElement(Pizza, {
      name: "Chicken Pizza",
      description: "Chicken Nuggets on your Pizza, WTF UK?"
    }),
    React.createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
    }),

    React.createElement(Pizza)
  );
  // createElement can take an array or arbitrary number of arguments for children
};


// The above is what we ARE doing when we write JSX for components 
// so this IS a Component

// Find the empty element to use as the root of the React tree
const container = document.getElementById("root");
// Create the root
const root = createRoot(container);
// Render our application component
root.render(React.createElement(App));
