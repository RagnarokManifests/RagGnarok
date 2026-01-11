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

// Modal Logic
// ------------------------------------------------------------------------
// Auth System (LocalStorage 'Database')
// ------------------------------------------------------------------------

const AuthService = {
    DB_KEY: 'swa_users_db',
    CURRENT_USER_KEY: 'swa_current_user',

    getUsers() {
        return JSON.parse(localStorage.getItem(this.DB_KEY) || '{}');
    },

    saveUser(email, userData) {
        const users = this.getUsers();
        users[email] = userData;
        localStorage.setItem(this.DB_KEY, JSON.stringify(users));
    },

    getUser(email) {
        const users = this.getUsers();
        return users[email];
    },

    login(email) {
        const user = this.getUser(email);
        if (user) {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    },

    register(email, name, avatarColor, picture = null) {
        if (this.getUser(email)) return null; // Already exists

        // Generate Permanent Code
        const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const segment2 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `SWA2-${segment1}-${segment2}`;

        const newUser = {
            email,
            name,
            avatarColor,
            picture,
            code,
            registeredAt: new Date().toISOString()
        };

        this.saveUser(email, newUser);
        this.login(email);
        return newUser;
    },

    updateUser(email, updates) {
        let user = this.getUser(email);
        if (!user) return null;

        // Merge updates
        user = { ...user, ...updates };
        this.saveUser(email, user);

        // Update session if it's current user
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.email === email) {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        }
        return user;
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY));
    },

    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        updateNavbarProfile(null); // Reset navbar
        resetToProviders();        // Reset modal to login screen
    }
};

