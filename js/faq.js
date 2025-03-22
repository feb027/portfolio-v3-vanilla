// FAQ data - Questions and answers
const faqData = [
    {
        id: 1,
        question: "What services do you offer as a web developer?",
        answer: `I offer a comprehensive range of web development services including:
        <ul>
            <li>Frontend development with modern frameworks (React, Next.js)</li>
            <li>Backend development and API integration</li>
            <li>Full-stack web application development</li>
            <li>Responsive website design and implementation</li>
            <li>Website performance optimization</li>
            <li>CMS integration (WordPress, Shopify, etc.)</li>
            <li>E-commerce solutions</li>
            <li>Web application maintenance and support</li>
        </ul>
        I specialize in creating custom, high-quality web solutions tailored to your specific needs.`,
        category: "services",
    },
    {
        id: 2,
        question: "What is your development process like?",
        answer: `My development process typically follows these key phases:
        <ol>
            <li><strong>Discovery &amp; Planning:</strong> Understanding your requirements, goals, and target audience to create a solid plan.</li>
            <li><strong>Design &amp; Prototyping:</strong> Creating wireframes and visual designs for your approval before development begins.</li>
            <li><strong>Development:</strong> Writing clean, efficient code to build the functionalities according to the agreed design.</li>
            <li><strong>Testing &amp; Quality Assurance:</strong> Rigorous testing across devices and browsers to ensure everything works perfectly.</li>
            <li><strong>Deployment:</strong> Launching your website or application securely on your chosen hosting platform.</li>
            <li><strong>Maintenance &amp; Support:</strong> Providing ongoing support and updates as needed.</li>
        </ol>
        I maintain clear communication throughout the entire process, keeping you informed at every stage and incorporating your feedback along the way.`,
        category: "general",
    },
    {
        id: 3,
        question: "How much do your web development services cost?",
        answer: `My pricing is project-based and depends on several factors including:
        <ul>
            <li>Project scope and complexity</li>
            <li>Timeline requirements</li>
            <li>Technologies needed</li>
            <li>Level of customization</li>
            <li>Maintenance requirements</li>
        </ul>
        I offer tailored quotes after discussing your specific project needs in detail. For a general idea, small websites typically range from $1,000-$3,000, while larger web applications with complex functionality can range from $5,000-$15,000+.
        <br><br>
        I'm happy to discuss your budget constraints and find the best approach for your project. <a href="index.html#contact">Contact me</a> for a free consultation and detailed quote.`,
        category: "pricing",
    },
    {
        id: 4,
        question: "How long does it take to complete a website?",
        answer: `The timeline for website development varies depending on the project's complexity and scope. As a general guideline:
        <ul>
            <li>Simple landing page or brochure website: 2-4 weeks</li>
            <li>Small to medium business website with custom features: 4-8 weeks</li>
            <li>E-commerce website or web application: 8-12+ weeks</li>
        </ul>
        These timeframes include the entire process from initial planning to final deployment. I'll provide you with a more specific timeline during our initial consultation based on your project requirements.
        <br><br>
        I'm committed to delivering quality work within agreed timeframes, but I also believe it's better to do things right than to rush through development.`,
        category: "general",
    },
    {
        id: 5,
        question: "What technologies and programming languages do you use?",
        answer: `I work with a variety of modern technologies and frameworks to deliver high-quality web solutions:
        <br><br>
        <strong>Frontend:</strong>
        <ul>
            <li>HTML5, CSS3, JavaScript (ES6+)</li>
            <li>React.js and Next.js</li>
            <li>TypeScript</li>
            <li>CSS frameworks like Tailwind CSS, Styled Components, and SASS</li>
        </ul>
        
        <strong>Backend:</strong>
        <ul>
            <li>Node.js with Express</li>
            <li>Python</li>
            <li>RESTful APIs and GraphQL</li>
        </ul>
        
        <strong>Databases:</strong>
        <ul>
            <li>MongoDB</li>
            <li>PostgreSQL</li>
            <li>Firebase</li>
        </ul>
        
        <strong>Tools &amp; Platforms:</strong>
        <ul>
            <li>Git for version control</li>
            <li>Docker for containerization</li>
            <li>CI/CD pipelines</li>
            <li>AWS and Vercel for hosting</li>
        </ul>
        
        I continuously update my skills to stay current with industry trends and best practices.`,
        category: "technical",
    },
    {
        id: 6,
        question: "Do you offer website maintenance services?",
        answer: `Yes, I offer comprehensive website maintenance services to ensure your website remains secure, up-to-date, and performing optimally.
        <br><br>
        My maintenance services include:
        <ul>
            <li>Regular updates to core software and plugins</li>
            <li>Security monitoring and vulnerability patching</li>
            <li>Performance optimization</li>
            <li>Backup management</li>
            <li>Content updates and small changes</li>
            <li>Technical support</li>
        </ul>
        
        I offer flexible maintenance packages based on your specific needs, from basic monthly check-ups to comprehensive support plans. This ensures your website continues to function properly and securely over time.
        <br><br>
        For clients with ongoing needs, I also offer retainer agreements for a set number of development hours each month.`,
        category: "services",
    },
    {
        id: 7,
        question: "Can you help with improving my website's performance?",
        answer: `Absolutely! Website performance optimization is one of my specialties. I can help improve your website's speed and overall performance through various techniques:
        <br><br>
        <ul>
            <li>Code optimization and minification</li>
            <li>Image optimization</li>
            <li>Implementing proper caching strategies</li>
            <li>Content Delivery Network (CDN) integration</li>
            <li>Reducing server response times</li>
            <li>Optimizing critical rendering path</li>
            <li>Database query optimization</li>
            <li>Implementing lazy loading for images and components</li>
        </ul>
        
        I'll analyze your current website using tools like Google PageSpeed Insights, Lighthouse, and WebPageTest to identify specific issues and implement targeted solutions.
        <br><br>
        A faster website not only provides a better user experience but also improves SEO rankings and conversion rates.`,
        category: "technical",
    },
    {
        id: 8,
        question: "How do we communicate during the project?",
        answer: `Clear and consistent communication is essential for a successful project. During our work together:
        <br><br>
        <ul>
            <li>We'll have an initial consultation to discuss your requirements in detail.</li>
            <li>I'll provide regular updates on progress, typically on a weekly basis or at key milestones.</li>
            <li>We can communicate through your preferred channels: email, video calls, phone, or project management tools.</li>
            <li>I'm available during regular business hours to answer questions and address concerns.</li>
            <li>For complex projects, I can set up a shared project management board for transparent tracking of tasks and progress.</li>
        </ul>
        
        I believe in being responsive, transparent, and proactive in my communication to ensure you're always informed about your project's status.`,
        category: "general",
    },
    {
        id: 9,
        question: "Do you provide hosting services?",
        answer: `While I don't directly provide hosting services, I can absolutely help you:
        <br><br>
        <ul>
            <li>Select the most appropriate hosting solution for your project based on your needs and budget</li>
            <li>Set up and configure your hosting environment</li>
            <li>Deploy your website or application to your chosen hosting platform</li>
            <li>Configure domain settings, SSL certificates, and other technical aspects</li>
            <li>Optimize your hosting setup for performance and security</li>
        </ul>
        
        I have experience with various hosting providers including AWS, Vercel, Netlify, DigitalOcean, and traditional shared hosting platforms. I can recommend options that balance performance, reliability, scalability, and cost-effectiveness for your specific requirements.`,
        category: "services",
    },
    {
        id: 10,
        question: "What information do you need to provide a quote?",
        answer: `To provide an accurate quote for your project, I typically need the following information:
        <br><br>
        <ul>
            <li>Project goals and description</li>
            <li>Target audience and specific requirements</li>
            <li>Features and functionalities you need</li>
            <li>Design preferences (or existing brand guidelines)</li>
            <li>Examples of websites you like</li>
            <li>Desired timeline</li>
            <li>Budget expectations (if you have them)</li>
            <li>Any existing content or assets you plan to use</li>
        </ul>
        
        The more detailed information you can provide, the more accurate my quote will be. After our initial discussion, I'll prepare a comprehensive proposal that includes pricing, timeline, and a detailed scope of work.
        <br><br>
        <a href="index.html#contact">Contact me</a> to start the conversation about your project.`,
        category: "pricing",
    },
    {
        id: 11,
        question: "Do you work with clients internationally?",
        answer: `Yes, I work with clients from around the world! Modern communication tools make international collaboration seamless.
        <br><br>
        For international clients:
        <ul>
            <li>I can accommodate different time zones for meetings</li>
            <li>I use clear documentation to minimize miscommunication</li>
            <li>I accept international payments through secure platforms</li>
            <li>I'm familiar with working asynchronously when needed</li>
        </ul>
        
        Working remotely has been my standard practice for years, so distance is never an obstacle to delivering high-quality work and maintaining excellent communication.`,
        category: "general",
    },
    {
        id: 12,
        question: "What is responsive web design and why is it important?",
        answer: `Responsive web design is an approach to web development that ensures websites render properly on all devices and screen sizes. Instead of creating separate websites for desktop and mobile, a responsive website automatically adjusts its layout and content to provide an optimal viewing experience across a wide range of devices.
        <br><br>
        It's important for several reasons:
        <ul>
            <li><strong>Mobile Traffic:</strong> More than 50% of global web traffic comes from mobile devices</li>
            <li><strong>User Experience:</strong> Users expect websites to work well on whatever device they're using</li>
            <li><strong>SEO Benefits:</strong> Google uses mobile-first indexing, meaning it primarily uses the mobile version of a site for ranking</li>
            <li><strong>Cost Efficiency:</strong> Maintaining one responsive site is more efficient than multiple device-specific versions</li>
            <li><strong>Future-Proofing:</strong> As new devices with different screen sizes emerge, responsive sites adapt automatically</li>
        </ul>
        
        I implement responsive design principles in all my projects, ensuring your website provides an excellent experience for all users regardless of their device.`,
        category: "technical",
    }
];

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQ items
    renderFAQItems('all');
    
    // Setup event listeners
    setupEventListeners();
    
    // Animate first FAQ item to be open on page load
    setTimeout(() => {
        const firstFAQItem = document.querySelector('.faq__item');
        if (firstFAQItem) {
            firstFAQItem.classList.add('active');
        }
    }, 500);
    
    // Reveal animations with ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            delay: 300,
            reset: false
        });
        
        sr.reveal('.intro__content h3', { delay: 100 });
        sr.reveal('.intro__content p', { delay: 200 });
        sr.reveal('.intro__decor', { delay: 300 });
        sr.reveal('.faq__search-container', { delay: 400 });
        sr.reveal('.faq__categories', { delay: 500 });
        sr.reveal('.faq__cta', { delay: 200, origin: 'bottom' });
    }
});

