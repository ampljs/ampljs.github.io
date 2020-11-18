import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('check if char is invalid', function() {
    context('pass one char and empty list of invalid chars', function(){
        it('should be false', function(){
            expect(functions.isInvalidChar('a', [])).to.false
        })
    })

    context('passing more than one char', () => {
        it('should be false', () => {
            expect(functions.isInvalidChar('ab', [])).to.false
        })
    })

    context('passing one char and a list of invalid chars who dont contain that char', () => {
        it('should be false', () => {
            expect(functions.isInvalidChar('a', ['', ' ', ',', '\n'])).to.false
        })
    })

    context('passing one char and a list of invalid chars who contains that char', () => {
        it('should be true', () => {
            expect(functions.isInvalidChar(',', ['', ' ', ',', '\n'])).to.true
        })
    })
})