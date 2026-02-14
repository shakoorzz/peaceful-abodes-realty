// Mobile Menu Toggle with Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const menuPanel = document.getElementById('menu-panel');
  const menuItems = document.querySelectorAll('.menu-item');
  
  function openMenu() {
    if (!mobileMenu || !menuBackdrop || !menuPanel) return;
    
    // Enable pointer events
    mobileMenu.classList.add('pointer-events-auto');
    mobileMenu.classList.remove('pointer-events-none');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Fade in backdrop
    menuBackdrop.classList.remove('opacity-0');
    menuBackdrop.classList.add('opacity-100');
    
    // Slide in panel
    menuPanel.classList.remove('translate-x-full');
    menuPanel.classList.add('translate-x-0');
    
    // Stagger animate menu items
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('translate-x-8', 'translate-y-4', 'opacity-0');
        item.classList.add('translate-x-0', 'translate-y-0', 'opacity-100');
      }, 100 + (index * 50)); // Stagger by 50ms
    });
  }
  
  function closeMenu() {
    if (!mobileMenu || !menuBackdrop || !menuPanel) return;
    
    // Reset menu items first (reverse animation)
    menuItems.forEach((item, index) => {
      const reverseIndex = menuItems.length - 1 - index;
      setTimeout(() => {
        item.classList.add('translate-x-8', 'translate-y-4', 'opacity-0');
        item.classList.remove('translate-x-0', 'translate-y-0', 'opacity-100');
      }, reverseIndex * 30);
    });
    
    // Slide out panel
    setTimeout(() => {
      menuPanel.classList.add('translate-x-full');
      menuPanel.classList.remove('translate-x-0');
      
      // Fade out backdrop
      menuBackdrop.classList.add('opacity-0');
      menuBackdrop.classList.remove('opacity-100');
    }, 100);
    
    // Disable pointer events and restore scroll after animation
    setTimeout(() => {
      mobileMenu.classList.remove('pointer-events-auto');
      mobileMenu.classList.add('pointer-events-none');
      document.body.style.overflow = '';
    }, 400);
  }
  
  // Event listeners
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMenu);
  }
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }
  
  // Close on backdrop click
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking a link
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('pointer-events-auto')) {
      closeMenu();
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Navigation scroll effect
let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  }
});

// Favorite button functionality
document.addEventListener('click', function(e) {
  if (e.target.closest('[aria-label="Save to favorites"]')) {
    const btn = e.target.closest('[aria-label="Save to favorites"]');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      icon.classList.add('text-warm-amber');
      showToast('Property saved to favorites', 'success');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      icon.classList.remove('text-warm-amber');
      showToast('Property removed from favorites', 'success');
    }
  }
});

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Form validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('input-error');
      } else {
        field.classList.remove('input-error');
      }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.classList.add('input-error');
      }
    }
    
    if (!isValid) {
      e.preventDefault();
      showToast('Please fill in all required fields correctly', 'error');
    } else {
      e.preventDefault();
      showToast('Message sent successfully!', 'success');
      form.reset();
    }
  });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Property filter functionality
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const filter = this.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove('bg-warm-amber', 'text-white'));
    this.classList.add('bg-warm-amber', 'text-white');
  });
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

console.log('Peaceful Abodes Realty PWA loaded successfully');
