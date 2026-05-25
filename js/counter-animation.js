// Simple counter animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем поддержку Intersection Observer
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    
    // Флаг для предотвращения двойной анимации
    let isAnimating = false;
    
    // Counter animation function
    function animateCounter(element, target, duration = 2000, hasPlus = false) {
        let start = 0;
        const increment = target / (duration / 16);
        let elementAnimating = true;

        // Добавляем класс анимации вместо inline-стилей
        element.classList.add('animating');

        function updateCounter() {
            if (!elementAnimating) return;

            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = hasPlus ? Math.floor(target) + '+' : target;
                // Return to normal state after animation
                setTimeout(() => {
                    element.classList.remove('animating');
                    element.classList.add('animated');
                    elementAnimating = false;
                    isAnimating = false;
                }, 300);
            }
        }

        updateCounter();
    }

    // Setup Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = hasIntersectionObserver ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                const stats = Array.from(statNumbers).filter(stat => 
                    !stat.classList.contains('animated') && !stat.classList.contains('animating')
                );
                
                if (stats.length > 0) {
                    isAnimating = true;
                    
                    // Запускаем анимацию для всех элементов одновременно
                    stats.forEach(stat => {
                        // Извлекаем числовое значение и наличие + символа
                        const textContent = stat.textContent.trim();
                        const target = parseFloat(textContent);
                        const hasPlus = textContent.includes('+');

                        // Reset to empty for animation
                        stat.textContent = '';
                        stat.classList.add('animating');

                        // Start counter animation
                        animateCounter(stat, target, 2000, hasPlus);
                    });
                }
            }
        });
    }, observerOptions) : null;

    // Observe all stat number elements
    const statNumbers = document.querySelectorAll('.stat-number');

    // Initially observe all stats (если Intersection Observer поддерживается)
    if (hasIntersectionObserver && observer) {
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    } else {
        // Если Intersection Observer не поддерживается, запускаем анимацию сразу
        triggerInitialAnimation();
    }

    // Функция для первоначальной анимации (fallback)
    function triggerInitialAnimation() {
        const stats = Array.from(statNumbers).filter(stat => 
            !stat.classList.contains('animated') && !stat.classList.contains('animating')
        );
        
        if (stats.length > 0 && !isAnimating) {
            isAnimating = true;
            
            // Запускаем анимацию для всех элементов одновременно
            stats.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const textContent = stat.textContent.trim();
                    const target = parseFloat(textContent);
                    const hasPlus = textContent.includes('+');

                    // Reset to empty for animation
                    stat.textContent = '';
                    stat.classList.add('animating');
                    animateCounter(stat, target, 2000, hasPlus);
                }
            });
        }
    }

    // Оптимизированный обработчик scroll события
    function animateStatsFallback() {
        // Проверяем, есть ли элементы, которые нужно анимировать
        const needsAnimation = Array.from(statNumbers).some(stat => 
            !stat.classList.contains('animated') && !stat.classList.contains('animating')
        );
        
        if (needsAnimation && !isAnimating) {
            triggerInitialAnimation();
        }
    }

    // Добавляем throttle для оптимизации scroll событий
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                animateStatsFallback();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // Clean up function to prevent memory leaks
    const cleanup = () => {
        window.removeEventListener('scroll', animateStatsFallback);
        observer.disconnect();
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
});