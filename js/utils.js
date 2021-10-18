// -- Intl.NumberFormat object enables language-sensitive number formatting -- //

const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});