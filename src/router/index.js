// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import User from '../components/User.vue';
//
// Vue.use(VueRouter);
//
// const routes = [
//     {
//         path: '/',
//         name: 'User',
//         component: User,
//         meta: { unauthorized: true },
//     }
// ]
//
// const router = new VueRouter({
//     // mode: 'history',
//     // base: process.env.BASE_URL,
//     routes
// });

// export default router

import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import User from '../components/User.vue'


import Home2 from "../components/v2/Home.vue"
import Login2 from "../components/v2/Login.vue"
import Me2 from "../components/v2/Me.vue"
import Detail from "../components/v2/Detail.vue"
import Write from "../components/v2/Write.vue"




Vue.use(Router)

// const routes = [
//     {
//         path: '/',
//         name: 'home',
//         component: Home
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: Login
//     },
//     {
//         path: '/register',
//         name: '/register',
//         component: Register
//     },
//     {
//         path: '/profile',
//         name: 'profile',
//         component: Profile
//     },
//     {
//         path: '/user',
//         name:  'user',
//         component: User
//     }
// ]

const requireAuth = () => (from, to, next) => {
    console.log('localStorage.accessToken : ', localStorage.accessToken)
    if(localStorage.getItem('accessToken')){
        return next()
    }
    else {
        return next('/login?returnPath=me&test=t')
    }
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home2,
    },
    {
        path: "/login",
        name: "Login",
        component: Login2,
    },
    {
        path: "/me",
        name: "Me",
        component: Me2,
        beforeEnter: requireAuth(),
    },
    {
        path: '/user',
        name:  'user',
        component: User
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail
    },
    {
        path: '/write',
        name: 'write',
        component: Write,
        beforeEnter: requireAuth()
    }
]

export default new Router({
    mode: 'history',
    routes
})
