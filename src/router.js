import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Firebase from 'firebase'
import Create from './views/Create.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path:'/home',
      name:'home',
      component: Home,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      alias:['/crear']
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '*',
      name: 'NotFound', 
      component: () => import('./views/NotFound.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requireLogin)
  console.log(user);
  
  if(!user && authRequired){
    next('login')
 
  }else{
    next()
  }
})

export default router;
