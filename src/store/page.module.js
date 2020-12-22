const pageStore = {
    namespaced: true,
    state: {
        page:1,
        keyword:null
    },
    getters: {
        GE_PAGE: state => state.page,
        GE_KEYWORD: state => state.keyword
    },
    mutations: {
        MU_PAGE: (state, payload) => {
            state.page = payload
        }
    },
    actions: {
        AC_PAGE: ({ commit }, payload) => {
            commit('MU_PAGE', payload)
        }
    }
}
export default pageStore
