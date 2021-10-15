const url = new URLSearchParams(window.location.search);
const id = url.get("orderId");
document.getElementById("message").innerHTML = "Nous vous remercions pour votre achat. Le numéro de référence est le : " + id;