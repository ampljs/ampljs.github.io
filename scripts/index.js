//const { default: Vuetify } = require("vuetify/lib");


const App = new Vue({
    el: '#ampljs-app',
    data: {
        totalParam: 1,
        selecionado: 0,
        params: [
            //todos os parametros
            {
                name: "Parâmetro 1", refInd: [
                    { idInd: 1, default: "y" },
                    { idInd: 2, default: "y" }
                ]
            },
            {
                name: "Parâmetro 2", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 3", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 3, default: "y" }
                ]
            },
            {
                name: "Parâmetro 4", refInd: [
                    { idInd: 2, default: "n" },
                    { idInd: 3, default: "n" }
                ]
            },
            {
                name: "Parâmetro 5", refInd: [
                    { idInd: 2, default: "n" },
                    { idInd: 3, default: "n" }
                ]
            },
            {
                name: "Parâmetro 6", refInd: [
                    { idInd: 3, default: "n" },
                    { idInd: 4, default: "n" }
                ]
            },
            {
                name: "Parâmetro 7", refInd: [
                    { idInd: 4, default: "n" },
                    { idInd: 5, default: "n" }
                ]
            },
            {
                name: "Parâmetro 8", refInd: [
                    { idInd: 5, default: "y" },
                    { idInd: 6, default: "y" }
                ]
            },
            {
                name: "Parâmetro 9", refInd: [
                    { idInd: 4, default: "y" },
                    { idInd: 5, default: "y" }
                ]
            },
            {
                name: "Parâmetro 10", refInd: [
                    { idInd: 5, default: "y" },
                    { idInd: 6, default: "y" }
                ]
            },
            {
                name: "Parâmetro 11", refInd: [
                    { idInd: 4, default: "y" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 12", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 13", refInd: [
                    { idInd: 1, default: "y" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 14", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 15", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "y" }
                ]
            },
            {
                name: "Parâmetro 16", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "n" }
                ]
            },
            {
                name: "Parâmetro 16", refInd: [
                    { idInd: 1, default: "n" },
                    { idInd: 2, default: "n" }
                ]
            }
        ],
        //lista de indicadores
        indicadores: [
            // todos os indicadores
            { name: "Indicador 1", id: 1 },
            { name: "Indicador 2", id: 2 },
            { name: "Indicador 3", id: 3 },
            { name: "Indicador 4", id: 4 },
            { name: "Indicador 5", id: 5 },
            { name: "Indicador 6", id: 6 },
            { name: "Indicador 7", id: 7 },
            { name: "Indicador 8", id: 8 }
        ],
        jsonCode: '{"json": "code"}',
        alignment: 'stretch',
        end: 'end',
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        isSelected: null,
        autoUpdate: true,
        switch1: true,
        nomeSimulacao: 'Simulação 1',
        pSelected: [], //lista de parametros selecionados
        pauxSelected: [], //lista de parametros selecionados
        paramsInd: [], //lista de parametros relacionados à um indicador
    },
    watch: {
        selecionado: function () {
            this.getOptions();
        },
        switch1(newValue) {
            //called whenever switch1 changes
            //console.log(this.pauxSelected);
            if (newValue) {
                //console.log("voltando tudo");
                this.getOptions();
            } else {
                //console.log("zerando tudo");
                this.pSelected = [];
            }
            console.log(newValue);
        }
    },
    methods: {
        translate: _translate,
        show: _showForm,
        indicadorMudou() {
            this.$emit('indicador-mudou', this.selecionado)
        },
        remove(item) {
            const index = this.pSelected.indexOf(item.name);
            if (index >= 0) this.pSelected.splice(index, 1);
          },
          removeAll() {
            //const index = this.pSelected.indexOf(item.name)
            this.pSelected.splice();
          },
          limiter(e) {
            if (e.length > this.totalParam) {
              //melhorar mensagem de erro
              this.dialog = true;
              e.pop();
            }
          },
          getOptions() {
            const dept = this.selecionado;
            if (dept != 0) {
              this.isSelected = !this.isEditing;
            }
            
            this.pSelected = [];
            this.paramsInd = [];
      
            for (var i = 0; i < this.params.length; i++) { //verificando todos os parametros
              for(var j = 0; j< this.params[i].refInd.length; j++){//verificando a lista de indicadores daquele parametro
                  if (this.params[i].refInd[j].idInd == dept) { //caso o idInd seja igual ao id do indicador selecionado
                    this.paramsInd.push(this.params[i]); //adiciona o parametro a lista de parametros a serem mostrados
                    if (this.params[i].refInd[j].default == "y" && this.switch1) { //caso seja um parametro default
                      this.pSelected.push(this.params[i]); //adiciona a lista de selecionados
                    }
                  }
              } 
              
            }
          }
    },
    vuetify: new Vuetify(),
    components: {
        //Indicador: Indicador()
    }
})

