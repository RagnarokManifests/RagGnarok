document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // Translations
    // ------------------------------------------------------------------------
    const translations = {
        es: {
            nav_features: "Características",
            nav_interface: "Interfaz",
            nav_download: "Descargar",
            hero_subtitle: "La herramienta definitiva para dominar tu biblioteca de juegos. Potencia, velocidad y control total en un solo lugar.",
            btn_download: "Descargar Ahora",
            btn_discord: "Unirse a Discord",
            features_title: "Características",
            feature_1_title: "Velocidad Extrema",
            feature_1_desc: "Descargas optimizadas y ejecución instantánea. No pierdas tiempo esperando.",
            feature_2_title: "Seguridad Total",
            feature_2_desc: "Protección avanzada para tu cuenta y tus archivos. Juega sin preocupaciones.",
            feature_3_title: "Auto-Optimización",
            feature_3_desc: "Ajustes automáticos para el máximo rendimiento en cada juego.",
            feature_4_title: "Actualizaciones",
            feature_4_desc: "Siempre al día. Ragnarok se actualiza silenciosamente para darte lo último.",
            showcase_title: "Interfaz Divina",
            showcase_desc: "Vista previa de la interfaz del programa...",
            footer_rights: "&copy; 2025 Ragnarok Tools. Todos los derechos reservados."
        },
        en: {
            nav_features: "Features",
            nav_interface: "Interface",
            nav_download: "Download",
            hero_subtitle: "The ultimate tool to dominate your game library. Power, speed, and total control in one place.",
            btn_download: "Download Now",
            btn_discord: "Join Discord",
            features_title: "Features",
            feature_1_title: "Extreme Speed",
            feature_1_desc: "Optimized downloads and instant execution. Don't waste time waiting.",
            feature_2_title: "Total Security",
            feature_2_desc: "Advanced protection for your account and files. Play without worries.",
            feature_3_title: "Auto-Optimization",
            feature_3_desc: "Automatic adjustments for maximum performance in every game.",
            feature_4_title: "Updates",
            feature_4_desc: "Always up to date. Ragnarok updates silently to give you the latest.",
            showcase_title: "Divine Interface",
            showcase_desc: "Program interface preview...",
            footer_rights: "&copy; 2025 Ragnarok Tools. All rights reserved."
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'es';

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'es' ? 'en' : 'es';
            langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'P' && key === 'footer_rights') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // Smooth Scrolling
    // ------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ------------------------------------------------------------------------
    // Intersection Observer for Entrance Animations
    // ------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.hero-content, .glass-panel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid rgba(255, 69, 0, 0.2)';
            }
        });
    }

    // ------------------------------------------------------------------------
    // Fire & Ash Particle System
    // ------------------------------------------------------------------------
    const particleContainer = document.getElementById('particles-container');
    const particleCount = 50; // Number of particles

    function createParticle() {
        if (!particleContainer) return;
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize properties
        const size = Math.random() * 5 + 2; // 2px to 7px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const opacity = Math.random() * 0.6 + 0.2; // 0.2 to 0.8
        const drift = (Math.random() - 0.5) * 100; // -50px to 50px

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--opacity', opacity);
        particle.style.setProperty('--drift', `${drift}px`);

        // Color variation (Yellow/Orange/Red)
        const colors = ['#ff4500', '#ff8c00', '#ffd700', '#ff0000'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Blur effect for some particles
        if (Math.random() > 0.5) {
            particle.style.filter = 'blur(1px)';
        }

        particleContainer.appendChild(particle);

        // Remove particle after animation ends to prevent DOM overload
        setTimeout(() => {
            particle.remove();
            createParticle(); // Create a new one to replace it
        }, duration * 1000);
    }

    // Initialize particles
    if (particleContainer) {
        for (let i = 0; i < particleCount; i++) {
            // Stagger initialization
            setTimeout(createParticle, Math.random() * 5000);
        }
    }

    // ------------------------------------------------------------------------
    // 3D Tilt Effect for Feature Cards
    // ------------------------------------------------------------------------
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetCard);
    });

    function handleHover(e) {
        const card = this;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetCard() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
});
