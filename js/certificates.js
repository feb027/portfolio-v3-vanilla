import certificatesData from './certificatesData.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const certificatesGrid = document.getElementById('certificates-grid');
    const categoryContainer = document.querySelector('.filter__categories');
    const searchInput = document.getElementById('certificate-search');
    const searchClear = document.getElementById('search-clear');
    const totalCertificates = document.getElementById('total-certificates');
    const totalCategories = document.getElementById('total-categories');
    const hoursLearned = document.getElementById('hours-learned');
    const modal = document.getElementById('certificate-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDate = document.getElementById('modal-date');
    const modalCredential = document.getElementById('modal-credential');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalSkills = document.getElementById('modal-skills');
    const modalVerifyLink = document.getElementById('modal-verify-link');
    const modalIssuerLink = document.getElementById('modal-issuer-link');
    const modalViewLink = document.getElementById('modal-view-link');
    const modalClose = document.getElementById('modal-close');
    
    // Current filter state
    let currentCategory = 'all';
    let searchQuery = '';
    
    // Initialize the page
    function init() {
        renderStats();
        generateCategoryButtons();
        renderCertificates();
        setupEventListeners();
        setTimeout(() => {
            countUpStats();
        }, 500);
    }
    
    // Render certificates stats
    function renderStats() {
        const categories = [...new Set(certificatesData.map(cert => cert.category))];
        const hours = certificatesData.reduce((total, cert) => total + cert.hours, 0);
        
        totalCertificates.textContent = '0';
        totalCategories.textContent = '0';
        hoursLearned.textContent = '0';
        
        // Store for animation
        totalCertificates.dataset.target = certificatesData.length;
        totalCategories.dataset.target = categories.length;
        hoursLearned.dataset.target = hours;
    }
    
    // Animate stats with count-up effect
    function countUpStats() {
        const elements = [totalCertificates, totalCategories, hoursLearned];
        
        elements.forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 1500; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Generate category filter buttons
    function generateCategoryButtons() {
        const categories = [...new Set(certificatesData.map(cert => cert.category))];
        
        // Sort categories alphabetically
        categories.sort((a, b) => a.localeCompare(b));
        
        // Get icons for each category
        const categoryIcons = {};
        certificatesData.forEach(cert => {
            categoryIcons[cert.category] = cert.categoryIcon;
        });
        
        // Clear existing buttons except "All"
        const allCategoriesBtn = categoryContainer.querySelector('[data-category="all"]');
        categoryContainer.innerHTML = '';
        categoryContainer.appendChild(allCategoriesBtn);
        
        // Create category buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'category-btn';
            button.setAttribute('data-category', category);
            button.innerHTML = `
                <i class="${categoryIcons[category]}"></i>
                <span>${category}</span>
            `;
            categoryContainer.appendChild(button);
        });
    }
    
    // Render certificates based on current filters
    function renderCertificates() {
        const filteredCertificates = filterCertificates();
        
        // Clear grid and remove loading spinner
        certificatesGrid.innerHTML = '';
        
        // Handle no results case
        if (filteredCertificates.length === 0) {
            certificatesGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results__icon">
                        <i class="ri-file-search-line"></i>
                    </div>
                    <h3 class="no-results__title">No certificates found</h3>
                    <p class="no-results__text">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        // Render each certificate
        filteredCertificates.forEach(cert => {
            const formattedDate = formatDate(cert.date);
            const certElement = document.createElement('div');
            certElement.className = 'certificate-item';
            certElement.setAttribute('data-id', cert.id);
            
            certElement.innerHTML = `
                ${cert.featured ? `<div class="certificate-item__badge">
                    <i class="ri-verified-badge-line"></i>
                    Featured
                </div>` : ''}
                <div class="certificate-item__image">
                    <img src="${cert.image}" alt="${cert.title}">
                    <div class="certificate-item__overlay">
                        <button class="certificate-item__overlay-btn">
                            <i class="ri-eye-line"></i>
                            View Details
                        </button>
                    </div>
                </div>
                <div class="certificate-item__content">
                    <h3 class="certificate-item__title">${cert.title}</h3>
                    <div class="certificate-item__issuer">
                        <i class="ri-award-line"></i>
                        ${cert.issuer}
                    </div>
                    <p class="certificate-item__description">${truncateText(cert.description, 100)}</p>
                    <div class="certificate-item__footer">
                        <div class="certificate-item__date">
                            <i class="ri-calendar-line"></i>
                            ${formattedDate}
                        </div>
                        <div class="certificate-item__category">${cert.category}</div>
                    </div>
                </div>
            `;
            
            certificatesGrid.appendChild(certElement);
        });
        
        // Reveal animation
        animateCertificates();
    }
    
    // Filter certificates based on category and search query
    function filterCertificates() {
        return certificatesData.filter(cert => {
            // Category filter
            const categoryMatch = currentCategory === 'all' || cert.category === currentCategory;
            
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const searchMatch = 
                cert.title.toLowerCase().includes(searchLower) ||
                cert.issuer.toLowerCase().includes(searchLower) ||
                cert.description.toLowerCase().includes(searchLower) ||
                cert.category.toLowerCase().includes(searchLower) ||
                cert.skills.some(skill => skill.toLowerCase().includes(searchLower));
            
            return categoryMatch && searchMatch;
        });
    }
    
    // Animate certificates entrance
    function animateCertificates() {
        const certificates = document.querySelectorAll('.certificate-item');
        
        certificates.forEach((cert, index) => {
            cert.style.opacity = '0';
            cert.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cert.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                cert.style.opacity = '1';
                cert.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Category buttons
        categoryContainer.addEventListener('click', e => {
            const button = e.target.closest('.category-btn');
            if (!button) return;
            
            // Update active class
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update current category and render
            currentCategory = button.getAttribute('data-category');
            renderCertificates();
        });
        
        // Search input
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            renderCertificates();
            
            // Toggle clear button
            searchClear.style.opacity = searchQuery ? '1' : '0';
        });
        
        // Search clear button
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            renderCertificates();
            searchClear.style.opacity = '0';
        });
        
        // Certificate click
        certificatesGrid.addEventListener('click', e => {
            const certificate = e.target.closest('.certificate-item');
            if (!certificate) return;
            
            const certId = certificate.getAttribute('data-id');
            openCertificateModal(certId);
        });
        
        // Modal close button
        modalClose.addEventListener('click', () => {
            closeModal();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Open certificate modal
    function openCertificateModal(certId) {
        const cert = certificatesData.find(c => c.id === certId);
        if (!cert) return;
        
        // Populate modal content
        modalTitle.textContent = cert.title;
        modalImage.src = cert.image;
        modalImage.alt = cert.title;
        modalIssuer.textContent = cert.issuer;
        modalDate.textContent = formatDate(cert.date);
        modalCredential.textContent = cert.credentialId;
        modalCategory.textContent = cert.category;
        modalDescription.textContent = cert.description;
        
        // Set links
        modalVerifyLink.href = cert.verifyUrl;
        modalIssuerLink.href = cert.issuerUrl;
        modalViewLink.href = cert.image;
        
        // Add skills
        modalSkills.innerHTML = '';
        cert.skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            modalSkills.appendChild(skillTag);
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Helper: Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Helper: Truncate text with ellipsis
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }
    
    // Initialize
    init();
    
    // Create directory for certificate images if needed
    function createAssetDirectories() {
        // Note: This would normally be handled by a server-side script
        // Client-side JavaScript can't create directories, but we're including
        // this as a comment to indicate that these directories would be needed
        
        // The following directories would be required:
        // - assets/certificates/
    }
}); 