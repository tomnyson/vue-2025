import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'
import router from './router';
import store from './store';

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark-mode',
            cssLayer: false
        }
    }
})

app.use(store)
app.use(router)
app.mount('#app')
