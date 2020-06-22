// Apartado donde se importan vue, axios y vuex (CRUD)
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex) //uso de vuex

// Funciones globales que seran llamados en las acciones
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj)) //enviar producto al carrito
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) //muostrar items carrito
}
function getCartTotal(productsList) { //obtener total 
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}
function newCart() { //resetear carrito
  return {
    list: [],
    total: 0.0,
  }
}

export default new Vuex.Store({
  state: { // la fuente de datos de los componentes
    // User
    currentUser: getFromStorage('user') || undefined,
    // Cart
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    products: [],
    loading: false,
    edit: false,
    overlay: false
  },
  mutations: { //funciones que modifican los estados (metodos)
   
    SET_CURRENT_PRODUCT(state, product){state.currentProduct = product},
    LOADING_PRODUCTS(state) {state.loading = !state.loading},
    DISPLAY_OVERLAY(state) {state.overlay = true},
    HIDE_OVERLAY(state) {state.overlay = false},
    GET_PRODUCTS(state, products){state.products = []
        products.forEach((prod) => {
        prod['qty'] = 1
        state.products.push(prod)
      })
      state.loading = false
    },
    // User
    UPDATE_CURR_USER(state, user) {state.currentUser = user 
    setInStorage('user', user)
    },
    // Cart
    ADD_TO_CART(state, product) {
      // add def qty if not defined
      if (product.qty === undefined ) { product['qty'] = 1 }
      // increase qty if exists, else add to cart as new
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // update total price
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        // update total price
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // update in storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
    UPDATE_EDIT(state) {
      state.edit = !state.edit
    }
  },


  actions: {     // las acciones ejecutan las  mutaciones las cuales realizan el cambio y realizan operaciones asincronas
    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    updateShowCart({commit}, val) {
      //console.log('setting showCart to ', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolean casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    getProducts({commit}){
      commit('DISPLAY_OVERLAY')
      commit("LOADING_PRODUCTS")
      axios.get('https://us-central1-tdd3-4e714.cloudfunctions.net/products/products', 
      { headers: {"Content-type": "text/plain"}}).then((accept) => {
        
        let data = accept.data;
        commit('GET_PRODUCTS', data)
      }).finally(() => {
        commit('HIDE_OVERLAY')
      })
    },
    updateEdit({commit}) {
      commit('UPDATE_EDIT')
    }
  },
  getters: { //son metodos computados
    // User
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Cart
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})
