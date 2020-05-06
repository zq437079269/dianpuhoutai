import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: "login"
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})

router.beforeEach((to, from, next)=>{
if(to.path ==='/login') return next()
const tokenStr=window.sessionStorage.getItem('token')
if(!tokenStr) return next('/login')
next()
})

export default router