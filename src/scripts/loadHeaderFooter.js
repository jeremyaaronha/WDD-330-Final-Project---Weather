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
    loginRegisterDiv.innerHTML = `<a> Welcome, ${username}!</a> <a href="#" id="logout">Log Out</a>`;

    const logoutLink = document.getElementById("logout");
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        location.reload();
    });
};
