<script setup>
import { ref } from 'vue';
const { products } = defineProps({
    products: Array
})
const search  = ref("") 
</script>

<template>
    <div class="row">
        <h1>Danh sách sản phẩm</h1>
        <span>{{ search }}</span>
        <input class="search-input" type="text" v-model="search" placeholder="search product ..."/>
        <div class="col col-md-3" v-for="product in products" :key="product.id">
            <img :src="product.image" />
            <h3>{{ product.name }} </h3> <br />
            <p> {{ product.price }}
            </p>
            <p> {{ product.category }} </p>
          
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
