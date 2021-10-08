const server = "http://localhost:3000/api/cameras";
const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});
const url = new URLSearchParams(window.location.search);
const id = url.get("_id");
console.log(id);
console.log(server + "/" + id);

fetch(server + "/" + id)
    .then((res) => res.json())
    .then((camera) => showContent(camera))
    .catch((err) => console.log(err));

function showContent(camera) {
    let cameraElt = document.createElement("div");
    let titleElt = document.createElement("h2");
    let descriptionElt = document.createElement("span");
    let priceElt = document.createElement("span");
    let imageElt = document.createElement("img");
    let lensesElt = createSelectForLenses(camera.lenses);
    titleElt.innerHTML = camera.name;
    descriptionElt.innerHTML = camera.description;
    priceElt.innerHTML = formatter.format((camera.price) / 100);
    imageElt.src = camera.imageUrl;
    imageElt.classList.add("cameraPicture");
    cameraElt.appendChild(titleElt);
    cameraElt.appendChild(descriptionElt);
    cameraElt.appendChild(priceElt);
    cameraElt.appendChild(imageElt);
    cameraElt.appendChild(lensesElt);
    document.getElementsByTagName("main")[0].appendChild(cameraElt);
}

function createSelectForLenses(listOfLenses) {
    let generatedHtml = document.createElement("select");
    listOfLenses.forEach((lens) => {
        let option = document.createElement("option");
        option.text = lens;
        generatedHtml.add(option);
    });
    return generatedHtml;
}

// localStorage

// selection of add button
const btn_addToCart = document.querySelector("#btn_addToCart");
console.log(btn_addToCart)

// addEventListener
btn_addToCart.addEventListener("click", (event) => {
    event.preventDefault();

// variable declaration //

    let productRecordedInLocalStorage = JSON.parse(localStorage.getItem("product"));

// JSON.parse allows to convert from JSON format into JS object

    console.log(productRecordedInLocalStorage);

// if there are already recorded products in the localStorage
    if (productRecordedInLocalStorage) {
        productRecordedInLocalStorage.push(optionsProduct);
        localStorage.setItem("product", JSON.stringify(productRecordedInLocalStorage));
        console.log(productRecordedInLocalStorage);
    }
// If there aren't any products recorded in the localStorage
    else {
        productRecordedInLocalStorage = [];
        productRecordedInLocalStorage.push(optionsProduct);

        console.log(productRecordedInLocalStorage);
    }
});








