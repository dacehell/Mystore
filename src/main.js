import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Firebase from 'firebase';
import firebaseConfig from "@/firebase";
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate);

Firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

import './assets/scss/main.scss'

let app = '';

Firebase.auth().onAuthStateChanged(()  =>{
  if(!app){
    
  app = new Vue({
      Firebase,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
