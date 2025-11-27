// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"], .treatment-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80; // Account for sticky header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Add active state to navigation links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = '#6b8e9e';
        navLink.style.fontWeight = '600';
      } else if (navLink) {
        navLink.style.color = '#5a6c7d';
        navLink.style.fontWeight = '500';
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);

  // Scroll to top functionality for brand links
  document.querySelectorAll('.js-scroll-top').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Initialize FAQ accordions
  initAccordion('[data-accordion]');
});

/**
 * Reusable accordion functionality
 * Initializes accordion behavior for containers matching the selector.
 * - Only one item can be open at a time
 * - First item starts open by default (via .active class in HTML)
 * - Manages aria-expanded and aria-hidden attributes for accessibility
 * 
 * @param {string} containerSelector - CSS selector for accordion containers
 * @param {Object} options - Configuration options
 * @param {string} options.itemSelector - Selector for accordion items (default: '.faq-item')
 * @param {string} options.triggerSelector - Selector for clickable triggers (default: '.faq-question')
 * @param {string} options.panelSelector - Selector for content panels (default: '.faq-answer')
 * @param {string} options.activeClass - Class to add to active items (default: 'active')
 */
function initAccordion(containerSelector, options = {}) {
  const defaults = {
    itemSelector: '.faq-item',
    triggerSelector: '.faq-question',
    panelSelector: '.faq-answer',
    activeClass: 'active'
  };

  const config = { ...defaults, ...options };
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const items = container.querySelectorAll(config.itemSelector);

    items.forEach(item => {
      const trigger = item.querySelector(config.triggerSelector);
      const panel = item.querySelector(config.panelSelector);

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains(config.activeClass);

        // Close all other items in this accordion
        items.forEach(otherItem => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector(config.triggerSelector);
            const otherPanel = otherItem.querySelector(config.panelSelector);
            
            otherItem.classList.remove(config.activeClass);
            if (otherTrigger) {
              otherTrigger.setAttribute('aria-expanded', 'false');
            }
            if (otherPanel) {
              otherPanel.setAttribute('aria-hidden', 'true');
            }
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove(config.activeClass);
          trigger.setAttribute('aria-expanded', 'false');
          panel.setAttribute('aria-hidden', 'true');
        } else {
          item.classList.add(config.activeClass);
          trigger.setAttribute('aria-expanded', 'true');
          panel.removeAttribute('aria-hidden');
        }
      });
    });
  });
}
