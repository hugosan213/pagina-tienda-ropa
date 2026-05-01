/**
 * Slider Module - Manejo del slider/slideshow
 */
const SliderModule = (function() {
    function init() {
        if (typeof Splide === 'undefined') {
            console.warn('Splide no está cargado');
            return;
        }

        const sliderElement = document.getElementById('main-slider');
        if (!sliderElement) return;

        var main = new Splide('#main-slider', {
            type       : 'fade',
            rewind     : true,
            autoplay   : true,
            interval   : 4000,
            speed      : 1000,
            arrows     : true,
            pagination : true,
        });

        main.mount();
    }

    return {
        init
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    SliderModule.init();
});