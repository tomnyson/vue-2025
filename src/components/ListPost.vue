<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
onMounted(async() => {
  console.log(`the component is now mounted.`)
  const response = await axios.get('http://localhost:3000/posts');
  if(response.status == 200) {
    posts.value = response.data
  }
})
</script>
<template>
  <div class="row">
        <h1>Danh sách </h1>
        <div class="col col-md-3" v-for="post in posts" :key="post.id">
            <h3>{{ post.title }} </h3> <br />
            <p> {{ post.views }}</p>
        </div>
    </div>
</template>
<style scoped>

.success {
    color: green;
}

.error {
    color: red;
}
</style>