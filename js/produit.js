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






