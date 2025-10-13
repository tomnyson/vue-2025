<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute();

const username = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)
const API = import.meta.env.VITE_URL_API
console.log("call api", API)
/**
 * goi axios
 *  -> dang nhap -> method get username, password
 */
const isCheckLogin = async (username, password) => {
  console.log(`the component is now mounted.`)
  const response = await axios.get(`${API}/users`);
  if (response.status == 200) {
       const user = response.data.find(item => item.username === username && item.password === password)
       if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user))

        return true
       }
  }
  return false
}
const handleDangNhap = async() => {
    if (username.value === "") {
        message.value = "username not empty"
    }
    else if (password.value === "") {
        message.value = "password not empty"
    }
    
    const isResult = await isCheckLogin(username.value, password.value);

    if(isResult) {
        const query = route.query
        if(query !== '') {
            router.push(`/${query.callback}`)
        } else {
            route.push('/')
        }
        
    }
}

</script>
<template>
    <h1>Login form</h1>
    <form>
        <input type="text" v-model="username" placeholder="username" />
        <input type="password" v-model="password" placeholder="password" />
        <input @click="handleDangNhap" type="button" value="đăng nhập" />
        <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
    </form>
</template>
<style scoped>
form {
    width: 500px;
    margin: 0 auto;
    border: 2px solid green;
    padding: 20px;
}
form input {
    width: 100%;
    display: block;
    margin-top: 20px;
}

.success {
    color: green;
}

.error {
    color: red;
}
h1 {
    text-align: center;
}
</style>