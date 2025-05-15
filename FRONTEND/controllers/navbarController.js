document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline" : "none";
  }

  // Esperar hasta que navbar haya sido cargado dinámicamente
  const waitForNavbar = setInterval(() => {
    const searchBtn = document.getElementById("navbarSearchButton");
    const searchInput = document.getElementById("navbarSearchInput");

    if (searchBtn && searchInput) {
      clearInterval(waitForNavbar); // Ya están cargados

      searchBtn.addEventListener("click", () => {
        const term = searchInput.value.trim();
        if (!term) return;
        window.location.href = `./products.html?search=${encodeURIComponent(term)}`;
      });

      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchBtn.click();
      });
    }
  }, 100); // revisar cada 100ms
});
