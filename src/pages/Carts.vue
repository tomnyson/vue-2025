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

const clearData = () => {
  orderInfo.name = '';
  orderInfo.sdt = '';
  orderInfo.address = '';
  orderInfo.email = '';
  orderInfo.total = 0;
  orderInfo.items = [];
  orderInfo.pay_type = 'cod';
};

const handleRemove = (id) => {
  // TODO: hook this into your Vuex store (e.g., commit/dispatch) if available
  console.log('remove item id:', id);
};

const handleSubmit = async (e) => {
     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const payload = {
        name: orderInfo.name,
        sdt: orderInfo.sdt,
        address: orderInfo.address,
        email: orderInfo.email,
        pay_type: orderInfo.pay_type,
        items: carts.value.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: totalCart.value,
        created_at: Date.now(),
        status: 'pending',
        user_id: currentUser ? currentUser.id : null
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
      <!-- Left: Checkout form -->
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <form id="checkoutForm" class="needs-validation" novalidate @submit.prevent="handleSubmit">
              <!-- 1) Contact info -->
              <p class="form-section-title mb-2">1) Thông tin liên hệ</p>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="form-control" v-model="orderInfo.name" required placeholder="Nguyễn Văn A" />
                  <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="orderInfo.email" required placeholder="ban@email.com" />
                  <div class="invalid-feedback">Email chưa hợp lệ.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại</label>
                  <input type="tel" class="form-control" v-model="orderInfo.sdt" required placeholder="09xxxxxxxx" />
                  <div class="invalid-feedback">Vui lòng nhập số điện thoại.</div>
                </div>
              </div>

              <hr class="my-4" />

              <!-- 2) Shipping address -->
              <p class="form-section-title mb-2">2) Địa chỉ giao hàng</p>
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Địa chỉ</label>
                  <input type="text" v-model="orderInfo.address" class="form-control" required placeholder="Số nhà, đường, phường/xã" />
                  <div class="invalid-feedback">Vui lòng nhập địa chỉ.</div>
                </div>
              </div>

              <hr class="my-4" />

              <!-- 3) Payment method -->
              <p class="form-section-title mb-2">3) Phương thức thanh toán</p>
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" v-model="orderInfo.pay_type" type="radio" value="cod" name="payment" id="payCOD" checked />
                    <label class="form-check-label" for="payCOD">Thanh toán khi nhận hàng (COD)</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="orderInfo.pay_type" type="radio" value="vnpay" name="payment" id="payCard" />
                    <label class="form-check-label" for="payCard">Thẻ VNPAY</label>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary mt-3">Thanh toán</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Right: Cart summary -->
      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body p-3">
            <h6 class="mb-3">Giỏ hàng</h6>
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th scope="col">Tên</th>
                  <th scope="col" class="text-center">SL</th>
                  <th scope="col" class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in carts" :key="cart.id">
                  <td>{{ cart.name }}</td>
                  <td class="text-center">{{ cart.quantity }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-danger" @click="handleRemove(cart.id)">Xoá</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between">
              <strong>Tổng:</strong>
              <strong>{{ totalCart }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>