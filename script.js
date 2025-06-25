// JavaScript for La Bella Nails & Spa

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close the menu on click
            navMenu.classList.remove('active');
            hamburger.classList.remove('is-active');

            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from('.hero-content', {
        duration: 1.2,
        opacity: 0,
        y: -50,
        ease: 'power3.out',
        delay: 0.5
    });

    // Section Fade-in Animation using ScrollTrigger
    gsap.utils.toArray('.fade-in').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power4.out'
        });
    });

    // Service Items Animation
    gsap.from(".service-item", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Gallery Animation
    gsap.from(".gallery-item", {
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // About section animation
     gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
    });
     gsap.from(".about-image", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Contact section animation
    gsap.from(".contact-info, .map-container", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('header nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });

    // HERO SLIDESHOW
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const leftArrow = document.querySelector('.hero-arrow-left');
    const rightArrow = document.querySelector('.hero-arrow-right');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        currentSlide = idx;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    rightArrow.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
    leftArrow.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(i);
            startSlideshow();
        });
    });
    showSlide(0);
    startSlideshow();
}); 