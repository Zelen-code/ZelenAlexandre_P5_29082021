const url = new URLSearchParams(window.location.search);
const id = url.get("orderId");
document.getElementById("message").innerHTML = "Votre numéro de commande est le n° " + id;