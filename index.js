import menuArray from "./data.js"

let total = 0

function menuHtml() {
    return menuArray.map(item => {
    const {name, ingredients, id, price, itemImg, altText} = item
    
    return `
    <article class="item-container">
        <img class="item-img" src="${itemImg}" alt="${altText}">
        <div class="item-info-container">
            <p class="item-name">${name}</p>
            <p class="item-description">${ingredients}</p>
            <p class="item-price">$${price}</p>
        </div>
        <button class="add-item-btn" id="${id}" data-add=${id}>+</button>
    </article>
    `
    }).join('')
}

function renderHtml() {
    document.getElementById("menu-items").innerHTML = menuHtml()
}

renderHtml()


document.addEventListener('click', function(e){
    if(e.target.dataset.add) {
        document.getElementById("shopping-cart-container").removeAttribute("hidden")
        handleAddToCart(parseInt(e.target.dataset.add))
    }
    else if(e.target.dataset.remove) {
        handleRemoveFromCart(parseInt(e.target.dataset.remove))
    }
    else if(document.getElementById("submit-order-btn").id === e.target.id){
        handleSubmitOrder(document.getElementById("payment-modal"))
    }
    else if(document.getElementById("modal-close-btn").id === e.target.id){
        handleCloseModal(document.getElementById("payment-modal"))
    }
    else if(document.getElementById("submit-pay-btn").id === e.target.id){
        e.preventDefault()
        handlePayOrder()
    }
})

function handleAddToCart(itemId) {
    const selectedItem = menuArray.filter(item => itemId === item.id ? item : null)[0]
    document.getElementById("items-added-container").innerHTML += cartItemHtml(selectedItem)
}

function cartItemHtml(item) {
    const {name, price, id} = item
    handleTotal(price, "add")
    return `
        <div class="cart-item-container" id="cart-${id}">
            <p class="item-name">${name}</p>
            <button class="cart-remove" data-remove="${id}">remove</button>
            <p class="item-price cart-price" id="cart-item-price${id}">$${price}</p>
        </div>
        `
}

function handleTotal(price, operation = null) {
    if(operation === "add"){
        total += price
    }
    else {
        total -= price
    }
    return document.getElementById("total-price").innerHTML = `$${total}`
}

function handleRemoveFromCart(itemId) {
    const item = menuArray.filter(item => {
        return itemId === item.id ? item : null
    })[0]
    
    handleTotal(item.price)
    document.getElementById(`cart-${itemId}`).remove()
    document.getElementById("items-added-container").childElementCount === 0 ? 
        document.getElementById("shopping-cart-container").setAttribute("hidden", true) : null
}

function handleSubmitOrder(submitEl) {
    submitEl.removeAttribute("hidden")
    document.getElementById("modal-container").removeAttribute("hidden")
    document.querySelector("main").style.pointerEvents = "none"
}

function handleCloseModal(modalEl) {
    modalEl.setAttribute("hidden", true)
    document.querySelector("main").style.pointerEvents = null
}

function handlePayOrder() {
    const name = document.getElementById("pay-order-form").elements["fullName"].value
    const messageEl = document.getElementById("message-container")
    document.getElementById("modal-container").setAttribute("hidden", true)
    messageEl.innerText = `Thank you ${name}! Your order has been submitted`
}


