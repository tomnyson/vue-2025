<template>
  <div class="product-list-container">
    <div class="header">
      <h2>Products</h2>
      <div class="cart-icon" @click="showCart = !showCart">
        <i class="pi pi-shopping-cart"></i>
        <span class="badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading products...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>

    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="description">{{ product.description }}</p>
          <p class="category">{{ product.category }}</p>
          <div class="product-footer">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <button
              @click="addProductToCart(product)"
              :disabled="loading"
              class="btn-add-cart"
            >
              <i class="pi pi-shopping-cart"></i>
              {{ isInCart(product.id) ? 'Add More' : 'Add to Cart' }}
            </button>
          </div>
          <p class="stock">Stock: {{ product.stock }}</p>
        </div>
      </div>
    </div>

    <!-- Shopping Cart Modal -->
    <ShoppingCart v-if="showCart" @close="showCart = false" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ShoppingCart from './ShoppingCart.vue'

export default {
  name: 'ProductList',
  components: {
    ShoppingCart
  },
  data() {
    return {
      showCart: false
    }
  },
  computed: {
    ...mapState(['products', 'loading', 'error']),
    ...mapGetters(['cartItemCount', 'isInCart'])
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart', 'fetchCart']),
    async addProductToCart(product) {
      await this.addToCart({ product, quantity: 1 })
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchCart()
  }
}
</script>

<style scoped>
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h2 {
  color: #333;
  font-size: 2rem;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  font-size: 2rem;
  color: #3b82f6;
  transition: color 0.3s;
}

.cart-icon:hover {
  color: #2563eb;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.description {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 8px 0;
  line-height: 1.5;
}

.category {
  display: inline-block;
  background: #e0e7ff;
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin: 8px 0;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #10b981;
}

.btn-add-cart {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s;
}

.btn-add-cart:hover:not(:disabled) {
  background: #2563eb;
}

.btn-add-cart:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stock {
  margin-top: 8px;
  color: #6b7280;
  font-size: 0.85rem;
}
</style>
