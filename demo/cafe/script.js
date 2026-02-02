const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible'));
}

const updateActiveLink = () => {
  let current = '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

const filterButtons = document.querySelectorAll('[data-filter]');
const menuItems = document.querySelectorAll('[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    menuItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category.includes(filter);
      item.style.display = match ? 'block' : 'none';
    });
  });
});

const hero = document.querySelector('.hero-card');
if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.12;
    hero.style.transform = `translateY(${offset}px)`;
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const output = contactForm.querySelector('[data-submit-output]');
    output.textContent = '送信しました。ご連絡ありがとうございます。';
    output.style.display = 'block';
    contactForm.reset();
  });
}
