document.addEventListener("DOMContentLoaded", () => {
    const loadHTML = async (url, containerId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}`);
            }
            const html = await response.text();
            document.getElementById(containerId).innerHTML = html;
        } catch (error) {
            console.error("Error loading HTML:", error);
            document.getElementById(containerId).innerHTML = `<p>Error loading ${url}</p>`;
        }
    };

    loadHTML('../partials/header.html', 'header-container');
    loadHTML('../partials/footer.html', 'footer-container');
});
