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

  const initCarousel = (root) => {
    const images = Array.from(root.querySelectorAll('[data-carousel-image]'));
    if (!images.length) return;

    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const thumbs = Array.from(root.querySelectorAll('[data-carousel-thumb]'));
    const stagedLabel = root.querySelector('[data-carousel-staged-label]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    let current = 0;

    const setActive = (index) => {
      images.forEach((img, idx) => {
        const isActive = idx === index;
        img.classList.toggle('opacity-100', isActive);
        img.classList.toggle('opacity-0', !isActive);
        img.classList.toggle('pointer-events-none', !isActive);
        img.classList.toggle('is-active', isActive);
        img.classList.toggle('is-inactive', !isActive);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('bg-warm-amber', idx === index);
        dot.classList.toggle('bg-white/70', idx !== index);
      });

      thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('border-warm-amber', idx === index);
        thumb.classList.toggle('border-transparent', idx !== index);
      });

      if (stagedLabel) {
        const activeImage = images[index];
        const isStaged = activeImage?.getAttribute('data-staged') === 'true';
        stagedLabel.classList.toggle('hidden', !isStaged);
      }
    };

    const show = (index) => {
      current = (index + images.length) % images.length;
      setActive(current);
    };

    prev?.addEventListener('click', (event) => {
      event.preventDefault();
      show(current - 1);
    });

    next?.addEventListener('click', (event) => {
      event.preventDefault();
      show(current + 1);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.getAttribute('data-index'));
        show(idx);
      });
    });

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = Number(thumb.getAttribute('data-index'));
        show(idx);
      });
    });

    setActive(0);
  };

  document.querySelectorAll('[data-carousel-root]').forEach(initCarousel);
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
    if (form.hasAttribute('data-skip-validation')) {
      return;
    }

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

// Supabase Auth (Client Portal)
function initPortalAuth() {
  const portal = document.getElementById('portal-auth');
  if (!portal) return;

  const supabaseUrl = portal.dataset.supabaseUrl;
  const supabaseAnonKey = portal.dataset.supabaseAnonKey;

  const messageBox = document.getElementById('portal-message');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const profileSection = document.getElementById('portal-profile');
  const profileName = document.getElementById('profile-name');
  const profileRole = document.getElementById('profile-role');
  const signoutBtn = document.getElementById('signout-btn');
  const tabButtons = document.querySelectorAll('.portal-tab');
  const portalMode = portal.dataset.portalMode || 'client';
  const redirectTarget = portalMode === 'agent' ? '/agent-dashboard' : '/dashboard';
  const roleSelect = signupForm ? signupForm.querySelector('select[name="role"]') : null;
  localStorage.setItem('preferredPortal', portalMode);

  const showMessage = (text, type = 'info') => {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
    messageBox.classList.remove('border-red-200', 'text-red-700', 'bg-red-50');
    messageBox.classList.remove('border-green-200', 'text-green-700', 'bg-green-50');
    messageBox.classList.remove('border-blue-200', 'text-blue-700', 'bg-blue-50');

    if (type === 'error') {
      messageBox.classList.add('border-red-200', 'text-red-700', 'bg-red-50');
    } else if (type === 'success') {
      messageBox.classList.add('border-green-200', 'text-green-700', 'bg-green-50');
    } else {
      messageBox.classList.add('border-blue-200', 'text-blue-700', 'bg-blue-50');
    }
  };

  const setActiveTab = (tab) => {
    tabButtons.forEach(button => {
      const isActive = button.dataset.portalTab === tab;
      button.classList.toggle('bg-warm-amber', isActive);
      button.classList.toggle('text-white', isActive);
      button.classList.toggle('bg-soft-cream', !isActive);
      button.classList.toggle('text-charcoal', !isActive);
    });

    if (loginForm && signupForm) {
      loginForm.classList.toggle('hidden', tab !== 'login');
      signupForm.classList.toggle('hidden', tab !== 'signup');
    }
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveTab(button.dataset.portalTab || 'login');
    });
  });

  if (portalMode === 'agent' && roleSelect) {
    roleSelect.value = 'agent';
    roleSelect.setAttribute('disabled', 'true');
    roleSelect.classList.add('bg-gray-100', 'text-mist-gray', 'cursor-not-allowed');
  }

  setActiveTab(portalMode === 'agent' ? 'signup' : 'login');


  const hasSupabase = Boolean(window.supabase && supabaseUrl && supabaseAnonKey);
  let supabaseClient = null;

  if (!hasSupabase) {
    showMessage('Supabase connection not configured yet. Please refresh after deployment.', 'error');
  } else {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
  }

  const loadProfile = async (user) => {
    if (!user) return;
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('Profile load error', error.message);
      return;
    }

    localStorage.setItem('userRole', data?.role || 'investor');

    if (profileSection) profileSection.classList.remove('hidden');
    if (profileName) profileName.textContent = data?.full_name || user.email || 'User';
    if (profileRole) profileRole.textContent = data?.role ? `Role: ${data.role}` : 'Role: investor';
  };

  const resetProfile = () => {
    if (profileSection) profileSection.classList.add('hidden');
    if (profileName) profileName.textContent = '-';
    if (profileRole) profileRole.textContent = '-';
  };

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!supabaseClient) {
        showMessage('Supabase connection not configured yet. Please refresh after deployment.', 'error');
        return;
      }

      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showMessage(error.message, 'error');
        return;
      }

      showMessage('Signed in successfully.', 'success');
      await loadProfile(data.user);
      window.location.href = redirectTarget;
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!supabaseClient) {
        showMessage('Supabase connection not configured yet. Please refresh after deployment.', 'error');
        return;
      }

      const formData = new FormData(signupForm);
      const fullName = formData.get('full_name');
      const role = portalMode === 'agent' ? 'agent' : (formData.get('role') || 'investor');
      const email = formData.get('email');
      const password = formData.get('password');

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (error) {
        showMessage(error.message, 'error');
        return;
      }

      if (data.user) {
        await supabaseClient.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          role,
        });
      }

      if (data.session) {
        window.location.href = redirectTarget;
        return;
      }

      showMessage('Account created. Check your email to confirm.', 'success');
      setActiveTab('login');
    });
  }

  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      if (!supabaseClient) {
        showMessage('You are signed out.', 'info');
        resetProfile();
        return;
      }
      await supabaseClient.auth.signOut();
      localStorage.removeItem('userRole');
      resetProfile();
      showMessage('Signed out successfully.', 'info');
    });
  }

  if (supabaseClient) {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        window.location.href = redirectTarget;
        return;
      }
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        resetProfile();
      }
    });
  }
}

