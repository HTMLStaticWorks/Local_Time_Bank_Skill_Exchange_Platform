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

    // Apply correct initial hidden state based on current direction (mobile only)
    if (window.innerWidth < 1024) {
        hideSidebar();
    }

    // RTL-aware helpers
    function isRtl() {
        return document.documentElement.getAttribute('dir') === 'rtl';
    }
    function hideSidebar() {
        if (!sidebar) return;
        if (isRtl()) {
            sidebar.classList.add('translate-x-full');
            sidebar.classList.remove('-translate-x-full');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-full');
        }
    }
    function showSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('-translate-x-full', 'translate-x-full');
    }

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
        if (window.innerWidth < 1024) {
            hideSidebar();
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
            showSidebar();
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            hideSidebar();
        });
    }

    // Re-apply correct hidden class when RTL is toggled at runtime
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            // After RTL toggle fires (direction changes), re-hide sidebar if it's closed on mobile
            setTimeout(() => {
                if (window.innerWidth < 1024) {
                    hideSidebar();
                }
            }, 50);
        });
    }
});
