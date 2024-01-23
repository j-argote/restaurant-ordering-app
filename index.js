import { menuArray } from "/data.js"

let cartItemCounts = {}
let total = 0

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

document.addEventListener("click", e => {
    if(e.target.id === "add-to-cart-btn") {
        handleCart(e.target.dataset.addToCart)
    }
    else if(e.target.id === "remove"){
        removeItemFromCart(e.target.dataset.id)
    }

})

function handleCart(itemId) {
    const selectedItemObj = getSelectedItemObj(itemId)
    const { price, id } = selectedItemObj
    if(!(id in cartItemCounts)) {
        document.getElementById("shopping-cart").innerHTML += createShoppingCartHtml(selectedItemObj, cartItemCounts[id] = 1)
        document.getElementById("shopping-cart-container").toggleAttribute("hidden", false)
    }
    else {
        cartItemCounts[id] += 1
        document.getElementById(`${id}`).innerHTML = `x${cartItemCounts[id]}`
        document.getElementById(`${id}-cart-price`).innerHTML = `$${price * cartItemCounts[id]}`
    }
    total += price
    updateTotal(total)
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

function updateTotal(total) {
    document.getElementById("cart-total").innerHTML = `$${total}`
}

//need to work on refactoring this whole process of removing from the cart
function removeItemFromCart(itemId) {
    const selectedItemObj = getSelectedItemObj(itemId)
    const { price } = selectedItemObj
    cartItemCounts[itemId] -= 1
    document.getElementById(`${itemId}`).innerHTML = `x${cartItemCounts[itemId]}`
    document.getElementById(`${itemId}-cart-price`).innerHTML = `$${price * cartItemCounts[itemId]}`
    total -= price
    updateTotal(total)
    
    
    if(cartItemCounts[itemId] === 0){
        document.getElementById(`${itemId}`).parentElement.remove()
        delete cartItemCounts[itemId]
    }

    if(document.getElementById("shopping-cart").childElementCount === 0) {
        document.getElementById("shopping-cart-container").toggleAttribute("hidden", true)
    }
}

