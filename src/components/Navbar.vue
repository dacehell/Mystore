<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
    <!-- Brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item ">
        <a class="navbar-item">
            <img src="../assets/mondk.png">
          </a>
      </router-link>
      <a role="button"
      class="navbar-burger burger" aria-label="menu" aria-expanded="false"
      data-target="navbarMenu"
      :class="{'is-active': displayMenu}"
      @click="displayMenu = !displayMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!--  -->
    <div id="navbarMenu" class="navbar-menu" :class="{'is-active': displayMenu}" @click="displayMenu = !displayMenu">
        <div class="navbar-start">
          <!--
          <a class="navbar-item">
            Home
          </a>
          -->
        </div>

        <div class="navbar-end">
          <a  data-testId='cart' class="navbar-item" @click="showCart">
            <span class="icon">
              <i class="mdi mdi-32px mdi-cart"></i>
              <span
              class="tag is-warning"
              v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            Login
          </router-link>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                <span class="icon">
                  <i class="mdi mdi-32px mdi-account"></i>
                </span>
                {{ getCurrentUser ?  getCurrentUser.email : '' }}
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Preferencias
              </a>
              <a  class="navbar-item" @click="showCart">
                Ver Carrito
              </a>
              <hr class="navbar-divider">
              <router-link to = "/create" class="navbar-item">Crear producto</router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    <!--  -->
    </div> <!-- container -->
  </nav>
</template>

<script>
import Firebase from "firebase";


export default {
  name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayMenu: false,
      currentUser: ''
    }
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      Firebase.auth().signOut().then(()=> {
        this.$router.push('login')
        this.$store.dispatch('updateUser', false)
        this.displayMenu = false     
      })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){ 
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : '' 
    }
  },
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style scoped>
nav {
  height: 3.25rem;
  background-color:#E2231A;
}
</style>