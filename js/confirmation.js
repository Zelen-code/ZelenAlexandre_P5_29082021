const url = new URLSearchParams(window.location.search);
const id = url.get("orderId");
const totalCount = url.get("totalCount");
console.log(totalCount)
document.getElementById("message").innerHTML = "Nous vous remercions pour votre achat! &#128522</br> Votre numéro de référence est le : " + id + ".</br>Le prix total de votre commande est de : " + totalCount + " €.";