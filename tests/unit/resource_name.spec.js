import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('remove accents from chars', function() {
    context('remove ~', function(){
        it('ãõñ becomes aon', function(){
            expect(functions.removeSpecialCharsFromResourceName('ãõñ')).to.equal('aon')
        })
    })

    context('remove Ç', () => {
        it('ç becomes c', () => {
            expect(functions.removeSpecialCharsFromResourceName('ç')).to.equal('c')
        })
    })

    context('remove ´', () => {
        it('áéíóú becomes aeiou', () => {
            expect(functions.removeSpecialCharsFromResourceName('áéíóú')).to.equal('aeiou')
        })
    })

    context('remove `', () => {
        it('àèìòù becomes aeiou', () => {
            expect(functions.removeSpecialCharsFromResourceName('àèìòù')).to.equal('aeiou')
        })
    })

    context('remove space', () => {
        it('should join two words with _', () => {
            expect(functions.removeSpecialCharsFromResourceName('two words')).to.equal('two_words')
        })
    })

    context('remove ^', () => {
        it('âêîôû becomes aeiou', () => {
            expect(functions.removeSpecialCharsFromResourceName('âêîôû')).to.equal('aeiou')
        })
    })
})