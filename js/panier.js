/* POST request using fetch() */
fetch("http://localhost:3000/api/cameras/order", {
  // Adding method type
  method: "POST",

  // Adding body or contents to send
  body: JSON.stringify({
    products: ["5be1ed3f1c9d44000030b061"],
    contact: {
      firstName: "Alexandre",
      lastName: "Zelen",
      address: "7 avenue Vladimir Illitch",
      city: "Nanterre",
      email: "alexandre_zelen@yahoo.fr",
    },
  }),

  // Adding headers to the request
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
})

  // API response
  .then(function(commande) {
    //Stockage de la réponse de l'API dans le local storage key: stockCommande
    localStorage.setItem("order", JSON.stringify(commande)); //key and value both should be string or number
  })
  // Vider le panier après la réponse de l'API
  localStorage.getItem
  // Lien vers page confirmation après validation achat
  document.location.href="confirmation.html";
  localStorage.setItem("prixFinal");
