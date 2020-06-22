<template>
  <div>
      <footer class="footer mt-6">
  <div class="content has-text-centered">
    <p>
      <strong>MONDK</strong> by <a href="#">David Caldera</a>. The source code is licensed
      <a href="#">Github <span class="icon">
        <font-awesome-icon :icon="['fab', 'fa-github']" />
      
    </span></a>
    </p>
  </div>
      </footer>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(faFontAwesome)
export default {

}
</script>

<style>
.footer{
  background-color:#ED9122 !important;
}

</style>