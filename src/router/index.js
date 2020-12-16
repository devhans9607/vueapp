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

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/user',
            name:  'user',
            component: User
        }
    ]
})
