// Mobile menu toggle
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

// Generate animated candlestick chart in hero background
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

// Header shrink on scroll
const header = document.getElementById('siteHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if(header){
    header.style.background = current > 40 ? 'rgba(9,8,6,.78)' : 'rgba(9,8,6,.55)';
  }
  lastScroll = current;
});
