<template>
  <div class="shopping-cart-page">
    <div class="cart-container">
      <div class="cart-header">
        <h1>
          <i class="pi pi-shopping-cart"></i>
          Shopping Cart
        </h1>
        <button @click="$router.push('/')" class="continue-shopping">
          <i class="pi pi-arrow-left"></i>
          Continue Shopping
        </button>
      </div>

      <div v-if="loading" class="loading-spinner">
        <i class="pi pi-spin pi-spinner"></i>
        <p>Loading cart...</p>
      </div>

      <div v-else-if="cart.length === 0" class="empty-cart">
        <i class="pi pi-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button @click="$router.push('/')" class="btn-shop-now">
          Shop Now
        </button>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="items-header">
            <h2>Cart Items ({{ cartItemCount }})</h2>
          </div>

          <div
            v-for="item in cart"
            :key="item.id"
            class="cart-item"
          >
            <div class="item-image-wrapper">
              <img :src="item.image" :alt="item.name" class="item-image" />
            </div>

            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }} each</p>
            </div>

            <div class="item-controls">
              <div class="quantity-section">
                <label>Quantity:</label>
                <div class="quantity-controls">
                  <button
                    @click="decreaseQuantity(item)"
                    :disabled="loading"
                    class="qty-btn"
                  >
                    <i class="pi pi-minus"></i>
                  </button>
                  <input
                    type="number"
                    :value="item.quantity"
                    @change="updateQuantity(item, $event)"
                    min="1"
                    class="quantity-input"
                    :disabled="loading"
                  />
                  <button
                    @click="increaseQuantity(item)"
                    :disabled="loading"
                    class="qty-btn"
                  >
                    <i class="pi pi-plus"></i>
                  </button>
                </div>
              </div>

              <div class="item-total">
                <label>Subtotal:</label>
                <p class="total-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>

              <button
                @click="removeItem(item.productId)"
                :disabled="loading"
                class="remove-btn"
                title="Remove item"
              >
                <i class="pi pi-trash"></i>
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h2>Order Summary</h2>

            <div class="summary-details">
              <div class="summary-row">
                <span>Items ({{ cartItemCount }}):</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>

              <div class="summary-row">
                <span>Shipping:</span>
                <span class="free-shipping">Free</span>
              </div>

              <div class="summary-row">
                <span>Tax:</span>
                <span>${{ (cartTotal * 0.1).toFixed(2) }}</span>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-row total">
                <span>Total:</span>
                <span class="total-amount">${{ (cartTotal * 1.1).toFixed(2) }}</span>
              </div>
            </div>

            <div class="summary-actions">
              <button
                @click="checkout"
                :disabled="loading"
                class="btn-checkout"
              >
                <i class="pi pi-check-circle"></i>
                Proceed to Checkout
              </button>

              <button
                @click="handleClearCart"
                :disabled="loading"
                class="btn-clear"
              >
                <i class="pi pi-trash"></i>
                Clear Cart
              </button>
            </div>

            <div class="payment-methods">
              <p>We accept:</p>
              <div class="payment-icons">
                <i class="pi pi-credit-card"></i>
                <i class="pi pi-paypal"></i>
                <i class="pi pi-wallet"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCartPage',
  computed: {
    ...mapState(['cart', 'loading']),
    ...mapGetters(['cartItemCount', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartItemQuantity', 'clearCart', 'fetchCart']),

    async removeItem(productId) {
      if (confirm('Remove this item from cart?')) {
        await this.removeFromCart(productId)
      }
    },

    async increaseQuantity(item) {
      await this.updateCartItemQuantity({
        productId: item.productId,
        quantity: item.quantity + 1
      })
    },

    async decreaseQuantity(item) {
      if (item.quantity > 1) {
        await this.updateCartItemQuantity({
          productId: item.productId,
          quantity: item.quantity - 1
        })
      } else {
        await this.removeItem(item.productId)
      }
    },

    async updateQuantity(item, event) {
      const newQuantity = parseInt(event.target.value)
      if (newQuantity && newQuantity > 0) {
        await this.updateCartItemQuantity({
          productId: item.productId,
          quantity: newQuantity
        })
      }
    },

    async handleClearCart() {
      if (confirm('Are you sure you want to clear the entire cart?')) {
        await this.clearCart()
      }
    },

    checkout() {
      const total = (this.cartTotal * 1.1).toFixed(2)
      alert(`Checkout Total: $${total}\nThank you for your order!`)
      this.clearCart()
      this.$router.push('/')
    }
  },

  mounted() {
    // Fetch cart data when component mounts
    this.fetchCart()
  }
}
</script>

<style scoped>
.shopping-cart-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.cart-container {
  max-width: 1400px;
  margin: 0 auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-header h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  color: #1f2937;
  font-size: 2rem;
}

.cart-header h1 i {
  color: #3b82f6;
}

.continue-shopping {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.continue-shopping:hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.loading-spinner {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-spinner i {
  font-size: 3rem;
  color: #3b82f6;
  margin-bottom: 16px;
}

.loading-spinner p {
  color: #6b7280;
  font-size: 1.1rem;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-cart i {
  font-size: 5rem;
  color: #d1d5db;
  margin-bottom: 24px;
}

.empty-cart h2 {
  color: #1f2937;
  margin-bottom: 12px;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 32px;
  font-size: 1.1rem;
}

.btn-shop-now {
  padding: 14px 32px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-shop-now:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
}

.cart-items {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.items-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}

.items-header h2 {
  margin: 0;
  color: #1f2937;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 24px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.item-image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-info h3 {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 1.2rem;
}

.item-price {
  color: #10b981;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.item-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
}

.quantity-section label,
.item-total label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  background: #3b82f6;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.qty-btn:hover:not(:disabled) {
  background: #2563eb;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 60px;
  text-align: center;
  padding: 6px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
}

.quantity-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.item-total {
  text-align: right;
}

.total-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover:not(:disabled) {
  background: #ef4444;
  color: white;
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-summary {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-card h2 {
  margin: 0 0 24px 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.summary-details {
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #6b7280;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0;
}

.free-shipping {
  color: #10b981;
  font-weight: 600;
}

.total-amount {
  color: #10b981;
}

.summary-divider {
  height: 2px;
  background: #e5e7eb;
  margin: 20px 0;
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.btn-checkout,
.btn-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-checkout {
  background: #10b981;
  color: white;
}

.btn-checkout:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-clear {
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
}

.btn-clear:hover:not(:disabled) {
  background: #ef4444;
  color: white;
}

.btn-checkout:disabled,
.btn-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.payment-methods {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.payment-methods p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 12px;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.payment-icons i {
  font-size: 2rem;
  color: #9ca3af;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-header {
    flex-direction: column;
    gap: 16px;
  }

  .cart-header h1 {
    font-size: 1.5rem;
  }

  .cart-item {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .item-image-wrapper {
    width: 100%;
    height: 200px;
  }

  .item-controls {
    min-width: 100%;
  }
}
</style>
