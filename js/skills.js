// Skills Section
import skillsData from './skillsData.js';


const skillsContainer = document.getElementById('skills-container');

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

