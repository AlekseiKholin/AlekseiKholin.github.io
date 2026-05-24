// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });

    // Update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    // Add smooth transitions for theme changes
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        body {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .hero {
            transition: background 0.3s ease;
        }
        
        .section-line {
            transition: background 0.3s ease;
        }
        
        .stat-item, .skill-category, .portfolio-item, .contact-item, .contact-form {
            transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        
        .navbar {
            transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        
        .nav-link {
            transition: color 0.3s ease;
        }
        
        .btn {
            transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .tag {
            transition: background 0.3s ease, color 0.3s ease;
        }
        
        .social-link {
            transition: background 0.3s ease, transform 0.3s ease;
        }
        
        .modal {
            transition: background 0.3s ease;
        }
        
        .modal-content {
            transition: background 0.3s ease, color 0.3s ease;
        }
        
        .form-group input,
        .form-group textarea {
            transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        
        .close {
            transition: color 0.3s ease;
        }
        
        .hero-avatar {
            transition: box-shadow 0.3s ease;
        }
        
        .stat-number {
            transition: color 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    console.log('Theme toggle initialized successfully!');
});