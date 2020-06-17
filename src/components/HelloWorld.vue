
<template>
    <div>
        <div data-testId='hello-component'>{{msg}}</div>
        <span>Siguenos en Tiktok</span>
    </div>
</template>
<script>
export default {
    props:{
        msg:{
    type: String,
    default: 'Light'
        }
    }
}
</script>