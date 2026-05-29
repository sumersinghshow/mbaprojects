document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. STICKY HEADER & ACTIVE NAV LINKS
     ========================================================================== */
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. MOBILE MENU DRAWER TRIGGER
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    
    // Prevent body scroll when menu is open on mobile
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ==========================================================================
     3. SERVICE SECOND YEAR PRICE SELECTION & PRICING CTAs
     ========================================================================== */
  const pricingBtns = document.querySelectorAll('.plan-btn');
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan-name');
      const planPrice = btn.getAttribute('data-plan-price');
      
      // Auto fill contact form details & scroll to contact
      const topicInput = document.getElementById('topic');
      const messageInput = document.getElementById('message');
      const programSelect = document.getElementById('program');
      
      if (programSelect) programSelect.value = 'Second Year MBA/PGDM';
      if (topicInput) topicInput.placeholder = `Which MBA Topic are you planning for?`;
      if (messageInput) messageInput.value = `Hi Priyanshu, I am interested in your Second Year Project assistance plan: "${planName}" (₹${planPrice}). Please let me know the process to start.`;
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     4. SHOWCASE PORTFOLIO FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const showcaseItems = document.querySelectorAll('.showcase-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and set to current
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      showcaseItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     5. SHOWCASE LIGHTBOX MODAL PREVIEW
     ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const lightboxClose = document.getElementById('lightboxClose');
  const viewBtns = document.querySelectorAll('.view-lightbox');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.closest('.showcase-item');
      const imgSrc = item.querySelector('.showcase-media img').getAttribute('src');
      const title = item.querySelector('.showcase-item-title').textContent;
      const desc = item.querySelector('.showcase-desc').textContent;

      lightboxImg.setAttribute('src', imgSrc);
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ==========================================================================
     6. FAQ ACCORDION EXPANSION
     ========================================================================== */
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     7. FORM VALIDATION & HIGH-CONVERTING WHATSAPP REDIRECT
     ========================================================================== */
  const contactForm = document.getElementById('inquiryForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const formGroups = contactForm.querySelectorAll('.form-group');
      
      // Clear errors
      formGroups.forEach(group => group.classList.remove('has-error'));

      // Validate Fields
      const nameInput = document.getElementById('name');
      const programSelect = document.getElementById('program');
      const topicInput = document.getElementById('topic');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');

      // Name check
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Program check
      if (!programSelect.value) {
        programSelect.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Topic check
      if (!topicInput.value.trim()) {
        topicInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Phone check (basic 10 digit check)
      const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
      if (phoneVal.length < 10) {
        phoneInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        // Construct detailed, high-converting WhatsApp message
        const whatsappNumber = "919999999999"; // Developer/Founder phone number configuration placeholder (can be updated by user)
        const name = encodeURIComponent(nameInput.value.trim());
        const program = encodeURIComponent(programSelect.options[programSelect.selectedIndex].text);
        const topic = encodeURIComponent(topicInput.value.trim());
        const phone = encodeURIComponent(phoneInput.value.trim());
        const message = encodeURIComponent(messageInput.value.trim() || 'No additional message details provided.');

        const textMessage = `📚 *NEW PROJECT INQUIRY* 📚%0A%0A*Name:* ${name}%0A*Program:* ${program}%0A*Project Topic:* ${topic}%0A*Contact:* ${phone}%0A%0A*Message Detail:*%0A${message}`;
        
        // Open WhatsApp web or App
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${textMessage}`;
        
        // Visual validation success notification before redirect
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⚙️ Prepping WhatsApp Chat...';
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          submitBtn.innerHTML = '✅ Inquiry Sent Successfully!';
          
          // Reset form details
          contactForm.reset();
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 3000);
        }, 1200);
      }
    });
  }
});
