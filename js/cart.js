const order = document.getElementById("order");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
const checkBox = document.getElementById("invalidCheck2");

if (
    (regexMail.test(contact.email) == true) &
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true) &
    (regexCity.test(contact.city) == true) &
    (regexAddress.test(contact.address) == true) &
    (checkBox.checked == true)
) {
    event.preventDefault();

// -- Const -- //

    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });

    let paiement = document.getElementById("paiement");

// -- event listener -- //
    /*
    paiement.addEventListener("click", (event) => {
            console.log("paiement")
            event.preventDefault();

            // -- Prepare data to send to Post -- //

            let contact = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("eMail").value,
            };
            console.log("hello", contact)

            let cart = JSON.parse(localStorage.getItem("cart"));
            if (!cart) {
                return
            }
            console.log("coucou", cart)
            let products = cart.map(product => product._id)
            console.log(JSON.stringify({contact, products}))
            // -- Post -- //

            fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                    "accept": "application.json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({contact, products})
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.orderId)
                    document.location.href = "./confirmation.html?orderId=" + data.orderId;
                })
                .catch((erreur) => console.log("erreur:" + erreur));

        }
    ) */

// -- function clearBasket -- //

    function initClearBasketListener() {
        const buttonClearBasket = document.getElementById("clearButton");
        buttonClearBasket.addEventListener("click", () => {
            localStorage.setItem("cart", null)
            location.reload();
        });
    }

// -- Empty basket message -- //

    function createCartElement(cart) {
        let cartMessage = document.createElement("h2");
        if (cart) {
            cartMessage.textContent = "Contenu de votre panier";
        } else {
            cartMessage.textContent = "Votre panier est vide";
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
                    console.log("paiement")
                    event.preventDefault();

                    // -- Prepare data to send to Post -- //

                    let contact = {
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        address: document.getElementById("address").value,
                        city: document.getElementById("city").value,
                        email: document.getElementById("eMail").value,
                    };
                    console.log("hello", contact)

                    let cart = JSON.parse(localStorage.getItem("cart"));
                    if (!cart) {
                        return
                    }
                    console.log("coucou", cart)
                    let products = cart.map(product => product._id)
                    console.log(JSON.stringify({contact, products}))
                    // -- Post -- //

                    fetch("http://localhost:3000/api/cameras/order", {
                        method: "POST",
                        headers: {
                            "accept": "application.json",
                            "Content-Type": "application/json"
                        },
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

            const showFinalPriceToHtml = `<div id= "showFinalPrice">Le prix total est de : ${totalPrice} € </div>`

            const insertFinalPrice = document.querySelector("#finalPrice");
            console.log(insertFinalPrice);

            // -- insert HTML in the cart shopping -- //

            insertFinalPrice.insertAdjacentHTML("beforeend", showFinalPriceToHtml);
        }
        initClearBasketListener()
    }

    showCartShopping()