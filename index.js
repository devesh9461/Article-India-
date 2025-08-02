// Select all necessary DOM elements for Navbar (Existing Code)
const navToggleBtn = document.getElementById('nav-toggle-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.querySelector('.overlay');
const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
const body = document.body;

// --- Dropdown logic (desktop: hover, mobile: click tap) ---

// Detect touch device
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const dropdowns = document.querySelectorAll('.nav-links .dropdown');
dropdowns.forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    // On touch devices, toggle on click
    if (isTouch) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            drop.classList.toggle('active');
            // Close others for neatness
            dropdowns.forEach(other => {
                if (other !== drop) other.classList.remove('active');
            });
        });
        // close dropdown if clicking outside
        document.body.addEventListener('click', function(e) {
            if (!drop.contains(e.target)) drop.classList.remove('active');
        });
    }
    // On mouse devices, let CSS :hover work, optionally focus with keyboard
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drop.classList.toggle('active');
        }
    });
});


// Function to toggle the mobile menu and overlay (Existing Code)
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

// Function to toggle dark mode (Existing Code)
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Change icons for all dark mode toggles
    darkModeToggles.forEach(btn => {
        const icon = btn.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Event Listeners for Navbar (Existing Code)
navToggleBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);
darkModeToggles.forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
});


//  Scroll Animation Logic 
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 
});

hiddenElements.forEach((el) => observer.observe(el));


// Futuristic Footer Newsletter Functionality
const futuristicNewsletterForm = document.getElementById('futuristic-newsletter-form');
const footerEmailInput = document.getElementById('footer-email-input');

if (futuristicNewsletterForm) {
    futuristicNewsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = footerEmailInput.value.trim();
        const submitBtn = this.querySelector('.footer-subscribe-btn');
        const originalBtnText = submitBtn.textContent;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showFooterNotification('Please enter a valid email address', 'error');
            footerEmailInput.focus();
            return;
        }
        
        // Simulate form submission with futuristic effect
        submitBtn.textContent = 'PROCESSING...';
        submitBtn.style.background = 'linear-gradient(135deg, #0284c7, #0ea5e9)';
        footerEmailInput.disabled = true;
        
        // Add loading effect
        const loadingInterval = setInterval(() => {
            if (submitBtn.textContent.endsWith('...')) {
                submitBtn.textContent = 'PROCESSING';
            } else {
                submitBtn.textContent += '.';
            }
        }, 500);
        
        setTimeout(() => {
            clearInterval(loadingInterval);
            submitBtn.textContent = 'CONNECTED!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            footerEmailInput.value = '';
            showFooterNotification('Successfully connected to our network!', 'success');
            
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.style.background = 'linear-gradient(135deg, #0ea5e9, #0284c7)';
                footerEmailInput.disabled = false;
            }, 2000);
        }, 2000);
    });
}

// Footer Notification System
function showFooterNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.footer-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    //notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification footer-notification-${type}`;
    notification.innerHTML = `
        <div class="footer-notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="footer-notification-close">&times;</button>
        </div>
    `;
    
    if (!document.querySelector('#footer-notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'footer-notification-styles';
        styleSheet.textContent = `
            .footer-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10001;
                background: linear-gradient(135deg, #0f172a, #1e293b);
                border: 2px solid #0ea5e9;
                border-radius: 8px;
                padding: 1rem;
                color: #e2e8f0;
                font-weight: 500;
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.3s ease;
                max-width: 320px;
                box-shadow: 0 10px 25px rgba(14, 165, 233, 0.2);
            }
            .footer-notification-success { border-color: #10b981; }
            .footer-notification-error { border-color: #ef4444; }
            .footer-notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .footer-notification-content i {
                font-size: 1.25rem;
                color: #0ea5e9;
            }
            .footer-notification-success i { color: #10b981; }
            .footer-notification-error i { color: #ef4444; }
            .footer-notification-close {
                background: none;
                border: none;
                color: #64748b;
                cursor: pointer;
                font-size: 1.5rem;
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .footer-notification-close:hover {
                background: rgba(14, 165, 233, 0.2);
                color: #0ea5e9;
            }
            .footer-notification.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // page and show
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.footer-notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

