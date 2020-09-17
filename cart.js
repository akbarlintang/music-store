if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    console.log(removeCartItemButtons)
    for (var i = 0 ; i < removeCartItemButtons.length ; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-input-num')
    for (var i = 0 ; i < quantityInputs.length ; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', qtyChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for (var i = 0 ; i < addToCartButtons.length ; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked =  event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function qtyChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    addiItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addiItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item')
    for (var i = 0 ; i <cartItemNames.length ; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return 
        }
    }
    var cartRowContents = `
            <td class="cart-group">
                <img class="cart-img" src="${imageSrc}" alt="">
                <span class="cart-item">${title}</span>
            </td>
            <td class="cart-price">${price}</td>
            <td class="cart-qty">
                <input type="number" value="1" class="cart-input-num">
            </td>
            <td><button class="shop-item-btn btn btn-danger cart-btn btn-remove" role="button">Remove</button></td>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-input-num')[0].addEventListener('change', qtyChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0 ; i < cartRows.length ; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var qtyElement = cartRow.getElementsByClassName('cart-input-num')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var qty = qtyElement.value
        total += (price * qty)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total')[0].innerText = total
}