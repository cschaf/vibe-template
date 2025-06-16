document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    if (hamburgerMenu && sidebar) {
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-visible');

            // Toggle aria-expanded attribute
            const isExpanded = sidebar.classList.contains('sidebar-visible');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        if (!hamburgerMenu) {
            console.warn('Hamburger menu button not found.');
        }
        if (!sidebar) {
            console.warn('Sidebar element not found.');
        }
    }
});
