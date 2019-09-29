<template>
    <div>
        <div id="header">
            <div>
                <h1>Calendrier Vue.js</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mer</div>
            <div>Jeu</div>
            <div>Ven</div>
            <div>Sam</div>
            <div>Dim</div>
        </div>
        <div id="calendar">
            <div class="calendar-week" v-for="week in weeks" :key="week.id">
                <calendar-day v-for="day in week" :key="day.id" :day="day"></calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>
<script>
import { moment } from 'moment-timezone'
import store from '../store/index.js'
import CalendarDay from './CalendarDay.vue'
import CurrentMonth from './CurrentMonth.vue'
import EventForm from './EventForm.vue'
export default {
    
  store,
  computed: {
      year(){
          return this.$store.state.year
      },
      month(){
          return this.$store.state.month
      },
      days(){
          let days = []
          let currentDay = this.$moment(`${this.year} - ${this.month} - 1`, 'YYYY-M-D')
          // regrouper les jours d'un mois entier
          do {
              days.push(currentDay)
              currentDay = this.$moment(currentDay).add(1, 'days')
          } while(currentDay.month() + 1 === this.month)

          // ajouter les derniers jours du mois précédent
          currentDay = this.$moment(days[0])
          const SUNDAY = 0
          const MONDAY = 1
          if (currentDay !== MONDAY) {
              do {
                  currentDay = this.$moment(currentDay).subtract(1, 'days')
                  days.unshift(currentDay)
              } while(currentDay.day() !== MONDAY)
          }

          // ajouter les premiers jours du mois suivant
          currentDay = this.$moment(days[days.length - 1])
          if (currentDay !== SUNDAY) {
              do {
                  currentDay = this.$moment(currentDay).add(1, 'days')
                  days.push(currentDay)
              } while (currentDay.day() !== SUNDAY)
          }

          return days
      },
      weeks(){
          let weeks = []
          let week = []

          for (let day of this.days){
              week.push(day)
              if (week.length === 7){
                  weeks.push(week)
                  week = []
              }
          }
          return weeks
      }
  },
  components: {
      CurrentMonth,
      CalendarDay,
      EventForm
  },
  
}
</script>
<style lang="scss">

</style>
