import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Paris')
moment.locale('fr')
moment.locale('en', null)

import axios from 'axios'


export default new Vuex.Store({ 
    state: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        eventPosX: 0,
        eventPosY: 0,
        active: false,
        events: [ { description: "la fille qui voulait refroidir la Terre", date: moment('2019-09-26', 'YYYY-MM-DD')} ],
        eventDate: null
    },
    getters: {},

    actions: {
        createNewEvent(context, payload) {
            console.log(context.state.eventDate)
            return new Promise((resolve, reject) => {
                let obj = {
                    description: payload,
                    date: context.state.eventDate
                }
                axios.post('/add_event', obj).then(response => {
                    console.log('EVENT SENT TO SERVER', response)
                    if (response.status === 200) {
                        context.commit('CREATE_NEW_EVENT', obj)
                        resolve()
                    } else {
                        reject()
                    }
                })

            })
        }
    },
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
            state.eventDate = payload._d
        },
        OPEN_EVENT(state){
            state.active = true
        },
        CLOSE_EVENT(state){
            state.active = false
        },
        CREATE_NEW_EVENT(state, payload){
            state.events.push(
                { description: payload.description, date: state.eventDate }
                //{ description: payload.description, date: payload.date }
            )
            localStorage.setItem('events', JSON.stringify(state.events))
            console.log('THE MUTATED EVENTS', state.events)
            
        },
        RETRIEVE_ALL_EVENTS(state){
            let retrieveEvents = JSON.parse(localStorage.getItem('events'))
            if (retrieveEvents) state.events = retrieveEvents
            else state.events = []
        }
    }

})
