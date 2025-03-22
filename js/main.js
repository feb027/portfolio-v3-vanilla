/*=============== MOUSE MOVE EFFECT ===============*/
document.addEventListener('mousemove', e => {
    const header = document.querySelector('.header');
    const { clientX: x, clientY: y } = e;
    
    header.style.setProperty('--mouse-x', `${x}px`);
    header.style.setProperty('--mouse-y', `${y}px`);
});

/*=============== MENU SHOW/HIDE ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navOverlay = document.getElementById('nav-overlay');

/* Menu show/hide */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('show-menu');
        
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Ensure focus trap and escape key handling only when menu is open
        if (!isOpen) {
            trapFocus(navMenu);
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('keydown', handleEscapeKey);
        }
    });
}

/* Handle click outside */
navOverlay.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

/* Focus trap for accessibility */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* Handle escape key */
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== SCROLL PROGRESS ===============*/
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
}

window.addEventListener('scroll', updateScrollProgress);

/*=============== SCROLL HEADER EFFECTS ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only add scroll-header class when actually scrolling down from the top
    if(scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

// Use requestAnimationFrame for smoother scroll handling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollHeader();
            updateScrollProgress();
            scrollActive();
            ticking = false;
        });
        ticking = true;
    }
});

/*=============== ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    const header = document.getElementById('header');
    const headerHeight = header.offsetHeight;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - headerHeight;
        const sectionId = current.getAttribute('id');
        const menuItem = document.querySelector(`.nav__link[href*=${sectionId}]`);
        
        if (!menuItem) return;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            menuItem.classList.add('active');
            // Don't add scroll-header class just because a section is active
            if (scrollY < 50) {
                header.classList.remove('scroll-header');
            }
        } else {
            menuItem.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== GLITCH EFFECT ===============*/
const highlights = document.querySelectorAll('.highlight');

highlights.forEach(highlight => {
    const text = highlight.textContent;
    highlight.setAttribute('data-text', text);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
});

sr.reveal('.hero__title');
sr.reveal('.hero__subtitle', {delay: 500});
sr.reveal('.hero__description', {delay: 600});
sr.reveal('.hero__buttons', {delay: 700});
sr.reveal('.hero__social', {delay: 800, origin: 'left'});

/*=============== TYPED ANIMATION ===============*/
const typedElement = document.getElementById('typed-text');
if (typedElement) {
    const typed = new Typed('#typed-text', {
        strings: ['Full Stack Developer', 'Gaming Addict', 'Kupu-Kupu'],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });
}

/*=============== TERMINAL ANIMATION ===============*/
let terminalText = document.querySelector('.terminal__text');
const terminal = document.querySelector('.terminal');
const commands = [
    { text: 'Initializing system...', delay: 1000 },
    { text: 'Loading portfolio data...', delay: 1500 },
    { text: 'Compiling experience.json', delay: 1200 },
    { text: 'npm install skills --save', delay: 1500 },
    { text: 'Deploying portfolio...', delay: 1000 },
    { text: 'Portfolio ready! ✨', delay: 2000 }
];

let commandIndex = 0;
let charIndex = 0;

function typeCommand() {
    if (!terminalText) return; // Guard clause
    
    if (commandIndex < commands.length) {
        const currentCommand = commands[commandIndex];
        
        if (charIndex < currentCommand.text.length) {
            terminalText.textContent += currentCommand.text.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, Math.random() * 50 + 30);
        } else {
            setTimeout(() => {
                if (commandIndex < commands.length - 1) {
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal__line';
                    newLine.innerHTML = `
                        <span class="terminal__prompt">$</span>
                        <span class="terminal__text"></span>
                    `;
                    document.querySelector('.terminal__body').appendChild(newLine);
                    terminalText = newLine.querySelector('.terminal__text');
                }
                charIndex = 0;
                commandIndex++;
                typeCommand();
            }, currentCommand.delay);
        }
    } else {
        setTimeout(() => {
            const terminalBody = document.querySelector('.terminal__body');
            if (!terminalBody) return;
            
            terminalBody.innerHTML = `
                <div class="terminal__line">
                    <span class="terminal__prompt">$</span>
                    <span class="terminal__text"></span>
                </div>
            `;
            terminalText = terminalBody.querySelector('.terminal__text');
            commandIndex = 0;
            charIndex = 0;
            typeCommand();
        }, 3000);
    }
}

