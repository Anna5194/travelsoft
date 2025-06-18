document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const slideWidth = slides[0].offsetWidth + 20;
    
    let currentPosition = 0;
    let maxPosition = -(slideWidth * (slides.length - 5));
    
    const cloneSlides = Array.from(slides).slice(0, 5).map(slide => slide.cloneNode(true));
    cloneSlides.forEach(slide => track.appendChild(slide));
    
    function moveCarousel() {
        track.style.transform = `translateX(${currentPosition}px)`;

        if (currentPosition <= maxPosition - slideWidth * 5) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentPosition = 0;
                track.style.transform = `translateX(${currentPosition}px)`;
                setTimeout(() => track.style.transition = 'transform 0.5s ease');
            }, 500);
        }
        
        if (currentPosition > 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentPosition = maxPosition;
                track.style.transform = `translateX(${currentPosition}px)`;
                setTimeout(() => track.style.transition = 'transform 0.5s ease');
            }, 500);
        }
    }
    
    nextBtn.addEventListener('click', function() {
        currentPosition -= slideWidth;
        moveCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentPosition += slideWidth;
        moveCarousel();
    });
    
    // Автопрокрутка
    let autoScroll = setInterval(function() {
        currentPosition -= slideWidth;
        moveCarousel();
    }, 3000);
    
    // Остановка автопрокрутки при наведении
    track.addEventListener('mouseenter', function() {
        clearInterval(autoScroll);
    });
    
    track.addEventListener('mouseleave', function() {
        autoScroll = setInterval(function() {
            currentPosition -= slideWidth;
            moveCarousel();
        }, 3000);
    });
});


// Скрипт для открытия/закрытия меню
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    menuBtn.addEventListener('click', function() {
        if (menuOverlay.classList.contains('active')) {
            // Если меню открыто - закрываем
            menuOverlay.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Если меню закрыто - открываем
            menuOverlay.style.display = 'block';
            setTimeout(() => {
                menuOverlay.classList.add('active');
                menuBtn.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Закрытие при клике вне меню
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            menuBtn.classList.remove('active');
            setTimeout(() => {
                menuOverlay.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем всплытие
        searchInput.classList.toggle('active');
        searchBtn.classList.toggle('active');
        
        if (searchInput.classList.contains('active')) {
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        }
    });
    
    // Закрытие при клике вне поля поиска
    document.addEventListener('click', function() {
        if (searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
            searchBtn.classList.remove('active');
        }
    });
    
    // Предотвращаем закрытие при клике на само поле ввода
    searchInput.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});