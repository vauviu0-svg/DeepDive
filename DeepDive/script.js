document.addEventListener('DOMContentLoaded', () => {
    // Автоматическая подсветка активного пункта меню на основе URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Обработка формы публикации отчета (Алгоритм из Темы 1)
    const reportForm = document.getElementById('add-report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Отчет успешно опубликован!');
            reportForm.reset();
            window.location.href = 'reports.html';
        });
    }

    // Алгоритм управления местами в экспедициях
    const joinButtons = document.querySelectorAll('.btn-join-expedition');
    joinButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const currentSlotsEl = card.querySelector('.current-slots');
            const maxSlotsEl = card.querySelector('.max-slots');
            
            if (currentSlotsEl && maxSlotsEl) {
                let current = parseInt(currentSlotsEl.textContent);
                let max = parseInt(maxSlotsEl.textContent);
                
                if (current < max) {
                    current++;
                    currentSlotsEl.textContent = current;
                    this.textContent = 'Заявка подана';
                    this.disabled = true;
                    this.classList.add('btn-secondary');
                    alert('Ваша заявка на участие принята и отправлена организатору!');
                } else {
                    alert('Ошибка: Свободные места в данной экспедиции закончились.');
                }
            }
        });
    });

    // Интерактивный поиск и фильтрация пещер на клиенте
    const searchInput = document.getElementById('cave-search');
    const regionFilter = document.getElementById('cave-region');
    const diffFilter = document.getElementById('cave-difficulty');

    function filterCaves() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const region = regionFilter ? regionFilter.value : '';
        const diff = diffFilter ? diffFilter.value : '';

        const caveCards = document.querySelectorAll('.cave-card');
        caveCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const cardRegion = card.dataset.region;
            const cardDifficulty = card.dataset.difficulty;

            const matchesQuery = name.includes(query);
            const matchesRegion = !region || cardRegion === region;
            const matchesDiff = !diff || cardDifficulty === diff;

            if (matchesQuery && matchesRegion && matchesDiff) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterCaves);
    if (regionFilter) regionFilter.addEventListener('change', filterCaves);
    if (diffFilter) diffFilter.addEventListener('change', filterCaves);
});