import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('replacing exponential operator', function() {
    context('without exponential operator', function(){
        it('should remain the same formula', function(){
            expect(functions.replaceExponentialOperator('15+90-80*(150)')).to.equal('15+90-80*(150)')
        })
    })

    context('with one exponential operator', () => {
        it('should replace only one operator', () => {
            expect(functions.replaceExponentialOperator('4^2+5*(10)+AGUAS')).to.equal('4**2+5*(10)+AGUAS')
        })
    })

    context('with more than one exponential operator', () => {
        it('should replace all exponential operators', () => {
            expect(functions.replaceExponentialOperator('4^2+5*(10)+AGUAS^2')).to.equal('4**2+5*(10)+AGUAS**2')
        })
    })
})