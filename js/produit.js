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
    console.log(camera);
    let cameraElt = document.createElement("div");
    let titreElt = document.createElement("h2");
    let descriptionElt = document.createElement("span");
    let priceElt = document.createElement("span");
    let imageElt = document.createElement("img");
    let lensesElt = createSelectForLenses(camera.lenses);
    titreElt.innerHTML = camera.name;
    descriptionElt.innerHTML = camera.description;
    priceElt.innerHTML = formatter.format((camera.price) / 100);
    imageElt.src = camera.imageUrl;
    imageElt.classList.add("cameraPicture");
    cameraElt.appendChild(titreElt);
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

// Récupération des valeurs du formulaire

let cameraElt = document.createElement("div");
let titreElt = document.createElement("h2");
let option = document.createElement("option");
let priceElt = document.createElement("span");
let optionsProduit = {
    nomProduit: titreElt.nomProduit,
    idProduit: cameraElt._id,
    optionLens: option.optionLens,
    quantity: 1,
    prix: priceElt.prix / 100,
};

console.log(optionsProduit);

// ---------------------------------- Le local storage --------------------------------

// Sélection de l'id du formulaire
// const idForm = document.querySelector("#option_produit"); //

// Mettre le choix de l'utilisateur dans une variable
//const choixForm = idFormValue;

// Sélection du bouton Ajouter article au panier
const btn_envoyerPanier = document.querySelector("#btn_envoyerPanier");

// addEventListener - Écouter le bouton et envoyer le panier
btn_envoyerPanier.addEventListener("click", (event) => {
    event.preventDefault();

// Déclaration de la variable //

    let productRecordedInLocalStorage = JSON.parse(localStorage.getItem("produit"));

// JSON.parse permet de convertir les données au format JSON (localisées dans le local storage) en objet JavaScript

    console.log(productRecordedInLocalStorage);

// S'il y a déjà des produits d'enregistré dans le local storage
    if (productRecordedInLocalStorage) {
        productRecordedInLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productRecordedInLocalStorage));
        console.log(productRecordedInLocalStorage);
        popupConfirmation();
    }
// S'il n'y a pas de produit d'enregistré dans le local storage
    else {
        productRecordedInLocalStorage = [];
        productRecordedInLocalStorage.push(optionsProduit);

        console.log(productRecordedInLocalStorage);
    }
});