// Set up event listeners
function setupEventListeners() {
    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Get category from data attribute
            const category = button.getAttribute('data-category');
            // Filter FAQs by category
            renderFAQItems(category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const clearSearchBtn = document.getElementById('clearSearch');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Show/hide clear button based on search input
        if (searchTerm.length > 0) {
            clearSearchBtn.classList.add('active');
        } else {
            clearSearchBtn.classList.remove('active');
        }
        
        // Get active category
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        // Filter FAQs by search term and category
        filterFAQs(searchTerm, activeCategory);
    });

    // Clear search button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.classList.remove('active');
        
        // Get active category
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        // Reset to category filter
        renderFAQItems(activeCategory);
    });
}

// Render FAQ items by category
function renderFAQItems(category) {
    const faqAccordion = document.querySelector('.faq__accordion');
    faqAccordion.innerHTML = '';
    
    // Filter items by category or show all
    const filteredItems = category === 'all' 
        ? faqData 
        : faqData.filter(item => item.category === category);
    
    // Show "not found" message if no items match
    const notFoundElement = document.getElementById('faqNotFound');
    if (filteredItems.length === 0) {
        notFoundElement.classList.add('active');
    } else {
        notFoundElement.classList.remove('active');
    }
    
    // Create and append FAQ items
    filteredItems.forEach(item => {
        const faqItem = createFAQItem(item);
        faqAccordion.appendChild(faqItem);
    });
    
    // Add event listeners to newly created accordion items
    addAccordionListeners();
}

