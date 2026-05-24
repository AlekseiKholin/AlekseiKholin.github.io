// Simple counter animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation function
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        let isAnimating = true;

        // Add initial animation effects
        element.style.transition = 'color 0.3s ease, transform 0.3s ease';
        element.style.color = 'var(--primary-color)';
        element.style.transform = 'scale(1.1)';

        function updateCounter() {
            if (!isAnimating) return;

            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                // Return to normal state after animation
                setTimeout(() => {
                    element.style.color = '';
                    element.style.transform = 'scale(1)';
                    element.style.transition = '';
                    // Mark as fully animated
                    element.classList.add('animated');
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                
                // Check if not already animated
                if (!stat.classList.contains('animated')) {
                    const target = parseInt(stat.textContent);
                    const hasPlus = stat.textContent.includes('+');
                    
                    // Reset to 0 for animation
                    stat.textContent = '0';
                    stat.classList.add('animating');
                    
                    // Start counter animation
                    animateCounter(stat, target);
                    
                    // Re-add the + symbol after animation
                    if (hasPlus) {
                        setTimeout(() => {
                            if (stat.classList.contains('animated')) {
                                stat.textContent = target + '+';
                            }
                        }, 2100);
                    }
                    
                    // Stop observing after animation completes
                    observer.unobserve(stat);
                }
            }
        });
    }, observerOptions);

    // Observe all stat number elements
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Initially observe all stats
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Fallback: trigger animation on scroll for users without Intersection Observer support
    function animateStatsFallback() {
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                const rect = stat.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const target = parseInt(stat.textContent);
                    const hasPlus = stat.textContent.includes('+');
                    
                    stat.textContent = '0';
                    stat.classList.add('animating');
                    animateCounter(stat, target);
                    
                    if (hasPlus) {
                        setTimeout(() => {
                            if (stat.classList.contains('animated')) {
                                stat.textContent = target + '+';
                            }
                        }, 2100);
                    }
                }
            }
        });
    }

    // Add fallback event listener
    window.addEventListener('scroll', animateStatsFallback);

    // Clean up function to prevent memory leaks
    const cleanup = () => {
        window.removeEventListener('scroll', animateStatsFallback);
        observer.disconnect();
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
});