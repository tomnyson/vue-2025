<template>
  <div class="products-page">
    <div class="page-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="pi pi-shopping-bag"></i>
            Our Products
          </h1>
          <p class="subtitle">Discover our amazing collection of products</p>
        </div>
        <div class="header-actions">
          <button @click="goToCart" class="cart-button">
            <i class="pi pi-shopping-cart"></i>
            <span>Cart</span>
            <span class="cart-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
          </button>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="search-box">
          <i class="pi pi-search"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="search-input"
          />
        </div>
        <div class="filter-buttons">
          <button
            :class="['filter-btn', { active: selectedCategory === 'all' }]"
            @click="selectedCategory = 'all'"
          >
            All Products
          </button>
          <button
            v-for="category in categories"
            :key="category"
            :class="['filter-btn', { active: selectedCategory === category }]"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <i class="pi pi-spin pi-spinner"></i>
        <p>Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <i class="pi pi-exclamation-triangle"></i>
        <p>Error: {{ error }}</p>
        <button @click="fetchProducts" class="retry-btn">
          <i class="pi pi-refresh"></i>
          Retry
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else-if="filteredProducts.length > 0" class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <div class="product-overlay">
              <button @click="viewProductDetails(product)" class="btn-view-details">
                <i class="pi pi-eye"></i>
                View Details
              </button>
            </div>
          </div>

          <div class="product-content">
            <span class="product-category">{{ product.category }}</span>
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>

            <div class="product-meta">
              <span class="product-stock">
                <i class="pi pi-box"></i>
                Stock: {{ product.stock }}
              </span>
            </div>

            <div class="product-footer">
              <div class="price-section">
                <span class="price-label">Price</span>
                <span class="product-price">${{ product.price.toFixed(2) }}</span>
              </div>
              <button
                @click="addProductToCart(product)"
                :disabled="loading || product.stock === 0"
                class="btn-add-to-cart"
              >
                <i class="pi pi-shopping-cart"></i>
                {{ isInCart(product.id) ? 'Add More' : 'Add to Cart' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <i class="pi pi-inbox"></i>
        <h2>No products found</h2>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductsPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all'
    }
  },
  computed: {
    ...mapState(['products', 'loading', 'error']),
    ...mapGetters(['cartItemCount', 'isInCart']),

    categories() {
      const uniqueCategories = [...new Set(this.products.map(p => p.category))]
      return uniqueCategories
    },

    filteredProducts() {
      let filtered = this.products

      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === this.selectedCategory)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        )
      }

      return filtered
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart', 'fetchCart']),

    async addProductToCart(product) {
      if (product.stock === 0) {
        alert('This product is out of stock')
        return
      }
      await this.addToCart({ product, quantity: 1 })
    },

    goToCart() {
      this.$router.push('/cart')
    },

    viewProductDetails(product) {
      // You can implement product detail page navigation here
      console.log('View product details:', product)
      // this.$router.push(`/products/${product.id}`)
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchCart()
  }
}
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 32px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 32px;
}

.header-content h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 2.5rem;
}

.header-content h1 i {
  color: #667eea;
}

.subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.cart-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cart-button:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.cart-badge {
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

.filters-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: #f3f4f6;
  border-radius: 12px;
  margin-bottom: 20px;
}

.search-box i {
  color: #6b7280;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #1f2937;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-btn {
  padding: 10px 20px;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 10px;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: capitalize;
}

.filter-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.loading-container,
.error-container,
.no-results {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-container i,
.error-container i,
.no-results i {
  font-size: 4rem;
  margin-bottom: 20px;
}

.loading-container i {
  color: #667eea;
}

.error-container i {
  color: #ef4444;
}

.no-results i {
  color: #d1d5db;
}

.loading-container p,
.error-container p,
.no-results p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 12px 0;
}

.no-results h2 {
  color: #1f2937;
  margin: 12px 0;
}

.retry-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.retry-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.btn-view-details {
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-view-details:hover {
  background: #667eea;
  color: white;
}

.product-content {
  padding: 24px;
}

.product-category {
  display: inline-block;
  background: #e0e7ff;
  color: #667eea;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 12px;
}

.product-title {
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.3;
}

.product-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.9rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-label {
  font-size: 0.85rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: #10b981;
}

.btn-add-to-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-add-to-cart:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-add-to-cart:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .filter-buttons {
    justify-content: center;
  }

  .product-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-add-to-cart {
    width: 100%;
    justify-content: center;
  }
}
</style>
