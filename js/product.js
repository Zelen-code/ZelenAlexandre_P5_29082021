const server = "http://localhost:3000/api/cameras";
const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

// retrieve URL
const url = new URLSearchParams(window.location.search);

// stock id
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
    lensesElt.classList.add("cameraLenses");
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

// select addToCart button
const btn_addToShoppingCart = document.querySelector("#btn_addToShoppingCart");
console.log(btn_addToShoppingCart)

// send to localStorage
const addToLocalStorage = shoppingCart => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
};

// options choice
for (let lenses of camera.lenses) {
    document.getElementsByClassName('cameraLenses').innerHTML +=
        `option value="1">${lenses}</option`
}

// add to shoppingCart fonction

const add

// addEventListener
btn_addToCart.addEventListener("click", (event) => {
    event.preventDefault();

    let items = ["name", "description", "price", "cameraPicture", "lenses"];
    localStorage.setItem("myItems", JSON.stringify(items)); //store items
    let storedItems = JSON.parse(localStorage.getItem("myItems")); //get them back
    console.log(storedItems)
});

/* --------------------------------------------------------------

function addEntry() {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    var entryTitle = document.getElementById("entryTitle").value;
    var entryText = document.getElementById("entryText").value;
    var entry = {
        "title": entryTitle,
        "text": entryText
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}

 ------------------------------------------ */


/* -------------------------------------------

var testObject = {'one': 1, 'two': 2, 'three': 3};

// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));

------------------------------------------------ */









