document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('.section-group');

    // Modal Elements
    const modalOverlay = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const tag = card.querySelector('.card-tag').textContent.toLowerCase();
            const keywords = card.getAttribute('data-keywords') || '';

            const isVisible = title.includes(searchTerm) ||
                tag.includes(searchTerm) ||
                keywords.includes(searchTerm);

            if (isVisible) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // Hide empty sections
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.card:not(.hidden)');
            if (visibleCards.length === 0) {
                section.classList.add('hidden');
                section.previousElementSibling.classList.add('hidden'); // Hide title
            } else {
                section.classList.remove('hidden');
                section.previousElementSibling.classList.remove('hidden'); // Show title
            }
        });
    });

    // Modal Handling
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            e.preventDefault(); // Prevent link default

            const card = btn.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const icon = card.querySelector('.card-icon').textContent;
            const description = card.getAttribute('data-description');

            modalTitle.textContent = title;
            modalIcon.textContent = icon;
            modalDescription.textContent = description || "Sem descrição disponível.";

            modalOverlay.classList.add('active');
        });
    });

    // Carousel Scroll Logic
    document.querySelectorAll('.scroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const wrapper = btn.closest('.carousel-wrapper');
            const container = wrapper.querySelector('.carousel-container');
            const scrollAmount = 300; // Adjust scroll distance

            if (btn.classList.contains('left')) {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });


    // Close Modal
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
