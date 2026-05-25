// Counter animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    let hasAnimated = false;
    
    function animateCounter(element, target, duration, hasPlus) {
        let startTime = null;
        
        function update(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = hasPlus ? target + '+' : target;
                element.classList.remove('animating');
                element.classList.add('animated');
            }
        }
        
        element.classList.add('animating');
        requestAnimationFrame(update);
    }
    
    function startAnimation() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        // Небольшая задержка, чтобы секция успела стать видимой
        // (main.js устанавливает opacity: 0 на секциях с переходом 0.8s)
        setTimeout(() => {
            statNumbers.forEach(stat => {
                const textContent = stat.textContent.trim();
                const target = parseFloat(textContent);
                const hasPlus = textContent.includes('+');
                
                animateCounter(stat, target, 2000, hasPlus);
            });
        }, 400);
    }
    
    // Используем Intersection Observer для запуска анимации при скролле
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    } else {
        // Fallback: анимация при скролле
        function checkVisibility() {
            const rect = statNumbers[0].getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                startAnimation();
                window.removeEventListener('scroll', checkVisibility);
            }
        }
        window.addEventListener('scroll', checkVisibility, { passive: true });
        checkVisibility();
    }
});