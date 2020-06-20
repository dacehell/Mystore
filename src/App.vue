<template>
  <div id="app" class="has-background-grey-lighter">
    <navbar :brand="'My Store'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>


<style scope>


</style>
