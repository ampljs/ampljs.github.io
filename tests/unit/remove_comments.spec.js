import { expect } from "chai";
import { functions } from "../../src/plugins/ampljs/ampl";


describe('removing comments in json strings', function () {
    context('without comments', function () {
        it('should remain the same string', function () {
            expect(JSON.parse(functions.removeComments('{"key": "value", "other":"other"}'))).to.have.all.keys(['key', 'other'])
        })
    })

    context('with only comments', () => {
        it('should make string empty', () => {
            expect(functions.removeComments(`/* Falta:
            Exemplos de valores de Parâmetros do Modelo: min, max, std, fixed;
            Exemplos de Parâmetros do Modelo calculados por Fórmulas;
            Exemplos de Fórmulas: de Duração, de Fluxos;
            Categorias de Recursos: As necessárias para Indicadores;
            Diferenciar Recursos: Cada Estação com só um de cada;
            Outros Fluxos Terminais, seus Recursos e Categorias: Perdas, Insumos;
            Infraestrutura, seus Recursos, Categorias e Nós de Manutenção: Área, Touros, Equiptos, Pessoal, Instalacões;
            Parâmetros e Fórmulas "reais"; Códigos, valores da simulação, valores do modelo.
            */`)).to.be.empty
        })
    })

    context('with comments before json objects', () => {
        it('should retain only json objects', () => {
            expect(JSON.parse(functions.removeComments(`/* Falta:
            Exemplos de valores de Parâmetros do Modelo: min, max, std, fixed;
            Exemplos de Parâmetros do Modelo calculados por Fórmulas;
            Exemplos de Fórmulas: de Duração, de Fluxos;
            Categorias de Recursos: As necessárias para Indicadores;
            Diferenciar Recursos: Cada Estação com só um de cada;
            Outros Fluxos Terminais, seus Recursos e Categorias: Perdas, Insumos;
            Infraestrutura, seus Recursos, Categorias e Nós de Manutenção: Área, Touros, Equiptos, Pessoal, Instalacões;
            Parâmetros e Fórmulas "reais"; Códigos, valores da simulação, valores do modelo.
            */
                {"idSimulation": "68ca096d-4702-496e-8284-fc5f827ecc7f",
                "idSystem": 72,
                "idModel": 18}`))).to.have.all.keys(['idSimulation', 'idSystem', 'idModel'])
        })
    })

    context('with comments inside json objects', () => {
        it('should remove comment inside json object', () => {
            expect(JSON.parse(functions.removeComments(`{"simulationData": {
                "ARROBA": 15,
                "graph": {
                    "nodes": {
        /* Início da Cadeia 0 */
                        "n_1_VeBg_Venda de bois gordos.": {
                            "formula": "CONFINAMENTO+INICIO_AGUAS",
                            "stages": [
                                "Venda"
                            ],
                            "flows": [
                                "n_2_TeBm_Terminação em confinamento de bois magros.-n_1_VeBg_Venda de bois gordos."
                            ],
                            "duration": 200,
                            "type": "terminal_saida_producao"
                        }
                    }
                }
            }
        }`))).to.have.nested.property('simulationData.graph.nodes')
        })
    })
})