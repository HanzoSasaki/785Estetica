 // Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');

  mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Scroll Animation com Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        if (element.dataset.anime) {
          element.classList.add('animate');
        }
      }
    });
  }, observerOptions);

  // Observar seções e elementos com data-anime
  document.querySelectorAll('.section, [data-anime]').forEach(element => {
    element.style.opacity = '0';
    if (element.classList.contains('section')) {
      element.style.transform = 'translateY(20px)';
    }
    observer.observe(element);
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });