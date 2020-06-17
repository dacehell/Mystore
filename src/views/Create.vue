<template>
    <div>
        <div>
        <input type='text' v-model="name" placeholder='ingrese producto'>
        <input type='number' v-model="price" placeholder='ingrese el valor'>
        <input type='text' v-model="picture" placeholder='ingrese la imagen'>

        </div>

        <button @click="createProduct">Añadir</button>
        
        <button class="button btn-danger" v-if="edit" @click="updateProduct(id)">Actualizar</button>
                <!-- @click="deleteItem(p['.key'])" -->
        
    
    <div>
    <h1>Listar Productos</h1>
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
              <button class="button btn-success" @click='editProduct(p.id)'>Editar</button>
              <!-- @click="editItem(p['.key'])"  -->
              <div class="is-clearfix"></div>
            </td>
            <td>
              <button class="button btn-danger" @click='deleteProduct(p.id)'>Borrar</button>
                <!-- @click="deleteItem(p['.key'])" -->
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

export default {
    data(){
        return {
            name:'',
            picture:'',
            price:'',
            id: undefined
        }
    }, 

    methods: {
        ...mapActions(['updateEdit']),
        createProduct(){
            let add = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
        axios.post('https://us-central1-tdd3-4e714.cloudfunctions.net/products/product',add, {headers:{'content-type':'application/json'}})
    .then((response) => {
        console.log(response);
        this.$store.dispatch('getProducts')
    })
    .catch(function(error) {
        console.log(error);
    });

        
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
                this.$store.dispatch('getProducts')
    })
    .catch(function(error) {
        console.log(error);
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
</script>