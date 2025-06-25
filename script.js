// JavaScript for La Bella Nails & Spa

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeroSlideshow();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    initServiceCards();
    initGalleryItems();
    initReviewCards();
});

// Hero Slideshow
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play slideshow
    setInterval(nextSlide, slideInterval);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 80,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate review cards
    gsap.utils.toArray('.review-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate about section
    gsap.from('.about-text', {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.about-content',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from('.about-image', {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.about-content',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate contact info cards
    gsap.utils.toArray('.info-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate rating summary
    gsap.from('.rating-summary', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.rating-summary',
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: targetPosition,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Service Cards Hover Effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const image = card.querySelector('.service-image img');
        const overlay = card.querySelector('.service-overlay');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Gallery Items Hover Effects
function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.15,
                duration: 0.8,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
}

// Review Cards Hover Effects
function initReviewCards() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                boxShadow: '0 15px 40px rgba(212, 165, 116, 0.2)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(212, 165, 116, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Intersection Observer for Performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.service-card, .gallery-item, .review-card, .info-card').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    heroSlides.forEach(slide => {
        const speed = 0.5;
        slide.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading Animation
window.addEventListener('load', () => {
    // Animate hero content on load
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.hero-content p', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.hero-buttons .btn-primary', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.1,
        ease: "power3.out"
    });
    
    gsap.from('.hero-buttons .btn-secondary', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.3,
        ease: "power3.out"
    });
    
    gsap.from('.hero-controls', {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out"
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Analytics tracking could go here
        console.log('Phone number clicked');
    });
});

// Smooth reveal animations for text elements
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach(element => {
    gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
        }
    });
});

// Add subtle animations to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .book-btn, .service-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}); 