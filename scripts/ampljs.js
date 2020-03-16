const AMPLJS = (function(){
    var modelJSONString;
    var modelJSONObject;
    var userJSONString;
    var userJSONObject;
    var _parameters;
    var _nodes;
    var _flows;
    var _resources;
    return {
        isJSON: (str) => {
            try {
                return !!(JSON.parse(str) && !!str);
            } catch (e) {
                return false;
            }
        },
        loadModelJSONObject:(json) => {
            modelJSONObject = JSON.parse(json);
            modelJSONString = json;
        },
        loadParameters: () => {
            if(modelJSONObject != undefined){
                _parameters = {};

                const n = modelJSONObject['simulationData']['parameters']

                for(let k in n) _parameters[k] = new Parameter(k, getParameterCategory(k), n[k], 0, n[k] * 2);
                    
                
            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json).');
        },
        loadNodes: () => {
            if(modelJSONObject != undefined){
                _nodes = {};
                const n = modelJSONObject['simulationData']['graph']['nodes'];
                for(let k in n) {
                    let _ = removeUselessCharsInNodeName(k, 'node');
                    _nodes[_] = new Node(_, NodeTypes[n[k]['type']], n[k]['stages'], n[k]['duration']);
                }

            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
        },
        loadFlows:() => {
            if(modelJSONObject != undefined){
                _flows = {};
                const n = modelJSONObject['simulationData']['graph']['flows'];
                for(let k in n) {
                    let _  = removeUselessCharsInNodeName(k, 'flow');
                    const {bottom, top} = getTopAndBottomNodesOfFlow(_, _nodes);

                    _flows[_] = new Flow('', bottom, top , '', '', '', removeSpacesFromResourceName(n[k]['resource']['name']));
                }

            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
        },
        loadResources:()=>{
            if(modelJSONObject != undefined){
                const n = modelJSONObject['simulationData']['resources'];
                _resources = {};
            for(let k in n){
                const _ = removeSpacesFromResourceName(k);
                _resources[_] = new Resource(_, n[k]['category'], n[k]['unit'])
            }

            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
        },
        printNodes: () => {
            if(_nodes != undefined) {
                let str = '';

                str += 'set NODES := \n';

                for(let k in _nodes) str += `${k} `;

                str += ';';
                return str;
            }
            else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');
            return '';
        },
        printFlowsResource:() => {
            if(_flows != undefined) {
                let str = '';

                str += '\n\nparam Resource := \n';

                for(let k in _flows) str += `\t${_flows[k].bottom.name} ${_flows[k].top.name}, ${_flows[k].resource},\n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');
            return '';
        },
        printFlows:() => {
            if(_flows != undefined) {
                let str = '';

                str += '\n\nset FLOWS := \n';

                for(let k in _flows) str += `\t(${_flows[k].bottom.name}, ${_flows[k].top.name} ),\n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');
            return '';
        },
        printSigns:() => {
            if(_flows != undefined) {
                let str = '';

                str += '\n\nparam Sign := \n';

                for(let k in _flows) str += `\t${_flows[k].bottom.name} ${_flows[k].top.name}, ,\n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');
            return '';
        },
        printResources:() => {
            if(_resources != undefined) {
                let str = '';

                str += '\n\nset RESOURCES := \n';

                for(let k in _resources) str += `\t${k} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Resources com AMPLJS.loadResources()');
            return '';
        },
        printParameters: () => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nset PARAMETERS := \n';

                for(let k in _parameters) str += `\t${k} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printFixed:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nset FIXED := \n';

                for(let k in _parameters) if(_parameters[k].category == 'fixed') str += `\t${k} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printCalculated:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nset CALCULATED := \n';

                for(let k in _parameters) if(_parameters[k].category == 'calculated') str += `\t${k} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printOptimized:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nset OPTIMIZED := \n';

                for(let k in _parameters) if(_parameters[k].category == 'optimized') str += `\t${k} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printFixedValues:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nparam Fixed := \n';

                for(let k in _parameters) if(_parameters[k].category == 'fixed') str += `\t${k}\t${_parameters[k]['std']} \n`;
                str = str.substring(0, str.length - 2) + ';\n';
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        translate:(input, output)=>{
            //output.setValue(FIXED_MODEL_STRING);
        },
        
    };
})();

class Node{
    /*String */ uid
    /*String */ name
    /*String */ type
    /*String */ stage
    /*String */ duration   //Fórmula de duration
    constructor(name, type, stage, duration){
        this.name = name;
        this.type = type;
        this.stage = stage;
        this.duration = duration;
    }
 
    toStringDuration(platform){}
    toString(platform){}
}

class Flow{
    /*String*/uid
    /*String*/type
    /*Node*/top
    /*Node*/bottom
    /*String*/factor
    /*String*/qty    //Inclui inicialmente só para caso de armazenarmos algum valor 'standard' da variável
    /*String*/day      //Mesmo caso descrito acima
    /*Resource*/ resource
 
    constructor(type, bottom, top, factor, qty, day, resource){
        this.type = type;
        this.top = top;
        this.bottom = bottom;
        this.factor = factor;
        this.qty = qty;
        this.day = day;
        this.resource = resource
    }
 
    toStringFactor(platform){}    //Fórmulas para a plataforma especificada
    toString(platform){}             //top.name   bottom.name
    sign(){}     //1 se type = treatment, -1 de type = production
}

class Parameter{
    /*String*/ uid
    /*String*/ name
    /*String*/ category    /*FIXED, CALCULATED, OPTIMIZED */
    /*String*/ std
    /*String*/ min
    /*String*/ max
 
    constructor(name, category, std, min, max){
        this.name = name;
        this.category = category;
        this.std = std;
        this.min = min;
        this.max = max;
    }
    toString(platform){}
    isCategory(category){}
}

class Indicator{
    /*String*/ uid
    /*String*/ name
    /*String*/ formula
    /*String*/ objective   /*{max, min} */
    /**Array<String> */ terms
 
    toString(platform){}
}

class Resource{
    /*String*/uid
    /*String*/name
    /*Array<String>*/ categories
    /**String */ unit
    constructor(name, categories, unit){
        this.name = name;
        this.categories = categories;
        this.unit = unit;
    }
}


const a = {
    "notFixed": [
        "PESO_cerquilha_MULTIPARAS",
        "PRECO_PESO_cerquilha_BOVINOS"
    ],
    "indicator": {
        "name": 'CO2EQ',
        "objective": 'minimize'
    }
}

const NodeTypes = {
    'terminal_saida_producao': 'terminal',
    'terminal_saida_tratamento': 'terminal',
    'terminal_entrada_producao': 'terminal',
    'est_reuso': 'station',
    'est_producao': 'station'               //Estão faltando tipos no json.
}

const FlowTypes = {
    'Produção': 'PROD',
    'Tratamento': 'TREAT'
};

function removeUselessCharsInNodeName(nodeName, type){
    if(!(typeof nodeName == 'string')) return console.error('Nome do nó não encontrado.');
    if(type === 'flow'){
        nodesName = nodeName.split('-');    //Alguns nodes possuem - no nome.
        if(nodesName.length > 2){
            for(let i in nodesName){
                if (!(nodesName[i].includes('_'))){
                    nodesName[i-1] = nodesName[i-1] + nodesName[i];
                    nodesName[i] = '';
                }
            }
        }
        nodesName = nodesName.filter((n) => n.length > 0);
        nodesName[0] = nodesName[0].substring(0, nodesName[0].lastIndexOf('_'));
        nodesName[1] = nodesName[1].substring(0, nodesName[1].lastIndexOf('_'));
        return nodesName.join('-');
    }
    
    return nodeName.substring(0, nodeName.lastIndexOf('_'));
         
}

function getTopAndBottomNodesOfFlow(flowString, _nodes){
    const _names = flowString.split('-');
    const bottom = _nodes[_names[0]];
    const top = _nodes[_names[1]];

    return {
        bottom, top
    };
}

function removeSpacesFromResourceName(resourceName){
    return resourceName.replace(/ /g, '_');
};

function getParameterCategory(parameterName){
    switch(parameterName){
        case 'PESO_cerquilha_AREA':
            return 'calculated';
            break;
        case 'PRECO_cerquilha_AREA':
        case 'PRECO_cerquilha_PRIMIPARAS_PARIDAS':
        case 'PRECO_cerquilha_NULIPARAS':
                return 'optimized';
            break;
        default:
            return 'fixed';
    }
}