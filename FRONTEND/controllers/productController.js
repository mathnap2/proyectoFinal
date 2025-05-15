document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    alert("Producto no encontrado");
    return;
  }

  try {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();

    // Rellenar datos del producto
    document.getElementById("product-title").textContent = product.name;
    document.getElementById("product-size").textContent = "Talla " + product.size;

    const priceElement = document.getElementById("product-price");
    priceElement.dataset.price = product.price; // Guardamos el precio base
    priceElement.textContent = `$${product.price.toFixed(2)} MXN`;

    document.getElementById("product-image").src = product.imageUrl;
    document.getElementById("product-description").textContent = product.description || product.name;
    const availabilityElement = document.getElementById("product-availability");

    if (product.availability) {
      availabilityElement.textContent = 'Disponible';
      availabilityElement.classList.remove("text-danger");
      availabilityElement.classList.add("text-success");
    } else {
      availabilityElement.textContent = 'No disponible';
      availabilityElement.classList.remove("text-success");
      availabilityElement.classList.add("text-danger");
    }


    /*
    const quantityInput = document.getElementById("quantityInput");

    function updateDisplayedPrice() {
      const basePrice = parseFloat(priceElement.dataset.price);
      const quantity = parseInt(quantityInput.value);
      const total = basePrice * quantity;
      priceElement.textContent = `MX$${total.toFixed(2)}`;
    }

    */

    // Eventos de + y -
    document.getElementById("decreaseBtn").addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
        //updateDisplayedPrice();
      }
    });

    document.getElementById("increaseBtn").addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
      //updateDisplayedPrice();
    });

    //updateDisplayedPrice(); // inicializa el precio con la cantidad 1

    // Agregar al carrito
    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(p => p._id === product._id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge(); // actualiza el número del carrito
      alert("Producto agregado al carrito 🛒");
    });

    updateCartBadge(); // al cargar la página, se muestra el número actual
  } catch (err) {
    console.error(err);
    alert("Hubo un error al cargar el producto");
  }
});

// Función para actualizar el número en el ícono del carrito
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline" : "none";
  }
}
