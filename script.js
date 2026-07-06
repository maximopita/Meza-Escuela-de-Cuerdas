// Nav: añadir clase al hacer scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Burger menu (mobile)
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú mobile al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animación de entrada al hacer scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .step, .testimonio, .contacto__dato').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .step, .testimonio, .contacto__dato').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });
});

document.querySelectorAll('.card, .step, .testimonio, .contacto__dato').forEach(el => {
  observer.observe(el);
});

// Añadir clase visible
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
