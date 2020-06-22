<template>
  <div id="app" class="has-background-grey-lighter">
    <navbar :brand="'My Store'"/>
    <div class="modal" :class="{'is-active': overlay}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <progress class="progress is-dark" max="100">60%</progress>
      </div>
    </div>
      
    <router-view/>
   
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(['overlay'])
  }
}
</script>


<style scope>


</style>
