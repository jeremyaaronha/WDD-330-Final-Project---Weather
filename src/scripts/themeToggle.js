document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('toggle');

    // Obtener la preferencia de tema guardada del usuario
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        toggle.checked = savedTheme === 'dark-mode';
    } else {
        // Si no hay preferencia guardada, establecer modo claro por defecto
        document.body.classList.add('light-mode');
        toggle.checked = false;
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