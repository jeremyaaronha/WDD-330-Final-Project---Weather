document.addEventListener("DOMContentLoaded", () => {
    fetch("../partials/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
                updateHeaderForLoggedInUser(loggedInUser.username);
            }
        });

    fetch("../partials/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});

const updateHeaderForLoggedInUser = (username) => {
    const loginRegisterDiv = document.querySelector(".login-register");
    loginRegisterDiv.innerHTML = `Welcome, ${username}! <a href="#" id="logout">Log Out</a>`;

    const logoutLink = document.getElementById("logout");
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        // Remove user-specific theme preferences
        const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            localStorage.setItem(`${loggedInUser.username}-theme`, theme);
        }
        location.reload();
    });
};
