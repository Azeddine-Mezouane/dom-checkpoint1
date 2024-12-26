// Sélectionner les éléments nécessaires
const cart = document.querySelector("section"); // Section contenant les produits
const totalPriceElement = document.getElementById("total"); // Élément affichant le prix total

/**
 * Fonction pour recalculer le prix total
 */
function calculateTotal() {
    let total = 0;

    // Parcourir chaque produit
    document.querySelectorAll(".cart-item").forEach(item => {
        const quantity = parseInt(item.querySelector(".quantity").textContent); // Quantité actuelle
        const price = parseFloat(item.getAttribute("data-price")); // Prix unitaire
        total += quantity * price; // Ajouter au total
    });

    // Mettre à jour le total dans le DOM
    totalPriceElement.textContent = total.toFixed(2);
}

/**
 * Gestion des événements
 */
cart.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
        // Augmenter la quantité
        const quantityElement = e.target.parentElement.querySelector(".quantity");
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        calculateTotal();
    } else if (e.target.classList.contains("decrease")) {
        // Diminuer la quantité (minimum 1)
        const quantityElement = e.target.parentElement.querySelector(".quantity");
        const currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
            calculateTotal();
        }
    } else if (e.target.classList.contains("delete-icon")) {
        // Supprimer un produit
        const item = e.target.closest(".cart-item");
        item.remove();
        calculateTotal();
    } else if (e.target.classList.contains("heart")) {
        // Gestion du cœur
        e.target.classList.toggle("grayscale-0"); // Appliquer la couleur rouge au clic
      
    }
});

// Calcul initial
calculateTotal();
