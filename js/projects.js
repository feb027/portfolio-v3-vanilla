import projectsData from './projectsData.js';

class ProjectsManager {
    constructor() {
        this.currentPage = 1;
        this.projectsPerPage = 3;
        this.totalPages = Math.ceil(projectsData.length / this.projectsPerPage);
        
        // DOM Elements
        this.projectsGrid = document.querySelector('.projects__grid');
        this.paginationNumbers = document.querySelector('.pagination__numbers');
        this.modal = document.getElementById('projectModal');
        
        this.init();
    }
    
    init() {
        this.setupPagination();
        this.displayProjects(1);
        this.setupEventListeners();
        this.setupMouseTracking();
    }
    
    setupPagination() {
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        
        // Create page numbers
        for (let i = 1; i <= this.totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === 1 ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => this.changePage(i));
            this.paginationNumbers.appendChild(pageBtn);
        }
        
        // Setup navigation buttons
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.changePage(this.currentPage - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.changePage(this.currentPage + 1);
            }
        });
        
        this.updatePaginationState();
    }
    
    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.displayProjects(pageNumber);
        this.updatePaginationState();
        
        // Update active page number
        document.querySelectorAll('.page-number').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.textContent) === pageNumber);
        });
    }
    
    updatePaginationState() {
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === this.totalPages;
    }
    
    displayProjects(page) {
        const start = (page - 1) * this.projectsPerPage;
        const end = start + this.projectsPerPage;
        const projectsToShow = projectsData.slice(start, end);
        
        // Clear current projects
        this.projectsGrid.innerHTML = '';
        
        // Create and append new project cards
        projectsToShow.forEach(project => {
            const card = this.createProjectCard(project);
            this.projectsGrid.appendChild(card);
        });
        
        // Animate grid
        this.projectsGrid.classList.remove('active');
        setTimeout(() => {
            this.projectsGrid.classList.add('active');
        }, 50);
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="card__thumbnail">
                <img src="${project.thumbnail}" alt="${project.title}">
                <div class="card__overlay"></div>
            </div>
            <div class="card__content">
                <h3 class="card__title">${project.title}</h3>
                <p class="card__description">${project.description}</p>
                <div class="card__tech-stack">
                    ${project.technologies.slice(0, 3).map(tech => 
                        `<span class="tech-tag">${tech.name}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => this.openProjectModal(project));
        
        return card;
    }
    
    openProjectModal(project) {
        // Update modal content
        this.modal.querySelector('.modal__image').src = project.thumbnail;
        this.modal.querySelector('.modal__title').textContent = project.title;
        this.modal.querySelector('.modal__description').textContent = project.description;
        
        // Update links
        const demoLink = this.modal.querySelector('.demo-link');
        const sourceLink = this.modal.querySelector('.source-link');
        demoLink.href = project.demoLink;
        sourceLink.href = project.sourceLink;
        
        // Update tech stack
        const techStackList = this.modal.querySelector('.tech-stack__list');
        techStackList.innerHTML = project.technologies.map(tech => `
            <div class="tech-item">
                <i class="${tech.icon}"></i>
                <span>${tech.name}</span>
            </div>
        `).join('');
        
        // Update features
        const featuresList = this.modal.querySelector('.features__list');
        featuresList.innerHTML = project.features.map(feature => `
            <li class="features__item">${feature}</li>
        `).join('');
        
        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', e => {
            const cards = document.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    
    setupEventListeners() {
        // Close modal on button click
        this.modal.querySelector('.modal__close').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Intersection Observer for animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.projectsGrid.classList.add('active');
                } else {
                    this.projectsGrid.classList.remove('active');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(this.projectsGrid);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
}); 