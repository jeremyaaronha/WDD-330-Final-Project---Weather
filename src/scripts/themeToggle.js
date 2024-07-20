document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('toggle');

    // Check for saved user preferences and apply
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        toggle.checked = savedTheme === 'dark-mode';
    }

    // Event listener for the toggle button
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
});
