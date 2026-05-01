async function cargarComponentes() {
    const elementos = document.querySelectorAll("[data-src]");

    const promesas = Array.from(elementos).map(async (el) => {
        try {
            const res = await fetch(el.dataset.src);
            el.innerHTML = await res.text();
        } catch (err) {
            console.error("Error cargando:", el.dataset.src, err);
        }
    });

    // 👇 Espera a que TODO termine
    await Promise.all(promesas);
}

async function esperarElemento(id) {
    return new Promise(resolve => {
        const check = () => {
            const el = document.getElementById(id);
            if (el) return resolve(el);
            requestAnimationFrame(check);
        };
        check();
    });
}

(async () => {
    await cargarComponentes();

    // 👇 espera real a que exista el contador
    await esperarElemento("cart-count");

    if (typeof CartModule !== "undefined") {
        CartModule.updateCart();
    }
})();