<template>
    <div>
        <form @submit.prevent="submit" class="container box mt-6">
            <span v-if="formHasErrors" class="has-text-danger">
                <i class="mdi mdi-alert"></i>
                Ingresar todos los campos
            </span>
         <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
            <label class="form__label">Name</label>
            <input class="input is-rounded is-warning" v-model.trim="$v.name.$model" v-model="name" placeholder='Ingrese el nombre'/>
        </div>
        <div class="error" v-if="!$v.name.required">Field is required</div>
        <div class="error" v-if="!$v.name.alpha">Name must have alpha</div>
        <tree-view :data="$v.name" :options="{rootObjectKey: '$v.name', maxDepth: 2}"></tree-view>
        

        <div class="form-group" :class="{ 'form-group--error': $v.price.$error }">
            <label class="form__label">Price</label>
            <input class="form__input input is-rounded is-warning" v-model.trim="$v.price.$model" v-model="price" placeholder='ingrese el valor'/>
        </div>
        <div class="error" v-if="!$v.price.required">Field is required</div>
        <div class="error" v-if="!$v.price.numeric">Price must have numeric</div> 

        <div class="form-group" :class="{ 'form-group--error': $v.picture.$error }">
            <label class="form__label">Picture</label>
            <input class="form__input input is-rounded is-warning" v-model.trim="$v.picture.$model" v-model="picture" placeholder='ingrese imagen'/>
        </div>
        <div class="error" v-if="!$v.picture.required">Field is required</div>
        <div class="error" v-if="!$v.picture.minLength">Picture must have at least {{$v.picture.$params.minLength.min}} letters.</div>
        <div class="error" v-if="!$v.picture.maxnLength">Picture must have at 800 character max {{$v.picture.$params.maxLength.min}} letters.</div>


        
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        <button class=" button is-success is-rounded" @click="createProduct">Añadir</button>
        
        <button class="button is-info ml-4 is-rounded" v-if="edit" @click="updateProduct(id)">Actualizar</button>
        </form>

        
             
        
    
        <div class="mt-6 container box">
        <h1 class="is-size-3 mb-4">Listar Productos</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre Producto</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th colspan="2" class="action">Acción</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="p in computedProductList" :key="p.id">
                <td>{{ p.id }}</td>
                <td>{{ p.data.name }}</td>
                <td>{{ p.data.price }}</td>
                <td>{{ p.data.picture.substring(0,50) }}</td>
                <td>
                  <button class="button is-success is-rounded" @click='editProduct(p.id)'>Editar</button>
                  
                  <div class="is-clearfix"></div>
                </td>
                <td>
                  <button class="button is-danger is-rounded" @click='deleteProduct(p.id)'>Borrar</button>
                  
                  <div class="is-clearfix"></div>
                </td>
                
              </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
import { required, minLength, maxLength, numeric, alpha } from 'vuelidate/lib/validators'



export default {
    
    data(){
        return {
            name:'',
            picture:'',
            price:'',
            id: undefined,
            submitStatus:null,
            formHasErrors: false
           
        }
    },
   validations: { 
      name: {
          required,
          alpha,
          //minLength: minLength(3),
          //maxLength: maxLength(30),
        },
        picture: {
           required,
          minLength: minLength(3),
          maxLength: maxLength(800), 
        },
        price: {
            required,
            numeric,
        }
          

    },  

    methods: {
        ...mapActions(['updateEdit']),

        submit() {
     
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    isValid(){
        if (this.name && this.price) {
          this.formHasErrors = false
        return true;
          }
          this.formHasErrors = [];
          if (!this.name) {
            this.formHasErrors
          }
          if (!this.price ) {
            this.formHasErrors
          } 
         },
        createProduct(){
            let add = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
          if(this.isValid()){
        axios.post('https://us-central1-tdd3-4e714.cloudfunctions.net/products/product',add, {headers:{'content-type':'application/json'}})
    .then(() => {
                this.name = ''
                this.price = ''
                this.picture = ''
                this.id = ''
        this.$store.dispatch('getProducts');
        
            })
            .catch(function(error) {
                newFunction(error)
            });
    }
        
    },
    deleteProduct(id){
        let confirmation = confirm("Estas Seguro??")
        if (confirmation) {

            axios.delete(`https://us-central1-tdd3-4e714.cloudfunctions.net/products/product/${id}`,{headers:{'content-type':'application/json'}})
            .then(() => {
            alert('Producto eliminado exitosamente')
            this.$store.dispatch('getProducts')
        })
            
        }
        
    },
    editProduct(id) {
        this.updateEdit()
        this.findProduct(id)
        

    },
    findProduct(id){
       axios.get(`https://us-central1-tdd3-4e714.cloudfunctions.net/products/product/${id}`,{headers:{'content-type':'application/json'}})
       .then((response)=>{
           this.name = response.data.name
           this.picture = response.data.picture
           this.price = response.data.price
           this.id = id
       })
    },
    updateProduct(id) {
        let add = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
        axios.put(`https://us-central1-tdd3-4e714.cloudfunctions.net/products/product/${id}`,add, {headers:{'content-type':'application/json'}})
    .then(() => {
                this.name = ''
                this.price = ''
                this.picture = ''
                this.id = ''
                this.$store.dispatch('getProducts');
    })
    .catch(function(error) {
        newFunction(error);
    });
    }
    },
        computed: {
            ...mapState(['products', 'edit']),
            computedProductList(){
                return this.products
            }
        },
        mounted() {
            this.$store.dispatch('getProducts')
    },
    
}

  function newFunction(error) {
    newFunction(error)
  }
</script>