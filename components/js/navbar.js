/**
 * Navbar Module - Manejo del navbar con scroll
 */
const NavbarModule = (function() {
    function init() {
        window.addEventListener("scroll", handleScroll);
    }

    function handleScroll() {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    return {
        init
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    NavbarModule.init();
});