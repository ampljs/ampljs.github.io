import { expect } from "chai";
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from "vuetify"
import Vue from "vue"
import MaximizeIndicatorButton from "../../src/components/MaximizeIndicator"

Vue.use(Vuetify)

describe('show options to maximize or minimize the selected indicator', function () {
   let component;
   let localVue;
   let vuetify;
   beforeEach(() => {
      localVue = createLocalVue();
      vuetify = new Vuetify()
      global.requestAnimationFrame = cb => cb()
      const el = document.createElement('div')
      el.setAttribute('data-app', true)
      document.body.appendChild(el)

   })
   context('maximize button is selected and remain selected after is clicked', () => {
      it('should not emit another event', async () => {
         component = mount(MaximizeIndicatorButton, {
            localVue, vuetify, propsData: {
               indicators: {}
            }, attrs: {'data-app': true}
         })

         component.find('button[value="maximize"]').trigger('click')
         await component.vm.$nextTick();

         console.log(component.emitted())

         expect(component.emitted().updateObjective).to.be.an('array').to.have.lengthOf(1)
      })
   })

   context('select minimize button', () => {
    it('should emit another event with minimize value and change color of button', async () => {
       component = mount(MaximizeIndicatorButton, {
          localVue, vuetify, propsData: {
             indicators: {}
          }, attrs: {'data-app': true}
       })

       component.find('button[value="minimize"]').trigger('click')
       await component.vm.$nextTick();

       expect(component.emitted().updateObjective.map(e => e[0])).to.be.an('array').to.have.all.members(['maximize', 'minimize'])
    })

    it('should change the selected button', async () => {
        component = mount(MaximizeIndicatorButton, {
           localVue, vuetify, propsData: {
              indicators: {}
           }, attrs: {'data-app': true}
        })
 
        component.find('button[value="minimize"]').trigger('click')
        await component.vm.$nextTick();

        expect(component.find('button.v-btn--active').text()).to.equal('minimizar')
     })
 })
})
