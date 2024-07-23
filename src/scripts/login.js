document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const identifier = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => (user.email === identifier || user.username === identifier) && user.password === password);

        if (user) {
            alert(`Welcome, ${user.username}!`);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "../index.html";

            const savedTheme = localStorage.getItem(`${user.username}-theme`);
            if (savedTheme) {
                document.body.classList.add(savedTheme);
                document.getElementById('toggle').checked = savedTheme === 'dark-mode';
            } else {
                document.body.classList.add('light-mode');
                document.getElementById('toggle').checked = false;
            }

            const savedUnit = localStorage.getItem(`${user.username}-unit`);
            if (savedUnit) {
                isCelsius = savedUnit === 'metric';
                document.getElementById('unit-toggle').textContent = `Switch to °${isCelsius ? 'F' : 'C'}`;
            }

        } else {
            alert('Invalid email/username or password. Please try again.');
        }
    });

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        window.location.href = "../index.html";
    }
});
