// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = function() {
        skillBars.forEach(bar => {
            const skill = bar.getAttribute('data-skill');
            bar.style.setProperty('--skill-width', skill + '%');
            
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bar.style.width = skill + '%';
            }
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
    
    // Observe skill bars
    skillBars.forEach(bar => {
        bar.style.opacity = '0';
        bar.style.transition = 'all 1s ease-out 0.5s';
        observer.observe(bar);
    });
    
    // Animate skills on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                showNotification('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                showNotification('Пожалуйста, заполните все поля.', 'error');
            }
        });
    }
    
    // Modal functionality for resume download
    const modal = document.getElementById('resumeModal');
    const closeBtn = document.querySelector('.close');
    
    // Open modal when clicking download buttons
    const downloadButtons = document.querySelectorAll('.portfolio-link, .btn-primary, #downloadResume, #navDownloadResume');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent === 'Скачать резюме' || this.id === 'downloadResume' || this.id === 'navDownloadResume') {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #4f46e5, #3730a3)';
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-avatar');

        if (heroImage) {
            // Только анимируем аватар, основная часть остается фиксированной
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero name if needed
    const heroName = document.querySelector('.hero-name');
    if (heroName && !window.typingApplied) {
        window.typingApplied = true;
        const originalText = heroName.textContent;
        heroName.textContent = '';
        typeWriter(heroName, originalText, 150);
    }
    
    // Portfolio hover effects
    const portfolioItemsList = document.querySelectorAll('.portfolio-item');
    portfolioItemsList.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    
    // Initialize animations
    animateSkills();
    updateActiveNav();
    
        // Portfolio details modal
    function showPortfolioDetails(projectType) {
        const modal = document.getElementById('resumeModal');
        const modalContent = modal.querySelector('.modal-content');
        
        let content = '';
        switch(projectType) {
            case 'dashboard':
                content = `
                    <h3>Дашборд продаж</h3>
                    <p>Комплексное решение для визуализации ключевых бизнес-метрик:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Ежедневные/еженедельные отчеты по продажам</li>
                        <li>Анализ конверсии по каналам привлечения</li>
                        <li>Прогнозирование продаж на основе исторических данных</li>
                        <li>Интерактивные фильтры и срезы</li>
                    </ul>
                    <p>Скачать презентацию проекта:</p>
                    <div class="resume-buttons">
                        <a href="assets/documents/dashboard-presentation.pdf" class="btn btn-primary" download>PDF</a>
                        <a href="#" class="btn btn-secondary" onclick="closeModal(); return false;">Закрыть</a>
                    </div>
                `;
                break;
            case 'rfm':
                content = `
                    <h3>RFM анализ клиентов</h3>
                    <p>Система сегментации клиентов для персонализированных маркетинговых кампаний:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>A/B тестирование различных стратегий взаимодействия</li>
                        <li>Оптимизация маркетингового бюджета</li>
                        <li>Увеличение LTV (Lifetime Value) клиентов</li>
                        <li>Автоматизация обновления сегментов</li>
                    </ul>
                    <p>Скачать отчет по проекту:</p>
                    <div class="resume-buttons">
                        <a href="assets/documents/rfm-analysis.pdf" class="btn btn-primary" download>PDF</a>
                        <a href="#" class="btn btn-secondary" onclick="closeModal(); return false;">Закрыть</a>
                    </div>
                `;
                break;
            default:
                content = `
                    <h3>Подробнее о проекте</h3>
                    <p>Информация о проекте будет доступна в ближайшее время.</p>
                    <div class="resume-buttons">
                        <a href="#" class="btn btn-secondary" onclick="closeModal(); return false;">Закрыть</a>
                    </div>
                `;
        }
        
        modalContent.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('resumeModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Restore original modal content
        modal.querySelector('.modal-content').innerHTML = `
            <span class="close">&times;</span>
            <h3>Скачать резюме</h3>
            <p>Выберите формат резюме для скачивания:</p>
            <div class="resume-buttons">
                <a href="assets/documents/resume.pdf" class="btn btn-primary" download>PDF</a>
                <a href="assets/documents/resume.docx" class="btn btn-secondary" download>DOCX</a>
            </div>
        `;
    }
    
    console.log('Website initialized successfully!');
});