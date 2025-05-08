document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? "inline" : "none";
    }
});
