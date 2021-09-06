import fetchCameras from "./query.js";

async function showContent() {
  try {
    const cameras = await fetchCameras();
    cameras.forEach((camera) => {
      console.log(camera);
      let cameraElt = document.createElement("div");
      let titreElt = document.createElement("h2");
      let descriptionElt = document.createElement("span");
      let priceElt = document.createElement("span");
      let imageElt = document.createElement("img");
      //let lensesElt = document.createElement("select");
      let lensesElt = createSelectForLenses(camera.lenses);
      titreElt.innerHTML = camera.name;
      descriptionElt.innerHTML = camera.description;
      priceElt.innerHTML = camera.price;
      // lensesElt.innerHTML += `<option value="${camera.lenses}">${camera.lenses}</option>`;
      imageElt.src = camera.imageUrl;
      imageElt.classList.add("cameraPicture");
      cameraElt.appendChild(titreElt);
      cameraElt.appendChild(descriptionElt);
      cameraElt.appendChild(priceElt);
      cameraElt.appendChild(imageElt);
      cameraElt.appendChild(lensesElt);
      document.getElementsByTagName("body")[0].appendChild(cameraElt);
    });
  } catch (e) {
    console.log("Error", e);
  }
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

/*function createSelectForLenses(listOfLenses) {
  let qtéSélectionnée = 0;
  for (let i = 0; i < listOfLenses.options.length; i++) {
    if (listOfLenses.options[i].selected) {
      qtéSélectionnée++;
    }
  }
  return qtéSélectionnée;
}*/

showContent();
