document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('toggle');

    // Preferencias del usuario (PENDIENTES)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        toggle.checked = savedTheme === 'dark-mode';
    }

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
