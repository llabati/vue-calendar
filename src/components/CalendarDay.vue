<template>
<div :class="classObject" @click="openEvent">{{ day.format('D') }}
    <ul class="event-list">
        <li v-for="event in events" :key="event.id">{{ event.description }}</li>
    </ul>

</div>
    
</template>
<script>
export default {
    props: [ 'day' ],
    computed: {
        classObject(){
            let eventDate = this.$store.state.eventDate
            let eventActive = this.$store.state.active
            let today = this.day.isSame(this.$moment(), 'day')
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
                active: eventDate === this.day._d && eventActive
            }
        },
        events(){
            //return this.$store.state.events.filter(e => e.date.isSame(this.day, 'day'))
            return this.$store.state.events.filter(e => e.date === this.day._d)
        }
    },
    methods: {
        openEvent(event) {
            console.log('EVENT TO BE OPENED', event)
            this.$store.commit('SET_EVENT_POS', event)
            this.$store.commit('OPEN_EVENT')
            this.$store.commit('ATTRIBUTE_DATE', this.day)
        }
    },
    
}
</script>
<style>

</style>
