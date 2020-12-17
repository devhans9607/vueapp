const resourceHost = "http://localhost:8080/api/v1"
import axios from 'axios'

const enhanceAccessToeken = () => {
    const { accessToken } = localStorage
    if (!accessToken) return
    axios.defaults.headers.common['X-Auth-Token'] = accessToken
}
enhanceAccessToeken()

export const auth2 = {
    namespaced: true,
    state: {
        accessToken: null,
    },
    getters: {},
    mutations: {
        LOGIN(state, accessToken) {
            console.log("auth2/LOGIN(mutation) : ", accessToken)
            state.accessToken = accessToken
            localStorage.accessToken = accessToken
        },
        LOGOUT(state) {
            state.accessToken = null
            delete localStorage.accessToken
        },
    },
    actions: {
        LOGIN({ commit }, { email, password }) {
            return axios
                .post(`${resourceHost}/signin`, { userId: email, userPwd: password })
                .then(({ data }) => {
                    console.log("auth2/LOGIN : ", data.content.token)
                    commit('LOGIN', data.content.token)
                    axios.defaults.headers.common['X-Auth-Token'] = data.content.token
                })
        },
        TOKENLOGIN({ commit }, token){
            commit('LOGIN', token)
        },
        LOGOUT({ commit }) {
            axios.defaults.headers.common['X-Auth-Token'] = null
            commit("LOGOUT")
        },
        isAuthenticated({commit}){

        }
    }
}


