import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Firebase from 'firebase';
import firebaseConfig from "@/firebase";
import Vuelidate from 'vuelidate';
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
