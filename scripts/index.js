const App = new Vue({
    el: '#ampljs-app',
    data: {
        jsonCode: '{"json": "code"}',
        amplCode: 'ampl code',
        message:'Uma mensagem',
        alignment: 'stretch'
    },
    methods:{
        translate: _translate
    }
})

const InputTextArea = CodeMirror.fromTextArea(document.getElementById('input-textarea'),{lineNumbers: true, mode: 'javascript'});
const OutputTextArea = CodeMirror.fromTextArea(document.getElementById('output-textarea'), {lineNumbers: true});

function _translate(){
    console.log('translating');
    jsonCode = removeComments(InputTextArea.getValue(separator = ' ').trim());
    let amplCode = '';
    if(AMPLJS.isJSON(jsonCode)){
        AMPLJS.loadModelJSONObject(jsonCode);
        AMPLJS.loadNodes();
        AMPLJS.loadFlows();
        AMPLJS.loadResources();
        AMPLJS.loadParameters();
        amplCode = FIXED_MODEL_STRING;
        amplCode += AMPLJS.printFactorsSubject();
        amplCode += AMPLJS.printDurationsSubject();
        amplCode += AMPLJS.printCalculatedParameters();
        amplCode += `\n\ndata;`;
        amplCode += AMPLJS.printNodes();
        amplCode += AMPLJS.printFlows();
        amplCode += AMPLJS.printResources();
        amplCode += AMPLJS.printParameters();
        amplCode += AMPLJS.printFixed();
        amplCode += AMPLJS.printCalculated();
        amplCode += AMPLJS.printOptimized();
        amplCode += AMPLJS.printFixedValues();
        amplCode += AMPLJS.printFlowsResource();
        amplCode += AMPLJS.printSigns();
        amplCode += AMPLJS.printBalances();
        amplCode += AMPLJS.printRoot();
        amplCode += AMPLJS.printStations();
        amplCode += AMPLJS.printSums();
        amplCode += AMPLJS.printMinMaxParameters();
        OutputTextArea.setValue(amplCode);

        Validator.checkNodes(JSON.parse(jsonCode)['simulationData'], amplCode)
        Validator.checkFlows(JSON.parse(jsonCode)['simulationData'], amplCode)
    }
}