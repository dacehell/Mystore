import {mount} from '@vue/test-utils';
import {expect} from 'chai';
import Register from '@/components/Register'

describe('Register.vue', ()=>{
     // Given/arrange (dado que existe..)
     const wrapper = mount(Register)
     let checkbox = wrapper.find('input[type="checkbox"]')
     let registerBtn = wrapper.find('button[type="submit"]')

    it('has a disabled button', () =>{ 
         //when/act (cuando pasa cierta otra cosa)
        checkbox.setChecked(false)
        //then/Assert (entonces, pasa cierta otra cosa)
        expect(registerBtn.classes('is-disabled')).to.be.true
    })

    
    it('has a button not disabled when checkbox is checked', () =>{
        checkbox.setChecked(true)
        expect(registerBtn.classes('is-disabled')).to.be.false
    })


    it('registers a User', () =>{
        let isSent = false 
        function stubMethod() { isSent = true}
               //0) cargar el componente con los metodos de prueba
        const wrapper = mount(Register, {
            methods:{
                submitForm: stubMethod
            }
        })
        // 1) Encontrar los campos necesarios
        let  userName = wrapper.find('input[type="text"]')
        let email = wrapper.find('input[type="email"]')
        let password = wrapper.find('input[type="password"]')
        let registerBtn = wrapper.find('button[type="submit"]')

        //2) Asignar los valores a  los campos
        userName.setValue('Blatazar Brat')
        email.setValue('bbrat@hollywood.com')
        password.setValue('DanceFight')
        //3) Enviar Formulario
        registerBtn.trigger('click')
        //4) Probar que se envio el registro
        expect(isSent).to.be.true
    })
})  