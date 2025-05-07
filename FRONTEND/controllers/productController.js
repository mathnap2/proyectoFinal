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
      document.getElementById("product-price").textContent = `$ ${product.price.toFixed(2)} MXN`;
      document.getElementById("product-image").src = product.imageUrl;
      document.getElementById("product-description").textContent = product.description || product.name;
      document.getElementById("product-availability").textContent = `${product.availability ? 'Disponible' : 'No disponible'}`;
  
  
      // Agregar al carrito
      document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        const quantity = parseInt(document.getElementById("quantityInput").value);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(p => p._id === product._id);
  
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({ ...product, quantity });
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Producto agregado al carrito 🛒");
      });
  
    } catch (err) {
      console.error(err);
      alert("Hubo un error al cargar el producto");
    }
  });
  