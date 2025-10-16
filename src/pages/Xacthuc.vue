<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import {sendMail} from '../helpers'

const route = useRoute();
const query = route.query;

// onMounted(async () => {
//     const queryString = new URLSearchParams(query).toString();
//     const response = await axios.get(`http://localhost:3001/verify?${queryString}`);
//     console.log(response);
//     if (response.status == 200) {
//     }
// })
/**
 *  -> dua cai query thanh thanh query string 
 *  -> /verify? query
 *  => get
 */
const handleSendMail = async () => {
    await sendMail('tabletkindfire@gmail.com',"demo","<h1>hello world</h1>")
}
</script>
<template>
    <h1>xac thuc thanh toan</h1>
    <button @click="handleSendMail">Send Mail demo</button>
</template>