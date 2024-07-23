document.addEventListener("DOMContentLoaded", () => {
    const rippleBackground = document.querySelector('.ripple-background');

    function checkWindowSize() {
        if (window.innerWidth < 500) {
            if (rippleBackground) {
                rippleBackground.remove();
            }
        } else {
            if (!document.querySelector('.ripple-background')) {
                const rippleDiv = document.createElement('div');
                rippleDiv.classList.add('ripple-background');
                rippleDiv.innerHTML = `
                    <div class='circle xxlarge shade1'></div>
                    <div class='circle xlarge shade2'></div>
                    <div class='circle large shade3'></div>
                    <div class='circle mediun shade4'></div>
                    <div class='circle small shade5'></div>
                `;
                document.body.appendChild(rippleDiv);
            }
        }
    }

    // Check window size on page load
    checkWindowSize();

    // Check window size on resize
    window.addEventListener('resize', checkWindowSize);
});
