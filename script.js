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

cartBtn.addEventListener('click', () => {
  cartModal.hidden = !cartModal.hidden;
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