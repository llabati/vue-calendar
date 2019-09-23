import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Paris')
moment.locale('fr')
moment.locale('en', null)


export default new Vuex.Store({ 
    state: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        eventPosX: 0,
        eventPosY: 0,
        active: false,
        events: [],
        eventDate: null
    },
    getters: {},
    actions: {},
    mutations: {
        SET_CURRENT_MONTH(state, payload){
            state.month = payload
        },
        SET_CURRENT_YEAR(state, payload){
            state.year = payload
        },
        SET_EVENT_POS(state, payload){
            state.eventPosX = payload.clientX
            state.eventPosY = payload.clientY
        },
        ATTRIBUTE_DATE(state, payload){
            state.eventDate = payload
        },
        OPEN_EVENT(state){
            state.active = true
        },
        CLOSE_EVENT(state){
            state.active = false
        },
        CREATE_NEW_EVENT(state, payload){
            //state.events.push({ description: payload, date: moment() })
            state.events.push({ description: payload, date: state.eventDate })
        }
    }

})
