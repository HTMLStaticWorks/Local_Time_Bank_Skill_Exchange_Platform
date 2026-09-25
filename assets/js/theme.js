// Theme toggling functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle');

    // Init Theme
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Init RTL
    const currentRtl = localStorage.getItem('rtl') === 'true';
    if (currentRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    updateRtlIcon(currentRtl);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const nextTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            updateThemeIcon(nextTheme);
        });
    });

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            const nextDir = isRtl ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', nextDir);
            localStorage.setItem('rtl', !isRtl);
            updateRtlIcon(!isRtl);
        });
    });
});

function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('#theme-icon, #mobile-theme-icon');
    icons.forEach(icon => {
        if(theme === 'dark') {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateRtlIcon(isRtl) {
    const icons = document.querySelectorAll('#rtl-icon, #mobile-rtl-icon');
    icons.forEach(icon => {
        if(isRtl) {
            icon.setAttribute('data-lucide', 'arrow-right-left');
        } else {
            icon.setAttribute('data-lucide', 'arrow-right-left');
        }
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
