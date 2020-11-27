import { expect } from "chai";
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from "vuetify"
import Vue from "vue"
//import { functions } from "../../src/plugins/ampljs/ampl";
import IndicatorDialog from "../../src/components/Indicador"

Vue.use(Vuetify)

describe('show all available indicators in dialog and let user choose one indicator', function () {
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
   context('dont has indicators in list', () => {
      it('should be empty', async () => {
         component = mount(IndicatorDialog, {
            localVue, vuetify, propsData: {
               indicators: {}
            }, attrs: {'data-app': true}
         })

         component.find('div.v-select__slot').trigger('click')
         await component.vm.$nextTick();

         expect(component.find('div.v-list-item__title').text()).to.equal('Nenhum indicador disponível')
      })
   })

   context('has one indicator', () => {
      it('should not be empty', async () => {
         component = mount(IndicatorDialog, {
            localVue, vuetify, propsData: {
               indicators: {i1: indicators['i1']}
            }, attrs: {'data-app': true}
         })

         component.find('div.v-select__slot').trigger('click')
         await component.vm.$nextTick();

         expect(component.find('div.v-list-item').text()).to.equal(indicators['i1'].name)
      })
   })

   context('has many indicators', function ()  {
      it(`should show all indicators`, async function() {
         component = mount(IndicatorDialog, {
            localVue, vuetify, propsData: {indicators}, attrs: {'data-app': true}
         })

         component.find('div.v-select__slot').trigger('click')
         await component.vm.$nextTick();

         expect(component.findAll('div.v-list-item').length).to.equal(Object.keys(indicators).length)
      })
   })

   context('user select one indicator in list', function ()  {
      it(`should show selected indicator in input`, async function() {
         component = mount(IndicatorDialog, {
            localVue, vuetify, propsData: {indicators}, attrs: {'data-app': true}
         })

         component.find('div.v-select__slot').trigger('click')
         await component.vm.$nextTick()
         component.find('div.v-list-item').trigger('click')
         await component.vm.$nextTick()

         expect(component.find('div.v-select__selection').text()).to.equal(indicators['i1'].name)
      })
   })
})

const indicators = JSON.parse(`{
    "i1": {
       "name": "Preço de bovinos comprados, kg PV",
       "description": "Preço médio do peso vivo de bovinos comprados.",
       "unit": "R$/kgPV",
       "group": "Compras",
       "terms": {
          "N1": {
             "method": "Output",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "Output",
             "property": "PESO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i2": {
       "name": "Preço de bovinos vendidos, kg PV",
       "description": "Preço médio do peso vivo de bovinos vendidos.",
       "unit": "R$/kgPV",
       "group": "Compras",
       "terms": {
          "N1": {
             "method": "Input",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "Input",
             "property": "PESO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i3": {
       "name": "Custo total",
       "description": "Custo total.",
       "unit": "R$",
       "group": "Econômicos",
       "terms": {
          "N1": {
             "method": "Output",
             "property": "PRECO",
             "stages": [
                "terminal"
             ]
          }
       }
    },
    "i4": {
       "name": "Receita total",
       "description": "Receita total.",
       "unit": "R$",
       "group": "Econômicos",
       "terms": {
          "N1": {
             "method": "Input",
             "property": "PRECO",
             "stages": [
                "terminal"
             ]
          }
       }
    },
    "i5": {
       "name": "Rebanho, cab",
       "description": "Rebanho bovino total em cabeças.",
       "unit": "cab",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i6": {
       "name": "Rebanho, kg PV",
       "description": "Rebanho bovino total em kg de peso vivo.",
       "unit": "kgPV",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "property": "PESO",
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i7": {
       "name": "Nulíparas",
       "description": "Qtde de Nulíparas, média no ano.",
       "unit": "cab",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "categories": [
                "NULIPARAS"
             ]
          }
       }
    },
    "i8": {
       "name": "Primíparas",
       "description": "Qtde de Primíparas, média no ano.",
       "unit": "cab",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "categories": [
                "PRIMIPARAS"
             ]
          }
       }
    },
    "i9": {
       "name": "Multíparas",
       "description": "Qtde de Multíparas, média no ano.",
       "unit": "cab",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "categories": [
                "MULTIPARAS"
             ]
          }
       }
    },
    "i10": {
       "name": "Matrizes",
       "description": "Qtde de Matrizes, média no ano.",
       "unit": "cab",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "categories": [
                "NULIPARAS",
                "PRIMIPARAS",
                "MULTIPARAS"
             ]
          }
       }
    },
    "i11": {
       "name": "Desfrute",
       "description": "Qtde de animais vendidos no ano subtraída dos animais comprados no ano dividido pelo rebanho médio, em cabeças.",
       "unit": "%cab",
       "group": "Produção",
       "terms": {
          "N1": {
             "method": "Output",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "N2": {
             "method": "Input",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i12": {
       "name": "Desfrute",
       "description": "Peso dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo rebanho médio, em kg.",
       "unit": "%kg",
       "group": "Produção",
       "terms": {
          "N1": {
             "method": "Output",
             "property": "PESO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "N2": {
             "method": "Input",
             "property": "PESO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "Stock",
             "property": "PESO",
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i13": {
       "name": "Desfrute",
       "description": "Valor dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo valor médio do rebanho.",
       "unit": "%kg",
       "group": "Produção",
       "terms": {
          "N1": {
             "method": "Output",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "N2": {
             "method": "Input",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "property": "PRECO",
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i14": {
       "name": "CO2eq",
       "description": "Emissões de gases de efeito estufa totais do 'berço ao portão'.",
       "unit": "kg CO2eq",
       "group": "Emissões",
       "terms": {
          "N1": {
             "method": "Output",
             "categories": [
                "GEE"
             ]
          },
          "N2": {
             "method": "Output",
             "property": "CO2EQ",
             "stages": [
                "terminal"
             ]
          }
       }
    },
    "i15": {
       "name": "Preço de bovinos comprados, @",
       "description": "Preço médio da arroba de bovinos comprados.",
       "unit": "R$/@",
       "group": "Compras",
       "terms": {
          "N1": {
             "method": "Output",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "Output",
             "property": "ARROBA",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i16": {
       "name": "Preço de bovinos vendidos, @",
       "description": "Preço médio da arroba de bovinos vendidos.",
       "unit": "R$/@",
       "group": "Compras",
       "terms": {
          "N1": {
             "method": "Input",
             "property": "PRECO",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "Input",
             "property": "ARROBA",
             "stages": [
                "terminal"
             ],
             "categories": [
                "BOVINOS"
             ]
          }
       }
    },
    "i17": {
       "name": "Taxa de Lotação",
       "description": "Taxa de lotação em kg de peso vivo por ha.",
       "unit": "kgPV/ha",
       "group": "Rebanho",
       "terms": {
          "N1": {
             "method": "Stock",
             "property": "PESO",
             "categories": [
                "BOVINOS"
             ]
          },
          "D1": {
             "method": "AREA_PRODUCAO"
          }
       }
    }
 }`)