function updateNavbarProfile(user) {
    const btnLogin = document.querySelector('.btn-login');
    if (!btnLogin) return;

    if (user) {
        // Show Avatar
        btnLogin.innerHTML = '';
        btnLogin.style.padding = "5px 15px"; // Adjust padding

        const img = document.createElement('img');
        if (user.picture) {
            img.src = user.picture;
        } else {
            // Fallback
            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.avatarColor.replace('#', '')}&color=fff`;
        }

        img.style.width = '28px';
        img.style.height = '28px';
        img.style.borderRadius = '50%';
        img.style.verticalAlign = 'middle';
        img.style.border = '2px solid #ff4500';

        btnLogin.appendChild(img);

        const span = document.createElement('span');
        span.innerText = " " + user.name.split(' ')[0]; // First name only
        span.style.marginLeft = "8px";
        span.style.fontSize = "14px";
        btnLogin.appendChild(span);

    } else {
        // Show Login
        btnLogin.innerHTML = '<i class="fa-solid fa-user"></i> Login';
        btnLogin.style.padding = ""; // Reset
    }
}

// ------------------------------------------------------------------------
// Modal & New Login Flow Logic
// ------------------------------------------------------------------------

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('active');

    // Check if already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
        showGeneratedCodeSection(currentUser);
    } else {
        resetToProviders();
    }
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}

function resetToProviders() {
    // Hide all sections
    document.getElementById('step-providers').style.display = 'block';
    document.getElementById('step-google-login').style.display = 'none';
    document.getElementById('step-generate').style.display = 'none';
    document.getElementById('manual-entry-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
}

function showGoogleLoginSimulation() {
    document.getElementById('step-providers').style.display = 'none';
    document.getElementById('step-google-login').style.display = 'block';
}

function simulateDiscordLogin() {
    // Discord Simulation (Direct "Authorize" popup feel)
    const btn = document.querySelector('.btn-discord');
    const originalContent = btn.innerHTML;

    // Simulate "Select Account" 
    const mockEmail = "gamer.tag#1234";
    const mockName = "GamerTag";

    btn.innerHTML = 'Connecting to Discord...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        let user = AuthService.login(mockEmail);

        if (!user) {
            // Register new user automatically
            const color = "#5865F2"; // Discord blurple
            user = AuthService.register(mockEmail, mockName, color);
        }

        // Show Account
        showGeneratedCodeSection(user);

        // Reset button
        btn.innerHTML = originalContent;
        btn.style.opacity = '1';
    }, 1500);
}

function simulateGoogleLoginProcess() {
    const btn = document.querySelector('#step-google-login .btn-google');
    const originalContent = btn.innerHTML;

    // Simulate "Select Account" 
    const mockEmail = "simon.developer@gmail.com";
    const mockName = "Simon Developer";

    btn.innerHTML = 'Verificando...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        let user = AuthService.login(mockEmail);

        if (!user) {
            // Register new user automatically
            const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            user = AuthService.register(mockEmail, mockName, color);
        }

        // Show Account
        showGeneratedCodeSection(user);

        // Reset button
        btn.innerHTML = originalContent;
        btn.style.opacity = '1';
    }, 1500);
}

function showGeneratedCodeSection(user) {
    // Hide all
    document.getElementById('step-providers').style.display = 'none';
    document.getElementById('step-google-login').style.display = 'none';
    document.getElementById('manual-entry-section').style.display = 'none';

    // Show Generate
    document.getElementById('step-generate').style.display = 'block';

    // Populate Data
    document.getElementById('user-name').innerText = user.name;

    // Handle Avatar (Image vs Initials)
    const avatarEl = document.getElementById('user-avatar');
    avatarEl.innerHTML = ''; // Clear previous

    if (user.picture) {
        const img = document.createElement('img');
        img.src = user.picture;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        avatarEl.appendChild(img);
        avatarEl.style.backgroundColor = 'transparent';
    } else {
        avatarEl.innerText = user.name.charAt(0).toUpperCase();
        avatarEl.style.backgroundColor = user.avatarColor;
    }

    // Show code directly
    document.getElementById('generated-code').innerText = user.code;
    document.getElementById('code-display-area').style.display = 'block';

    // Hide "Generate" button 
    document.getElementById('generation-controls').style.display = 'none';

    // --- Edit Profile Logic ---
    const btnEdit = document.getElementById('btn-edit-profile');
    const formEdit = document.getElementById('edit-profile-form');
    const btnCancel = document.getElementById('btn-cancel-edit');
    const btnSave = document.getElementById('btn-save-edit');
    const inputName = document.getElementById('edit-name-input');
    const inputAvatar = document.getElementById('edit-avatar-input');

    if (btnEdit && formEdit) {
        // Clear previous listeners to avoid duplicates if re-rendered
        btnEdit.onclick = null;
        btnCancel.onclick = null;
        btnSave.onclick = null;

        btnEdit.onclick = () => {
            formEdit.style.display = 'block';
            inputName.value = user.name;
        };

        btnCancel.onclick = () => {
            formEdit.style.display = 'none';
        };

        btnSave.onclick = () => {
            const newName = inputName.value.trim();
            const file = inputAvatar.files[0];
            const updates = {};

            if (newName && newName !== user.name) {
                updates.name = newName;
            }

            if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    updates.picture = reader.result; // Base64 string
                    AuthService.updateUser(user.email, updates);
                    refreshUI();
                }
                reader.readAsDataURL(file);
            } else {
                if (Object.keys(updates).length > 0) {
                    AuthService.updateUser(user.email, updates);
                    refreshUI();
                } else {
                    formEdit.style.display = 'none';
                }
            }
        };

        function refreshUI() {
            const updatedUser = AuthService.getUser(user.email);
            formEdit.style.display = 'none';
            showGeneratedCodeSection(updatedUser); // Recursively re-render
            updateNavbarProfile(updatedUser);
        }
    }
}

function showManualEntry() {
    document.getElementById('step-providers').style.display = 'none';
    document.getElementById('manual-entry-section').style.display = 'block';
}

function showRegisterSection() {
    showGoogleLoginSimulation();
}

// ... existing generation and copy code functions ...

function simulateRegistration() {
    const btn = document.querySelector('#generation-controls .btn-primary');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GENERANDO...';
    btn.disabled = true;

    setTimeout(() => {
        // Generate random code
        const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const segment2 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `SWA2-${segment1}-${segment2}`;

        // Show result
        document.getElementById('generated-code').textContent = code;
        document.getElementById('generation-controls').style.display = 'none';
        document.getElementById('code-display-area').style.display = 'block';

        btn.innerHTML = originalText;
        btn.disabled = false;

        // Auto fill manual entry (for convenience)
        document.getElementById('webActivationCode').value = code;
    }, 2000);
}

function copyCode() {
    const code = document.getElementById('generated-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert("¡Código copiado al portapapeles!");
    });
}

function startGuestMode() {
    alert("Iniciando Modo Invitado (Simulación)...");
    setTimeout(() => {
        closeLoginModal();
    }, 1000);
}

function webLogin() {
    const code = document.getElementById('webActivationCode').value;
    if (code.length < 5) {
        alert("Por favor ingresa un código válido.");
        return;
    }
    // Mock login for web demo
    alert("Simulando conexión a API SWA...\nCódigo: " + code);
    setTimeout(() => {
        closeLoginModal();
        alert("¡Éxito! (Demo)");
    }, 1500);
}


// ------------------------------------------------------------------------
// External Popup Auth Logic (Overrides previous functions)
// ------------------------------------------------------------------------

function openAuthPopup(provider) {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    // Open auth.html as a popup
    const popup = window.open(
        `auth.html?provider=${provider}`,
        'SWA_Auth',
        `width=${width},height=${height},top=${top},left=${left}`
    );
}

// Global Message Listener for Auth Popup
window.addEventListener('message', (event) => {
    if (event.data.type === 'AUTH_SUCCESS') {
        const { provider, email } = event.data;
        handleAuthSuccess(email, provider);
    }
});

function handleAuthSuccess(email, provider) {
    // Determine Name per provider (simulated)
    let name = "User";
    let color = "#1a73e8";

    if (provider === 'discord') {
        name = "GamerTag";
        color = "#5865F2";
    } else {
        name = "Simon Developer";
        color = "#ea4335";
    }

    let user = AuthService.login(email);
    if (!user) {
        user = AuthService.register(email, name, color);
    }

    updateNavbarProfile(user);
    showGeneratedCodeSection(user);
}

// Override previous simulation functions to use Popup
function showGoogleLoginSimulation() {
    simulateGoogleLoginProcess(); // Redirect to Real Logic directly
}

function simulateDiscordLogin() {
    openAuthPopup('discord');
}

function simulateGoogleLoginProcess() {
    // TRIGGER REAL GOOGLE PROMPT
    if (typeof google !== 'undefined') {
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // Determine reason and warn user
                const reason = notification.getNotDisplayedReason();
                console.log("Google Prompt skipped:", reason);
                alert("Google Sign-In bloqueado o falló. Razón: " + reason + "\n\nIntenta desactivar el bloqueador de anuncios (Brave Shields).");
            }
        });
    } else {
        alert("Error: Librería de Google no cargada.\n\nEs posible que tu navegador (Brave/AdBlock) la esté bloqueando.");
    }
}

// ------------------------------------------------------------------------
// REAL GOOGLE IDENTITY SERVICES IMPLEMENTATION
// ------------------------------------------------------------------------

function handleCredentialResponse(response) {
    // This is the Real JWT Token from Google
    console.log("Encoded JWT ID token: " + response.credential);

    // In a production app, you would send this 'response.credential' 
    // to your backend for verification. 
    // Since we are client-side only (GitHub Pages), we decod it locally 
    // just to show the user data. (SECURITY NOTE: Verification typically needs backend)

    const responsePayload = decodeJwtResponse(response.credential);

    const email = responsePayload.email;
    const name = responsePayload.name;
    const picture = responsePayload.picture;
    const color = "#ffffff"; // Default

    // Login/Register in our LocalStorage system
    let user = AuthService.login(email);
    if (!user) {
        user = AuthService.register(email, name, color, picture);
        // We could save the picture URL too if we updated AuthService
    }

    updateNavbarProfile(user);

    showGeneratedCodeSection(user);
    if (document.getElementById('user-avatar')) {
        // Show real Google photo
        const avatar = document.getElementById('user-avatar');
        avatar.innerHTML = `<img src="${picture}" style="width:100%; height:100%; border-radius:50%;">`;
        avatar.style.backgroundColor = "transparent";
    }
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Initialize on Load
window.onload = function () {
    // Restore Session Visuals
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
        updateNavbarProfile(currentUser);
    }

    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: "388530458879-liea4p3usr24asno7ue2fm75nhvk7org.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            auto_select: true, // Try to auto-sign in
            cancel_on_tap_outside: false
        });

        // Also render a button in the specific div if we want standard button
        // google.accounts.id.renderButton(document.getElementById("google-btn-container"), ...);
    }
}
