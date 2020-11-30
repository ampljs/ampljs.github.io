import { expect } from "chai";
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from "vuetify"
import Vue from "vue"
//import { functions } from "../../src/plugins/ampljs/ampl";
import SelectParameter from "../../src/components/ParametroUnico"


Vue.use(Vuetify)

describe('show all available parameters in dialog', function () {
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
    context('dont has parameters in list', () => {
        it('should be empty', async () => {
            component = mount(SelectParameter, {
                localVue, vuetify, propsData: {
                    params: []
                }
            })

            await component.find('div.v-select__slot').trigger('click')
            await component.vm.$nextTick();


            expect(component.find('div.v-list-item__title').text()).to.equal('Sem parâmetros para selecionar')
        })
    })

    context('has only fixed parameters', () => {
        it('should be empty', async () => {
            component = mount(SelectParameter, {
                localVue, vuetify, propsData: {
                    params: Object.entries(parameters["systemParameters"])
                        .map((e) => ({
                            name: e[0],
                            ...e[1],
                            disabled: true//e[1].min === e[1].max,
                        }))
                        .filter((e) => !e.disabled)
                }
            })

            component.find('div.v-select__slot').trigger('click')
            await component.vm.$nextTick();

            expect(component.find('div.v-list-item__title').text()).to.equal('Sem parâmetros para selecionar')
        })
    })

    context('has fixed and optimized parameters', function () {
        it(`should show only optimized parameters`, async function () {
            component = mount(SelectParameter, {
                localVue, vuetify, propsData: {
                    params: Object.entries(parameters["systemParameters"])
                        .map((e) => ({
                            name: e[0],
                            ...e[1],
                            disabled: e[1].min === e[1].max,
                        }))
                        .filter((e) => !e.disabled)
                }
            })

            component.find('div.v-select__slot').trigger('click')
            await component.vm.$nextTick();

            expect(component.findAll('div.v-list-item').length).to.equal(Object.entries(parameters["systemParameters"])
                .map((e) => ({
                    name: e[0],
                    ...e[1],
                    disabled: e[1].min === e[1].max,
                }))
                .filter((e) => !e.disabled).length)
        })
    })

    context('select couple parameters on list', function () {
        it(`should show all selected parameters`, async function () {
            component = mount(SelectParameter, {
                localVue, vuetify, propsData: {
                    params: Object.entries(parameters["systemParameters"])
                        .map((e) => ({
                            name: e[0],
                            ...e[1],
                            disabled: e[1].min === e[1].max,
                        }))
                        .filter((e) => !e.disabled)
                }
            })

            component.find('div.v-select__slot').trigger('click')
            await component.vm.$nextTick()
            component.findAll('div.v-list-item').at(0).trigger('click')     //AGUAS
            component.findAll('div.v-list-item').at(3).trigger('click')     //DIAGNOSE
            component.findAll('div.v-list-item').at(5).trigger('click')     //NATALIDADE
            await component.vm.$nextTick()

            expect(component.findAll('span.v-chip__content').wrappers.map((e) => e.text())).to.be.an('array').to.have.members(['AGUAS', 'DIAGNOSE', 'NATALIDADE'])
        })
    })

    context('select couple parameters on list and delete one after that', function () {
        it(`should show all selected parameters except the deleted one`, async function () {
            component = mount(SelectParameter, {
                localVue, vuetify, propsData: {
                    params: Object.entries(parameters["systemParameters"])
                        .map((e) => ({
                            name: e[0],
                            ...e[1],
                            disabled: e[1].min === e[1].max,
                        }))
                        .filter((e) => !e.disabled)
                }
            })

            component.find('div.v-select__slot').trigger('click')
            await component.vm.$nextTick()
            component.findAll('div.v-list-item').at(0).trigger('click')     //AGUAS
            component.findAll('div.v-list-item').at(3).trigger('click')     //DIAGNOSE
            component.findAll('div.v-list-item').at(5).trigger('click')     //NATALIDADE
            await component.vm.$nextTick()

            component.findAll('button.v-chip__close').at(1).trigger('click')    //REMOVE DIAGNOSE
            await component.vm.$nextTick()

            expect(component.findAll('span.v-chip__content').wrappers.map((e) => e.text())).to.be.an('array').to.have.members(['AGUAS', 'NATALIDADE'])
        })
    })
})

