// It's your turn. Refactor: Remove implicit argument
//
// function incrementQuantityByName(cart, name) {      ❶
//   var item = cart[name];
//     var quantity = item['quantity'];
//     var newQuantity = quantity + 1;
//     var newItem = objectSet(item, 'quantity', newQuantity);
//     var newCart = objectSet(cart, name, newItem);
//     return newCart;
// }
//
// function incrementSizeByName(cart, name) {          ❶
//   var item = cart[name];
//     var size = item['size'];
//     var newSize = size + 1;
//     var newItem = objectSet(item, 'size', newSize);
//     var newCart = objectSet(cart, name, newItem);
//     return newCart;
// }

function incrementFieldByName(cart, name, field) {
    const item = cart[name];
    const value = item[field];
    const newValue = value + 1;
    const newItem = objectSet(item, 'size', newValue);
    const newCart = objectSet(cart, name, newItem);

    return newCart;
}
