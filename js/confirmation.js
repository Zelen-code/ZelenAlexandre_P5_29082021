// Recovery in order to send the data //

fetch("http://localhost:3000/api/cameras/order", {

    method: "POST",

    // Adding body or contents to send //
    body: JSON.stringify({
        products: ["5be1ed3f1c9d44000030b061"],
        contact: {
            firstName: "Alexandre",
            lastName: "Zelen",
            address: "7 avenue Vladimir Illitch",
            city: "Nanterre",
            email: "alexandre_zelen@yahoo.fr",
        },
    }),

    // Adding headers to the request
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
})

    // API response
    .then(function (order) {
        // storage of the response of API in the localStorage
        localStorage.setItem("order", JSON.stringify(order)); // key and value both should be string or number
    })
// empty the cart after API response
localStorage.getItem
// link to confirmation.html
document.location.href = "confirmation.html";
localStorage.setItem("finalPrice");


/*
- put on the product.html an add button which adds the product in the localStorage
- do a button "see the cart" which redirects to cart.html (which displays the localStorage content)
- do the button "order"
 */
/*
- "listen to the id, to the quantity"
- extract them
- scope concept
 */