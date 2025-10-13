import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = import.meta.env.VITE_URL_API

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0,
      products: [],
      cart: [],
      loading: false,
      error: null
    }
  },
  getters: {
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    isInCart: (state) => (productId) => {
      return state.cart.some(item => item.productId === productId)
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrease (state) {
      state.count--
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CART(state, cart) {
      state.cart = cart
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.productId === item.productId)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.cart.push(item)
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.productId !== productId)
    },
    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(cartItem => cartItem.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  actions: {
    increment(context){
        context.commit('increment')
    },
    async incrementAsync({ commit }) {
       await sleep(3000);
        commit('increment')
    },
    // Fetch all products from API
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.get(`${API_URL}/products`)
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching products:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    // Fetch cart from API
    async fetchCart({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/cart`)
        commit('SET_CART', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching cart:', error)
      }
    },
    // Add item to cart (with API call)
    async addToCart({ commit, state }, { product, quantity = 1 }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const existingItem = state.cart.find(item => item.productId === product.id)

        if (existingItem) {
          // Update existing item
          const updatedQuantity = existingItem.quantity + quantity
          await axios.patch(`${API_URL}/cart/${existingItem.id}`, {
            quantity: updatedQuantity
          })
          commit('UPDATE_CART_ITEM_QUANTITY', {
            productId: product.id,
            quantity: updatedQuantity
          })
        } else {
          // Add new item
          const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
          }
          const response = await axios.post(`${API_URL}/cart`, cartItem)
          commit('ADD_TO_CART', response.data)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error adding to cart:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    // Remove item from cart (with API call)
    async removeFromCart({ commit, state }, productId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const cartItem = state.cart.find(item => item.productId === productId)
        if (cartItem) {
          await axios.delete(`${API_URL}/cart/${cartItem.id}`)
          commit('REMOVE_FROM_CART', productId)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error removing from cart:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    // Update cart item quantity (with API call)
    async updateCartItemQuantity({ commit, state }, { productId, quantity }) {
      if (quantity <= 0) {
        return
      }
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const cartItem = state.cart.find(item => item.productId === productId)
        if (cartItem) {
          await axios.patch(`${API_URL}/cart/${cartItem.id}`, { quantity })
          commit('UPDATE_CART_ITEM_QUANTITY', { productId, quantity })
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error updating cart item:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    // Clear cart (with API call)
    async clearCart({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        // Delete all cart items
        const deletePromises = state.cart.map(item =>
          axios.delete(`${API_URL}/cart/${item.id}`)
        )
        await Promise.all(deletePromises)
        commit('CLEAR_CART')
      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error clearing cart:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})

export default store
