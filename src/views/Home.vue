<template>
  <div class="container">
    <cart-detail/>
    <products-list/>
    <footer-home></footer-home>
  </div>
</template>

<script>
import ProductsList from "../components/Products";
import CartDetail from "../components/CartDetail";
import FooterHome from "../components/FooterHome.vue"

export default {
  name: 'home',
  components: {
    ProductsList,
    CartDetail,
    FooterHome
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style  scoped>
#container{
  background: black;
}
</style>