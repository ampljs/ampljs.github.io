import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('filter names of nodes and flows', function() {
    context('node passed is invalid', () => {
        it('should be empty', () => {
            expect(functions.removeUselessCharsInNodeName(1, 'flow')).to.be.an('string').that.includes('Nome do nó deve ser uma string')
        })
    })

    context('filter one node name', function(){
        it('"n_76_GeMs_Gestação na seca de multíparas solteiras." becomes "n_76_GeMs"', function(){
            expect(functions.removeUselessCharsInNodeName('n_76_GeMs_Gestação na seca de multíparas solteiras.', 'node')).to.equal('n_76_GeMs')
        })
    })

    context('filter one flow name', () => {
        it('"n_76_GeMs_Gestação na seca de multíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas." becomes "n_76_GeMs-s_92_3_Mp"', () => {
            expect(functions.removeUselessCharsInNodeName("n_76_GeMs_Gestação na seca de multíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.", 'flow')).to.equal('n_76_GeMs-s_92_3_Mp')
        })
    })

    context('flows which nodes has - inside her names', () => {
        it('"n_76_GeMs_Gestação - na seca de multíparas solteiras.-s_92_3_Mp_Balanço de - multíparas paridas." should be "n_76_GeMs-s_92_3_Mp"', () => {
            expect(functions.removeUselessCharsInNodeName("n_76_GeMs_Gestação - na seca de multíparas solteiras.-s_92_3_Mp_Balanço de - multíparas paridas.", 'flow')).to.equal("n_76_GeMs-s_92_3_Mp")
        })
    })
})