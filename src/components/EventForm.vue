<template>
    <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }" ref="form">
        <h4>Ajouter un rendez-vous</h4>
        <div class="text">
            <input type="text" v-focus v-model="description" ref="description">
        </div>
        <div class="buttons">
            <button @click="create">Nouveau</button>
        </div>
        <button id="close-button" @click="close">&#10005;</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            description: ''
        }
    },
    computed: {
        active(){
            return this.$store.state.active
        },
        top(){
            return `${this.$store.state.eventPosY}px`
        },
        left(){
            return `${this.$store.state.eventPosX}px`
        },
    },
    methods: {
        close(){
            this.$store.commit('CLOSE_EVENT')
        },
        create(){
            this.$store.dispatch('createNewEvent', this.description)
            this.description = ''
            this.$store.commit('CLOSE_EVENT')
        }
    },
    directives: {
        focus: {
            update(el){
                el.focus()
            }
        }
    }
    
}
</script>
