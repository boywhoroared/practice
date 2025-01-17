import currencyFormatter from "./currencyFormatter.js";

const intl = currencyFormatter;

export default function Cart({ cart, checkout }) {
  // the `checkout` prop will be the checkout fn passed down from the Cart

  let total = 0;

  // Not written as a reduce because it's more understandable
  // (less smug satisfaction)
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> –&nbsp;
            <span className="type">{item.pizza.name}</span> –&nbsp;
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
