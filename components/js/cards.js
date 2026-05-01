document.addEventListener("click", function(e) {

    if (!e.target.classList.contains("next") && !e.target.classList.contains("prev")) return;

    const container = e.target.closest(".img-container");
    const img = container.querySelector("img");

    let images = [];

    try {
        images = JSON.parse(img.dataset.images);
    } catch (err) {
        console.error("Error en data-images", err);
        return;
    }

    let index = parseInt(img.dataset.index || 0);

    if (e.target.classList.contains("next")) {
        index = (index + 1) % images.length;
    }

    if (e.target.classList.contains("prev")) {
        index = (index - 1 + images.length) % images.length;
    }

    img.src = images[index];
    img.dataset.index = index;
});