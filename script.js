// ============ PRELOADER ============
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if(preloader){
    setTimeout(() => preloader.classList.add('loaded'), 300);
  }
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ============ ACTIVE NAV LINK HIGHLIGHT ============
(function highlightActiveNav(){
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(link => {
    const href = link.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')){
      link.classList.add('active-link');
    }
  });
})();

// ============ CANDLESTICK HERO CHART ============
const candleContainer = document.getElementById('candles');

if(candleContainer){
  const pattern = [40,65,30,80,50,90,35,70,45,85,60,95,40,75,55,88,42,68,30,78];

  pattern.forEach((height, i) => {
    const candle = document.createElement('div');
    const isUp = Math.random() > 0.35;
    candle.className = 'candle ' + (isUp ? 'up' : 'down');
    candle.style.height = height + '%';
    candle.style.animationDelay = (i * 0.06) + 's';
    candleContainer.appendChild(candle);
  });
}

// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if(header){
    header.style.background = current > 40 ? 'rgba(9,8,6,.85)' : 'rgba(9,8,6,.55)';
  }

  const backToTop = document.getElementById('backToTop');
  if(backToTop){
    backToTop.classList.toggle('show', current > 500);
  }
});

// ============ BACK TO TOP ============
const backToTopBtn = document.getElementById('backToTop');
if(backToTopBtn){
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');

if(revealEls.length){
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('.why-number[data-count]');

if(counters.length){
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-suffix') || '';
        const numericTarget = parseFloat(target);

        if(isNaN(numericTarget)){
          el.textContent = target;
        } else {
          let current = 0;
          const duration = 1400;
          const stepTime = 16;
          const steps = duration / stepTime;
          const increment = numericTarget / steps;

          const timer = setInterval(() => {
            current += increment;
            if(current >= numericTarget){
              current = numericTarget;
              clearInterval(timer);
            }
            el.textContent = (Number.isInteger(numericTarget) ? Math.round(current) : current.toFixed(1)) + suffix;
          }, stepTime);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));
}

// ============ TYPING EFFECT ============
const typingEl = document.getElementById('typingText');

if(typingEl){
  const phrases = ['XAU/USD Signals', 'Account Management', 'Funded Challenges', 'Trading Mentorship'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop(){
    const current = phrases[phraseIndex];

    if(!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
  }

  typeLoop();
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');

if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    const successBox = document.getElementById('formSuccess');

    // Open pre-filled email as the actual delivery method
    const subject = encodeURIComponent('New inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
    window.location.href = `mailto:waqarmughal00071@gmail.com?subject=${subject}&body=${body}`;

    contactForm.reset();
    if(successBox){
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
