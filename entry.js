import Vue from 'vue'
import './style.scss'

import store from './store/index.js'
import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Paris')
moment.locale('fr')
moment.locale('en', null)
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } } )

import App from './components/App.vue'

export default function(events){
  /*console.log('EVENTS IN ENTRY', events)
    let initialState = Object.assign({}, store.state, { events } )
    console.log('INITIAL STATE IN ENTRY', initialState)
    store.replaceState(initialState)*/
    
    return new Vue({
      el: '#app',
      data: {
        moment
      },
      store,
      render(createElement){
        return createElement(
          'div',
          { attrs: { id: 'app'}},
          [ createElement('app')]
        )
      },
      
      components: {
        App
      },
      
    });

}
