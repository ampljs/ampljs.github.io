import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('replace last char in string by semicolon if is invalid', function() {
    context('string dont have an invalid char', function(){
        it('should remain the same string', function(){
            expect(functions.replaceInvalidCharsWithSemicolon('set NODES := node1 node2')).to.equal('set NODES := node1 node2;')
        })
    })

    context('with break line', () => {
        it('should replace only one operator', () => {
            expect(functions.replaceInvalidCharsWithSemicolon('set NODES := node1 node2\n')).to.equal('set NODES := node1 node2;')
        })
    })

    context('with comma', () => {
        it('should remove comma and add semicolon', () => {
            expect(functions.replaceInvalidCharsWithSemicolon('set NODES := node1 node2,')).to.equal('set NODES := node1 node2;')
        })
    })

    context('with comma and space', () => {
        it('should remove comma and space and add semicolon', () => {
            expect(functions.replaceInvalidCharsWithSemicolon('set NODES := node1 node2, ')).to.equal('set NODES := node1 node2;')
        })
    })

    context('with comma and break line', () => {
        it('should remove comma and break line and add semicolon', () => {
            expect(functions.replaceInvalidCharsWithSemicolon('set NODES := node1 node2,\n')).to.equal('set NODES := node1 node2;')
        })
    })

})