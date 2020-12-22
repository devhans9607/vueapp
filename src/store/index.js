import Vue from 'vue'
import Vuex from 'vuex'


import { auth } from './auth.module'
import { auth2 } from './auth2.module'
import  pageStore  from './page.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth : auth,
        auth2 : auth2,
        pageStore : pageStore
    }
})
