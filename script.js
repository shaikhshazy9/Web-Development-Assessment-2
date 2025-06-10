/**
 * Etihad Airways Website JavaScript
 * Handles interactivity and functionality across the site
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('nav') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
        }
    });

    // ===== FAQ Accordions =====
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Close other open FAQs
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                faqItem.classList.toggle('active');
            });
        });
    }

    // ===== Booking Form =====
    const bookingForm = document.querySelector('.booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not exists
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '14px';
                        errorMsg.style.marginTop = '5px';
                        field.parentElement.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    // Remove error message if exists
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server via AJAX
                // For demo purposes, we'll just show a success message
                const formContainer = bookingForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="text-align: center; padding: 30px;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: var(--success-color); margin-bottom: 20px;"></i>
                        <h3>Booking Request Submitted!</h3>
                        <p>Thank you for choosing Etihad Airways. We will process your request and contact you shortly.</p>
                        <button class="btn-primary" style="margin-top: 20px;" id="reset-form">Make Another Booking</button>
                    </div>
                `;
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Add event listener to the reset button
                document.getElementById('reset-form').addEventListener('click', () => {
                    formContainer.innerHTML = '';
                    formContainer.appendChild(bookingForm);
                    bookingForm.reset();
                });
            }
        });
        
        // Real-time validation for fields
        const formFields = bookingForm.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                if (field.hasAttribute('required') && field.value.trim()) {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    }

    // ===== Gallery Image Change (for destination pages) =====
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const mainGalleryImg = document.querySelector('.gallery-main img');

    if (galleryThumbs.length > 0 && mainGalleryImg) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                thumb.classList.add('active');
                
                // Update main image
                const imgSrc = thumb.querySelector('img').getAttribute('src');
                mainGalleryImg.setAttribute('src', imgSrc);
                
                // Optional: Smooth fade effect
                mainGalleryImg.style.opacity = '0';
                setTimeout(() => {
                    mainGalleryImg.style.opacity = '1';
                }, 100);
            });
        });
    }

    // ===== Sticky Header on Scroll =====
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add box shadow when scrolled
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down & past hero section
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Date Picker Initialization =====
    const datePickers = document.querySelectorAll('input[type="date"]');
    if (datePickers.length > 0) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        datePickers.forEach(picker => {
            picker.setAttribute('min', today);
        });
    }

    // ===== Flight Search Tab Toggle =====
    const flightTabs = document.querySelectorAll('.flight-tab');
    const flightForms = document.querySelectorAll('.flight-form');

    if (flightTabs.length > 0 && flightForms.length > 0) {
        flightTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and forms
                flightTabs.forEach(t => t.classList.remove('active'));
                flightForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding form
                tab.classList.add('active');
                flightForms[index].classList.add('active');
            });
        });
    }

    // ===== Passenger Counter =====
    const passengerCounters = document.querySelectorAll('.passenger-counter');
    
    if (passengerCounters.length > 0) {
        passengerCounters.forEach(counter => {
            const decrementBtn = counter.querySelector('.decrement');
            const incrementBtn = counter.querySelector('.increment');
            const countDisplay = counter.querySelector('.count');
            const inputField = counter.querySelector('input[type="hidden"]');
            
            let count = parseInt(countDisplay.textContent);
            
            decrementBtn.addEventListener('click', () => {
                if (count > parseInt(inputField.getAttribute('min'))) {
                    count--;
                    countDisplay.textContent = count;
                    inputField.value = count;
                }
                
                // Disable button if min reached
                if (count <= parseInt(inputField.getAttribute('min'))) {
                    decrementBtn.classList.add('disabled');
                }
                
                // Enable increment button if previously at max
                if (incrementBtn.classList.contains('disabled')) {
                    incrementBtn.classList.remove('disabled');
                }
            });
            
            incrementBtn.addEventListener('click', () => {
                if (count < parseInt(inputField.getAttribute('max'))) {
                    count++;
                    countDisplay.textContent = count;
                    inputField.value = count;
                }
                
                // Disable button if max reached
                if (count >= parseInt(inputField.getAttribute('max'))) {
                    incrementBtn.classList.add('disabled');
                }
                
                // Enable decrement button if previously at min
                if (decrementBtn.classList.contains('disabled')) {
                    decrementBtn.classList.remove('disabled');
                }
            });
        });
    }

    // ===== Testimonial Slider =====
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        const prevBtn = testimonialSlider.querySelector('.slider-prev');
        const nextBtn = testimonialSlider.querySelector('.slider-next');
        const dotsContainer = testimonialSlider.querySelector('.slider-dots');
        
        let currentIndex = 0;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        // Show current slide
        function showSlide(index) {
            testimonials.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showSlide(currentIndex);
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showSlide(currentIndex);
        }
        
        // Event listeners for buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Initialize slider
        showSlide(currentIndex);
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // ===== Animated Counter =====
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        counter.textContent = Math.floor(current).toLocaleString();
                        
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    // Unobserve after animation
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

// ===== Add animation on scroll =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');

if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}