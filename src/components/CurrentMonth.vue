<template>
    <div>
        <div>{{ formattedDate | capitalize() }}</div>
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
      formattedDate() {
          return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY')
        
      }
    },
    methods: {
        toPast(){
            if (this.month === 1){
                this.$store.commit('SET_CURRENT_MONTH', 12)
                this.$store.commit('SET_CURRENT_YEAR', this.year - 1)
            }
            else this.$store.commit('SET_CURRENT_MONTH', this.month - 1)
            
        },
        toFuture(){
            if (this.month === 12){
                this.$store.commit('SET_CURRENT_MONTH', 1)
                this.$store.commit('SET_CURRENT_YEAR', this.year + 1)
            }
            else this.$store.commit('SET_CURRENT_MONTH', this.month + 1)
            
        }
    },
    filters: {
        capitalize(string){
            let capital = string[0].toUpperCase()
            let suit = string.substr(1)
            return `${capital}${suit}`
        }
    },
    
}
</script>
<style>

</style>
