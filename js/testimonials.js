import { testimonials } from './testimonialsData.js';

class TestimonialsSlider {
    constructor() {
        this.container = document.querySelector('.testimonials__container');
        this.track = document.querySelector('.testimonials__track');
        this.groups = document.querySelectorAll('.testimonials__group');
        
        this.normalSpeed = 1; // pixels per frame
        this.slowSpeed = 0.3; // slower speed when hovered
        this.currentSpeed = this.normalSpeed;
        this.currentScroll = 0;
        this.isHovered = false;
        this.animationFrameId = null;
        this.lastTime = null;

        this.init();
    }

    init() {
        this.createTestimonials();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.startAnimation();
    }

    createTestimonialCard(testimonial) {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        return `
            <div class="testimonial-card">
                <div class="testimonial__header">
                    <div class="testimonial__image">
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                    </div>
                    <div class="testimonial__info">
                        <h3 class="testimonial__name">${testimonial.name}</h3>
                        <p class="testimonial__position">${testimonial.position}</p>
                        <p class="testimonial__company">${testimonial.company}</p>
                        <div class="testimonial__rating">
                            ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <p class="testimonial__message">${testimonial.message}</p>
            </div>
        `;
    }

    createTestimonials() {
        const testimonialCards = testimonials.map(testimonial => 
            this.createTestimonialCard(testimonial)
        ).join('');

        // Add testimonials to both groups for infinite scroll
        this.groups.forEach(group => {
            group.innerHTML = testimonialCards;
        });

        // Add mouse tracking to cards
        this.setupMouseTracking();
    }

    setupMouseTracking() {
        const cards = document.querySelectorAll('.testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            this.isHovered = true;
            // Smoothly transition to slow speed
            this.currentSpeed = this.slowSpeed;
        });

        this.container.addEventListener('mouseleave', () => {
            this.isHovered = false;
            // Smoothly transition back to normal speed
            this.currentSpeed = this.normalSpeed;
        });

        // Reset animation when window is resized
        window.addEventListener('resize', () => {
            this.resetAnimation();
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimation();
                } else {
                    this.stopAnimation();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.container);
    }

    animate(currentTime) {
        if (!this.lastTime) this.lastTime = currentTime;
        const deltaTime = currentTime - this.lastTime;
        
        // Always animate, but at different speeds
        this.currentScroll += (this.currentSpeed * deltaTime) / 16; // Normalize to 60fps
        
        // Reset scroll position when first group is fully scrolled
        if (this.currentScroll >= this.groups[0].offsetWidth) {
            this.currentScroll = 0;
        }
        
        this.track.style.transform = `translateX(-${this.currentScroll}px)`;
        
        this.lastTime = currentTime;
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    startAnimation() {
        if (!this.animationFrameId) {
            this.lastTime = null;
            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    resetAnimation() {
        this.currentScroll = 0;
        this.track.style.transform = `translateX(0)`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
}); 