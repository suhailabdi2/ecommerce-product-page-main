document.addEventListener('DOMContentLoaded', () => {
  // Thumbnail image switching
  const mainImg = document.getElementById('product-main-img');
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('selected'));
      thumb.classList.add('selected');
      mainImg.src = thumb.dataset.img;
    });
  });

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

  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cartModal.hidden = !cartModal.hidden;
  });

  cartModal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

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
});
// Lightbox functionality
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxMainImg = document.getElementById('lightbox-main-img');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

const galleryThumbs = document.querySelectorAll('.thumb');
const mainImgEl = document.getElementById('product-main-img');

let currentIndex = 0;
const lightboxImages = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

// Open lightbox when main image is clicked (desktop only)
mainImgEl.addEventListener('click', () => {
  if (window.innerWidth > 700) {
    lightboxModal.hidden = false;
    setLightboxImage(currentIndex);
  }
});

// Set lightbox image and highlight thumb
function setLightboxImage(idx) {
  currentIndex = idx;
  lightboxMainImg.src = lightboxImages[currentIndex];
  lightboxThumbs.forEach((thumb, i) => {
    thumb.classList.toggle('selected', i === currentIndex);
  });
}

// Lightbox thumbnail click
lightboxThumbs.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    setLightboxImage(idx);
  });
});

// Prev/Next buttons
lightboxPrev.addEventListener('click', () => {
  setLightboxImage((currentIndex - 1 + lightboxImages.length) % lightboxImages.length);
});
lightboxNext.addEventListener('click', () => {
  setLightboxImage((currentIndex + 1) % lightboxImages.length);
});

// Close button and overlay
lightboxClose.addEventListener('click', () => {
  lightboxModal.hidden = true;
});
lightboxModal.querySelector('.lightbox-overlay').addEventListener('click', () => {
  lightboxModal.hidden = true;
});

// Sync lightbox with main gallery thumbs
galleryThumbs.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    currentIndex = idx;
  });
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (lightboxModal.hidden) return;
  if (e.key === 'ArrowLeft') {
    setLightboxImage((currentIndex - 1 + lightboxImages.length) % lightboxImages.length);
  }
  if (e.key === 'ArrowRight') {
    setLightboxImage((currentIndex + 1) % lightboxImages.length);
  }
  if (e.key === 'Escape') {
    lightboxModal.hidden = true;
  }
});
function prevImage() {
  setLightboxImage((currentIndex - 1 + lightboxImages.length) % lightboxImages.length);
}
function nextImage() {
  setLightboxImage((currentIndex + 1) % lightboxImages.length);
}
function openLightbox() {
  if (window.innerWidth > 700) {
    document.getElementById('lightbox-modal').hidden = false;
  }
}
function closeLightbox() {
  document.getElementById('lightbox-modal').hidden = true;
}