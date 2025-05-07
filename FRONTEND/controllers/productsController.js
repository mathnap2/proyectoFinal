function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <a href="./product.html" class="text-decoration-none text-dark">
                <div class="card border-0 h-100 product-card">
                    <img src="${product.imageUrl}"
                    class="card-img-top" alt="${product.name}">
                    <div class="card-body px-0">
                        <h6 class="mb-1">${product.name}</h6>
                        <p class="mb-1">${product.description || ''}</p>
                        <strong>Size ${product.size}</strong>
                        <p class="mb-1">${product.availability ? 'Disponible' : 'No disponible'}</p>
                        <strong>$ ${product.price} MXN</strong>
                    </div>
                </div>
            </a>
        `;
        container.innerHTML += productCard;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(err => console.error('Error al obtener productos:', err));
});
