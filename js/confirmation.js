const url = new URLSearchParams(window.location.search);
const id = url.get("orderId");
const totalCount = url.get("totalCount");
console.log("hello", totalCount)
document.getElementById("message").innerHTML = "Nous vous remercions pour votre achat. Le numéro de référence est le : " + id + ". Le prix de votre panier est de : " + totalCount + " €";

