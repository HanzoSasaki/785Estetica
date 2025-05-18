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



  function agendarServico(event, element) {
    event.preventDefault();
    
    // Coletar dados do card
    const serviceCard = element.closest('.service-card');
    const serviceName = serviceCard.dataset.serviceName;
    const servicePrice = serviceCard.dataset.servicePrice;
    const features = Array.from(serviceCard.querySelectorAll('.service-features li'))
                         .map(li => li.textContent.trim().replace(/\s+/g, ' '));

    // Montar mensagem
    let message = `Olá, gostaria de agendar a *${serviceName}* 💦\n`;
    message += `Valor: *R$ ${servicePrice}*\n\n`;
    message += `_Serviços inclusos:_\n`;
    message += features.map(feature => `✓ ${feature}`).join('\n');
    message += `\n\nPor favor, confirmar disponibilidade. 🕒`;

    // Codificar para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=5515988254615&text=${encodedMessage}`;
    
    // Abrir link
    window.open(whatsappURL, '_blank');
}