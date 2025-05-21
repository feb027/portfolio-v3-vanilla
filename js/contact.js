class TerminalForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.terminal = document.querySelector('.terminal__lines');
        this.formContainer = document.querySelector('.contact__form-container');
        this.currentStep = 0;
        this.formData = {};
        this.initialized = false;
        this.typingSpeed = 20; // ms per character
        
        // Security measures
        this.attempts = 0;
        this.maxAttempts = 5;
        this.lastSubmissionTime = 0;
        this.minSubmissionInterval = 30000; // 30 seconds between submissions
        this.blockedUntil = 0;
        this.blockDuration = 300000; // 5 minutes block duration
        
        this.steps = [
            {
                question: 'Please enter your name:',
                field: 'name',
                validate: (value, inputElement) => {
                    // Native JS Sanitization & Validation
                    const sanitized = this.sanitizeInput(value);
                    if (sanitized !== value) return 'Name contains invalid characters';
                    if (!/^[a-zA-Z\s\-']+$/.test(sanitized)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
                    
                    // --- jQuery Validation --- 
                    const $input = $(inputElement); // Use jQuery on the input element
                    const trimmedValue = $input.val().trim();

                    // Wajib diisi (Required)
                    if (trimmedValue.length === 0) {
                        return 'Name is required';
                    }
                    // Minimal length 
                    if (trimmedValue.length < 2) { 
                        return 'Name must be at least 2 characters long';
                    }
                    // Maksimal karakter
                    if ($input.val().length > 50) { 
                        return 'Name must be less than 50 characters';
                    }
                    // --- End jQuery Validation ---

                    return true;
                }
            },
            {
                question: 'Please enter your email:',
                field: 'email',
                validate: (value, inputElement) => {
                    // Native JS Sanitization
                    const sanitized = this.sanitizeInput(value);
                    if (sanitized !== value) return 'Email contains invalid characters';

                    // --- jQuery Validation --- 
                    const $input = $(inputElement); // Use jQuery on the input element
                    const trimmedValue = $input.val().trim();
                    
                    // Wajib diisi (Required)
                    if (trimmedValue.length === 0) {
                        return 'Email is required';
                    }
                    // Maksimal karakter (Max length)
                    if ($input.val().length > 100) { 
                        return 'Email must be less than 100 characters';
                    }
                    // Simple jQuery email format check (supplements the more robust regex)
                    if (trimmedValue.indexOf('@') === -1 || trimmedValue.indexOf('.') === -1) {
                        // This is a basic check, the regex below is more thorough
                    }
                    // --- End jQuery Validation ---
                    
                    // Native JS Regex Validation (more robust)
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) return 'Please enter a valid email address format (e.g., user@domain.com)';
                    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sanitized)) {
                        return 'Please enter a valid email address';
                    }
                    return true;
                }
            },
            {
                question: 'Please enter your message:',
                field: 'message',
                validate: (value, inputElement) => {
                    // Native JS Sanitization & Validation
                    const sanitized = this.sanitizeInput(value);
                    if (sanitized !== value) return 'Message contains invalid characters';
                    if (this.containsSuspiciousPatterns(sanitized)) return 'Message contains suspicious content';

                    // --- jQuery Validation --- 
                    const $input = $(inputElement); // Use jQuery on the input element
                    const trimmedValue = $input.val().trim();

                    // Wajib diisi (Required)
                    if (trimmedValue.length === 0) {
                        return 'Message is required';
                    }
                    // Minimal length
                    if (trimmedValue.length < 10) { 
                        return 'Message must be at least 10 characters long';
                    }
                    // Maksimal karakter (Max length)
                    if ($input.val().length > 1000) { 
                        return 'Message must be less than 1000 characters';
                    }
                     // --- End jQuery Validation ---
                    
                    return true;
                }
            }
        ];

        this.setupIntersectionObserver();
        this.setupMouseTracking();
    }

    setupIntersectionObserver() {
        const contactSection = document.querySelector('#contact');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.initialized && entry.intersectionRatio > 0.5) {
                    this.init();
                    this.initialized = true;
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '-100px 0px'
        });

        observer.observe(contactSection);
    }

    setupMouseTracking() {
        if (this.formContainer) {
            this.formContainer.addEventListener('mousemove', (e) => {
                const rect = this.formContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.formContainer.style.setProperty('--mouse-x', `${x}px`);
                this.formContainer.style.setProperty('--mouse-y', `${y}px`);

                // Calculate rotation based on mouse position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = ((x - centerX) / centerX) * 5;
                const rotateX = ((centerY - y) / centerY) * 5;

                this.formContainer.style.transform = 
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            this.formContainer.addEventListener('mouseleave', () => {
                this.formContainer.style.transform = 
                    'perspective(1000px) rotateY(-5deg)';
            });
        }
    }

    async typeText(text, element) {
        let i = 0;
        while (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            await new Promise(resolve => setTimeout(resolve, this.typingSpeed * Math.random()));
        }
    }

    init() {
        this.addInitialLines();
        this.askQuestion();
        this.setupEventListeners();
    }

    async addInitialLines() {
        const welcomeLines = [
  
        ];

        welcomeLines.forEach(async (line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = line.class;
            this.terminal.appendChild(lineElement);
            
            // Add typing effect with delay between lines
            await new Promise(resolve => setTimeout(resolve, index * 500));
            await this.typeText(line.text, lineElement);
        });
    }

    async addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = className;
        this.terminal.appendChild(line);
        await this.typeText(text, line);
        this.scrollToBottom();
    }

    addPromptLine(text = '') {
        const line = document.createElement('div');
        line.className = 'terminal__input-group';
        line.innerHTML = `
            <span class="terminal__prompt">
                <span class="prompt__user">visitor</span>
                <span class="prompt__separator">@</span>
                <span class="prompt__host">portfolio</span>
                <span class="prompt__symbol">~$</span>
            </span>
            <span class="terminal__command">${text}</span>
        `;
        this.terminal.appendChild(line);
        this.scrollToBottom();
    }

    askQuestion() {
        if (this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];
            this.addLine(step.question, 'response');
            this.addInputLine();
        } else {
            this.showSummary();
        }
    }

    addInputLine() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'terminal__input-group';
        // Determine input type based on current step
        const currentField = this.steps[this.currentStep]?.field;
        let inputType = 'text';
        if (currentField === 'email') {
            inputType = 'email';
        } else if (currentField === 'message') {
            // For message, we might want a textarea visually, but handle it as input here
            // Or keep it as input for the terminal style
            inputType = 'text'; // Keep as text for terminal style consistency
        }
        
        inputGroup.innerHTML = `
            <span class="terminal__prompt">
                <span class="prompt__user">visitor</span>
                <span class="prompt__separator">@</span>
                <span class="prompt__host">portfolio</span>
                <span class="prompt__symbol">~$</span>
            </span>
            <input type="${inputType}" class="terminal__input" autocomplete="off" name="${currentField}" id="input-${currentField}"> 
        `; // Added name and id to input
        this.terminal.appendChild(inputGroup);
        
        const input = inputGroup.querySelector('.terminal__input');
        
        // Remove automatic focus
        // Only focus if the user has interacted with the terminal
        if (this.userHasInteracted) {
            input.focus();
        }
        
        // Add input effects
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Prevent Enter from submitting if it's the message field (allow new lines conceptually)
                // However, in this terminal style, Enter likely signifies submission always.
                e.preventDefault();
                const value = input.value;
                input.disabled = true;
                // Pass the input element itself to handleInput for jQuery usage
                this.handleInput(value, input); 
            }
        });

        // Add focus effects
        input.addEventListener('focus', () => {
            inputGroup.style.background = 'rgba(0, 153, 255, 0.05)';
        });

        input.addEventListener('blur', () => {
            inputGroup.style.background = 'transparent';
        });

        this.scrollToBottom();
    }

    async handleInput(value, inputElement) {
        // Check rate limiting first
        const rateLimitMessage = this.isRateLimited();
        if (rateLimitMessage) {
            await this.addLine(`Error: ${rateLimitMessage}`, 'terminal__response error');
            setTimeout(() => this.addInputLine(), 1000);
            return;
        }

        // Check if we're in the confirmation step (after all regular steps)
        if (this.currentStep >= this.steps.length) {
            const confirmation = value.toLowerCase();
            if (confirmation === 'y' || confirmation === 'n') {
                if (confirmation === 'y') {
                    // Send data to PHP script
                    try {
                        this.addLine('\nSending message...', 'response');
                        
                        const formData = new FormData();
                        formData.append('name', this.formData.name);
                        formData.append('email', this.formData.email);
                        formData.append('message', this.formData.message);
                        
                        const response = await fetch('php/submit_contact.php', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            this.addLine(result.message, 'success');
                        } else {
                            this.addLine(result.message, 'error');
                        }
                    } catch (error) {
                        this.addLine('Error sending message. Please try again later.', 'error');
                        console.error('Error:', error);
                    }
                } else {
                    this.addLine('\nMessage cancelled.', 'response');
                }
                // Reset form after sending or cancellation
                setTimeout(() => this.resetForm(), 2000);
                return;
            }
            // If input is not y/n, show error and ask again
            this.addLine('Please enter y or n', 'error');
            this.addInputLine();
            return;
        }

        // Regular step validation
        const step = this.steps[this.currentStep];
        const validation = step.validate(value, inputElement);

        if (validation === true) {
            this.attempts = 0; // Reset attempts on successful input
            this.formData[step.field] = value;
            this.currentStep++;
            
            await this.addLine(`✓ ${step.field}: ${value}`, 'response success');
            
            if (this.currentStep < this.steps.length) {
                setTimeout(() => {
                    this.askQuestion();
                }, 500);
            } else {
                // Show summary and ask for confirmation
                this.showSummary();
            }
        } else {
            this.attempts++;
            
            // Handle too many failed attempts
            if (this.attempts >= this.maxAttempts) {
                this.blockedUntil = Date.now() + this.blockDuration;
                await this.addLine('Too many failed attempts. Please try again later.', 'terminal__response error');
                setTimeout(() => this.resetForm(), 2000);
                return;
            }

            const errorMessage = document.createElement('div');
            errorMessage.className = 'terminal__response error';
            errorMessage.textContent = `Error: ${validation}`;
            errorMessage.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
            this.terminal.appendChild(errorMessage);
            
            setTimeout(() => {
                this.addInputLine();
            }, 1000);
        }
    }

    async showSummary() {
        // Show the collected data
        this.addLine('\nSummary of your message:', 'response');
        this.addLine(`Name: ${this.formData.name}`, 'response');
        this.addLine(`Email: ${this.formData.email}`, 'response');
        this.addLine(`Message: ${this.formData.message}`, 'response');
        
        // Add confirmation prompt
        this.addLine('\nDo you want to send this message? (y/n)', 'response');
        this.addInputLine();
    }

    resetForm() {
        this.currentStep = 0;
        this.formData = {};
        this.terminal.innerHTML = '';
        this.addInitialLines();
        this.askQuestion();
    }

    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal__body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    setupEventListeners() {
        // Add any additional event listeners here
        const formContainer = document.querySelector('.contact__form-container');
        formContainer.addEventListener('click', () => {
            const currentInput = document.querySelector('.terminal__input:not([disabled])');
            if (currentInput) {
                currentInput.focus();
            }
        });

        // Add mouse tracking for contact info
        const contactInfo = document.querySelector('.contact__info');
        const infoItems = document.querySelectorAll('.info__item');

        if (contactInfo) {
            contactInfo.addEventListener('mousemove', (e) => {
                const rect = contactInfo.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                contactInfo.style.setProperty('--mouse-x', `${x}px`);
                contactInfo.style.setProperty('--mouse-y', `${y}px`);
            });
        }

        infoItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                item.style.setProperty('--mouse-x', `${x}px`);
                item.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // Security helper methods
    sanitizeInput(input) {
        // Remove potentially dangerous characters and HTML tags
        return input
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/[^\w\s@.-]/gi, '') // Remove special characters except those needed for email
            .trim();
    }

    containsSuspiciousPatterns(text) {
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /data:/i,
            /onclick/i,
            /onerror/i,
            /eval\(/i,
            /alert\(/i,
            /document\./i,
            /window\./i,
            /\[url=/i,
            /\[link=/i,
            /http:/i,
            /https:/i,
            /ftp:/i
        ];
        return suspiciousPatterns.some(pattern => pattern.test(text));
    }

    isRateLimited() {
        const now = Date.now();
        
        // Check if currently blocked
        if (now < this.blockedUntil) {
            const remainingTime = Math.ceil((this.blockedUntil - now) / 1000);
            return `Please wait ${remainingTime} seconds before trying again.`;
        }

        // Check submission interval
        if (now - this.lastSubmissionTime < this.minSubmissionInterval) {
            const remainingTime = Math.ceil((this.minSubmissionInterval - (now - this.lastSubmissionTime)) / 1000);
            return `Please wait ${remainingTime} seconds between submissions.`;
        }

        return false;
    }
}

// Add this to your CSS
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(2px); }
    30%, 50%, 70% { transform: translateX(-4px); }
    40%, 60% { transform: translateX(4px); }
}
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalForm();
}); 