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

    // Carousel Logic
    const initCarousels = () => {
        document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
            const container = wrapper.querySelector('.carousel-container');
            const leftBtn = wrapper.querySelector('.scroll-btn.left');
            const rightBtn = wrapper.querySelector('.scroll-btn.right');

            if (!container || !leftBtn || !rightBtn) return;

            const updateButtons = () => {
                const scrollLeft = container.scrollLeft;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;
                // Use a small tolerance for float calculation differences
                const tolerance = 2;

                if (scrollLeft > tolerance) {
                    leftBtn.style.opacity = '1';
                    leftBtn.style.pointerEvents = 'auto';
                } else {
                    leftBtn.style.opacity = '0';
                    leftBtn.style.pointerEvents = 'none';
                }

                if (scrollLeft < maxScrollLeft - tolerance) {
                    rightBtn.style.opacity = '1';
                    rightBtn.style.pointerEvents = 'auto';
                } else {
                    rightBtn.style.opacity = '0';
                    rightBtn.style.pointerEvents = 'none';
                }
            };

            container.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            // Initial check after a short delay to ensure layout is computed
            setTimeout(updateButtons, 100);

            leftBtn.addEventListener('click', () => {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', () => {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            });
        });
    };

    initCarousels();
});
