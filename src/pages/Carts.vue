<script setup>
import { ref, onMounted, inject, computed, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const API = import.meta.env.VITE_URL_API || 'http://localhost:3000';

const store = useStore();
const carts = computed(() => store.state.carts)
const totalCart = computed(() => store.getters['totalCart'])
const orderInfo = reactive({
    name: "",
    sdt: "",
    address: "",
    email: "",
    total: 0,
    items: [],
    pay_type: "cod"
})

watch(orderInfo, (current) => {
    console.log('Current value of count:', current)
})

const handleSubmit = async (e) => {
     const currentUser = localStorage.getItem('currentUser')
    const payload = {
        ...orderInfo.value,
        items: carts,
        total: totalCart,
        created_at: Date.now(),
        status: 'pending',
        user_id: currentUser.id

    }

    const response = await axios.post('http://localhost:3000/orders', payload);
    console.log(response);
    if (response.status == 201) {
        clearData()
        alert('dã mua hàng  thành công')
    }
}


</script>

<template>
    <div class="container">
        <h1 class="h4 mb-3">Thanh toán</h1>
        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <form id="checkoutForm" class="needs-validation" novalidate @submit.prevent="handleSubmit">
                            <!-- Thông tin liên hệ -->
                            <p class="form-section-title mb-2">1) Thông tin liên hệ</p>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Họ và tên</label>
                                    <input type="text" class="form-control" v-model="orderInfo.name" required
                                        placeholder="Nguyễn Văn A">
                                    <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" v-model="orderInfo.email" required
                                        placeholder="ban@email.com">
                                    <div class="invalid-feedback">Email chưa hợp lệ.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="tel" class="form-control" v-model="orderInfo.sdt" required
                                        placeholder="09xxxxxxxx">
                                    <div class="invalid-feedback">Vui lòng nhập số điện thoại.</div>
                                </div>
                            </div>

                            <hr class="my-4">

                            <!-- Địa chỉ giao hàng -->
                            <p class="form-section-title mb-2">2) Địa chỉ giao hàng</p>
                            <div class="row g-3">
                                <div class="col-12">
                                    <input type="text" v-model="orderInfo.adress" class="form-control" required
                                        placeholder="Số nhà, đường, phường/xã">
                                    <div class="invalid-feedback">Vui lòng nhập địa chỉ.</div>
                                </div>
                            </div>

                            <hr class="my-4">
                            <!-- Thanh toán -->
                            <p class="form-section-title mb-2">4) Phương thức thanh toán</p>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="orderInfo.pay_type" type="radio"
                                            value="cod" name="payment" id="payCOD" checked>
                                        <label class="form-check-label" for="payCOD">Thanh toán khi nhận hàng
                                            (COD)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="orderInfo.pay_type" value="vnpay"
                                            type="radio" name="payment" id="payCard">
                                        <label class="form-check-label" for="payCard">Thẻ VNPAY</label>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary mt-2">Checkout</button>
                            </hr>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in carts" :key="cart.id">
                            <td>{{ cart.name }}</td>
                            <td>{{ cart.quantity }}</td>
                            <td>
                                <button class="btn btn-danger" @click="handleRemove(cart.id)">remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <strong>Sum: {{ totalCart }}</strong>
            </div>

        </div>
    </div>
</template>