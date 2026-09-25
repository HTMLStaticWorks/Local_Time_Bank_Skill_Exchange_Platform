// Simple client-side search/filter logic for Browse Skills page
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('skillSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const skillCards = document.querySelectorAll('.skill-card');
    const emptyState = document.getElementById('emptyState');

    if (!searchInput || !categoryFilter || skillCards.length === 0) return;

    function filterSkills() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value.toLowerCase();
        let visibleCount = 0;

        skillCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const cardCat = card.getAttribute('data-category').toLowerCase();
            const desc = card.getAttribute('data-desc').toLowerCase();

            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCat === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    searchInput.addEventListener('input', filterSkills);
    categoryFilter.addEventListener('change', filterSkills);
});
