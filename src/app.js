import Vue from 'vue'
import App from './App.vue'

import router from './router'

import store from './store'
import VeeValidate from 'vee-validate'

import './assets/app.css'

Vue.config.productionTip = false

Vue.use(VeeValidate)

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})

