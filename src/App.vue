<script setup>
import { ref, reactive } from "vue";
// code trong này
import ThongBao from "./ThongBao.vue";
import TrangThai from "./TrangThai.vue";
import Products from "./components/Products.vue";
import Login from "./components/Login.vue";
import ListPost from "./components/ListPost.vue";
/**
 * tên
 * chuyên ngành
 * điểm mạnh
 * điểm yếu
 * ước mơ
 * điểm trung bình
 */
const products = reactive([
    {
        "id": "12345",
        "name": "Example Product 1",
        "price": 19.99,
        "category": "Electronics",
        "image": "https://picsum.photos/200/300"
    },
    {
        "id": "67890",
        "name": "Example Product 2",
        "price": 24.99,
        "category": "Home & Kitchen",
         "image": "https://picsum.photos/200/300"
    },
    {
        "id": "54321",
        "name": "Example Product 3",
        "price": 9.99,
        "category": "Books",
         "image": "https://picsum.photos/200/300"
    },
    {
        "id": "09876",
        "name": "Example Product 4",
        "price": 49.99,
        "category": "Fashion",
         "image": "https://picsum.photos/200/300"
    },
    {
        "id": "45678",
        "name": "Example Product 5",
        "price": 14.99,
        "category": "Electronics",
         "image": "https://picsum.photos/200/300"
    },
])

</script>

<template>
  <div class="container">
  <!-- <ThongBao />
  <h1>Frontend framework 2025</h1>
  <ThongBao message="thông báo mới" />
  <TrangThai/>
  <Products :products="products"/>
  <Login/> -->
  <ListPost/>
  </div>

</template>

<style scoped>
h1 {
  color: red
}
</style>