function initDashboardAuth() {
  const dashboard = document.getElementById('dashboard');
  if (!dashboard) return;

  const supabaseUrl = dashboard.dataset.supabaseUrl;
  const supabaseAnonKey = dashboard.dataset.supabaseAnonKey;
  if (!window.supabase || !supabaseUrl || !supabaseAnonKey) {
    window.location.href = '/portal';
    return;
  }

  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

  const nameEl = document.getElementById('dashboard-name');
  const emailEl = document.getElementById('dashboard-email');
  const roleEl = document.getElementById('dashboard-role');
  const signoutBtn = document.getElementById('dashboard-signout');

  const handleMissingSession = () => {
    window.location.href = '/portal';
  };

  const loadProfile = async (user) => {
    if (!user) return;
    if (emailEl) emailEl.textContent = user.email || '-';

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    if (error) {
      if (nameEl) nameEl.textContent = user.email || 'Investor';
      if (roleEl) roleEl.textContent = 'Role: investor';
      return;
    }

    localStorage.setItem('userRole', data?.role || 'investor');

    if (data?.role === 'agent') {
      window.location.href = '/agent-dashboard';
      return;
    }

    if (nameEl) nameEl.textContent = data?.full_name || user.email || 'Investor';
    if (roleEl) roleEl.textContent = data?.role ? `Role: ${data.role}` : 'Role: investor';
  };

  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      localStorage.removeItem('userRole');
      handleMissingSession();
    });
  }

  supabaseClient.auth.getSession().then(({ data }) => {
    if (!data.session?.user) {
      handleMissingSession();
      return;
    }

    loadProfile(data.session.user);
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      handleMissingSession();
      return;
    }

    loadProfile(session.user);
  });
}