const InputTextArea = CodeMirror.fromTextArea(document.getElementById('input-textarea'), { lineNumbers: true, mode: 'javascript' });
const InputJsonUsuario = CodeMirror.fromTextArea(document.getElementById('input-json-usuario'), { lineNumbers: true, mode: 'javascript' });
const InputJsonIndicatores = CodeMirror.fromTextArea(document.getElementById('input-json-indicadores'), { lineNumbers: true, mode: 'javascript' });
const OutputTextArea = CodeMirror.fromTextArea(document.getElementById('output-textarea'), { lineNumbers: true });

InputJsonIndicatores.setValue(JSON.stringify(Indicators, null, 2))

InputJsonUsuario.setValue(JSON.stringify({
    indicator: {
        name: 'i13',
        objective: 'maximize'
    },
    parameters: [
        { name: 'PESO_cerquilha_MULTIPARAS' },
        { name: 'PRECO_PESO_cerquilha_BOVINOS' }
    ]
}, null, 2))

var jsonUser;
let jsonIndicators;

function _showForm() { }

function _translate() {
    jsonCode = removeComments(InputTextArea.getValue(separator = ' ').trim());
    jsonUser = InputJsonUsuario.getValue(separator = ' ')
    jsonIndicators = InputJsonIndicatores.getValue(separator = ' ')
    let amplCode = '';
    if (AMPLJS.isJSON(jsonCode)) {
        AMPLJS.loadModelJSONObject(jsonCode);
        AMPLJS.loadUserJsonObject(jsonUser);
        AMPLJS.loadNodes();
        AMPLJS.loadFlows();
        AMPLJS.loadResources();
        AMPLJS.loadParameters();
        AMPLJS.loadIndicator();
        amplCode = FIXED_MODEL_STRING;
        //amplCode += AMPLJS.printOptimizedParameters();
        //amplCode += AMPLJS.printCalculatedParameters();
        amplCode += AMPLJS.printFactorsSubject();
        amplCode += AMPLJS.printDurationsSubject();
        amplCode += `\n\ndata;`;
        amplCode += AMPLJS.printNodes();
        amplCode += AMPLJS.printBalances();
        amplCode += AMPLJS.printRoot();
        //amplCode += AMPLJS.printStations();
        amplCode += AMPLJS.printSums();
        amplCode += AMPLJS.printFlows();
        //amplCode += AMPLJS.printResources();
        //amplCode += AMPLJS.printFixed();
        //amplCode += AMPLJS.printFixedValues();
        amplCode += AMPLJS.printSigns();
        amplCode += AMPLJS.printParameters();
        //amplCode += AMPLJS.printProperties();
        //amplCode += AMPLJS.printCalculated();
        //amplCode += AMPLJS.printOptimized();
        //amplCode += AMPLJS.printFixedValues();
        //amplCode += AMPLJS.printFlowsResource();

        amplCode += AMPLJS.printStdParameters();
        amplCode += AMPLJS.printMinMaxParameters();
        amplCode += AMPLJS.printTermMethod();
        amplCode += AMPLJS.printFlowProperties();
        amplCode += AMPLJS.printTermNodes();
        OutputTextArea.setValue(amplCode);

        Validator.checkNodes(JSON.parse(jsonCode)['simulationData'], amplCode)
        Validator.checkFlows(JSON.parse(jsonCode)['simulationData'], amplCode)
    }
}