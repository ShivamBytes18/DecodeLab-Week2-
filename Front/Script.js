'use strict';

/* ── Sticky header shadow ──────────────────────────────── */
const siteHeader = document.getElementById('site-header');

window.addEventListener(
  'scroll',
  () => {
    siteHeader.classList.toggle(
      'scrolled',
      window.scrollY > 10
    );
  },
  { passive: true }
);

/* ── Mobile menu toggle ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

let menuOpen = false;

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  menuOpen = !menuOpen;

  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);

  hamburger.setAttribute(
    'aria-expanded',
    String(menuOpen)
  );

  mobileMenu.setAttribute(
    'aria-hidden',
    String(!menuOpen)
  );

  document.body.style.overflow =
    menuOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  if (menuOpen) {
    toggleMenu();
  }
}

/* Close menu on outside click */
document.addEventListener('click', (e) => {

  if (
    menuOpen &&
    !hamburger.contains(e.target) &&
    !mobileMenu.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

/* Close menu on Escape */
document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape' && menuOpen) {
    closeMobileMenu();
  }
});

/* ── Scroll reveal ─────────────────────────────────────── */
const revealElements =
  document.querySelectorAll('.reveal');

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

          revealObserver.unobserve(
            entry.target
          );
        }
      });

    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ── Active nav link highlight ─────────────────────────── */
const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navLinks.forEach((link) => {

            link.style.color = '';

            if (
              link.getAttribute('href') ===
              '#' + entry.target.id
            ) {
              link.style.color =
                'var(--gold)';
            }
          });
        }
      });

    },
    {
      threshold: 0.4
    }
  );

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* ── Skill tag keyboard interaction ────────────────────── */
document
  .querySelectorAll('.skill-tag')
  .forEach((tag) => {

    tag.setAttribute('role', 'button');
    tag.setAttribute('tabindex', '0');

    tag.addEventListener(
      'keydown',
      (e) => {

        if (
          e.key === 'Enter' ||
          e.key === ' '
        ) {

          tag.style.background =
            'var(--gold)';

          tag.style.color =
            '#0a0e1a';

          setTimeout(() => {

            tag.style.background = '';
            tag.style.color = '';

          }, 600);
        }
      }
    );
  });

/* ── Contact Form API Integration (Week 2) ─────────────── */

const submitBtn =
  document.getElementById(
    'form-submit-btn'
  );

const successMsg =
  document.getElementById(
    'form-success'
  );

const nameInput =
  document.getElementById(
    'contact-name'
  );

const emailInput =
  document.getElementById(
    'contact-email'
  );

const messageInput =
  document.getElementById(
    'contact-message'
  );

submitBtn.addEventListener(
  'click',
  async () => {

    const name =
      nameInput.value.trim();

    const email =
      emailInput.value.trim();

    const message =
      messageInput.value.trim();

    /* Validation */

    if (
      !name ||
      !email ||
      !message
    ) {

      alert(
        'Please fill all fields.'
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      alert(
        'Please enter a valid email.'
      );

      return;
    }

    try {

      submitBtn.textContent =
        'Sending...';

      submitBtn.disabled = true;

      successMsg.style.display =
        'none';

      const response =
        await fetch(
          'http://localhost:5000/api/contact',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify({
              name,
              email,
              message
            })
          }
        );

      const data =
        await response.json();

      if (data.success) {

        successMsg.style.display =
          'block';

        successMsg.textContent =
          '✅ Message sent successfully!';

        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        submitBtn.textContent =
          'Message Sent ✓';

      } else {

        alert(
          data.message ||
          'Failed to send message.'
        );

        submitBtn.textContent =
          'Send Message';

        submitBtn.disabled = false;
      }

    } catch (error) {

      console.error(error);

      alert(
        'Unable to connect to server.'
      );

      submitBtn.textContent =
        'Send Message';

      submitBtn.disabled = false;
    }
  }
);