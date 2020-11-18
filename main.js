//const { default: Vuetify } = require("vuetify/lib");

const App = new Vue({
    el: '#ampljs-app',
    data: {
        jsonCode: '{"json": "code"}',
        alignment: 'stretch',
        end: 'end',
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
    },
    methods:{
        translate: _translate,
        show: _showForm
    },
    vuetify: new Vuetify()
})

const InputTextArea = CodeMirror.fromTextArea(document.getElementById('input-textarea'),{lineNumbers: true, mode: 'javascript'});
const InputJsonUsuario = CodeMirror.fromTextArea(document.getElementById('input-json-usuario'),{lineNumbers: true, mode: 'javascript'});
const InputJsonIndicatores = CodeMirror.fromTextArea(document.getElementById('input-json-indicadores'),{lineNumbers: true, mode: 'javascript'});
const OutputTextArea = CodeMirror.fromTextArea(document.getElementById('output-textarea'), {lineNumbers: true});

InputJsonIndicatores.setValue(JSON.stringify(Indicators, null, 2))

InputJsonUsuario.setValue(JSON.stringify({
    indicator: {
        name: 'i13',
        objective: 'maximize'
    },
    parameters: [
        {name: 'PESO_cerquilha_MULTIPARAS'},
        {name: 'PRECO_PESO_cerquilha_BOVINOS'}
    ]
}, null, 2),)

var jsonUser;
let jsonIndicators;

function _showForm(){}

function _translate(){
    jsonCode = removeComments(InputTextArea.getValue(separator = ' ').trim());
    jsonUser = InputJsonUsuario.getValue(separator = ' ')
    jsonIndicators = InputJsonIndicatores.getValue(separator = ' ')
    let amplCode = '';
    if(AMPLJS.isJSON(jsonCode)){
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