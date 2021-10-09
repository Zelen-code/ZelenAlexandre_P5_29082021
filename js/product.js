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

fetch(server + "/" + id)
    .then((res) => res.json())
    .then((camera) => showContent(camera))
    .catch((err) => console.log(err));

function showContent(camera) {
    let cameraElt = createCameraElement(camera.element);
    let titleElt = createTitleElement(camera.title);
    let descriptionElt = createDescriptionElement(camera.description);
    let priceElt = createPriceElement(camera.price);
    let imageElt = createImageElement(camera.image);
    let lensesElt = createSelectForLenses(camera.lenses);
    let buttonElt = createButtonElement(camera.button);
    titleElt.innerHTML = camera.name;
    descriptionElt.innerHTML = camera.description;
    priceElt.innerHTML = formatter.format((camera.price) / 100);
    imageElt.src = camera.imageUrl;
    imageElt.classList.add("cameraPicture");
    buttonElt.innerHTML = camera.button;
    cameraElt.appendChild(titleElt);
    cameraElt.appendChild(descriptionElt);
    cameraElt.appendChild(priceElt);
    cameraElt.appendChild(imageElt);
    cameraElt.appendChild(lensesElt);
    cameraElt.appendChild(buttonElt);
    document.getElementsByTagName("main")[0].appendChild(cameraElt);
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
    for (let i = 0; i < listOfLenses.length; i++) {
        let option = document.createElement("option");
        option.text = listOfLenses[i];
        generatedHtml.add(option);
    }
    return generatedHtml;
}

// -- function button -- //

function createButtonElement() {
    let generatedHtml;
    generatedHtml = document.createElement("button");
    return generatedHtml;
}