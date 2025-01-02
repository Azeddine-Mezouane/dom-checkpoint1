// Sélection des éléments nécessaires du DOM
const cartContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total");
const buyButtons = document.querySelectorAll('.buy-button');

// Initialisation du tableau pour stocker les articles du panier
let cartItems = [];

// Fonction pour ajouter un article au panier
function addItemToCart(productData) {
    // Vérification si l'article existe déjà dans le panier
    const existingItem = cartItems.find(item => item.name === productData.name);
    
    if (existingItem) {
        // Si l'article existe, incrémenter la quantité
        existingItem.quantity++;
    } else {
        // Si l'article n'existe pas, l'ajouter au panier
        cartItems.push({
            name: productData.name,
            image: productData.image,
            price: parseFloat(productData.price), // Conversion du prix en nombre flottant
            description: productData.description,
            quantity: 1
        });
    }
    
    // Mettre à jour l'affichage du panier et recalculer le total
    renderCart();
    calculateTotal();
}

// Fonction pour afficher les articles du panier
function renderCart() {
    cartContainer.innerHTML = ""; // Vider le contenu actuel du panier
    
    cartItems.forEach(item => {
        // Création du HTML pour chaque élément du panier
        const cartItemHTML = `
              <div
                  class="cart-item flex items-center justify-between border-b pb-4 mb-4"
              >
                <div class="flex items-center gap-4">
                  <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 class="font-semibold text-lg">${item.name}</h2>
                    <p class="text-sm text-darkGold">
                    ${item.description}
                    </p>
                  </div>
                </div>
                <div class="actions flex items-center gap-4">
                  <div class="quantity-controls flex items-center gap-2">
                    <button
                      class="decrease font-bold text-black px-3 py-1 rounded hover:bg-darkGold"
                    >
                      -
                    </button>
                    <span class="quantity font-medium text-lg">${item.quantity}</span>
                    <button
                      class="increase font-bold text-black px-3 py-1 rounded hover:bg-darkGold"
                    >
                      +
                    </button>
                  </div>
                  <i class='bx bxs-heart heart cursor-pointer text-3xl  grayscale hover:grayscale-[30%] text-red-500 transition transform hover:scale-125'></i>
                  <img
                    src="Assets/img/delete.png"
                    alt="Supprimer"
                    class="delete-icon w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
          `;
        
        // Ajouter l'élément au container du panier
        cartContainer.innerHTML += cartItemHTML;
    });
}

// Fonction pour calculer le total du panier
function calculateTotal() {
    let total = 0;
    // Parcourir tous les articles du panier et additionner leurs prix * quantité
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    // Mettre à jour l'affichage du total
    totalPriceElement.textContent = total.toFixed(2);
}

// Gestionnaire d'événements pour les interactions avec le panier
cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
        // Incrémenter la quantité d'un article
        const itemElement = e.target.closest('.cart-item');
        const itemName = itemElement.querySelector('h2').textContent;
        const cartItem = cartItems.find(item => item.name === itemName);
        cartItem.quantity++;
        renderCart();
        calculateTotal();
    } else if (e.target.classList.contains("decrease")) {
      // Décrémenter la quantité d'un article
      const itemElement = e.target.closest('.cart-item');
      const itemName = itemElement.querySelector('h2').textContent;
      const cartItem = cartItems.find(item => item.name === itemName);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        renderCart();
        calculateTotal();
      }
    } else if (e.target.classList.contains("delete-icon")) {
      // Supprimer un article du panier
      const itemElement = e.target.closest('.cart-item');
      const itemName = itemElement.querySelector('h2').textContent;
      cartItems = cartItems.filter(item => item.name !== itemName);
      renderCart();
      calculateTotal();
    } else if (e.target.classList.contains("heart")) {
      // Basculer l'état du coeur (like/unlike)
      e.target.classList.toggle("grayscale-0");
    }
});

// Ajout d'un gestionnaire d'événements pour chaque bouton "Acheter"
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Récupération de l'élément parent (div du produit)
        const productDiv = this.closest('[data-name]');
        if (productDiv) {
            // Création d'un objet avec les données du produit
            const productData = {
                name: productDiv.dataset.name,
                image: productDiv.dataset.image,
                price: productDiv.dataset.price,
                description: productDiv.dataset.description
            };
            // Ajout de l'article au panier
            addItemToCart(productData);
        }
    });
});

// Initialisation du panier et calcul du total au chargement de la page
calculateTotal();
renderCart();
