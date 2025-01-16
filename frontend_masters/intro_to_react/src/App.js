const Pizza = () => {
  return React.createElement("div", {}, [
    // createElement can take null or empty object for props
    React.createElement("h1", null, "The Pepperoni Pizza"),
    React.createElement("p", null, "Mozzarella Cheese, Pepperoni"),
  ])
}

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Padre Ginos"),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza)
  );
  // createElement can take an array or arbitrary number of arguments for children
};


// The above is what we ARE doing when we write JSX for components 
// so this IS a Component

// Find the empty element to use as the root of the React tree
const container = document.getElementById("root");
// Create the root
const root = ReactDOM.createRoot(container);
// Render our application component
root.render(React.createElement(App));
