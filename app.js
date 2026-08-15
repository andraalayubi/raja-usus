/**
 * RAJA USUS — Premium Usus Krispy
 * Interactive Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration Placeholders (Easily updated by client)
  const CONFIG = {
    whatsappNumber: '6281234567890', // Client can replace with real number
    instagramLink: 'https://instagram.com/',
    price100g: 15000,
    price200g: 25000
  };

  // Replace placeholder links if any
  document.querySelectorAll('a[href*="[WHATSAPP NUMBER]"]').forEach(el => {
    el.href = el.href.replace('[WHATSAPP NUMBER]', CONFIG.whatsappNumber);
  });
  document.querySelectorAll('a[href="[INSTAGRAM LINK]"]').forEach(el => {
    el.href = CONFIG.instagramLink;
  });

  // --- Format Currency (Indonesian Rupiah) ---
  function formatRupiah(amount) {
    return 'Rp' + amount.toLocaleString('id-ID');
  }

  // --- Mobile Drawer Menu ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('backdrop');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeDrawer();
      closeOrderModal();
    });
  }

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- Header Scroll & Active Section Highlighting ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.boxShadow = 'none';
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Order Calculator Logic ---
  const qty100 = document.getElementById('qty-100');
  const qty200 = document.getElementById('qty-200');
  const btnMinus100 = document.getElementById('btn-minus-100');
  const btnPlus100 = document.getElementById('btn-plus-100');
  const btnMinus200 = document.getElementById('btn-minus-200');
  const btnPlus200 = document.getElementById('btn-plus-200');
  const subtotal100 = document.getElementById('subtotal-100');
  const subtotal200 = document.getElementById('subtotal-200');
  const calcTotalAmount = document.getElementById('calc-total-amount');
  const deliveryCity = document.getElementById('delivery-city');
  const btnCalcCheckout = document.getElementById('btn-calc-checkout');

  function updateCalculator() {
    const q1 = parseInt(qty100.value) || 0;
    const q2 = parseInt(qty200.value) || 0;

    const sub1 = q1 * CONFIG.price100g;
    const sub2 = q2 * CONFIG.price200g;
    const total = sub1 + sub2;

    if (subtotal100) subtotal100.textContent = formatRupiah(sub1);
    if (subtotal200) subtotal200.textContent = formatRupiah(sub2);
    if (calcTotalAmount) calcTotalAmount.textContent = formatRupiah(total);
  }

  if (btnMinus100) {
    btnMinus100.addEventListener('click', () => {
      let val = parseInt(qty100.value) || 0;
      if (val > 0) {
        qty100.value = val - 1;
        updateCalculator();
      }
    });
  }

  if (btnPlus100) {
    btnPlus100.addEventListener('click', () => {
      let val = parseInt(qty100.value) || 0;
      if (val < 99) {
        qty100.value = val + 1;
        updateCalculator();
      }
    });
  }

  if (btnMinus200) {
    btnMinus200.addEventListener('click', () => {
      let val = parseInt(qty200.value) || 0;
      if (val > 0) {
        qty200.value = val - 1;
        updateCalculator();
      }
    });
  }

  if (btnPlus200) {
    btnPlus200.addEventListener('click', () => {
      let val = parseInt(qty200.value) || 0;
      if (val < 99) {
        qty200.value = val + 1;
        updateCalculator();
      }
    });
  }

  if (btnCalcCheckout) {
    btnCalcCheckout.addEventListener('click', () => {
      const q1 = parseInt(qty100.value) || 0;
      const q2 = parseInt(qty200.value) || 0;
      const city = deliveryCity ? deliveryCity.value : 'Sidoarjo';

      if (q1 === 0 && q2 === 0) {
        alert('Silakan pilih minimal 1 paket Raja Usus.');
        return;
      }

      const total = (q1 * CONFIG.price100g) + (q2 * CONFIG.price200g);
      let itemsList = '';
      if (q1 > 0) itemsList += `\n• Raja Usus 100g: ${q1} bks (${formatRupiah(q1 * CONFIG.price100g)})`;
      if (q2 > 0) itemsList += `\n• Raja Usus 200g: ${q2} bks (${formatRupiah(q2 * CONFIG.price200g)})`;

      const message = `Halo Raja Usus! 👋\nSaya ingin memesan Usus Krispy Premium:\n${itemsList}\n\n📍 *Wilayah Pengiriman:* ${city}\n💰 *Estimasi Total:* ${formatRupiah(total)}\n\nMohon info ketersediaan stok dan konfirmasi pesanannya ya. Terima kasih!`;

      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  // --- Order Modal Logic ---
  const orderModal = document.getElementById('order-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalQty100 = document.getElementById('modal-qty-100');
  const modalQty200 = document.getElementById('modal-qty-200');
  const modalMinus100 = document.getElementById('modal-minus-100');
  const modalPlus100 = document.getElementById('modal-plus-100');
  const modalMinus200 = document.getElementById('modal-minus-200');
  const modalPlus200 = document.getElementById('modal-plus-200');
  const modalTotalDisplay = document.getElementById('modal-total-display');
  const waOrderForm = document.getElementById('wa-order-form');

  function openOrderModal(initialVariant = null) {
    if (initialVariant === '100g') {
      modalQty100.value = '1';
      modalQty200.value = '0';
    } else if (initialVariant === '200g') {
      modalQty100.value = '0';
      modalQty200.value = '1';
    }
    updateModalTotal();
    orderModal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    if (orderModal) orderModal.classList.remove('active');
    if (!mobileDrawer.classList.contains('active')) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateModalTotal() {
    const q1 = parseInt(modalQty100.value) || 0;
    const q2 = parseInt(modalQty200.value) || 0;
    const total = (q1 * CONFIG.price100g) + (q2 * CONFIG.price200g);
    if (modalTotalDisplay) modalTotalDisplay.textContent = formatRupiah(total);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeOrderModal);

  document.querySelectorAll('.btn-order-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      openOrderModal();
    });
  });

  document.querySelectorAll('.btn-order-direct').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const variant = btn.getAttribute('data-variant');
      openOrderModal(variant);
    });
  });

  if (modalMinus100) {
    modalMinus100.addEventListener('click', () => {
      let val = parseInt(modalQty100.value) || 0;
      if (val > 0) {
        modalQty100.value = val - 1;
        updateModalTotal();
      }
    });
  }

  if (modalPlus100) {
    modalPlus100.addEventListener('click', () => {
      let val = parseInt(modalQty100.value) || 0;
      if (val < 99) {
        modalQty100.value = val + 1;
        updateModalTotal();
      }
    });
  }

  if (modalMinus200) {
    modalMinus200.addEventListener('click', () => {
      let val = parseInt(modalQty200.value) || 0;
      if (val > 0) {
        modalQty200.value = val - 1;
        updateModalTotal();
      }
    });
  }

  if (modalPlus200) {
    modalPlus200.addEventListener('click', () => {
      let val = parseInt(modalQty200.value) || 0;
      if (val < 99) {
        modalQty200.value = val + 1;
        updateModalTotal();
      }
    });
  }

  if (waOrderForm) {
    waOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('order-name').value.trim();
      const city = document.getElementById('order-city').value;
      const address = document.getElementById('order-address').value.trim();
      const q1 = parseInt(modalQty100.value) || 0;
      const q2 = parseInt(modalQty200.value) || 0;

      if (q1 === 0 && q2 === 0) {
        alert('Mohon pilih minimal 1 paket pesanan.');
        return;
      }

      const total = (q1 * CONFIG.price100g) + (q2 * CONFIG.price200g);
      let itemsList = '';
      if (q1 > 0) itemsList += `\n• Raja Usus 100g: ${q1} bks (${formatRupiah(q1 * CONFIG.price100g)})`;
      if (q2 > 0) itemsList += `\n• Raja Usus 200g: ${q2} bks (${formatRupiah(q2 * CONFIG.price200g)})`;

      let message = `Halo Raja Usus! 👋\nSaya mau pesan Usus Krispy:\n\n*Nama:* ${name}\n*Kota:* ${city}\n*Alamat/Catatan:* ${address || '-'}\n\n*Rincian Pesanan:*${itemsList}\n\n💰 *Total Harga:* ${formatRupiah(total)}\n\nMohon info ketersediaan stok & ongkir ke alamat saya ya. Terima kasih!`;

      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      closeOrderModal();
    });
  }

  // --- Lightbox Gallery Logic ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      const caption = item.getAttribute('data-caption') || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Initialize Calculator
  updateCalculator();
});
