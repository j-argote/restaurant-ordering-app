import { menuArray } from "/data.js"

let cartItemCounts = {}
let orderTotal = 0

document.addEventListener("click", e => {
    if(e.target.id === "add-to-cart-btn"){
        handleCart(e.target.dataset.addToCart)
    }
    else if(e.target.id === "remove"){
        removeItemFromCart(e.target.dataset.id)
    }
    else if(e.target.id === "complete-order-btn"){
        document.querySelector("main").style.pointerEvents = "none"
        toggleHidden("payment-modal", false)
    }
    else if(e.target.id === "close-modal-btn"){
        toggleHidden("payment-modal", true)
        document.querySelector("main").style.pointerEvents = null
        document.querySelector("form").reset()
    }
    else if(e.target.id === "pay-btn"){
        e.preventDefault()
        toggleHidden("payment-modal", true)
        toggleHidden("message-container", false)
        paymentSubmittedMessage()

    }
})

function handleCart(itemId) {
    const selectedItemObj = getSelectedItemObj(itemId)
    if(!(itemId in cartItemCounts)) {
        document.getElementById("shopping-cart").innerHTML += createShoppingCartHtml(selectedItemObj, cartItemCounts[itemId] = 1)
        toggleHidden("shopping-cart-container", false)
    }
    else {
        cartItemCounts[itemId] += 1
        updateCartItemCount(itemId)
        updateItemTotal(selectedItemObj)
    }
    updateTotal("add", selectedItemObj.price)
}

function getSelectedItemObj(itemId) {
    return menuArray.filter(item => parseInt(itemId) === item.id ? item : null)[0]
}

function createShoppingCartHtml(item, count) {
    const { name, price, id } = item
    return `<li class="shopping-cart-item">
                <p>${name}</p>
                <p class="shopping-cart-remove font-12" id="remove" data-id="${id}">remove</p>
                <p class="margin-left20" id="${id}">x${count}</p>
                <p class="margin-left-auto" id="${id}-cart-price">$${price}</p>
            </li>`
}

function toggleHidden(idName, value) {
    document.getElementById(idName).toggleAttribute("hidden", value)
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

function removeItemFromCart(itemId) {
    const selectedItemObj = getSelectedItemObj(itemId)
    cartItemCounts[itemId] -= 1
    updateCartItemCount(itemId)
    updateItemTotal(selectedItemObj)
    updateTotal("subtract", selectedItemObj.price)
    
    if(cartItemCounts[itemId] === 0){
        document.getElementById(`${itemId}`).parentElement.remove()
        delete cartItemCounts[itemId]
    }
    
    if(document.getElementById("shopping-cart").childElementCount === 0) {
        toggleHidden("shopping-cart-container", true)
    }
}

function paymentSubmittedMessage() {
    const name = document.querySelector('[name="fullName"]').value
    toggleHidden("shopping-cart-container", true)
    document.getElementById("message").innerHTML = `Thanks, ${name}! Your order is on its way!`
}

function getMenuHtml() {
    let menuHtml = ''

    menuArray.forEach(item => {
        const { name, ingredients, price, image, altTxt, id } = item
        menuHtml += `
        <li class="menu-item-container">
            <img src="${image}" alt="${altTxt}">
            <div class="menu-item-text-container">
                <p>${name}</p>
                <p class="menu-item-description">${ingredients.join(', ')}</p>
                <p>$${price}</p>
            </div>
            <button class="menu-add-btn" id="add-to-cart-btn" data-add-to-cart="${id}">+</button>
        </li>`
    })
    return menuHtml
}

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()