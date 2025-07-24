/**
 * Accessibility Enhancement JavaScript
 * Sawsan Abdulbari Portfolio
 * 
 * This file enhances the website's accessibility with:
 * - Keyboard navigation improvements
 * - ARIA live regions
 * - Form validation
 * - Focus management
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize accessibility features
    initSkipLinks();
    initKeyboardNavigation();
    initFormAccessibility();
    initAriaLiveRegions();
    initFocusManagement();
    initResponsiveMenu();
    
    /**
     * Skip links functionality
     */
    function initSkipLinks() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.tabIndex = -1;
                    targetElement.focus();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    /**
     * Enhanced keyboard navigation
     */
    function initKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Alt + H: Go to home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            // Alt + C: Go to contact form
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                window.location.href = 'skills-projects.html#contact-form';
            }
            // Alt + A: Go to accessibility statement
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                window.location.href = 'accessibility.html';
            }
        });
        
        // Escape key to close modals or reset focus
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('[role="dialog"]');
                modals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        closeModal(modal);
                    }
                });
            }
        });
    }
    
    /**
     * Form accessibility enhancements
     */
    function initFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Real-time validation feedback
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                // Announce errors to screen readers
                input.addEventListener('invalid', function(e) {
                    e.preventDefault();
                    const errorId = this.getAttribute('aria-describedby');
                    if (errorId) {
                        const errorElement = document.getElementById(errorId);
                        if (errorElement) {
                            announceToScreenReader(errorElement.textContent);
                        }
                    }
                });
            });
            
            // Form submission handling
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const fields = this.querySelectorAll('input, textarea, select');
                
                fields.forEach(field => {
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showSuccessMessage(form);
                } else {
                    // Focus first error field
                    const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
                    if (firstError) {
                        firstError.focus();
                        announceToScreenReader('Please correct the errors in the form');
                    }
                }
            });
        });
    }
    
    /**
     * Validate individual form field
     */
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Reset error state
        formGroup.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            showFieldError(formGroup, field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(formGroup, field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(formGroup, field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Show field error
     */
    function showFieldError(formGroup, field, message) {
        formGroup.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
    
    /**
     * Show success message after form submission
     */
    function showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.setAttribute('role', 'alert');
        successDiv.setAttribute('aria-live', 'polite');
        successDiv.textContent = 'Thank you! Your message has been sent successfully.';
        
        form.parentElement.insertBefore(successDiv, form);
        form.reset();
        
        // Announce to screen readers
        announceToScreenReader('Form submitted successfully');
        
        // Focus success message
        successDiv.tabIndex = -1;
        successDiv.focus();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    /**
     * Initialize ARIA live regions
     */
    function initAriaLiveRegions() {
        // Create a live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        liveRegion.id = 'aria-live-region';
        document.body.appendChild(liveRegion);
    }
    
    /**
     * Announce message to screen readers
     */
    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
    
    /**
     * Focus management for dynamic content
     */
    function initFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', function(e) {
            const modal = document.querySelector('[role="dialog"]:not([hidden])');
            if (modal && e.key === 'Tab') {
                trapFocus(modal, e);
            }
        });
    }
    
    /**
     * Trap focus within an element
     */
    function trapFocus(element, event) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                event.preventDefault();
            }
        }
    }
    
    /**
     * Responsive menu for mobile
     */
    function initResponsiveMenu() {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const nav = document.querySelector('nav');
        if (nav && window.innerWidth <= 768) {
            nav.parentElement.insertBefore(menuToggle, nav);
            
            menuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                nav.classList.toggle('mobile-open');
                
                // Announce state change
                announceToScreenReader(isExpanded ? 'Navigation menu closed' : 'Navigation menu opened');
            });
        }
    }
    
    /**
     * Enhance image loading for performance
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    /**
     * Add current page indicator to navigation
     */
    function setCurrentPage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // Initialize current page indicator
    setCurrentPage();
    
    // Initialize lazy loading
    initLazyLoading();
    
    /**
     * Utility function to check if user prefers reduced motion
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Add smooth scrolling with reduced motion check
     */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                if (prefersReducedMotion()) {
                    targetElement.scrollIntoView();
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Set focus for keyboard users
                targetElement.tabIndex = -1;
                targetElement.focus();
            }
        });
    });
});

/**
 * Print-friendly functionality
 */
window.addEventListener('beforeprint', function() {
    // Expand all collapsed content before printing
    const collapsedElements = document.querySelectorAll('[aria-expanded="false"]');
    collapsedElements.forEach(element => {
        element.setAttribute('aria-expanded', 'true');
    });
});

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive features
window.addEventListener('resize', debounce(function() {
    // Reinitialize responsive features if needed
    if (window.innerWidth > 768) {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('mobile-open');
        }
    }
}, 250));