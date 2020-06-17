<template>
    <div>
        <input type="text">
        <input type="email">
        <input type="password">
        <input type="checkbox" v-model='isAccepted'>
        <button type="submit" :class='{"is-disabled": !isAccepted}' @click="submitForm">
            Registrar
            </button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isAccepted: false
        }
    },
    methods: { 
        submitForm(){
            
        }
    }
}
</script>