// Create a single FAQ item
function createFAQItem(item) {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq__item');
    faqItem.setAttribute('data-category', item.category);
    faqItem.setAttribute('data-id', item.id);
    
    // Create tag for category
    const tagClass = `faq__tag--${item.category}`;
    const tagText = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    
    faqItem.innerHTML = `
        <div class="faq__question">
            <h3 class="faq__question-text">
                <span class="faq__tag ${tagClass}">${tagText}</span>
                ${item.question}
            </h3>
            <i class="ri-arrow-down-s-line faq__question-icon"></i>
        </div>
        <div class="faq__answer">
            <div class="faq__answer-content">
                ${item.answer}
            </div>
        </div>
    `;
    
    return faqItem;
}

// Add event listeners to accordion items
function addAccordionListeners() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                
                // Smooth scroll to this item if it's not visible
                const rect = item.getBoundingClientRect();
                const isVisible = 
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                
                if (!isVisible) {
                    // Scroll to position the clicked item at the top third of the viewport
                    const scrollPosition = window.scrollY + rect.top - (window.innerHeight / 3);
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Filter FAQs by search term and category
function filterFAQs(searchTerm, category) {
    const faqAccordion = document.querySelector('.faq__accordion');
    faqAccordion.innerHTML = '';
    
    // Filter items by search term and category
    let filteredItems = faqData;
    
    // Filter by category if not 'all'
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Filter by search term if provided
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.question.toLowerCase().includes(searchTerm) || 
            item.answer.toLowerCase().includes(searchTerm)
        );
    }
    
    // Show "not found" message if no items match
    const notFoundElement = document.getElementById('faqNotFound');
    if (filteredItems.length === 0) {
        notFoundElement.classList.add('active');
    } else {
        notFoundElement.classList.remove('active');
    }
    
    // Create and append filtered FAQ items
    filteredItems.forEach(item => {
        const faqItem = createFAQItem(item);
        
        // Highlight search term in question if found
        if (searchTerm) {
            highlightSearchTerm(faqItem, searchTerm);
        }
        
        faqAccordion.appendChild(faqItem);
    });
    
    // Add event listeners to newly created accordion items
    addAccordionListeners();
    
    // Auto-open first item if search term is provided
    if (searchTerm && filteredItems.length > 0) {
        const firstItem = faqAccordion.querySelector('.faq__item');
        if (firstItem) {
            firstItem.classList.add('active');
        }
    }
}

// Highlight search term in FAQ items
function highlightSearchTerm(faqItem, searchTerm) {
    const questionText = faqItem.querySelector('.faq__question-text');
    const answerContent = faqItem.querySelector('.faq__answer-content');
    
    // Skip the tag element
    const tagElement = questionText.querySelector('.faq__tag');
    const originalText = questionText.innerHTML;
    
    // Get text content after the tag
    const textAfterTag = originalText.substring(originalText.indexOf('</span>') + 7);
    
    // Create new HTML with highlighted search term
    const highlightedText = textAfterTag.replace(
        new RegExp(searchTerm, 'gi'), 
        match => `<span class="search-highlight">${match}</span>`
    );
    
    // Reconstruct the question HTML
    questionText.innerHTML = originalText.substring(0, originalText.indexOf('</span>') + 7) + highlightedText;
    
    // Highlight in answer content (preserving HTML)
    if (answerContent) {
        answerContent.innerHTML = answerContent.innerHTML.replace(
            new RegExp(searchTerm, 'gi'), 
            match => `<span class="search-highlight">${match}</span>`
        );
    }
} 