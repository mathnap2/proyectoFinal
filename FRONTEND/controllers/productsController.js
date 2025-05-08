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
                        <strong>$ ${product.price.toFixed(2)} MXN</strong>
                    </div>
                </div>
            </a>
        `;

        container.appendChild(productCard);
        const totalElement = document.getElementById('totalProductos');
if (totalElement) {
  totalElement.textContent = `Total: ${products.length} productos`;
}

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


//FILTRADO
function filtrarProductos(event) {
    event.preventDefault();

    let query = [];

    // Talla
    const tallasSeleccionadas = [];
    if (document.getElementById('sizeXS').checked) tallasSeleccionadas.push('XS');
    if (document.getElementById('sizeS').checked) tallasSeleccionadas.push('S');
    if (document.getElementById('sizeM').checked) tallasSeleccionadas.push('M');
    if (document.getElementById('sizeL').checked) tallasSeleccionadas.push('L');
    if (document.getElementById('sizeXL').checked) tallasSeleccionadas.push('XL');
    // Agrega más si tienes XL, L, etc.
    
    if (tallasSeleccionadas.length > 0) {
        query.push(`size=${tallasSeleccionadas.join(',')}`);
    }
    

    // Disponibilidad
    const disponibilidad = document.getElementById('inStock').checked ? 'true' :
                           document.getElementById('outOfStock').checked ? 'false' : '';

    // Precios
    const minPrice = document.getElementById('priceMin').value;
    const maxPrice = document.getElementById('priceMax').value;

    // Armado de query
    if (disponibilidad) query.push(`availability=${disponibilidad}`);
    if (minPrice) query.push(`minPrice=${minPrice}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);

    const url = `/api/products/filter?${query.join('&')}`;

    fetch(url)
        .then(res => res.json())
        .then(filtered => renderProducts(filtered))
        .catch(err => console.error('Error al filtrar:', err));
}

function actualizarContadoresFiltros() {
    // Contador para disponibilidad
    const disponibilidadCheckboxes = [
      document.getElementById('inStock'),
      document.getElementById('outOfStock')
    ];
    const disponibilidadSeleccionadas = disponibilidadCheckboxes.filter(cb => cb.checked).length;
    document.getElementById('selectedAvailabilityCount').textContent = `${disponibilidadSeleccionadas} seleccionados`;
  
    // Contador para tallas
    const tallasCheckboxes = Array.from(document.querySelectorAll('input[id^="size"]'));
    const tallasSeleccionadas = tallasCheckboxes.filter(cb => cb.checked).length;
    document.getElementById('selectedSizeCount').textContent = `${tallasSeleccionadas} seleccionados`;
  }
  
  // Listeners para checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', actualizarContadoresFiltros);
  });
  

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todos los productos inicialmente
    fetch('/api/products')
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(err => console.error('Error al obtener productos:', err));

    // Activar el filtrado si existe el formulario
    const form = document.getElementById('filtro-form');
    if (form) form.addEventListener('submit', filtrarProductos);
    async function actualizarPrecioMaximo() {
        try {
          const response = await fetch('/api/products/max-price');
          const data = await response.json();
          const maxPrice = parseFloat(data.maxPrice).toFixed(2);
          const priceSpan = document.getElementById('maxPriceDisplay');
          if (priceSpan) {
            priceSpan.textContent = `El precio más alto es $${maxPrice}`;
          }
        } catch (error) {
          console.error('Error al obtener el precio máximo:', error);
        }
      }
      
      // Llama la función al cargar la página
      actualizarPrecioMaximo();
      
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