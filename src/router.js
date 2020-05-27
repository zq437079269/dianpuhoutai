import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles.vue'
import Cate from './components/goods/Cate.vue'




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
            component: Home,
            redirect:'/welcome',
            children:[
                { 
                    path:'/welcome',
                    name:'/welcome',
                    component:Welcome
                },
                {
                    path: '/users',
                    name: '/users',
                    component: Users
                },
                {
                    path: '/rights',
                    name: '/rights',
                    component: Rights
                },
                {
                    path: '/roles',
                    name: '/roles',
                    component: Roles
                },
                {
                    path: '/categories',
                    name: '/categories',
                    component: Cate
                }
            ]
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