function initAgentDashboardAuth() {
  const dashboard = document.getElementById('agent-dashboard');
  if (!dashboard) return;

  const supabaseUrl = dashboard.dataset.supabaseUrl;
  const supabaseAnonKey = dashboard.dataset.supabaseAnonKey;
  if (!window.supabase || !supabaseUrl || !supabaseAnonKey) {
    window.location.href = '/agent';
    return;
  }

  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

  const nameEl = document.getElementById('agent-name');
  const emailEl = document.getElementById('agent-email');
  const roleEl = document.getElementById('agent-role');
  const signoutBtn = document.getElementById('agent-signout');
  const leadForm = document.getElementById('agent-lead-form');
  const dealList = document.getElementById('agent-deal-list');
  const leadStatus = document.getElementById('agent-lead-status');
  const kpiActive = document.getElementById('agent-kpi-active');
  const kpiTours = document.getElementById('agent-kpi-tours');
  const kpiOffers = document.getElementById('agent-kpi-offers');
  const kpiClosed = document.getElementById('agent-kpi-closed');
  const cancelEditBtn = document.getElementById('agent-cancel-edit');
  const submitBtn = leadForm ? leadForm.querySelector('button[type="submit"]') : null;
  const leadPanel = document.getElementById('agent-lead-panel');
  const leadPanelOverlay = document.getElementById('agent-lead-panel-overlay');
  const leadPanelClose = document.getElementById('agent-lead-panel-close');
  const panelEditBtn = document.getElementById('agent-lead-panel-edit');
  const panelDeleteBtn = document.getElementById('agent-lead-panel-delete');
  const detailName = document.getElementById('lead-detail-name');
  const detailStage = document.getElementById('lead-detail-stage');
  const detailBudget = document.getElementById('lead-detail-budget');
  const detailArea = document.getElementById('lead-detail-area');
  const detailTimeline = document.getElementById('lead-detail-timeline');
  const detailAction = document.getElementById('lead-detail-action');
  const detailNotes = document.getElementById('lead-detail-notes');
  const detailCreated = document.getElementById('lead-detail-created');
  const offerForm = document.getElementById('agent-offer-form');
  const offerList = document.getElementById('agent-offer-list');
  const offerStatus = document.getElementById('agent-offer-status');
  const partnerForm = document.getElementById('agent-partner-form');
  const partnerList = document.getElementById('agent-partner-list');
  const partnerStatus = document.getElementById('agent-partner-status');
  const partnerCancelBtn = document.getElementById('agent-partner-cancel');
  const partnerSubmitBtn = document.getElementById('agent-partner-submit');
  const vendorForm = document.getElementById('agent-vendor-form');
  const vendorList = document.getElementById('agent-vendor-list');
  const vendorStatus = document.getElementById('agent-vendor-status');
  const vendorCancelBtn = document.getElementById('agent-vendor-cancel');
  const vendorSubmitBtn = document.getElementById('agent-vendor-submit');
  let currentUser = null;
  let editingLeadId = null;
  let editingPartnerId = null;
  let editingVendorId = null;
  let activePanelLeadId = null;
  let leadCache = [];
  let offerCache = [];
  let partnerCache = [];
  let vendorCache = [];

  const handleMissingSession = () => {
    window.location.href = '/agent';
  };

  const loadProfile = async (user) => {
    if (!user) return;
    currentUser = user;
    if (emailEl) emailEl.textContent = user.email || '-';

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    if (error) {
      if (nameEl) nameEl.textContent = user.email || 'Agent';
      if (roleEl) roleEl.textContent = 'Role: agent';
      return;
    }

    localStorage.setItem('userRole', data?.role || 'agent');

    if (data?.role && data.role !== 'agent') {
      window.location.href = '/dashboard';
      return;
    }

    if (nameEl) nameEl.textContent = data?.full_name || user.email || 'Agent';
    if (roleEl) roleEl.textContent = data?.role ? `Role: ${data.role}` : 'Role: agent';

    await loadLeads(user.id);
    await loadOfferChecklist(user.id);
    await loadPartners(user.id);
    await loadVendors(user.id);
  };

  const renderLeads = (leads) => {
    if (!dealList) return;
    if (!leads.length) {
      dealList.innerHTML = '<div class="border border-dashed border-mist-gray/40 rounded-lg px-4 py-6 text-center text-sm text-mist-gray">Deal pipeline will appear here after you add a lead.</div>';
      return;
    }

    dealList.innerHTML = leads.map((lead) => {
      const stageClass = lead.stage === 'Closed'
        ? 'bg-forest-green/10 text-forest-green'
        : lead.stage === 'Offer Drafted'
          ? 'bg-warm-amber/10 text-warm-amber'
          : lead.stage === 'Tours Scheduled'
            ? 'bg-twilight-blue/10 text-twilight-blue'
            : 'bg-soft-cream text-mist-gray';

      return `
        <div class="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-100 rounded-lg px-4 py-3 gap-2">
          <div>
            <p class="text-charcoal font-medium">${lead.lead_name}</p>
            <p class="text-xs text-mist-gray">Next action: ${lead.next_action || 'Follow up'}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold px-3 py-1 rounded-full ${stageClass}">${lead.stage}</span>
            <button type="button" class="text-xs font-semibold text-twilight-blue hover:text-warm-amber" data-action="view" data-id="${lead.id}">View Details</button>
            <button type="button" class="text-xs font-semibold text-twilight-blue hover:text-warm-amber" data-action="edit" data-id="${lead.id}">Edit</button>
            <button type="button" class="text-xs font-semibold text-sunset-orange hover:text-warm-amber" data-action="delete" data-id="${lead.id}">Delete</button>
          </div>
        </div>
      `;
    }).join('');
  };

  const updateKpis = (leads) => {
    const activeCount = leads.filter(lead => lead.stage !== 'Closed').length;
    const tourCount = leads.filter(lead => lead.stage === 'Tours Scheduled').length;
    const offerCount = leads.filter(lead => lead.stage === 'Offer Drafted').length;
    const closedCount = leads.filter(lead => lead.stage === 'Closed').length;

    if (kpiActive) kpiActive.textContent = activeCount.toString();
    if (kpiTours) kpiTours.textContent = tourCount.toString();
    if (kpiOffers) kpiOffers.textContent = offerCount.toString();
    if (kpiClosed) kpiClosed.textContent = closedCount.toString();
  };

  const setFormValues = (lead) => {
    if (!leadForm || !lead) return;
    const setValue = (selector, value) => {
      const field = leadForm.querySelector(selector);
      if (field) field.value = value || '';
    };
    setValue('input[name="lead_name"]', lead.lead_name);
    setValue('input[name="budget"]', lead.budget);
    setValue('input[name="target_area"]', lead.target_area);
    setValue('select[name="timeline"]', lead.timeline || '0-30 days');
    setValue('select[name="stage"]', lead.stage || 'New');
    setValue('input[name="next_action"]', lead.next_action);
    setValue('textarea[name="notes"]', lead.notes);
  };

  const clearEditMode = () => {
    editingLeadId = null;
    if (leadForm) leadForm.reset();
    if (submitBtn) submitBtn.textContent = 'Add Lead';
    if (cancelEditBtn) cancelEditBtn.classList.add('hidden');
    if (leadStatus) leadStatus.textContent = 'Ready to add a new lead.';
  };

  const setEditMode = (lead) => {
    editingLeadId = lead?.id || null;
    setFormValues(lead);
    if (submitBtn) submitBtn.textContent = 'Update Lead';
    if (cancelEditBtn) cancelEditBtn.classList.remove('hidden');
    if (leadStatus) leadStatus.textContent = 'Editing lead — update fields and save.';
  };

  const setDetailText = (element, value, fallback = '-') => {
    if (!element) return;
    element.textContent = value || fallback;
  };

  const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString();
  };

  const openLeadPanel = (lead) => {
    if (!leadPanel || !lead) return;
    activePanelLeadId = lead.id;
    setDetailText(detailName, lead.lead_name, 'Lead');
    setDetailText(detailStage, lead.stage);
    setDetailText(detailBudget, lead.budget);
    setDetailText(detailArea, lead.target_area);
    setDetailText(detailTimeline, lead.timeline);
    setDetailText(detailAction, lead.next_action);
    setDetailText(detailNotes, lead.notes, 'No notes yet.');
    setDetailText(detailCreated, formatDate(lead.created_at));
    leadPanel.classList.remove('hidden');
  };

  const closeLeadPanel = () => {
    if (!leadPanel) return;
    leadPanel.classList.add('hidden');
    activePanelLeadId = null;
  };

  const loadLeads = async (agentId) => {
    if (!agentId) return;
    const { data, error } = await supabaseClient
      .from('agent_leads')
      .select('id, lead_name, budget, target_area, timeline, stage, next_action, notes, created_at')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) {
      if (leadStatus) {
        leadStatus.textContent = 'Unable to load leads yet.';
      }
      return;
    }

    leadCache = data || [];
    renderLeads(leadCache);
    updateKpis(leadCache);
    if (editingLeadId && !leadCache.find(lead => lead.id === editingLeadId)) {
      clearEditMode();
    }
    if (leadStatus) {
      leadStatus.textContent = leadCache.length ? 'Lead pipeline updated.' : 'No leads yet. Add your first lead.';
    }
  };

  const fetchLeadById = async (leadId) => {
    if (!currentUser || !leadId) return null;
    const { data, error } = await supabaseClient
      .from('agent_leads')
      .select('id, lead_name, budget, target_area, timeline, stage, next_action, notes, created_at')
      .eq('id', leadId)
      .eq('agent_id', currentUser.id)
      .single();

    if (error) {
      if (leadStatus) {
        leadStatus.textContent = `Error: ${error.message}`;
      }
      return null;
    }

    return data;
  };

  const deleteLead = async (leadId) => {
    if (!currentUser || !leadId) return;
    const { error } = await supabaseClient
      .from('agent_leads')
      .delete()
      .eq('id', leadId)
      .eq('agent_id', currentUser.id);

    if (error) {
      if (leadStatus) {
        leadStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    if (leadStatus) {
      leadStatus.textContent = 'Lead deleted.';
    }
    closeLeadPanel();
    await loadLeads(currentUser.id);
  };

  const renderOfferChecklist = (items) => {
    if (!offerList) return;
    if (!items.length) {
      offerList.innerHTML = '<li class="border border-dashed border-mist-gray/30 rounded-lg px-3 py-3 text-sm text-mist-gray">No checklist items yet. Add the first requirement.</li>';
      return;
    }

    offerList.innerHTML = items.map(item => {
      const labelClass = item.is_complete ? 'line-through text-mist-gray' : 'text-charcoal';
      return `
        <li class="flex items-center justify-between gap-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" data-action="toggle-offer" data-id="${item.id}" ${item.is_complete ? 'checked' : ''} class="h-4 w-4 accent-warm-amber" />
            <span class="${labelClass}">${item.title}</span>
          </label>
          <button type="button" data-action="delete-offer" data-id="${item.id}" class="text-xs text-sunset-orange font-semibold">Remove</button>
        </li>
      `;
    }).join('');
  };

  const loadOfferChecklist = async (agentId) => {
    if (!agentId) return;
    const { data, error } = await supabaseClient
      .from('offer_checklist')
      .select('id, title, is_complete, created_at')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) {
      if (offerStatus) {
        offerStatus.textContent = 'Unable to load checklist yet.';
      }
      return;
    }

    offerCache = data || [];
    renderOfferChecklist(offerCache);
    if (offerStatus) {
      offerStatus.textContent = offerCache.length ? 'Checklist updated.' : 'No checklist items yet.';
    }
  };

  const addOfferItem = async (title) => {
    if (!currentUser || !title) return;
    const { error } = await supabaseClient
      .from('offer_checklist')
      .insert({ agent_id: currentUser.id, title, is_complete: false });

    if (error) {
      if (offerStatus) {
        offerStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    if (offerStatus) {
      offerStatus.textContent = 'Checklist item added.';
    }
    await loadOfferChecklist(currentUser.id);
  };

  const toggleOfferItem = async (itemId, isComplete) => {
    if (!currentUser || !itemId) return;
    const { error } = await supabaseClient
      .from('offer_checklist')
      .update({ is_complete: isComplete })
      .eq('id', itemId)
      .eq('agent_id', currentUser.id);

    if (error) {
      if (offerStatus) {
        offerStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    await loadOfferChecklist(currentUser.id);
  };

  const deleteOfferItem = async (itemId) => {
    if (!currentUser || !itemId) return;
    const { error } = await supabaseClient
      .from('offer_checklist')
      .delete()
      .eq('id', itemId)
      .eq('agent_id', currentUser.id);

    if (error) {
      if (offerStatus) {
        offerStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    if (offerStatus) {
      offerStatus.textContent = 'Checklist item removed.';
    }
    await loadOfferChecklist(currentUser.id);
  };

  const renderPartners = (partners) => {
    if (!partnerList) return;
    if (!partners.length) {
      partnerList.innerHTML = '<div class="border border-dashed border-mist-gray/40 rounded-lg px-4 py-4 text-center text-sm text-mist-gray">No partners yet. Add your first trusted vendor.</div>';
      return;
    }

    partnerList.innerHTML = partners.map((partner) => {
      const role = partner.role || 'Partner';
      const contactParts = [partner.email, partner.phone].filter(Boolean);
      const contactLine = contactParts.length ? ` • ${contactParts.join(' • ')}` : '';
      const notes = partner.notes ? `<p class="text-xs text-mist-gray mt-1">${partner.notes}</p>` : '';

      return `
        <div class="flex flex-col gap-3 border border-gray-100 rounded-lg px-4 py-3">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-charcoal font-medium">${partner.name}</p>
              <p class="text-xs text-mist-gray">${role}${contactLine}</p>
              ${notes}
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="text-xs font-semibold text-twilight-blue hover:text-warm-amber" data-action="edit-partner" data-id="${partner.id}">Edit</button>
              <button type="button" class="text-xs font-semibold text-sunset-orange hover:text-warm-amber" data-action="delete-partner" data-id="${partner.id}">Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  const loadPartners = async (agentId) => {
    if (!agentId) return;
    const { data, error } = await supabaseClient
      .from('partner_directory')
      .select('id, name, role, email, phone, notes, created_at')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) {
      if (partnerStatus) {
        partnerStatus.textContent = 'Unable to load partners yet.';
      }
      return;
    }

    partnerCache = data || [];
    renderPartners(partnerCache);
    if (partnerStatus) {
      partnerStatus.textContent = partnerCache.length ? 'Directory updated.' : 'No partners yet.';
    }
  };

  const setPartnerFormValues = (partner) => {
    if (!partnerForm || !partner) return;
    const setValue = (selector, value) => {
      const field = partnerForm.querySelector(selector);
      if (field) field.value = value || '';
    };
    setValue('input[name="name"]', partner.name);
    setValue('input[name="role"]', partner.role);
    setValue('input[name="email"]', partner.email);
    setValue('input[name="phone"]', partner.phone);
    setValue('textarea[name="notes"]', partner.notes);
  };

  const clearPartnerEditMode = () => {
    editingPartnerId = null;
    if (partnerForm) partnerForm.reset();
    if (partnerSubmitBtn) partnerSubmitBtn.textContent = 'Add Partner';
    if (partnerCancelBtn) partnerCancelBtn.classList.add('hidden');
    if (partnerStatus) partnerStatus.textContent = 'Directory ready.';
  };

  const setPartnerEditMode = (partner) => {
    editingPartnerId = partner?.id || null;
    setPartnerFormValues(partner);
    if (partnerSubmitBtn) partnerSubmitBtn.textContent = 'Update Partner';
    if (partnerCancelBtn) partnerCancelBtn.classList.remove('hidden');
    if (partnerStatus) partnerStatus.textContent = 'Editing partner — update fields and save.';
  };

  const deletePartner = async (partnerId) => {
    if (!currentUser || !partnerId) return;
    const { error } = await supabaseClient
      .from('partner_directory')
      .delete()
      .eq('id', partnerId)
      .eq('agent_id', currentUser.id);

    if (error) {
      if (partnerStatus) {
        partnerStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    if (partnerStatus) {
      partnerStatus.textContent = 'Partner removed.';
    }
    await loadPartners(currentUser.id);
  };

  const renderVendors = (vendors) => {
    if (!vendorList) return;
    if (!vendors.length) {
      vendorList.innerHTML = '<div class="border border-dashed border-mist-gray/40 rounded-lg px-4 py-4 text-center text-sm text-mist-gray">No vendors yet. Add your first compliance record.</div>';
      return;
    }

    vendorList.innerHTML = vendors.map((vendor) => {
      const statusLabel = vendor.status || 'In Compliance';
      const badgeClass = statusLabel === 'Expired'
        ? 'bg-sunset-orange/10 text-sunset-orange'
        : statusLabel === 'Expiring Soon'
          ? 'bg-warm-amber/15 text-warm-amber'
          : 'bg-emerald-50 text-emerald-700';
      const expiresOn = vendor.expires_on ? new Date(vendor.expires_on).toLocaleDateString() : 'No date';
      const notes = vendor.notes ? `<p class="text-xs text-mist-gray mt-2">${vendor.notes}</p>` : '';

      return `
        <div class="flex flex-col gap-3 border border-gray-100 rounded-lg px-4 py-3">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-charcoal font-medium">${vendor.vendor_name}</p>
              <p class="text-xs text-mist-gray">${vendor.trade_type || 'Vendor'} • Expires ${expiresOn}</p>
              ${notes}
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="px-2 py-1 rounded-full text-[10px] font-semibold ${badgeClass}">${statusLabel}</span>
              <div class="flex items-center gap-2">
                <button type="button" class="text-xs font-semibold text-twilight-blue hover:text-warm-amber" data-action="edit-vendor" data-id="${vendor.id}">Edit</button>
                <button type="button" class="text-xs font-semibold text-sunset-orange hover:text-warm-amber" data-action="delete-vendor" data-id="${vendor.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  const loadVendors = async (agentId) => {
    if (!agentId) return;
    const { data, error } = await supabaseClient
      .from('vendor_compliance')
      .select('id, vendor_name, trade_type, status, expires_on, notes, created_at')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) {
      if (vendorStatus) {
        vendorStatus.textContent = 'Unable to load vendors yet.';
      }
      return;
    }

    vendorCache = data || [];
    renderVendors(vendorCache);
    if (vendorStatus) {
      vendorStatus.textContent = vendorCache.length ? 'Tracker updated.' : 'No vendors yet.';
    }
  };

  const setVendorFormValues = (vendor) => {
    if (!vendorForm || !vendor) return;
    const setValue = (selector, value) => {
      const field = vendorForm.querySelector(selector);
      if (field) field.value = value || '';
    };
    setValue('input[name="vendor_name"]', vendor.vendor_name);
    setValue('input[name="trade_type"]', vendor.trade_type);
    setValue('select[name="status"]', vendor.status || 'In Compliance');
    setValue('input[name="expires_on"]', vendor.expires_on ? vendor.expires_on.split('T')[0] : '');
    setValue('textarea[name="notes"]', vendor.notes);
  };

  const clearVendorEditMode = () => {
    editingVendorId = null;
    if (vendorForm) vendorForm.reset();
    if (vendorSubmitBtn) vendorSubmitBtn.textContent = 'Add Vendor';
    if (vendorCancelBtn) vendorCancelBtn.classList.add('hidden');
    if (vendorStatus) vendorStatus.textContent = 'Tracker ready.';
  };

  const setVendorEditMode = (vendor) => {
    editingVendorId = vendor?.id || null;
    setVendorFormValues(vendor);
    if (vendorSubmitBtn) vendorSubmitBtn.textContent = 'Update Vendor';
    if (vendorCancelBtn) vendorCancelBtn.classList.remove('hidden');
    if (vendorStatus) vendorStatus.textContent = 'Editing vendor — update fields and save.';
  };

  const deleteVendor = async (vendorId) => {
    if (!currentUser || !vendorId) return;
    const { error } = await supabaseClient
      .from('vendor_compliance')
      .delete()
      .eq('id', vendorId)
      .eq('agent_id', currentUser.id);

    if (error) {
      if (vendorStatus) {
        vendorStatus.textContent = `Error: ${error.message}`;
      }
      return;
    }

    if (vendorStatus) {
      vendorStatus.textContent = 'Vendor removed.';
    }
    await loadVendors(currentUser.id);
  };

  if (leadForm) {
    leadForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!currentUser) return;

      const formData = new FormData(leadForm);
      const basePayload = {
        lead_name: formData.get('lead_name'),
        budget: formData.get('budget'),
        target_area: formData.get('target_area'),
        timeline: formData.get('timeline'),
        stage: formData.get('stage') || 'New',
        next_action: formData.get('next_action'),
        notes: formData.get('notes'),
      };

      let error = null;

      if (editingLeadId) {
        const updateResult = await supabaseClient
          .from('agent_leads')
          .update(basePayload)
          .eq('id', editingLeadId)
          .eq('agent_id', currentUser.id);
        error = updateResult.error;
      } else {
        const insertResult = await supabaseClient
          .from('agent_leads')
          .insert({
            ...basePayload,
            agent_id: currentUser.id,
          });
        error = insertResult.error;
      }

      if (error) {
        if (leadStatus) {
          leadStatus.textContent = `Error: ${error.message}`;
        }
        return;
      }

      const wasEditing = Boolean(editingLeadId);
      clearEditMode();
      if (leadStatus) {
        leadStatus.textContent = wasEditing ? 'Lead updated successfully.' : 'Lead added successfully.';
      }
      await loadLeads(currentUser.id);
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', (event) => {
      event.preventDefault();
      clearEditMode();
    });
  }

  if (leadPanelOverlay) {
    leadPanelOverlay.addEventListener('click', closeLeadPanel);
  }

  if (leadPanelClose) {
    leadPanelClose.addEventListener('click', closeLeadPanel);
  }

  if (panelEditBtn) {
    panelEditBtn.addEventListener('click', () => {
      const lead = leadCache.find(item => item.id === activePanelLeadId);
      if (lead) {
        setEditMode(lead);
        closeLeadPanel();
        if (leadForm) {
          leadForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  if (panelDeleteBtn) {
    panelDeleteBtn.addEventListener('click', async () => {
      const lead = leadCache.find(item => item.id === activePanelLeadId);
      const name = lead?.lead_name ? `“${lead.lead_name}”` : 'this lead';
      const confirmed = window.confirm(`Delete ${name}? This cannot be undone.`);
      if (!confirmed) return;
      await deleteLead(activePanelLeadId);
    });
  }

  if (offerForm) {
    offerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!currentUser) return;
      const formData = new FormData(offerForm);
      const title = (formData.get('title') || '').toString().trim();
      if (!title) {
        if (offerStatus) {
          offerStatus.textContent = 'Please enter a checklist item.';
        }
        return;
      }
      offerForm.reset();
      await addOfferItem(title);
    });
  }

  if (offerList) {
    offerList.addEventListener('click', async (event) => {
      const target = event.target;
      if (!target) return;

      const action = target.dataset?.action;
      const itemId = target.dataset?.id;
      if (!action || !itemId) return;

      if (action === 'delete-offer') {
        const confirmed = window.confirm('Remove this checklist item?');
        if (!confirmed) return;
        await deleteOfferItem(itemId);
        return;
      }

      if (action === 'toggle-offer') {
        await toggleOfferItem(itemId, target.checked);
      }
    });
  }

  if (partnerForm) {
    partnerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!currentUser) return;

      const formData = new FormData(partnerForm);
      const payload = {
        name: (formData.get('name') || '').toString().trim(),
        role: (formData.get('role') || '').toString().trim(),
        email: (formData.get('email') || '').toString().trim(),
        phone: (formData.get('phone') || '').toString().trim(),
        notes: (formData.get('notes') || '').toString().trim(),
      };

      if (!payload.name) {
        if (partnerStatus) {
          partnerStatus.textContent = 'Please add a partner name.';
        }
        return;
      }

      let error = null;
      if (editingPartnerId) {
        const updateResult = await supabaseClient
          .from('partner_directory')
          .update(payload)
          .eq('id', editingPartnerId)
          .eq('agent_id', currentUser.id);
        error = updateResult.error;
      } else {
        const insertResult = await supabaseClient
          .from('partner_directory')
          .insert({
            ...payload,
            agent_id: currentUser.id,
          });
        error = insertResult.error;
      }

      if (error) {
        if (partnerStatus) {
          partnerStatus.textContent = `Error: ${error.message}`;
        }
        return;
      }

      const wasEditing = Boolean(editingPartnerId);
      clearPartnerEditMode();
      if (partnerStatus) {
        partnerStatus.textContent = wasEditing ? 'Partner updated.' : 'Partner added.';
      }
      await loadPartners(currentUser.id);
    });
  }

  if (partnerCancelBtn) {
    partnerCancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      clearPartnerEditMode();
    });
  }

  if (partnerList) {
    partnerList.addEventListener('click', async (event) => {
      const actionBtn = event.target.closest('button[data-action]');
      if (!actionBtn) return;
      const action = actionBtn.dataset.action;
      const partnerId = actionBtn.dataset.id;
      if (!partnerId) return;

      const partner = partnerCache.find(item => item.id === partnerId);

      if (action === 'edit-partner') {
        if (partner) {
          setPartnerEditMode(partner);
          partnerForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      if (action === 'delete-partner') {
        const name = partner?.name ? `“${partner.name}”` : 'this partner';
        const confirmed = window.confirm(`Delete ${name}? This cannot be undone.`);
        if (!confirmed) return;
        await deletePartner(partnerId);
      }
    });
  }

  if (vendorForm) {
    vendorForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!currentUser) return;

      const formData = new FormData(vendorForm);
      const payload = {
        vendor_name: (formData.get('vendor_name') || '').toString().trim(),
        trade_type: (formData.get('trade_type') || '').toString().trim(),
        status: (formData.get('status') || 'In Compliance').toString(),
        expires_on: formData.get('expires_on') || null,
        notes: (formData.get('notes') || '').toString().trim(),
      };

      if (!payload.vendor_name) {
        if (vendorStatus) {
          vendorStatus.textContent = 'Please add a vendor name.';
        }
        return;
      }

      let error = null;
      if (editingVendorId) {
        const updateResult = await supabaseClient
          .from('vendor_compliance')
          .update(payload)
          .eq('id', editingVendorId)
          .eq('agent_id', currentUser.id);
        error = updateResult.error;
      } else {
        const insertResult = await supabaseClient
          .from('vendor_compliance')
          .insert({
            ...payload,
            agent_id: currentUser.id,
          });
        error = insertResult.error;
      }

      if (error) {
        if (vendorStatus) {
          vendorStatus.textContent = `Error: ${error.message}`;
        }
        return;
      }

      const wasEditing = Boolean(editingVendorId);
      clearVendorEditMode();
      if (vendorStatus) {
        vendorStatus.textContent = wasEditing ? 'Vendor updated.' : 'Vendor added.';
      }
      await loadVendors(currentUser.id);
    });
  }

  if (vendorCancelBtn) {
    vendorCancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      clearVendorEditMode();
    });
  }

  if (vendorList) {
    vendorList.addEventListener('click', async (event) => {
      const actionBtn = event.target.closest('button[data-action]');
      if (!actionBtn) return;
      const action = actionBtn.dataset.action;
      const vendorId = actionBtn.dataset.id;
      if (!vendorId) return;

      const vendor = vendorCache.find(item => item.id === vendorId);

      if (action === 'edit-vendor') {
        if (vendor) {
          setVendorEditMode(vendor);
          vendorForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      if (action === 'delete-vendor') {
        const name = vendor?.vendor_name ? `“${vendor.vendor_name}”` : 'this vendor';
        const confirmed = window.confirm(`Delete ${name}? This cannot be undone.`);
        if (!confirmed) return;
        await deleteVendor(vendorId);
      }
    });
  }

  if (dealList) {
    dealList.addEventListener('click', async (event) => {
      const actionBtn = event.target.closest('button[data-action]');
      if (!actionBtn) return;
      const action = actionBtn.dataset.action;
      const leadId = actionBtn.dataset.id;
      if (!leadId) return;

      const lead = leadCache.find(item => item.id === leadId);

      if (action === 'view') {
        const freshLead = await fetchLeadById(leadId);
        if (freshLead) {
          openLeadPanel(freshLead);
        } else if (lead) {
          openLeadPanel(lead);
        }
        return;
      }

      if (action === 'edit') {
        if (lead) {
          setEditMode(lead);
          if (leadForm) {
            leadForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        return;
      }

      if (action === 'delete') {
        const name = lead?.lead_name ? `“${lead.lead_name}”` : 'this lead';
        const confirmed = window.confirm(`Delete ${name}? This cannot be undone.`);
        if (!confirmed) return;
        await deleteLead(leadId);
      }
    });
  }

  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      localStorage.removeItem('userRole');
      handleMissingSession();
    });
  }

  supabaseClient.auth.getSession().then(({ data }) => {
    if (!data.session?.user) {
      handleMissingSession();
      return;
    }

    loadProfile(data.session.user);
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      handleMissingSession();
      return;
    }

    loadProfile(session.user);
  });
}

function initSmartDashboardLinks() {
  const links = document.querySelectorAll('[data-dashboard-link]');
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const role = localStorage.getItem('userRole');
      if (role === 'agent') {
        window.location.href = '/agent-dashboard';
        return;
      }
      if (role) {
        window.location.href = '/dashboard';
        return;
      }
      const preferredPortal = localStorage.getItem('preferredPortal');
      if (preferredPortal === 'agent') {
        window.location.href = '/agent';
        return;
      }
      window.location.href = '/portal';
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPortalAuth();
    initDashboardAuth();
    initAgentDashboardAuth();
    initSmartDashboardLinks();
  });
} else {
  initPortalAuth();
  initDashboardAuth();
  initAgentDashboardAuth();
  initSmartDashboardLinks();
}

console.log('Peaceful Abodes Realty PWA loaded successfully');
