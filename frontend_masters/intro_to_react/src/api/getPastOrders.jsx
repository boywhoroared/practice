export default async function getPastOrders(page) {
  return fetch(`/api/past-orders?page=${page}`)
    .then((response) => response.json())
    .then((json) => json);
}
