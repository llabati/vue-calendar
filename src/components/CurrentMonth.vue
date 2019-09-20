<template>
    <div>
        <!--<div>{{ formattedDate | capitalize() }}</div>-->
        <button ref="past" @click="toPast">-</button>
        <button ref="future" @click="toFuture">+</button>
    </div>
</template>
<script>
import { store } from '../store/index.js'
export default {
    store,
    computed: {
        year(){
          return this.$store.state.year
      },
      month(){
          console.log(this.$store.state.month)
          return this.$store.state.month
      },
      formattedDate(event){
        let time = new Date()
        let options = { year: 'numeric', month: 'long' }
        time.toLocaleDateString('fr-FR', options)
        /*if (!event){
             return this.$moment().format('MMMM YYYY') 
          }
        if (event.target === this.$refs.past) {
            console.log('PAST')
            return this.$moment().subtract(1, 'month').format('MMMM YYYY')
        }
        if (event.target === this.$refs.future) {
            console.log('FUTURE')
            return this.$moment().add(1, 'month').format('MMMM YYYY')
        }*/
      }
    },
    methods: {
        toPast(){
            this.$store.commit('SET_CURRENT_MONTH', this.month - 1)
        },
        toFuture(){
            this.$store.commit('SET_CURRENT_MONTH', this.month + 1)
        }
    },
    filters: {
        capitalize(string){
            let capital = string[0].toUpperCase()
            let suit = string.substr(1)
            return `${capital}${suit}`
        }
    },
    mounted(){
        console.log(this.$moment.locale())
    }
}
</script>
<style>

</style>