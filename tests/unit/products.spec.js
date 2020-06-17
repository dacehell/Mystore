import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

import Products from '@/components/Products.vue'

describe('Products.vue', () => {
  let mockProducts = [{name: 'Computadora', price: 100.00, qty:1}]

  it('show the title "Our Products"', () => {
    const title = 'Nuestros Productos'
    const wrapper = shallowMount(Products, {})
    expect(wrapper.text()).to.include(title)
  }),
  it('show products', () => {
    const productName = 'Computadora'
    const wrapper = shallowMount(Products, {
      data(){ return { products: mockProducts }}
    })
    
    expect(wrapper.text()).to.include(productName)
  }),


  it('Filter the products', () => {
    const productSearch = 'Teclado'
    const wrapper = shallowMount(Products, {
      data(){ return { products: mockProducts }}
    })
    const searchBox = wrapper.find('input')
    searchBox.setValue(productSearch)
    expect(wrapper.text()).to.not.include(mockProducts[0].name)
  }),


  it('Add products to shopping car', () => {
    const wrapper = shallowMount(Products, {
      data(){ return { products: mockProducts }}
    })
    const clickMethodStub = sinon.stub()
   
    wrapper.setMethods({
      addToCart: clickMethodStub
    })
    const addButton = wrapper.find('.card .button')
    addButton.trigger('click')
    expect(clickMethodStub.called).to.equal(true)
  })
})
