// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.terms-tab__btn');
    const tabs = document.querySelectorAll('.terms-tab');
    const conductItems = document.querySelectorAll('.conduct-item');
    const toggleDetails = document.querySelectorAll('.toggle-details');
    const documentGraphic = document.querySelector('.document');
    const contactForm = document.querySelector('.contact-form');
    
    // Tab switching functionality
    function switchTab(tabId) {
        // Hide all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Deactivate all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Activate selected tab and button
        const selectedTab = document.querySelector(`.terms-tab[data-tab="${tabId}"]`);
        const selectedButton = document.querySelector(`.terms-tab__btn[data-tab="${tabId}"]`);
        
        if (selectedTab && selectedButton) {
            selectedTab.classList.add('active');
            selectedButton.classList.add('active');
            
            // Animate elements inside the active tab
            animateTabEntrance(selectedTab);
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
    
    // Animate elements inside a tab
    function animateTabEntrance(tab) {
        // First, add animation class to IP items if this is the intellectual property tab
        if (tab.getAttribute('data-tab') === 'intellectual') {
            const ipItems = tab.querySelectorAll('.terms-ip-item');
            ipItems.forEach(item => item.classList.add('animate-on-tab'));
        }
        
        // Find elements to animate - either elements with animate-on-tab class or all major content elements
        let elements = tab.querySelectorAll('.animate-on-tab');
        
        // If no elements with animate-on-tab class, use main content elements
        if (elements.length === 0) {
            elements = tab.querySelectorAll('.terms-card, .terms-ip-grid, .terms-ip-item, .terms-section, .terms-disclaimer, .terms-quotebox, .terms-conduct-grid, .terms-timeline');
        }
        
        // Animate each element with staggered timing
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Toggle details functionality
    toggleDetails.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const detailsElement = toggle.parentElement.querySelector('.details-content');
            
            if (detailsElement.style.maxHeight) {
                detailsElement.style.maxHeight = null;
                toggle.textContent = 'Read more';
                toggle.classList.remove('active');
            } else {
                detailsElement.style.maxHeight = detailsElement.scrollHeight + 'px';
                toggle.textContent = 'Read less';
                toggle.classList.add('active');
            }
        });
    });
    
    // User conduct items toggle
    conductItems.forEach(item => {
        const header = item.querySelector('.conduct-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            conductItems.forEach(conductItem => {
                conductItem.classList.remove('active');
                const content = conductItem.querySelector('.conduct-content');
                content.style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.conduct-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Document graphic interaction
    if (documentGraphic) {
        documentGraphic.addEventListener('mouseenter', () => {
            documentGraphic.classList.add('active');
        });
        
        documentGraphic.addEventListener('mouseleave', () => {
            documentGraphic.classList.remove('active');
        });
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageElement = contactForm.querySelector('.form-message');
            
            // Simple email validation
            if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
                messageElement.textContent = 'Please enter a valid email address';
                messageElement.classList.add('error');
                messageElement.classList.remove('success');
                return;
            }
            
            // Simulate successful submission
            messageElement.textContent = 'Thank you! Your request has been submitted.';
            messageElement.classList.add('success');
            messageElement.classList.remove('error');
            
            // Reset form
            contactForm.reset();
            
            // Reset message after 3 seconds
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('success');
            }, 3000);
        });
    }
    
    // ScrollReveal initialization
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            delay: 200,
            easing: 'ease'
        });
        
        sr.reveal('.terms-of-use__container h2, .terms-of-use__tabs', { interval: 200 });
        sr.reveal('.document', { 
            origin: 'left', 
            distance: '50px',
            duration: 1000
        });
        sr.reveal('.conduct-item', { interval: 150 });
        sr.reveal('.terms-ip-item', { interval: 200 });
    }
    
    // Initialize first tab on load
    window.addEventListener('load', () => {
        if (tabButtons && tabButtons.length > 0) {
            const firstTabId = tabButtons[0].getAttribute('data-tab');
            if (firstTabId) {
                switchTab(firstTabId);
            }
        }
    });
}); 