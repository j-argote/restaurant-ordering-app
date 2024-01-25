let cartItemCounts = {}
let orderTotal = 0

function toggleHidden(idName, value) {
    document.getElementById(idName).toggleAttribute("hidden", value)
}

function togglePointerEvents(value) {
    document.querySelector("main").style.pointerEvents = value
}

function updateCartItemCount(id) {
    document.getElementById(`${id}`).innerHTML = `x${cartItemCounts[id]}`
}

function updateItemTotal(item) {
    const { price, id } = item
    document.getElementById(`${id}-cart-price`).innerHTML = `$${price * cartItemCounts[id]}`
}

function updateTotal(operation, price) {
    if(operation === "add"){
        orderTotal += price
    }
    else {
        orderTotal -= price
    }
    document.getElementById("cart-total").innerHTML = `$${orderTotal}`
}

function resetCartItemCountsObj() {
    cartItemCounts = {}
}

function resetOrderTotal() {
    orderTotal = 0
}

export { cartItemCounts, toggleHidden, togglePointerEvents, updateCartItemCount, updateItemTotal, updateTotal, resetCartItemCountsObj, resetOrderTotal }