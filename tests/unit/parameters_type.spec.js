import { createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('get parameter type', function() {
    context('min == max', function(){
        it('should be fixed', function(){
            expect(functions.getParameterCategory({name: 'a', min: 10, max:10}, [])).to.equal('fixed')
        })
    })

    context('parameter in optimizedParameters and min != max', () => {
        it('should be optimized', () => {
            expect(functions.getParameterCategory({name: 'a', min: 10, max:20}, ['a', 'b'])).to.equal('optimized')
        })
    })

    context('parameter in optimizedParameters and min == max', () => {
        it('should be fixed', () => {
            expect(functions.getParameterCategory({name: 'a', min: 10, max:10}, ['a', 'b'])).to.equal('fixed')
        })
    })

    context('parameter not in optimizedParameters', () => {
        it('should be fixed', () => {
            expect(functions.getParameterCategory({name: 'a', min: 10, max:10}, [])).to.equal('fixed')
        })
    })
})