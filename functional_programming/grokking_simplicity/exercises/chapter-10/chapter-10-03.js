// It's your turn. Ensure developers do not increment fields they're not supposed to
// by adding run time checks.


function incrementFieldByName(cart, name, field) {
    const incrementableFields = ['size', 'quantity']
    if (!incrementableFields.includes(field)) {
        throw new Error(`${field} is not incrementable`);
    }

    const item = cart[name];
    const value = item[field];
    const newValue = value + 1;
    const newItem = objectSet(item, 'size', newValue);
    const newCart = objectSet(cart, name, newItem);

    return newCart;
}
