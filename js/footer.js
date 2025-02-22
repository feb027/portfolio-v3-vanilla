class Footer {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.socialLinks = document.querySelectorAll('.social__link');
        this.copyrightYear = document.getElementById('copyright-year');
        this.bgCircle = document.querySelector('.footer__bg-circle');
        this.awards = document.querySelectorAll('.award__item');
        
        this.init();
    }

    init() {
        this.setupMouseTracking();
        this.updateCopyrightYear();
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupBackgroundAnimation();
    }

    setupMouseTracking() {
        // Mouse tracking for social links
        this.socialLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                link.style.setProperty('--mouse-x', `${x}px`);
                link.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    setupParallaxEffect() {
        // Parallax effect for awards and background circle
        this.footer.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = this.footer.getBoundingClientRect();
            
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            
            // Move background circle
            if (this.bgCircle) {
                const moveX = (x - 0.5) * 40;
                const moveY = (y - 0.5) * 40;
                this.bgCircle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }

            // Move awards with different depths
            this.awards.forEach((award, index) => {
                const depth = 1 + index * 0.5;
                const moveX = (x - 0.5) * 20 * depth;
                const moveY = (y - 0.5) * 10 * depth;
                award.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        // Reset positions on mouse leave
        this.footer.addEventListener('mouseleave', () => {
            if (this.bgCircle) {
                this.bgCircle.style.transform = 'translate(0, 0)';
            }
            this.awards.forEach(award => {
                award.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupBackgroundAnimation() {
        // Subtle pulse animation for background circle
        if (this.bgCircle) {
            setInterval(() => {
                this.bgCircle.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.bgCircle.style.transform = 'scale(1)';
                }, 1000);
            }, 2000);
        }
    }

    updateCopyrightYear() {
        if (this.copyrightYear) {
            this.copyrightYear.textContent = new Date().getFullYear();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add stagger animation to footer groups
                    const groups = entry.target.querySelectorAll('.footer__group');
                    groups.forEach((group, index) => {
                        setTimeout(() => {
                            group.style.opacity = '1';
                            group.style.transform = 'translateY(0)';
                        }, index * 100);
                    });

                    // Animate social links
                    this.socialLinks.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, (index + groups.length) * 100);
                    });

                    // Animate awards
                    this.awards.forEach((award, index) => {
                        setTimeout(() => {
                            award.style.opacity = '1';
                            award.style.transform = 'translateY(0)';
                        }, (index + groups.length + this.socialLinks.length) * 100);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(this.footer);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
}); 