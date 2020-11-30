import  { expect }  from "chai";
import  { functions, types }   from "../../src/plugins/ampljs/ampl";

describe('simplify formulas and solve it if is possible', function() {
    context('formula without params', function(){
        it('"5 + 9 * (1 + 2)" should be 32', function(){
            expect(functions.simplifyFormula('5 + 9 * (1 + 2)', parameters)).to.equal('32')
        })
    })

    context('formula with fixed params', () => {
        it('"AGUAS-DIAGNOSE-MONTA" should be 61', () => {
            expect(functions.simplifyFormula('AGUAS-DIAGNOSE-MONTA', parameters)).to.equal('61')
        })
    })

    context('one calculated parameter with fixed params', () => {
        it('"SECA" should be 153', () => {
            expect(functions.simplifyFormula('SECA', parameters)).to.equal('153')
        })
    })

    context('one calculated param with fixed and optimized params', () => {
        it('"FIM_AGUAS"should be "61 - val["PUERPERIO"]"', () => {
            expect(functions.simplifyFormula('FIM_AGUAS', parameters)).to.equal('61 - val["PUERPERIO"]')
        })
    })
})

const _ = JSON.parse(`{
    "AGUAS": {
     "name": "AGUAS",
     "category": "fixed",
     "val": 212,
     "std": 212,
     "min": 200,
     "max": 220
    },
    "CICLO": {
     "name": "CICLO",
     "category": "fixed",
     "val": 365,
     "std": 365,
     "min": 365,
     "max": 365
    },
    "CONFINAMENTO": {
     "name": "CONFINAMENTO",
     "category": "fixed",
     "val": 110,
     "std": 110,
     "min": 100,
     "max": 120
    },
    "DIAGNOSE": {
     "name": "DIAGNOSE",
     "category": "fixed",
     "val": 59,
     "std": 60,
     "min": 30,
     "max": 90
    },
    "INICIO_AGUAS": {
     "name": "INICIO_AGUAS",
     "category": "optimized",
     "val": 90,
     "std": 90,
     "min": 80,
     "max": 100
    },
    "MONTA": {
     "name": "MONTA",
     "category": "fixed",
     "val": 92,
     "std": 90,
     "min": 60,
     "max": 120
    },
    "NATALIDADE": {
     "name": "NATALIDADE",
     "category": "optimized",
     "val": 0.8,
     "std": 0.8,
     "min": 0.5,
     "max": 1
    },
    "PARTO_MACHO": {
     "name": "PARTO_MACHO",
     "category": "fixed",
     "val": 0.5,
     "std": 0.5,
     "min": 0.5,
     "max": 0.5
    },
    "PERDAS": {
     "name": "PERDAS",
     "category": "optimized",
     "val": 0.01,
     "std": 0.03,
     "min": 0.01,
     "max": 0.05
    },
    "PERDAS_CRIA": {
     "name": "PERDAS_CRIA",
     "category": "fixed",
     "val": 0.03,
     "std": 0.05,
     "min": 0.03,
     "max": 0.1
    },
    "PRECO#BEZERRAS": {
     "name": "PRECO#BEZERRAS",
     "category": "fixed",
     "val": 890,
     "std": 900,
     "min": 800,
     "max": 1000
    },
    "PRECO#BEZERROS": {
     "name": "PRECO#BEZERROS",
     "category": "fixed",
     "val": 960,
     "std": 950,
     "min": 850,
     "max": 1100
    },
    "PRECO#BOIS_GORDOS": {
     "name": "PRECO#BOIS_GORDOS",
     "category": "fixed",
     "val": 9100,
     "std": 9000,
     "min": 7000,
     "max": 10000
    },
    "PRECO#MULTIPARAS": {
     "name": "PRECO#MULTIPARAS",
     "category": "fixed",
     "val": 5100,
     "std": 5000,
     "min": 4000,
     "max": 6000
    },
    "PRECO#MULTIPARAS_GORDAS": {
     "name": "PRECO#MULTIPARAS_GORDAS",
     "category": "fixed",
     "val": 5100,
     "std": 5000,
     "min": 4000,
     "max": 6000
    },
    "PRECO#MULTIPARAS_PARIDAS": {
     "name": "PRECO#MULTIPARAS_PARIDAS",
     "category": "fixed",
     "val": 5900,
     "std": 6000,
     "min": 5000,
     "max": 7000
    },
    "PRECO#NULIPARAS_GORDAS": {
     "name": "PRECO#NULIPARAS_GORDAS",
     "category": "fixed",
     "val": 4100,
     "std": 4000,
     "min": 3000,
     "max": 5000
    },
    "PRECO#PRIMIPARAS": {
     "name": "PRECO#PRIMIPARAS",
     "category": "fixed",
     "val": 4400,
     "std": 4500,
     "min": 3500,
     "max": 5500
    },
    "PRECO#PRIMIPARAS_GORDAS": {
     "name": "PRECO#PRIMIPARAS_GORDAS",
     "category": "fixed",
     "val": 4400,
     "std": 4500,
     "min": 3500,
     "max": 5500
    },
    "PRENHEZ": {
     "name": "PRENHEZ",
     "category": "fixed",
     "val": 0.9,
     "std": 0.8,
     "min": 0.5,
     "max": 1
    },
    "PRODUCAO": {
     "name": "PRODUCAO",
     "category": "fixed",
     "val": 438,
     "std": 400,
     "min": 300,
     "max": 500
    },
    "PUERPERIO": {
     "name": "PUERPERIO",
     "category": "optimized",
     "val": 30,
     "std": 30,
     "min": 25,
     "max": 40
    },
    "FIM_AGUAS": {
     "name": "FIM_AGUAS",
     "category": "calculated",
     "val": 1,
     "std": 1,
     "min": 1,
     "max": 2,
     "formula": "AGUAS-DIAGNOSE-MONTA-PUERPERIO"
    },
    "SECA": {
     "name": "SECA",
     "category": "calculated",
     "val": 1,
     "std": 1,
     "min": 1,
     "max": 2,
     "formula": "CICLO-AGUAS"
    }
   }`)

   const parameters = {};
   for(let p in _){
       parameters[p] = new types.Parameter(_[p].name, _[p].category, _[p].std, _[p].min, _[p].max, _[p].val, _[p].formula)
   }