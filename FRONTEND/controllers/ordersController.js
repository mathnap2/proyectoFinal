document.addEventListener("DOMContentLoaded", async () => {
  const ordersContainer = document.getElementById("orders-list");
  const token = localStorage.getItem("token");

  if (!token) {
    ordersContainer.innerHTML = "<p>Inicia sesión para ver tus pedidos.</p>";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/orders/my-orders", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const orders = await res.json();

    if (!orders.length) {
      ordersContainer.innerHTML = `<p>No has realizado ningún pedido.</p>`;
      return;
    }

    ordersContainer.innerHTML = ""; // Limpiar contenido estático de ejemplo

    orders.forEach(order => {
      const itemsHTML = order.items.map(item => `
        <div class="d-flex align-items-start border-bottom py-3">
          <img src="${item.imageUrl}" alt="${item.name}" style="width: 80px; height: auto;" class="me-3" />
          <div class="flex-grow-1">
            <strong>${item.name} (Talla ${item.size})</strong><br />
            <small class="text-muted">Cantidad: ${item.quantity}</small><br />
            <small>${(item.price * item.quantity).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</small>
          </div>
          <div class="text-end">
            <p class="mb-1 fw-bold">${(item.price * item.quantity).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
          </div>
        </div>
      `).join("");

      ordersContainer.innerHTML += `
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Pedido realizado el ${new Date(order.createdAt).toLocaleString()}</h5>
            ${itemsHTML}
            <div class="text-end mt-3">
              <strong>Total: ${order.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</strong>
            </div>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    ordersContainer.innerHTML = `<p>Error al cargar pedidos.</p>`;
  }
});
