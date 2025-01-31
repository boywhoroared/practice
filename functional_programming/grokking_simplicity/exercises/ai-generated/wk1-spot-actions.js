function processOrder(order) {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.2;
  console.log(`Processing order: ${order.id}`);
  order.status = 'processing';
  emailService.sendConfirmation(order.email);
  return total + tax;
}
// Task: List every action in this function

// Actions
// - Safe Actions (I think these are safe because they are local)
//  - assigning a value to the total (changes depending on when it's run and how many times)
//
// These I think are more of calculations
//  - summing the price
//  - assigning value to tax (eh, the multiplication is a calculation)

//
// Unsafe Actions
//  - console.log : modifies the brower console (depends on when it's run and how many times)
//  - mutating `order.status`: it modifies the referenced object that was passed in. 
//    This will affect any other parts of the code that use/operate that object
//  - `emailService.sendConfirmation`: side-effect of sending emails (when the email is sent and how many times matters)

