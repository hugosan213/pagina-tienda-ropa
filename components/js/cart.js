/**
 * Cart Module - Manejo del carrito de compras con localStorage
 */
const CartModule = (function() {
    const STORAGE_KEY = 'urbanzone_cart';
    
    // Cargar carrito desde localStorage al iniciar
    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function addToCart(name, price) {
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        saveCart();
        updateCart();
    }

    function increaseQuantity(index) {
        cart[index].quantity++;
        saveCart();
        updateCart();
    }

    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeFromCart(index);
            return;
        }
        saveCart();
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
    }

    function clearCart() {
        cart = [];
        saveCart();
        updateCart();
    }

    function updateCart() {
        const count = document.getElementById("cart-count");
        const list = document.getElementById("cart-items");

        if (!count || !list) return;

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        count.textContent = totalItems;

        list.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const li = document.createElement("li");
            li.classList.add("cart-item");

            li.innerHTML = `
                <div>
                    ${item.name} <br>
                    $${item.price} x ${item.quantity} = $${subtotal}
                </div>
                <div class="cart-controls">
                    <button onclick="CartModule.decreaseQuantity(${index})">-</button>
                    <button onclick="CartModule.increaseQuantity(${index})">+</button>
                    <button class="remove-btn" onclick="CartModule.removeFromCart(${index})">X</button>
                </div>
            `;

            list.appendChild(li);
        });

        const totalElement = document.createElement("div");
        totalElement.classList.add("cart-total");
        totalElement.textContent = `Total: $${total}`;
        list.appendChild(totalElement);
    }

    function toggleCart() {
        const panel = document.getElementById("cart-panel");
        const overlay = document.getElementById("overlay");

        if (panel && overlay) {
            panel.classList.toggle("active");
            overlay.classList.toggle("active");
        }
    }

    function sendToWhatsApp() {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        let mensaje = "Hola, quiero hacer este pedido:%0A%0A";

        let total = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            mensaje += `- ${item.name} x${item.quantity} = $${subtotal}%0A`;
        });

        mensaje += `%0ATotal: $${total}`;

        const telefono = "5491167569395"; // 👈 ACÁ poné tu número real
        const url = `https://wa.me/${telefono}?text=${mensaje}`;

        window.open(url, "_blank");
    }

    // Exponer funciones públicamente
    return {
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        updateCart,
        toggleCart,
        sendToWhatsApp,
        getCart: () => cart
    };
})();

// Funciones globales para compatibilidad
function addToCart(name, price) {
    CartModule.addToCart(name, price);
}

function increaseQuantity(index) {
    CartModule.increaseQuantity(index);
}

function decreaseQuantity(index) {
    CartModule.decreaseQuantity(index);
}

function removeFromCart(index) {
    CartModule.removeFromCart(index);
}

function updateCart() {
    CartModule.updateCart();
}

function clearCart() {
    CartModule.clearCart();
}

window.addToCart = function(name, price) {
    CartModule.addToCart(name, price);
};

window.toggleCart = function() {
    CartModule.toggleCart();
};

window.sendToWhatsApp = function() {
    CartModule.sendToWhatsApp();
};