// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Optional: Add a simple console message
console.log('Portfolio website loaded successfully!');

// Skill rating system
const MAX_SKILL_LEVEL = 5; // Change this to adjust max rating

document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-card li[data-level]');
    
    // SVG for open laptop (filled)
    const openLaptopSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z"/></svg>';
    
    // SVG for closed laptop (unfilled)
    const closedLaptopSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0v2h24v-2h-4z"/></svg>';
    
    skillItems.forEach(item => {
        const level = parseInt(item.getAttribute('data-level')) || 0;
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'skill-rating';
        
        for (let i = 1; i <= MAX_SKILL_LEVEL; i++) {
            const laptop = document.createElement('span');
            laptop.className = i <= level ? 'laptop filled' : 'laptop';
            laptop.innerHTML = i <= level ? openLaptopSVG : closedLaptopSVG;
            ratingDiv.appendChild(laptop);
        }
        
        item.appendChild(ratingDiv);
    });
});
