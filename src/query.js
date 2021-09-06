export default async function fetchCameras() {
  const url = "http://localhost:3000/api/cameras";

  const response = await fetch(url);
  return response.json();
}
