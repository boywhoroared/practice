import { useState, useEffect } from 'react'

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

  return pizza;

}
