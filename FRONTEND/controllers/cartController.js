    document.addEventListener("DOMContentLoaded", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItemsContainer = document.getElementById("cart-items");
        const cartSummary = document.getElementById("cart-summary");
        const checkoutSection = document.getElementById("checkout-section");

        if (cart.length === 0) {
            showEmptyCart();
            return;
        }

        function showEmptyCart() {
            cartItemsContainer.innerHTML = `
                <div class="text-center my-5">
                    <h3>Tu carrito está vacío</h3>
                    <a href="./products.html" class="btn btn-dark mt-3">Seguir comprando</a>
                </div>`;
            cartSummary.style.display = "none";
            checkoutSection.style.display = "none";
        }

        function renderCart() {
            cartItemsContainer.innerHTML = `
                <div>
                    <h2 style="text-align: left;">Tu carrito</h2>
                    <a href="./products.html" style="color: black;">Seguir comprando</a>
                </div>
            `;

            let total = 0;

            cart.forEach((product, index) => {
                const subtotal = product.price * product.quantity;
                total += subtotal;

                const itemHTML = `
                    <div class="row align-items-center border-bottom pb-4 mb-4">
                        <div class="col-md-2">
                            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid rounded shadow-sm" />
                        </div>
                        <div class="col-md-4">
                            <h5>${product.name} Talla ${product.size}</h5>
                            <p class="mb-0 text-muted">$ ${product.price.toFixed(2)} MXN</p>
                        </div>
                        <div class="col-md-3 text-center">
                            <label class="form-label">Cantidad</label>
                            <div class="d-flex justify-content-center">
                                <div class="input-group align-items-center" style="width: 140px;">
                                    <button class="btn btn-outline-dark border-end-0" type="button" onclick="updateQuantity(${index}, -1)">−</button>
                                    <input type="text" class="form-control text-center border-start-0 border-end-0" value="${product.quantity}" readonly>
                                    <button class="btn btn-outline-dark border-start-0" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 text-end">
                            <p class="fw-bold h5 mb-0">$ ${subtotal.toFixed(2)} MXN</p>
                        </div>
                        <div class="col-md-1 text-end">
                            <button class="btn btn-link text-dark p-0" onclick="removeItem(${index})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHTML;
            });

            document.getElementById("total-estimate").textContent = `Total estimado: $ ${total.toFixed(2)} MXN`;
            cartSummary.style.display = "block";
            checkoutSection.style.display = "block";
        }

        window.updateQuantity = function (index, delta) {
            const newQty = cart[index].quantity + delta;
            if (newQty >= 1) {
                cart[index].quantity = newQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCartBadge();
            }
        };

        window.removeItem = function (index) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            if (cart.length === 0) {
                showEmptyCart();
            } else {
                renderCart();
            }

            updateCartBadge();
        };

        renderCart();
        updateCartBadge();
    });

    // Actualiza el ícono del carrito
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        const badge = document.getElementById("cart-count");
        if (badge) {
            badge.textContent = totalCount;
            badge.style.display = totalCount > 0 ? "inline" : "none";
        }
    }

    // Checkout con Stripe + creación de pedido
    document.addEventListener("DOMContentLoaded", async () => {
        const stripe = Stripe("pk_test_51RMNWGCT5CSGGVxAQsbeYQL0TFcvgCMW4w23tULDnHxr3GwusSvQRLbMQCJIfwt4gO67UA652blA9vmPQsDV3saN00LlOOjk5i");
        const elements = stripe.elements();
        const card = elements.create("card");
        card.mount("#card-element");

        const loader = lottie.loadAnimation({
            container: document.getElementById("lottie-loader"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "../assets/animations/animationLoading.json"
        });

        const button = document.getElementById("payment-button");
        if (button) {
            button.addEventListener("click", async (e) => {
                e.preventDefault();

                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                if (cart.length === 0) {
                    alert("Tu carrito está vacío.");
                    return;
                }

                const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const amountInCents = Math.round(total * 100);
                const token = localStorage.getItem("token");

                try {
                    const res = await fetch("/api/payment/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cart })
                    });

                    const data = await res.json();

                    if (!res.ok || !data.clientSecret) {
                    alert("Error al crear pago: " + (data.error || "Intento de pago inválido"));
                    return; // ⛔ Detiene todo si no se puede crear el pago
                    }

                    const { clientSecret } = data;

                    const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: { name: "Usuario de prueba" }
                    }
                    });


                    if (result.error) {
                        alert(result.error.message);
                    } else if (result.paymentIntent.status === "succeeded") {
                        const orderRes = await fetch("/api/orders", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ items: cart, total })
                        });

                        const orderResult = await orderRes.json();

                        if (orderRes.ok) {
                            alert("¡Pago y pedido realizado con éxito!");
                            localStorage.removeItem("cart");
                            window.location.href = "./orders.html";
                        } else {
                            alert("Pago realizado, pero ocurrió un error al guardar el pedido: " + orderResult.error);
                        }
                    }

                } catch (err) {
                    console.error(err);
                    alert("Error al procesar el pago");
                }
            });
        }
    });
