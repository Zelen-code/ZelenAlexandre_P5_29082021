export default async function fetchCameras() {
    const url = "http://localhost:3000/api/cameras";

    const response = await fetch(url);
    return response.json();
}

async function fetchCameraById(cameraId) {
    const url = "http://localhost:3000/api/cameras/" + cameraId;
    const response = await fetch(url);
    return response.json();
}
