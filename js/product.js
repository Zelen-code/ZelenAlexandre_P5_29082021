const server = "http://localhost:3000/api/cameras";
const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

// -- retrieve URL -- //

const url = new URLSearchParams(window.location.search);

// -- store id -- //

const id = url.get("_id");
console.log(id);
console.log(server + "/" + id);

let camera = {};

fetch(server + "/" + id)
    .then((res) => res.json())
    .then((_camera) => {
        camera = _camera
        showContent()
    })
    .catch((err) => console.log(err));

function showContent() {
    let cameraElt = createCameraElement(camera.element);
    let titleElt = createTitleElement(camera.title);
    let descriptionElt = createDescriptionElement(camera.description);
    let priceElt = createPriceElement(camera.price);
    let imageElt = createImageElement(camera.image);
    let lensesElt = createSelectForLenses(camera.lenses);
    let buttonElt = createButtonElement(camera.button);
    let shoppingCartButtonElt = createShoppingCartButton(camera.button);
    titleElt.innerHTML = camera.name;
    descriptionElt.innerHTML = camera.description;
    priceElt.innerHTML = formatter.format((camera.price) / 100);
    imageElt.src = camera.imageUrl;
    imageElt.classList.add("cameraPicture");
    shoppingCartButtonElt.classList.add("shoppingCartButton");
    cameraElt.appendChild(titleElt);
    cameraElt.appendChild(descriptionElt);
    cameraElt.appendChild(priceElt);
    cameraElt.appendChild(imageElt);
    cameraElt.appendChild(lensesElt);
    cameraElt.appendChild(buttonElt);
    cameraElt.appendChild(shoppingCartButtonElt);
    document.getElementsByTagName("main")[0].appendChild(cameraElt);
    document.getElementsByTagName("header")[0].appendChild(shoppingCartButtonElt);
}

function createShoppingCartButton() {
    let btn = document.createElement('input')
    btn.value = 'Panier';
    btn.type = 'button';
    return btn
}

// -- functions for elements of camera -- //

function createCameraElement() {
    let generatedHtml;
    generatedHtml = document.createElement("div");
    return generatedHtml;
}

function createHeaderElement() {
    let generatedHtml;
    generatedHtml = document.createElement("header");
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
    for (let i = 0; i < listOfLenses.length; i++) {
        let option = document.createElement("option");
        option.text = listOfLenses[i];
        generatedHtml.add(option);
    }
    return generatedHtml;
}

// -- function button -- //

function createButtonElement() {
    let btn;
    btn = document.createElement('input');
    btn.value = 'Ajouter au panier';
    btn.type = 'button';
    btn.addEventListener("click", onClickShoppingCartButton);
    return btn;
}

function onClickShoppingCartButton() {
    //console.log("bouton cliqué", camera, document.getElementsByTagName("select")[0].value)
    camera.selectedLens = document.getElementsByTagName("select")[0].value;
    //console.log("before save", camera)
    let cart = JSON.parse(localStorage.getItem("cart"))
    //console.log("cart", cart)
    if (cart == null) {
        cart = []
    }
    cart.push(camera)
    //console.log("cart2", cart)
    localStorage.setItem("cart", JSON.stringify(cart))
}