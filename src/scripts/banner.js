document.addEventListener("DOMContentLoaded", () => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
        const banner = document.getElementById("welcome-banner");
        banner.classList.remove("hidden");

        localStorage.setItem("hasVisited", "true");

        const closeButton = document.getElementById("close-banner");
        closeButton.addEventListener("click", () => {
            banner.style.display = "none";
        });
    }
});
