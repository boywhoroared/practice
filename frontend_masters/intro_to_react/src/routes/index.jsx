import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>Padre Gino&apos;s</h1>
        <p>Pizza &amp; Art at a location near you</p>
      </div>
      <ul>
        <li>
          <Link to="/order">Order</Link>
          <Link to="/past">Past Orders</Link>
        </li>
      </ul>
    </div>
  );
}
