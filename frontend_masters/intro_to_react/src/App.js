const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Pixel Perfect Pizzas")
  );
};

// The above is what we ARE doing when we write JSX for components 
// so this IS a Component

// Find the empty element to use as the root of the React tree
const container = document.getElementById("root");
// Create the root
const root = ReactDOM.createRoot(container);
// Render our application component
root.render(React.createElement(App));
