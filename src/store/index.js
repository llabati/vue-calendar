import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({ 
    state: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    },
    getters: {},
    actions: {},
    mutations: {
        SET_CURRENT_MONTH(state, payload){
            state.month = payload
        }
    }

})