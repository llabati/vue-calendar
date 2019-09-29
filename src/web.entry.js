import Vue from 'vue'
import './style.scss'
import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Paris')
import store from './store/index.js'
import App from './components/App.vue'


import VueCalendar from './entry'
VueCalendar(store.state.events).$mount('#app')
//VueCalendar(store.state.events).$mount('#app')
new Vue({
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
  mounted(){
    this.$store.commit('RETRIEVE_ALL_EVENTS')
  }
  
});