const parameters = {
    "parameters": {
        "AGUAS": 212,
        "CICLO": 365,
        "CONFINAMENTO": 110,
        "DIAGNOSE": 59,
        "INICIO_AGUAS": 90,
        "MONTA": 92,
        "NATALIDADE": 0.80,
        "PARTO_MACHO": 0.50,
        "PERDAS": 0.01,
        "PERDAS_CRIA": 0.03,
        "PRECO#BEZERRAS": 890.0,
        "PRECO#BEZERROS": 960.0,
        "PRECO#BOIS_GORDOS": 9100.0,
        "PRECO#MULTIPARAS": 5100.0,
        "PRECO#MULTIPARAS_GORDAS": 5100.0,
        "PRECO#MULTIPARAS_PARIDAS": 5900.0,
        "PRECO#NULIPARAS_GORDAS": 4100.0,
        "PRECO#PRIMIPARAS": 4400.0,
        "PRECO#PRIMIPARAS_GORDAS": 4400.0,
        "PRENHEZ": 0.90,
        "PRODUCAO": 438,
        "PUERPERIO": 30
    },
    "systemParameters": {
        "AGUAS": { "min": 200, "std": 212, "max": 220 }, /* Duração da estação das águas em dias */
        "CICLO": { "min": 365, "std": 365, "max": 365 }, /* Duração do ciclo anual, em dias */
        "CONFINAMENTO": { "min": 100, "std": 110, "max": 120 }, /* Duração do confinamento, em dias */
        "INICIO_AGUAS": { "min": 80, "std": 90, "max": 100 }, /* Dias desde o início do ciclo para o início da estação das águas, em dias */
        "DIAGNOSE": { "min": 30, "std": 60, "max": 90 }, /* Duração da diagnose de prenhez, em dias */
        "PARTO_MACHO": { "min": 0.5, "std": 0.5, "max": 0.5 }, /* Quantidade de machos por parto bem sucedido, em fração */
        "MONTA": { "min": 60, "std": 90, "max": 120 }, /* Duração da monta, em dias */
        "NATALIDADE": { "min": 0.50, "std": 0.80, "max": 1.00 }, /* Taxa de natalidade, em fração */
        "PERDAS": { "min": 0.01, "std": 0.03, "max": 0.05 }, /* Perdas de animais adultos, em fração de cabeças por ciclo anual */
        "PERDAS_CRIA": { "min": 0.03, "std": 0.05, "max": 0.10 }, /* Perdas de bezerros ou bezerras antes da desmama, em fração de cabeças por ciclo anual */
        "PRECO#BEZERRAS": { "min": 800.0, "std": 900.0, "max": 1000.0 }, /* Preço, em R$/cab */
        "PRECO#BEZERROS": { "min": 850.0, "std": 950.0, "max": 1100.0 }, /* Preço, em R$/cab */
        "PRECO#BOIS_GORDOS": { "min": 7000.0, "std": 9000.0, "max": 10000.0 }, /* Preço, em R$/cab */
        "PRECO#MULTIPARAS": { "min": 4000.0, "std": 5000.0, "max": 6000.0 }, /* Preço, em R$/cab */
        "PRECO#MULTIPARAS_GORDAS": { "min": 4000.0, "std": 5000.0, "max": 6000.0 }, /* Preço, em R$/cab */
        "PRECO#MULTIPARAS_PARIDAS": { "min": 5000.0, "std": 6000.0, "max": 7000.0 }, /* Preço, em R$/cab */
        "PRECO#NULIPARAS_GORDAS": { "min": 3000.0, "std": 4000.0, "max": 5000.0 }, /* Preço, em R$/cab */
        "PRECO#PRIMIPARAS": { "min": 3500.0, "std": 4500.0, "max": 5500.0 }, /* Preço, em R$/cab */
        "PRECO#PRIMIPARAS_GORDAS": { "min": 3500.0, "std": 4500.0, "max": 5500.0 }, /* Preço, em R$/cab */
        "PRENHEZ": { "min": 0.50, "std": 0.80, "max": 1.00 }, /* Taxa de prenhez, em fração */
        "PRODUCAO": { "min": 300, "std": 400, "max": 500 }, /* Produção principal, em cabeças */
        "PUERPERIO": { "min": 25, "std": 30, "max": 40 } /* Duração do puerpério, em dias */
    }
}