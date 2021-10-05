const server = "http://localhost:3000/api/cameras";

const url = new URLSearchParams(window.location.search);
const id = url.get("_ijt");
console.log(id);
console.log(server + "/" + id);

fetch(server + "/" + id)
    .then((alex) => alex.json())
    .then((sophia) => console.log(sophia))
    .catch((err) => console.log(err));


/*function
fetchCameraById(cameraId) {
    fetch(`http://localhost:3000/api/cameras/${cameraId}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
}

/*
async function fetchCameraById(cameraId) {

    const url = "http://localhost:3000/api/cameras/" + cameraId;
    const response = await fetch(url);
    return response.json();
}
*/

/*fetchCameraById()*/
