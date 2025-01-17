import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BBD",
});

const PizzaOfTheDay = () => {
  const pizza = usePizzaOfTheDay();

  if (!pizza) {
    return <div>Loading&ellip;</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizza.name}</h3>
          <p>{pizza.description}</p>
          <p className="pizza-of-the-day-price">
            From: {intl.format(pizza.sizes.S)}
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizza.image}
          alt={pizza.name}
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
