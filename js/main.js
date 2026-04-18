document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const headerContent = document.querySelector('.header-content');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('nav-open');
      headerContent.classList.toggle('menu-open');
      mobileMenuBtn.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target) && nav.classList.contains('nav-open')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav-open');
        headerContent.classList.remove('menu-open');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }
  
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        target.focus();
      }
    });
  }
  
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
    });
  });
  
  const navLinks = document.querySelectorAll('.nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});