// Dashboard logic for Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar links
    const sidebarLinks = document.querySelectorAll('.dashboard-nav-link');
    // Content sections
    const contentSections = document.querySelectorAll('.dashboard-section');
    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    if (!sidebarLinks.length || !contentSections.length) return;

    // Switch tabs
    function switchTab(targetId) {
        // Update active link
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('bg-primary/10', 'text-primary', 'border-primary');
                link.classList.remove('text-theme-muted', 'border-transparent', 'hover:bg-theme');
            } else {
                link.classList.remove('bg-primary/10', 'text-primary', 'border-primary');
                link.classList.add('text-theme-muted', 'border-transparent', 'hover:bg-theme');
            }
        });

        // Show target section, hide others
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth < 1024 && sidebar) {
            sidebar.classList.add('-translate-x-full');
        }
    }

    // Attach click events
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId !== 'logout') {
                switchTab(targetId);
            } else {
                window.location.href = 'index.html'; // logout
            }
        });
    });

    // Mobile sidebar toggles
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });
    }
});