// Add terminal hover effect
if (terminal) {
    terminal.addEventListener('mousemove', (e) => {
        const rect = terminal.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        terminal.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    terminal.addEventListener('mouseleave', () => {
        terminal.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    terminalText = document.querySelector('.terminal__text');
    if (terminalText) typeCommand();

    /*=============== IMAGE LIGHTBOX ===============*/
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImage = imageLightbox?.querySelector('.lightbox__image');
    const lightboxClose = document.getElementById('lightboxClose');
    const aboutImage = document.querySelector('.about__image-wrapper');

    if (imageLightbox && lightboxImage && lightboxClose && aboutImage) {
        aboutImage.addEventListener('click', () => {
            const imageUrl = aboutImage.querySelector('img').src;
            lightboxImage.src = imageUrl;
            imageLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        lightboxClose.addEventListener('click', () => {
            imageLightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        imageLightbox.addEventListener('click', (e) => {
            if (e.target === imageLightbox) {
                imageLightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Add keyboard support for closing lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageLightbox.classList.contains('active')) {
                imageLightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        
        window.scrollTo({
            top: target.offsetTop - 56,
            behavior: 'smooth'
        });
    });
});

/*=============== ABOUT TABS ===============*/
const tabBtns = document.querySelectorAll('.about__tab-btn');
const tabs = document.querySelectorAll('.about__tab');
const tabsContainer = document.querySelector('.about__tabs');

// Add mouse tracking effect to tabs container
if (tabsContainer) {
    tabsContainer.addEventListener('mousemove', (e) => {
        const rect = tabsContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / tabsContainer.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / tabsContainer.clientHeight) * 100;
        
        tabsContainer.style.setProperty('--mouse-x', `${x}%`);
        tabsContainer.style.setProperty('--mouse-y', `${y}%`);
    });
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked button and corresponding tab
        btn.classList.add('active');
        document.querySelector(`.about__tab[data-tab="${btn.dataset.tab}"]`).classList.add('active');
    });
});

/*=============== ABOUT IMAGE CONTAINER EFFECTS ===============*/
const aboutLeft = document.querySelector('.about__left');

aboutLeft.addEventListener('mousemove', (e) => {
    const rect = aboutLeft.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / aboutLeft.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / aboutLeft.clientHeight) * 100;
    
    aboutLeft.style.setProperty('--mouse-x', `${x}%`);
    aboutLeft.style.setProperty('--mouse-y', `${y}%`);
});

aboutLeft.addEventListener('mouseleave', () => {
    aboutLeft.style.setProperty('--mouse-x', '50%');
    aboutLeft.style.setProperty('--mouse-y', '50%');
});

// Skills Section
import skillsData from './skillsData.js';

const skillsSection = document.querySelector('.skills');
const categoryBtns = document.querySelectorAll('.category-btn');
const skillsContainer = document.getElementById('skills-container');

// Function to handle 3D tilt effect
function handleTiltEffect(e, item) {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
}

// Function to reset tilt effect
function resetTilt(item) {
    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
}

// Function to create skill items HTML
function createSkillsHTML(category) {
    const categoryData = skillsData[category];
    return `
        <div class="skills__category active" data-category="${category}">
            <div class="skills__group">
                ${categoryData.skills.map(skill => `
                    <div class="skill__item" data-level="${skill.level}">
                        <div class="skill__info">
                            <div class="skill__icon-wrapper">
                                <i class="${skill.icon}"></i>
                            </div>
                            <span class="skill__name">${skill.name}</span>
                            <span class="skill__percentage">${skill.level}%</span>
                        </div>
                        <div class="skill__progress">
                            <div class="skill__progress-bar">
                                <span class="skill__tooltip">${skill.level}%</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Initialize first category
skillsContainer.innerHTML = createSkillsHTML('frontend');

// Category switching
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        skillsContainer.innerHTML = createSkillsHTML(category);
        
        // Initialize progress bars and tilt effect for new category
        initializeProgressBars();
        initializeTiltEffect();
    });
});

// Initialize progress bars
function initializeProgressBars() {
    const skillItems = document.querySelectorAll('.skill__item');
    skillItems.forEach(item => {
        const level = item.dataset.level;
        const progressBar = item.querySelector('.skill__progress-bar');
        progressBar.style.setProperty('--level', `${level}%`);
    });
}

// Initialize tilt effect
function initializeTiltEffect() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => handleTiltEffect(e, item));
        item.addEventListener('mouseleave', () => resetTilt(item));
        
        // Add touch support
        item.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleTiltEffect(touch, item);
        });
        item.addEventListener('touchend', () => resetTilt(item));
    });
}

// Mouse tracking effect for skill items
document.addEventListener('mousemove', (e) => {
    const skillItems = document.querySelectorAll('.skill__item');
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        item.style.setProperty('--mouse-x', `${x}%`);
        item.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Add intersection observer for animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeProgressBars();
            initializeTiltEffect();
        }
    });
}, { threshold: 0.2 });

skillsObserver.observe(skillsContainer);

// Initialize tilt effect on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTiltEffect();
}); 