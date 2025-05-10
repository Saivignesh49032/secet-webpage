document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded and DOM ready');

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) {
        console.error('Error: #dark-mode-toggle button not found');
        return;
    }
    console.log('Dark mode toggle button found');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
        console.log('Loaded dark mode from localStorage');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';
        console.log('Loaded light mode from localStorage');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        console.log('Dark mode toggle clicked');
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        console.log(`Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
    });

    // Other main.js functionality (e.g., carousel, if present)
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const items = document.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        function showSlide(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }

        if (prevBtn && nextBtn && items.length > 0) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                showSlide(currentIndex);
            });
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                showSlide(currentIndex);
            });
        }
    }
});