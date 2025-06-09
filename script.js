document.addEventListener('DOMContentLoaded', () => {
  // Quantity controls
  const minusBtn = document.getElementById('minus-btn');
  const plusBtn = document.getElementById('plus-btn');
  const quantityValue = document.getElementById('quantity-value');
  let quantity = 0;

  minusBtn.addEventListener('click', () => {
    if (quantity > 0) quantity--;
    quantityValue.textContent = quantity;
  });

  plusBtn.addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
  });

  // Cart logic
  const addToCartBtn = document.getElementById('add-to-cart');
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartContent = document.getElementById('cart-content');
  const cartCount = document.getElementById('cart-count');
  cartModal.hidden = true;
  let cartItems = 0;

  addToCartBtn.addEventListener('click', () => {
    if (quantity > 0) {
      cartItems = quantity;
      cartCount.textContent = cartItems;
      cartCount.hidden = false;
      updateCart();
      quantity = 0;
      quantityValue.textContent = quantity;
    }
  });

  cartBtn.onclick = function(e) {
    e.stopPropagation();
    cartModal.hidden = !cartModal.hidden;
  };

  function updateCart() {
    if (cartItems === 0) {
      cartContent.innerHTML = `<p>Your cart is empty.</p>`;
      cartContent.classList.add('empty');
    } else {
      cartContent.classList.remove('empty');
      cartContent.innerHTML = `
        <div class="cart-item">
          <img src="./images/image-product-1-thumbnail.jpg" alt="Product">
          <div class="cart-item-details">
            <span>Fall Limited Edition Sneakers</span>
            <span class="cart-price">$125.00 x ${cartItems} <span class="cart-total">$${(125 * cartItems).toFixed(2)}</span></span>
          </div>
          <button class="cart-delete" aria-label="Remove from cart"><img src="./images/icon-delete.svg" alt="Delete"></button>
        </div>
        <button class="checkout-btn">Checkout</button>
      `;
      cartContent.querySelector('.cart-delete').onclick = () => {
        cartItems = 0;
        cartCount.hidden = true;
        updateCart();
      };
    }
  }

  // Hide cart modal when clicking outside
  document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && !cartBtn.contains(e.target)) {
      cartModal.hidden = true;
    }
  });

  // === Dynamic Gallery & Lightbox Thumbnails ===
  const images = [
    {
      main: './images/image-product-1.jpg',
      thumb: './images/image-product-1-thumbnail.jpg',
      alt: 'Thumbnail 1'
    },
    {
      main: './images/image-product-2.jpg',
      thumb: './images/image-product-2-thumbnail.jpg',
      alt: 'Thumbnail 2'
    },
    {
      main: './images/image-product-3.jpg',
      thumb: './images/image-product-3-thumbnail.jpg',
      alt: 'Thumbnail 3'
    },
    {
      main: './images/image-product-4.jpg',
      thumb: './images/image-product-4-thumbnail.jpg',
      alt: 'Thumbnail 4'
    }
  ];

  const mainImgEl = document.getElementById('product-main-img');
  const mainThumbnailsContainer = document.getElementById('main-thumbnails');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxMainImg = document.getElementById('lightbox-main-img');
  const lightboxThumbnailsContainer = document.getElementById('lightbox-thumbnails');
  let currentIndex = 0;

  function renderThumbnails() {
    // Main gallery thumbnails
    mainThumbnailsContainer.innerHTML = '';
    images.forEach((img, idx) => {
      const thumb = document.createElement('img');
      thumb.className = 'thumb' + (idx === 0 ? ' selected' : '');
      thumb.src = img.thumb;
      thumb.dataset.img = img.main;
      thumb.alt = img.alt;
      thumb.addEventListener('click', () => {
        setMainImage(idx);
        setLightboxImage(idx);
      });
      mainThumbnailsContainer.appendChild(thumb);
    });

    // Lightbox thumbnails
    lightboxThumbnailsContainer.innerHTML = '';
    images.forEach((img, idx) => {
      const thumb = document.createElement('img');
      thumb.className = 'lightbox-thumb' + (idx === 0 ? ' selected' : '');
      thumb.src = img.thumb;
      thumb.dataset.img = img.main;
      thumb.alt = img.alt;
      thumb.addEventListener('click', () => {
        setLightboxImage(idx);
        setMainImage(idx);
      });
      lightboxThumbnailsContainer.appendChild(thumb);
    });
  }

  function setMainImage(idx) {
    currentIndex = idx;
    mainImgEl.src = images[idx].main;
    // Highlight selected thumb
    Array.from(mainThumbnailsContainer.children).forEach((thumb, i) => {
      thumb.classList.toggle('selected', i === idx);
    });
  }

  function setLightboxImage(idx) {
    currentIndex = idx;
    lightboxMainImg.src = images[idx].main;
    // Highlight selected thumb
    Array.from(lightboxThumbnailsContainer.children).forEach((thumb, i) => {
      thumb.classList.toggle('selected', i === idx);
    });
  }

  // Initial render
  renderThumbnails();
  setMainImage(0);
  setLightboxImage(0);

  // Open lightbox when main image is clicked (desktop only)
  mainImgEl.addEventListener('click', () => {
    if (window.innerWidth > 700) {
      document.getElementById('lightbox-modal').hidden = false;
      setLightboxImage(currentIndex);
    }
  });

  // Carousel arrows for main image (mobile/desktop)
  document.getElementById('carousel-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    const idx = (currentIndex - 1 + images.length) % images.length;
    setMainImage(idx);
    // Only update lightbox if open (desktop)
    if (!document.getElementById('lightbox-modal').hidden) {
      setLightboxImage(idx);
    }
  });
  document.getElementById('carousel-next').addEventListener('click', function(e) {
    e.stopPropagation();
    const idx = (currentIndex + 1) % images.length;
    setMainImage(idx);
    if (!document.getElementById('lightbox-modal').hidden) {
      setLightboxImage(idx);
    }
  });

  document.getElementById('lightbox-prev').onclick = prevImage;
  document.getElementById('lightbox-next').onclick = nextImage;
  document.getElementById('lightbox-close').onclick = closeLightbox;
  document.querySelector('.lightbox-overlay').onclick = closeLightbox;

  function prevImage() {
    const idx = (currentIndex - 1 + images.length) % images.length;
    setMainImage(idx);
    if (!document.getElementById('lightbox-modal').hidden) {
      setLightboxImage(idx);
    }
  }
  function nextImage() {
    const idx = (currentIndex + 1) % images.length;
    setMainImage(idx);
    if (!document.getElementById('lightbox-modal').hidden) {
      setLightboxImage(idx);
    }
  }
  function closeLightbox() {
    document.getElementById('lightbox-modal').hidden = true;
  }

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox-modal').hidden) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
  });
});