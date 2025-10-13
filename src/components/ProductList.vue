<script setup>
import axios from 'axios';
import { ref, onMounted, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const API = import.meta.env.VITE_URL_API || 'http://localhost:3000';
const router = useRouter()
const products = ref([]);
const search = ref("");
const isSuccess = ref(true);
const message = inject('isCheck');
const store = useStore();

const carts = computed(() => store.state.carts) 
const loadData = async () => {
  try {
    const response = await axios.get(`${API}/products`);
    if (response.status === 200) {
      products.value = response.data;
    } else {
      products.value = [];
    }
  } catch (err) {
    console.error('Failed to load products', err);
    products.value = [];
  }
};


onMounted(() => {
  console.log('message', message)
  loadData();
});

const handleAddCart = (item) => {
  if (!message) {
    router.push(`/login?callback=products`)
  }
  store.commit("add_cart", item)
}
const handleRemove = (id) => {
  if (!message) {
    router.push(`/login?callback=products`)
  }
  console.log('id',id)
  store.commit("remove_cart", id)
}
</script>

<template>
  <div class="row">
    <h1>Danh Giỏ hàng</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="cart in carts" :key="cart.id">
          <td>{{ cart.name }}</td>
          <td>{{ cart.quantity }}</td>
          <td>
            <button class="btn btn-danger" @click="handleRemove(cart.id)">remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Danh sách sản phẩm</h1>
    <div class="col col-md-3 mb-5" v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" />
      <h3>{{ product.name }} </h3> <br />
      <p> {{ product.price }}
      </p>
      <p> {{ product.category }} </p>
      <button @click="handleAddCart(product)" class="btn btn-primary">Add Cart</button>

    </div>
  </div>
</template>

<style scoped>
.item {
  border-bottom: 2px solid green;
  margin-bottom: 10px;
}

.search-input {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
