// retrieve shopping cart ("array") via localStorage

// -- retrieve data from localStorage -- //

window.localStorage.getItem('cart');

function cart() {
    let cart = JSON.parse(localStorage.getItem("cart"))
}

// let cart = localStorage.getItem("cart", JSON.parse(cart))

// parcourir l'array

// créer et insérer des élements dans la page
