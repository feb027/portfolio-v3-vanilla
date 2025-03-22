/**
 * Privacy Policy Page JavaScript
 * Handles tab switching, accordion functionality, and animations
 */

// Get DOM elements
const tabButtons = document.querySelectorAll('.privacy-tab__btn');
const tabs = document.querySelectorAll('.privacy-tab');
const rightsItems = document.querySelectorAll('.rights-item');
const browserIcons = document.querySelectorAll('.cookie-browsers span');
const notificationForm = document.querySelector('.notification-form');
const shield = document.querySelector('.shield');

// ===== Tab Switching =====
if (tabButtons.length > 0 && tabs.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            document.querySelector(`.privacy-tab[data-tab="${target}"]`).classList.add('active');
            
            // Animate entrance
            animateTabEntrance(target);
        });
    });
}

// ===== Tab Animation Function =====
function animateTabEntrance(tabId) {
    const activeTab = document.querySelector(`.privacy-tab[data-tab="${tabId}"]`);
    const elements = activeTab.querySelectorAll('h3, p, .privacy-list li, .cookie-item, .rights-item, .policy-timeline, .notification-settings');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 50 * (index + 1));
    });
}

// ===== Rights Accordion =====
if (rightsItems.length > 0) {
    rightsItems.forEach(item => {
        const header = item.querySelector('.rights-item__header');
        const content = item.querySelector('.rights-item__content');
        
        // Set initial heights
        if (item.classList.contains('active')) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0';
        }
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            rightsItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.rights-item__content');
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherContent.style.height = '0';
                }
            });
            
            // Toggle clicked item
            if (isActive) {
                item.classList.remove('active');
                content.style.height = '0';
            } else {
                item.classList.add('active');
                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
}

// ===== Browser Icons Tooltip =====
if (browserIcons.length > 0) {
    browserIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const tooltip = icon.getAttribute('data-tooltip');
            
            // Create tooltip element
            const tooltipEl = document.createElement('div');
            tooltipEl.classList.add('browser-tooltip');
            tooltipEl.textContent = tooltip;
            
            document.body.appendChild(tooltipEl);
            
            // Position tooltip
            const iconRect = icon.getBoundingClientRect();
            tooltipEl.style.left = `${iconRect.left + (iconRect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
            tooltipEl.style.top = `${iconRect.top - tooltipEl.offsetHeight - 10}px`;
            
            // Add active class
            setTimeout(() => {
                tooltipEl.classList.add('active');
            }, 10);
            
            // Store tooltip reference
            icon.tooltip = tooltipEl;
        });
        
        icon.addEventListener('mouseleave', () => {
            if (icon.tooltip) {
                icon.tooltip.classList.remove('active');
                
                // Remove tooltip after animation
                setTimeout(() => {
                    if (icon.tooltip && icon.tooltip.parentNode) {
                        icon.tooltip.parentNode.removeChild(icon.tooltip);
                    }
                    icon.tooltip = null;
                }, 300);
            }
        });
    });
    
    // Add tooltip styles if not already in the document
    if (!document.getElementById('tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            .browser-tooltip {
                position: fixed;
                background: var(--surface-color);
                color: var(--text-primary);
                padding: 0.5rem 0.75rem;
                border-radius: 4px;
                font-size: 0.75rem;
                pointer-events: none;
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.3s, transform 0.3s;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .browser-tooltip::after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: -5px;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--surface-color);
            }
            
            .browser-tooltip.active {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Notification Form =====
if (notificationForm) {
    notificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = notificationForm.querySelector('.notification-input');
        const email = emailInput.value.trim();
        
        // Simple validation
        if (email && email.includes('@') && email.includes('.')) {
            // Success state
            emailInput.style.borderColor = '#4CAF50';
            
            // Create success message
            const successMsg = document.createElement('div');
            successMsg.classList.add('notification-success');
            successMsg.innerHTML = '<i class="ri-check-line"></i> You\'ve been subscribed successfully!';
            
            // Style success message
            successMsg.style.color = '#4CAF50';
            successMsg.style.padding = '0.75rem';
            successMsg.style.marginTop = '1rem';
            successMsg.style.display = 'flex';
            successMsg.style.alignItems = 'center';
            successMsg.style.gap = '0.5rem';
            successMsg.style.fontSize = 'var(--small-font-size)';
            successMsg.style.background = 'rgba(76, 175, 80, 0.1)';
            successMsg.style.borderRadius = 'var(--border-radius)';
            
            // Remove any existing message
            const existingMsg = notificationForm.parentNode.querySelector('.notification-success, .notification-error');
            if (existingMsg) {
                existingMsg.remove();
            }
            
            // Add message
            notificationForm.parentNode.appendChild(successMsg);
            
            // Reset form
            setTimeout(() => {
                emailInput.value = '';
                emailInput.style.borderColor = '';
            }, 2000);
        } else {
            // Error state
            emailInput.style.borderColor = '#F44336';
            
            // Create error message
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('notification-error');
            errorMsg.innerHTML = '<i class="ri-error-warning-line"></i> Please enter a valid email address.';
            
            // Style error message
            errorMsg.style.color = '#F44336';
            errorMsg.style.padding = '0.75rem';
            errorMsg.style.marginTop = '1rem';
            errorMsg.style.display = 'flex';
            errorMsg.style.alignItems = 'center';
            errorMsg.style.gap = '0.5rem';
            errorMsg.style.fontSize = 'var(--small-font-size)';
            errorMsg.style.background = 'rgba(244, 67, 54, 0.1)';
            errorMsg.style.borderRadius = 'var(--border-radius)';
            
            // Remove any existing message
            const existingMsg = notificationForm.parentNode.querySelector('.notification-success, .notification-error');
            if (existingMsg) {
                existingMsg.remove();
            }
            
            // Add message
            notificationForm.parentNode.appendChild(errorMsg);
            
            // Focus on input
            emailInput.focus();
        }
    });
}

// ===== Interactive Shield Animation =====
if (shield) {
    shield.addEventListener('mouseenter', () => {
        shield.style.transform = 'scale(1.05)';
        shield.style.boxShadow = '0 0 30px rgba(0, 153, 255, 0.4)';
        shield.style.transition = 'transform 0.3s, box-shadow 0.3s';
    });
    
    shield.addEventListener('mouseleave', () => {
        shield.style.transform = 'scale(1)';
        shield.style.boxShadow = '0 0 20px rgba(0, 153, 255, 0.2)';
    });
}

// ===== Initialize Scroll Reveal =====
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        delay: 200,
        easing: 'ease-out',
        reset: true
    });
    
    sr.reveal('.privacy-policy__header', { origin: 'top' });
    sr.reveal('.privacy-policy__tabs', { delay: 300 });
    sr.reveal('.privacy-policy__actions', { delay: 400 });
}

// ===== Animate first tab on load =====
document.addEventListener('DOMContentLoaded', () => {
    // Show first tab content with animation
    setTimeout(() => {
        const activeTabId = document.querySelector('.privacy-tab.active')?.getAttribute('data-tab');
        if (activeTabId) {
            animateTabEntrance(activeTabId);
        }
    }, 300);
}); 