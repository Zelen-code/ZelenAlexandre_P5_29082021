// -- declaration of const -- //

const server = "http://localhost:3000/api/cameras";

// -- The Intl.NumberFormat object enables language-sensitive number formatting -- //
const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

// -- retrieve URL -- //

const url = new URLSearchParams(window.location.search);

// -- store id -- //

const id = url.get("_id");

// -- id test -- //

console.log(id)

// -- Access to object -- //

console.log(server + "/" + id);

// -- Declaration of camera in an object -- //

let camera = {};

fetch(server + "/" + id)

    // -- The then() method returns a Promise -- //

    .then((res) => res.json())
    .then((_camera) => {
        camera = _camera
        console.log(camera)
        showContent()
    })
    .catch((err) => console.log(err));

function showContent() {

    // -- creation of all elements of the object -- //

    let cameraElt = createCameraElement(camera.element);
    let titleElt = createTitleElement(camera.title);
    let descriptionElt = createDescriptionElement(camera.description);
    let imageElt = createImageElement(camera.image);
    let priceElt = createPriceElement(camera.price);
    let lensesElt = createSelectForLenses(camera.lenses);
    let buttonElt = createButtonElement(camera.button);
    let shoppingCartButtonElt = createShoppingCartButton(camera.button);
    let linkElt = document.createElement("a");

    // -- Element.innerHTML of Element retrieve or defines HTML syntax describing Element descendants -- //

    titleElt.innerHTML = camera.name;
    descriptionElt.innerHTML = camera.description;
    imageElt.src = camera.imageUrl;
    priceElt.innerHTML = formatter.format((camera.price) / 100);
    imageElt.classList.add("cameraPicture");

    // -- create class selectors for css -- //

    shoppingCartButtonElt.classList.add("shoppingCartButton");
    priceElt.classList.add("priceElt");
    buttonElt.classList.add("addToBasketButton");
    linkElt.href = './cart.html';

    // -- The Node.appendChild() method adds a node to the end of the list of children of a specified parent node -- //

    cameraElt.appendChild(titleElt);
    cameraElt.appendChild(descriptionElt);
    cameraElt.appendChild(imageElt);
    cameraElt.appendChild(lensesElt);
    cameraElt.appendChild(priceElt);
    cameraElt.appendChild(buttonElt);
    linkElt.appendChild(shoppingCartButtonElt);
    document.getElementsByTagName("main")[0].appendChild(cameraElt);
    document.getElementsByTagName("header")[0].appendChild(linkElt);
}

// -- functions of each element -- //

function createShoppingCartButton() {
    let btn = document.createElement('input')
    btn.value = '💵 Panier 💶';
    btn.type = 'button';
    return btn
}

// -- functions for elements of camera -- //

function createCameraElement() {
    let generatedHtml;
    generatedHtml = document.createElement("div");
    return generatedHtml;
}

// -- function title -- //

function createTitleElement() {
    let generatedHtml;
    generatedHtml = document.createElement("h2");
    return generatedHtml;
}

// -- function description -- //

function createDescriptionElement() {
    let generatedHtml;
    generatedHtml = document.createElement("span");
    return generatedHtml;
}

// -- function price -- //

function createPriceElement() {
    let generatedHtml;
    generatedHtml = document.createElement("span");
    return generatedHtml;
}

// -- function image -- //

function createImageElement() {
    let generatedHtml;
    generatedHtml = document.createElement("img");
    return generatedHtml;

}

// -- function lenses -- //

function createSelectForLenses(listOfLenses) {
    let generatedHtml = document.createElement("select");

    // -- creation of a loop in order to add each lens option -- //

    for (let i = 0; i < listOfLenses.length; i++) {
        let option = document.createElement("option");

        // -- the text property sets or returns the text of an option element -- //
        option.text = listOfLenses[i];
        generatedHtml.add(option);
    }

    // -- return stops execution and exits the function -- //
    return generatedHtml;
}

// -- function button -- //

function createButtonElement() {
    let btn;
    btn = document.createElement('input');
    btn.value = 'Ajouter au panier';
    btn.type = 'button';

    // -- addEventListener sets up a function that will be called whenever the specified event is delivered to the target -- //

    btn.addEventListener("click", onClickShoppingCartButton);
    return btn;
}

function onClickShoppingCartButton() {

    // -- check data when we click on the button addToBasketButton -- //

    console.log("clicked button", camera)
    camera.selectedLens = document.getElementsByTagName("select")[0].value;

    // -- check if just one option has been selected -- //

    console.log("before save", camera)

    // -- the JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string -- //
    // -- the getItem() method of the storage interface, when passed a key name, will return that key's value -- //
    let cart = JSON.parse(localStorage.getItem("cart"))

    // -- check all the cameras added to shopping basket -- //

    console.log("cart", cart)

    if (cart == null) {
        cart = []
    }
    cart.push(camera)

    console.log("cart2", cart)

    // -- The setItem() method of the storage interface, when passed a key name and value, will add that key to the given storage object -- //
    // -- JSON.stringify used to transform a JavaScript object into a JSON string -- //

    localStorage.setItem("cart", JSON.stringify(cart))
}