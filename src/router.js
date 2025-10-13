import { createWebHistory, createRouter } from 'vue-router'

import Register from './components/Register.vue'
import ListPostView from './pages/ListPost.vue'
import PostDetailView from './pages/PostDetail.vue'
import NotFound from './components/NotFound.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import PrimeVueDemoPage from './pages/PrimeVueDemoPage.vue'

const routes = [

    { path: '/', name: 'Home', component: ListPostView, meta: { isAuth: false } },
    { path: '/posts', name: 'PostList', component: ListPostView, meta: { isAuth: false } },
    { path: '/posts/:id', name: 'PostDetail', component: PostDetailView, meta: { isAuth: false } },
    { path: '/login', name: 'Login', component: Login, meta: { isAuth: false } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { isAuth: true } },
    { path: '/register', name: 'Register', component: Register, meta: { isAuth: false } },
    { path: '/products', name: 'Products', component: ProductsPage, meta: { isAuth: false } },
    { path: '/cart', name: 'ShoppingCart', component: ShoppingCartPage, meta: { isAuth: false } },
    { path: '/primevue-demo', name: 'PrimeVueDemo', component: PrimeVueDemoPage, meta: { isAuth: false } },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { isAuth: true }
    },
]
const router = createRouter({
    history: createWebHistory(''),
    routes
})
/**
 * check permission
 *
 */
router.beforeEach((to, _from, next) => {
    const currentUser = localStorage.getItem('currentUser');
    if(to.meta.isAuth && currentUser){
        const user = JSON.parse(currentUser)
        console.log('user',user)
        if(!user.role) {
            next({name: 'Login'});
        } else {
            next();
        }
    } else if(to.meta.isAuth && !currentUser) {
        next({name: 'Login'});
    } else {
        next();
    }
})

export default router

