document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('toggle');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        const savedTheme = localStorage.getItem(`${loggedInUser.username}-theme`);
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            toggle.checked = savedTheme === 'dark-mode';
        } else {
            document.body.classList.add('light-mode');
            toggle.checked = false;
        }
    } else {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            toggle.checked = savedTheme === 'dark-mode';
        } else {
            document.body.classList.add('light-mode');
            toggle.checked = false;
        }
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            if (loggedInUser) {
                localStorage.setItem(`${loggedInUser.username}-theme`, 'dark-mode');
            }
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (loggedInUser) {
                localStorage.setItem(`${loggedInUser.username}-theme`, 'light-mode');
            }
            localStorage.setItem('theme', 'light-mode');
        }
    });
});
