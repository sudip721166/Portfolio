// Enhanced JavaScript with new features

// Initialize particles.js background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6B4BF6" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6B4BF6",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Enhanced loader
function initLoader() {
    window.addEventListener("load", () => {
        document.querySelector(".loader-wrapper").style.opacity = "0";
        setTimeout(() => {
            document.querySelector(".loader-wrapper").style.display = "none";
        }, 700);
    });
}

// Header scroll effect
function initHeaderScroll() {
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function () {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    function toggleTheme() {
        document.body.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }
}

// Enhanced typing animation
function initTypingAnimation() {
    const typingTextElement = document.getElementById('typing-text');
    if (!typingTextElement) return;

    const texts = ["Web Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (!isDeleting && charIndex < currentText.length) {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing animation after page load
    window.addEventListener('load', typeWriter);
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('nav a, .hero-btns a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#hero') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, targetId);
            }
        });
    });
}

// Active section highlighting
function initActiveSection() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 30;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle back-to-top button visibility
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (window.pageYOffset > 400) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    });
}

// Back to top functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll reveal animation
function initScrollReveal() {
    const sectionsToReveal = document.querySelectorAll("section");
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        sectionsToReveal.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top < triggerBottom) {
                if (!sec.classList.contains('reveal')) {
                    sec.classList.add('reveal');

                    // Animate stats when about section is revealed
                    if (sec.id === 'about') {
                        animateStats();
                    }
                }
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

// Modal functionality
function initModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');

    function showModal(message) {
        if (modalMessage && modalOverlay) {
            modalMessage.textContent = message;
            modalOverlay.classList.add('active');
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    return { showModal, closeModal };
}

// Form submission functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const { showModal } = initModal();

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageTextarea = document.getElementById('contact-message');

            if (!nameInput || !emailInput || !subjectInput || !messageTextarea) {
                showModal('Form fields missing or misconfigured.');
                return;
            }

            if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageTextarea.value) {
                showModal('Please fill in all fields.');
                return;
            }

            // Send to backend
            const submitButton = this.querySelector('button[type="submit"]');
            let originalButtonText;
            if (submitButton) {
                originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                const payload = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageTextarea.value.trim()
                };

                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const err = await res.json().catch(()=>({ message: 'Server error' }));
                    showModal(err.message || 'Failed to send message. Please try again later.');
                } else {
                    const resData = await res.json();
                    showModal(resData.message || `Thanks for your message, ${nameInput.value}! I'll get back to you soon.`);
                    this.reset();
                }
            } catch (err) {
                console.error('Failed to submit contact form:', err);
                showModal('Network error. Please try again later.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText || 'Send Message';
                }
            }
        });
    }
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    const { showModal } = initModal();

    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function () {
            const text = this.getAttribute('data-copy');
            const message = this.getAttribute('data-message');

            if (text && message) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showModal(message);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    showModal('Failed to copy. Please copy manually.');
                }
                document.body.removeChild(textarea);
            }
        });
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress .progress');
    const skillsSection = document.getElementById('skills');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const targetProgress = bar.dataset.progress;
            bar.style.width = '0%';
            void bar.offsetWidth;
            bar.style.width = `${targetProgress}%`;
        });
    };

    if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillObserver.observe(skillsSection);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initLoader();
    initHeaderScroll();
    initMobileMenu();
    initThemeToggle();
    initTypingAnimation();
    initSmoothScrolling();
    initActiveSection();
    initBackToTop();
    initScrollReveal();
    initContactForm();
    initCopyToClipboard();
    initSkillBars();
});

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParticles,
        initLoader,
        initHeaderScroll,
        initMobileMenu,
        initThemeToggle,
        initTypingAnimation,
        animateStats,
        initSmoothScrolling,
        initActiveSection,
        initBackToTop,
        initScrollReveal,
        initModal,
        initContactForm,
        initCopyToClipboard,
        initSkillBars
    };
}