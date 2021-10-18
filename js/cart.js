// -- declaration of const -- //

const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

// -- select elementId for payment -- //

const paiement = document.getElementById("paiement");

// -- function clearBasket -- //

function initClearBasketListener() {
    const buttonClearBasket = document.getElementById("clearButton");
    buttonClearBasket.addEventListener("click", () => {
        localStorage.setItem("cart", null)

        // -- this method reloads the current URL -- //

        location.reload();
    });
}

// -- Empty basket message -- //

function createCartElement(cart) {
    let cartMessage = document.createElement("h2");

    // -- the if statement executes a statement if a specified condition is truthy -- //

    if (cart) {
        cartMessage.textContent = "Contenu de votre panier 😀";
    } else {
        cartMessage.textContent = "En manque d'inspiration ? 😰";
    }
    return cartMessage
}

function showCartShopping() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let cartMessageElement = createCartElement(cart)
    let cartSection = document.getElementById("cartSection")
    cartSection.appendChild(cartMessageElement)
    if (cart) {
        cart.forEach((camera) => {
            let displayCartShoppingElement = document.createElement("div")
            let titleElt = document.createElement("h3");
            let imageElt = document.createElement("img");
            let lensesElt = document.createElement("span");
            let priceElt = document.createElement("span");
            titleElt.innerHTML = camera.name;
            imageElt.src = camera.imageUrl;
            imageElt.classList.add("cameraPicture");
            lensesElt.innerHTML = camera.selectedLens;
            priceElt.innerHTML = formatter.format((camera.price) / 100);
            priceElt.classList.add("priceElt");
            cartSection.appendChild(displayCartShoppingElement);
            displayCartShoppingElement.appendChild(titleElt);
            displayCartShoppingElement.appendChild(imageElt);
            displayCartShoppingElement.appendChild(lensesElt);
            displayCartShoppingElement.appendChild(priceElt);
        })

        paiement.addEventListener("click", (event) => {
                console.log("paiement", paiement)

                // -- the default action that belongs to the event will not occur -- //

                event.preventDefault();

                // -- Prepare data to send to Post -- //

                let contact = {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("eMail").value,
                };
                console.log("contact", contact)

                let cart = JSON.parse(localStorage.getItem("cart"));
                if (!cart) {
                    return
                }
                console.log(cart)
                let products = cart.map(product => product._id)
                console.log(JSON.stringify({contact, products}))

                // -- Post -- //

                fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",

                    //-- headers option --//
                    headers: {

                        //-- to indicate the format of the posted data --//

                        "accept": "application.json",

                        //-- specify the content type of data i'm pushing --//

                        "Content-Type": "application/json"
                    },

                    //-- function used to transform a JavaScript object into a JSON string --//

                    body: JSON.stringify({contact, products})
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.orderId)
                        document.location.href = "./confirmation.html?orderId=" + data.orderId + "&totalCount=" + totalPrice;
                    })
                    .catch((erreur) => console.log("erreur:" + erreur));

            }
        )

        // -- set variable in order to insert the prices existing in the cart shopping -- //

        let finalPrice = [];

// -- search prices in the cart shopping -- //

        for (let i = 0; i < cart.length; i++) {
            let finalPriceInTheCartShopping = cart[i].price / 100;

            // -- put prices of cart shopping in the variable -- //

            finalPrice.push(finalPriceInTheCartShopping)

            console.log(finalPrice);
        }

        // -- add prices existing in the variable with method reduce -- //

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = finalPrice.reduce(reducer);
        console.log(totalPrice);

        // -- display totalPrice to HTML -- //

        const showFinalPriceToHtml = `<div id= "showFinalPrice">Le prix total de votre panier est de : ${totalPrice} € </div>`

        const insertFinalPrice = document.querySelector("#finalPrice");
        console.log(insertFinalPrice);

        // -- insert HTML in the cart shopping -- //

        insertFinalPrice.insertAdjacentHTML("beforeend", showFinalPriceToHtml);
    }
    initClearBasketListener()
}

showCartShopping()