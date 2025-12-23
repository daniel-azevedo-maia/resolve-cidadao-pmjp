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
    const initCarousels = () => {
        document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
            const container = wrapper.querySelector('.carousel-container');
            const leftBtn = wrapper.querySelector('.scroll-btn.left');
            const rightBtn = wrapper.querySelector('.scroll-btn.right');

            if (!container || !leftBtn || !rightBtn) return;

            const updateButtons = () => {
                const scrollLeft = container.scrollLeft;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                // Tolerance of 2px for float/zoom issues
                leftBtn.style.opacity = scrollLeft > 2 ? '1' : '0';
                leftBtn.style.pointerEvents = scrollLeft > 2 ? 'auto' : 'none';

                rightBtn.style.opacity = scrollLeft < maxScrollLeft - 2 ? '1' : '0';
                rightBtn.style.pointerEvents = scrollLeft < maxScrollLeft - 2 ? 'auto' : 'none';
            };

            // Scroll Event
            container.addEventListener('scroll', updateButtons);

            // Resize Event
            window.addEventListener('resize', updateButtons);

            // Initial Check
            updateButtons();

            // Click Handlers
            leftBtn.addEventListener('click', () => {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', () => {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            });
        });
    };

    initCarousels();

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
