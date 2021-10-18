// -- import resources -- //

import fetchCameras from "../src/query.js";

//console.log(fetchCameras)

new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

async function showContent() {
    try {
        const cameras = await fetchCameras();
        cameras.forEach((camera) => {
            console.log(camera);
            let cameraElt = document.createElement("div");
            let linkElt = document.createElement("a");
            let imageElt = document.createElement("img");
            imageElt.src = camera.imageUrl;
            imageElt.classList.add("cameraPicture");
            imageElt.classList.add("imgElement");
            linkElt.href = './product.html?_id=' + camera._id;
            cameraElt.appendChild(linkElt);
            linkElt.appendChild(imageElt);
            document.getElementsByTagName("main")[0].appendChild(cameraElt);
        });
    } catch (e) {
    }
}

let promise;
promise = showContent();