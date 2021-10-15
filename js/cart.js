// -- Const -- //

const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let paiement = document.getElementById("paiement");

// -- event listener -- //

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

                //final price --> localStorage.setItem("finalPrice")

            })
            .catch((erreur) => console.log("erreur:" + erreur));

    }
)

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
    }
    initClearBasketListener()
}

showCartShopping()