const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BBD",
});

export const formatCurrency = (value) => currencyFormatter.format(value)

export default currencyFormatter;
