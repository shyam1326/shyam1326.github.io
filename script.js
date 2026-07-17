// ==================== MOBILE NAV ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-list ul');
const navLinks = document.querySelectorAll('.nav-list ul a');

function toggleMenu(open) {
    const isOpen = open ?? !navMenu.classList.contains('active');
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
}

hamburger.addEventListener('click', () => toggleMenu());
navLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// ==================== STICKY HEADER ====================
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ==================== SCROLLSPY (active nav link) ====================
const sections = document.querySelectorAll('section[id]');
const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ==================== REVEAL ON SCROLL ====================
const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

// ==================== FOOTER YEAR ====================
document.getElementById('year').textContent = new Date().getFullYear();
