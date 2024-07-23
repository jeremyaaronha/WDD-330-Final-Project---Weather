document.addEventListener("DOMContentLoaded", () => {
    // Comprueba si el usuario ha visitado la página antes
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
        // Mostrar el banner de bienvenida
        const banner = document.getElementById("welcome-banner");
        banner.classList.remove("hidden");

        // Marcar que el usuario ha visitado la página
        localStorage.setItem("hasVisited", "true");

        // Agregar evento al botón de cerrar
        const closeButton = document.getElementById("close-banner");
        closeButton.addEventListener("click", () => {
            banner.style.display = "none";
        });
    }
});
