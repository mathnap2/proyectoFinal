function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'col fade-in';
        productCard.style.transitionDelay = `${index * 100}ms`; // 100ms entre productos

        productCard.innerHTML = `
            <a href="./product.html?id=${product._id}" class="text-decoration-none text-dark">
                <div class="card border-0 h-100 product-card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body px-0">
                        <h6 class="mb-1">${product.name}</h6>
                        <strong>$ ${product.price} MXN</strong>
                    </div>
                </div>
            </a>
        `;

        container.appendChild(productCard);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    });

    // Activar el observer después de renderizar
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(err => console.error('Error al obtener productos:', err));
});


/*
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
*/