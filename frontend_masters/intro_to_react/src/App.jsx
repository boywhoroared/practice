import { createRoot } from "react-dom/client"
import Pizza from "./Pizza"

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza name="Pepperoni Pizza" description="Mozzarella Cheese, Pepperoni"></Pizza>
      <Pizza name="Americano" description="French Fries and Hot Dogs"></Pizza>
      <Pizza name="The Big Meat Pizza" description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"></Pizza>
    </div>
  )
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
