import { useState, useEffect, useDebugValue } from 'react'

// Hook are simply functions!

export const usePizzaOfTheDay = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    // this is the setup fn; runs on mount and on re-render

    async function fetchPizzaOfTheDay() {
      // const response = await fetch("/api/pizza-of-the-day");
      // const json = await response.json();

      // In cases like this, I feel like I prefer the original Promise syntax
      fetch("/api/pizza-of-the-day")
        .then(response => response.json())
        .then(json => { setPizza(json) })
    }

    fetchPizzaOfTheDay();
  }, [])
  // use [] to ensure it runs only once

  useDebugValue(pizza ? `${pizza.name}` : "Loading")

  return pizza;

}
