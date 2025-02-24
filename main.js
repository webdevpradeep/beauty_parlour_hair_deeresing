document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileNavToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    const icon = mobileNavToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Navigation Page Switching
  const navItems = document.querySelectorAll('.nav-links a');
  const pages = document.querySelectorAll('.page');

  navItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');

      // Update active link
      navItems.forEach((navItem) => navItem.classList.remove('active'));
      this.classList.add('active');

      // Update active page
      pages.forEach((page) => page.classList.remove('active'));
      document.getElementById(targetPage).classList.add('active');

      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }

      // Scroll to top
      window.scrollTo(0, 0);
    });
  });

  // Testimonial Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
  nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-index'));
      showSlide(slideIndex);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Gallery Filtering
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Gallery Modal
  const modal = document.querySelector('.gallery');
  const modalContent = document.querySelector('.gallery-content');
  const modalClose = document.querySelector('.gallery-close');
  const galleryItemOverlays = document.querySelectorAll('.gallery-overlay');

  galleryItemOverlays.forEach((overlay) => {
    overlay.addEventListener('click', function () {
      const imgSrc = this.parentElement.querySelector('img').src;
      const imgAlt = this.parentElement.querySelector('img').alt;

      modalContent.innerHTML = `
              <button class="modal-close"><i class="fas fa-times"></i></button>
              <img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; max-height: 70vh;">
              <h3 style="margin-top: 20px; color: #ff9a9e;">${imgAlt}</h3>
          `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      document
        .querySelector('.modal-close')
        .addEventListener('click', closeModal);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      let isValid = true;

      // Simple validation
      if (name.trim() === '') {
        isValid = false;
        document.getElementById('name-error').textContent = 'Name is required';
      } else {
        document.getElementById('name-error').textContent = '';
      }

      if (email.trim() === '') {
        isValid = false;
        document.getElementById('email-error').textContent =
          'Email is required';
      } else if (!isValidEmail(email)) {
        isValid = false;
        document.getElementById('email-error').textContent =
          'Please enter a valid email';
      } else {
        document.getElementById('email-error').textContent = '';
      }

      if (message.trim() === '') {
        isValid = false;
        document.getElementById('message-error').textContent =
          'Message is required';
      } else {
        document.getElementById('message-error').textContent = '';
      }

      if (isValid) {
        // In a real application, you would send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Appointment Form Validation
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('full-name').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      let isValid = true;

      // Simple validation
      if (fullName.trim() === '') {
        isValid = false;
        document.getElementById('full-name-error').textContent =
          'Full name is required';
      } else {
        document.getElementById('full-name-error').textContent = '';
      }

      if (phone.trim() === '') {
        isValid = false;
        document.getElementById('phone-error').textContent =
          'Phone number is required';
      } else {
        document.getElementById('phone-error').textContent = '';
      }

      if (service === '') {
        isValid = false;
        document.getElementById('service-error').textContent =
          'Please select a service';
      } else {
        document.getElementById('service-error').textContent = '';
      }

      if (date === '') {
        isValid = false;
        document.getElementById('date-error').textContent =
          'Please select a date';
      } else {
        document.getElementById('date-error').textContent = '';
      }

      if (time === '') {
        isValid = false;
        document.getElementById('time-error').textContent =
          'Please select a time';
      } else {
        document.getElementById('time-error').textContent = '';
      }

      if (isValid) {
        // In a real application, you would send the appointment data to a server
        alert('Thank you for booking an appointment! We will confirm shortly.');
        appointmentForm.reset();
      }
    });
  }

  // Set minimum date for appointment datepicker to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    dateInput.setAttribute('min', formattedToday);
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('newsletter-email').value;

      if (email.trim() === '' || !isValidEmail(email)) {
        alert('Please enter a valid email address');
      } else {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      }
    });
  }

  // Smooth scrolling for links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href').length > 1) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      }
    });
  });

  // Initialize current year in footer copyright
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
