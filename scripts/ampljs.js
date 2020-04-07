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
        getGraph: () => {
            return {
            nodes : _nodes,
            flows : _flows,
            resources : _resources,
            parameters : _parameters
        }},
        loadModelJSONObject:(json) => {
            modelJSONObject = JSON.parse(json);
            modelJSONString = json;
        },
        loadParameters: () => {
            if(modelJSONObject != undefined){
                _parameters = {};

                const n = modelJSONObject['simulationData']['parameters']
                const systemParameters = modelJSONObject['simulationData']['systemParameters']
                const calculatedParameters = modelJSONObject['simulationData']['calculatedParameters']

                for(let k in n) _parameters[k] = new Parameter(k, getParameterCategory({name: k, min: systemParameters[k].min, max: systemParameters[k].max}, ['CONFINAMENTO', 'PERDAS_CRIA', 'AGUAS', 'INICIO_AGUAS']), systemParameters[k].std, systemParameters[k].min, systemParameters[k].max, n[k]);
                for(let k in calculatedParameters) _parameters[k] = new Parameter(k, 'calculated', 1, 1, 2, 1, calculatedParameters[k])
                
            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json).');
        },
        loadNodes: () => {
            if(modelJSONObject != undefined){
                _nodes = {};
                const n = modelJSONObject['simulationData']['graph']['nodes'];
                for(let k in n) {
                    let _ = removeUselessCharsInNodeName(k, 'node');
                    _nodes[_] = new Node(_, NodeTypes[n[k]['type']], n[k]['stages'], n[k]['duration'], n[k]['formula']);
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

                    _flows[_] = new Flow(FlowTypes[n[k]['type']], bottom, top , n[k]['factor'], n[k]['qty'], n[k]['day'], removeSpecialCharsFromResourceName(n[k]['resource']['name']), n[k]['formula']);
                }

            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
        },
        loadResources:()=>{
            if(modelJSONObject != undefined){
                const n = modelJSONObject['simulationData']['resources'];
                _resources = {};
            for(let k in n){
                const _ = removeSpecialCharsFromResourceName(k);
                _resources[_] = new Resource(_, n[k]['category'], n[k]['unit'])
            }

            }
            else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
        },
        printNodes: () => {
            if(_nodes != undefined) {
                let str = '';

                str += '\n\nset NODES := \n';

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
                str = replaceInvalidCharsWithSemicolon(str);
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
                str = replaceInvalidCharsWithSemicolon(str);
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
                str = replaceInvalidCharsWithSemicolon(str);
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
                str = replaceInvalidCharsWithSemicolon(str);
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
                str = replaceInvalidCharsWithSemicolon(str);
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printOptimized:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nset VARIABLES := \n';

                for(let k in _parameters) if(_parameters[k].category == 'optimized') str += `\t${k} \n`;
                str = replaceInvalidCharsWithSemicolon(str);
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printFixedValues:() => {
            if(_parameters != undefined) {
                let str = '';

                str += '\n\nparam Fixed := \n';

                for(let k in _parameters) str +=  _parameters[k].toStringByCat('fixed');
                str = replaceInvalidCharsWithSemicolon(str);
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
            return '';
        },
        printSigns: () => {
            if(_flows != undefined){
                let str = '';
                str += '\n\nparam Sign := \n';

                for(let f in _flows) str += _flows[f].toStringSign();

                str = replaceInvalidCharsWithSemicolon(str);

                return str;
            }
            else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

            return '';

        },
        printBalances:() => {
            if(_nodes != undefined){
                let str = '';
                str += '\n\nparam IsBalance default 0 \n';
                const strSize = str.length;

                for(let n in _nodes) str += _nodes[n].toStringType('balance');

                if(str.length > strSize)
                    str = str.insertAt(':=\n', strSize)

                str = replaceInvalidCharsWithSemicolon(str);

                return str;
            }
            else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

            return '';
        },
        printSums:() => {
            if(_nodes != undefined){
                let str = '';
                str += '\n\nparam IsSum default 0';
                const strSize = str.length;

                for(let n in _nodes) str += _nodes[n].toStringType('sum');

                if(str.length > strSize)
                    str = str.insertAt(':=\n', strSize)

                str = replaceInvalidCharsWithSemicolon(str);

                return str;
            }
            else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

            return '';
        },
        printStations:() => {
            if(_nodes != undefined){
                let str = '';
                str += '\n\nparam IsStation default 0 :=';
                const strSize = str.length;

                for(let n in _nodes) str += _nodes[n].toStringType('station');


                str = replaceInvalidCharsWithSemicolon(str);

                return str;
            }
            else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

            return '';
        },
        printRoot:() => {
            if(_nodes != undefined){
                let str = '';
                str += '\n\nparam IsRoot default 0 :=';

                for(let n in _nodes) str += _nodes[n].name === removeUselessCharsInNodeName(modelJSONObject['simulationData']['graph']['root']) ? 
                    `\n${_nodes[n]['name']}\t1;` 
                    : '';

                return str;
            }
            else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

            return '';
        },
        translate:(input, output)=>{
            //output.setValue(FIXED_MODEL_STRING);
        },
        printCalculatedParameters: () => {
            if(_parameters != undefined){
                let str = '';
                str += '\n\nmodel;\n';

                for(let n in _parameters) {
                    if(_parameters[n].category == 'calculated')
                        str += `\nsubject to ValCalculated${_parameters[n].name} { c in CALCULATED: c = '${_parameters[n].name}'}: val[c] = ${_parameters[n].toStringFormula(_parameters)};`;
                }
            
                str += '\n\ndata;\n'
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

            return '';
        },
        printMinMaxParameters: () => {
            if(_parameters != undefined){
                let str = '\n\nparam:\tMin,\tMax,\tStd :=\n';

                for(let n in _parameters) {
                    if(_parameters[n].category == 'optimized')
                        str += `\n${_parameters[n].name}\t${_parameters[n].min}\t${_parameters[n].max}\t${_parameters[n].val},`;
                }
                str = replaceInvalidCharsWithSemicolon(str);
                return str;
            }
            else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

            return '';
        }
        
    };
})();

class Node{
    /*String */ uid
    /*String */ name
    /*String */ type
    /*String */ stage
    /*String */ duration   //Fórmula de duration
    /**String */formula
    constructor(name, type, stage, duration, formula){
        this.name = name;
        this.type = type;
        this.stage = stage;
        this.duration = duration;
        this.formula = formula;
    }
 
    toStringDuration(platform){}
    toString(platform){}
    toStringType = (type) => type == this.type ? `\n${this.name}\t1,` : ''
    toStringFormulaWithResults = (_params) => this.formula.replace(/[A-Za-z_]{3,20}/g, (name) => {
        const param = _params[name]

        if(param != undefined)
            return param.toStringNameOrValue()          //Os parametros podem aparecer repetidos em uma fórmula?
        

        return name;
    })
}

class Flow{
    /*String*/uid
    /*String*/type
    /*Node*/top
    /*Node*/bottom
    /*String*/factor
    /*String*/qty    //Inclui inicialmente só para caso de armazenarmos algum valor 'standard' da variável
    /*String*/day      //Mesmo caso descrito acima
    /**String */formula
    /*Resource*/ resource
 
    constructor(type, bottom, top, factor, qty, day, resource, formula){
        this.type = type;
        this.top = top;
        this.bottom = bottom;
        this.factor = factor;
        this.qty = qty;
        this.day = day;
        this.resource = resource;
        this.formula = formula;
    }
 
    toStringFactor(platform){}    //Fórmulas para a plataforma especificada
    toString(platform){}             //top.name   bottom.name
    toStringSign = () => `\t${this.bottom.name} ${this.top.name}, ${this.type == 'PROD' ? -1 : 1},\n`     //1 se type = treatment, -1 de type = production
    toStringFormulaWithResults = (_params) => this.formula.replace(/[A-Za-z_]{3,20}/g, (name) => {
        const param = _params[name]

        if(param != undefined)
            return param.toStringNameOrValue()
        

        return name;
    })   
    
}

class Parameter{
    /*String*/ uid
    /*String*/ name
    /*String*/ category    /*FIXED, CALCULATED, OPTIMIZED */
    /*String*/val
    /*String*/ std
    /*String*/ min
    /*String*/ max
    /*String */formula
 
    constructor(name, category, std, min, max, val, formula){
        this.name = name;
        this.category = max == min ?  'fixed' : category;
        this.std = std;
        this.min = min;
        this.max = max;
        this.val = val;
        this.formula = formula;
    }
    toString(platform){}
    isCategory(category){}
    toStringByCat = (category) => this.category == category ? `\n\t${this.name}\t${this.val},` : ``
    toStringNameOrValue = () => {
        if (this.category == 'fixed') return `${this.val}`  
        if (this.category == 'calculated') return this.toStringFormula()
        return `val['${this.name}']`
    }
    toStringFormula = (_params) => this.category == 'calculated' ? this.formula.replace(/[A-Za-z_]{3,20}/g, (name) => {
        _params = _params || AMPLJS.getGraph().parameters
        const param = _params[name]

        if(param != undefined)
            return param.toStringNameOrValue()

        return name;
    }) : ''
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
    'est_reuso': 'balance',
    'est_producao': 'station',               //Ainda está faltando tipos?
    'est_tratamento': 'station',
    'soma_tratamento': 'sum',
    'soma_producao': 'sum'
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

function removeSpecialCharsFromResourceName(str){
    var map = {
        '_' : ' ',
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    //str = str.toLowerCase();
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
};

function getParameterCategory(p, optimizedParameters){
    if(p.min == p.max) return 'fixed'

    if(optimizedParameters.includes(p.name)) return 'optimized'

    return 'fixed'
}

const  replaceInvalidCharsWithSemicolon = (str) => {
    let c = str.slice(-1);
    const invalidChars = ['', ' ', ',', '\n']

    while(isInvalidChar(c, invalidChars)) {
        str = str.substring(0, str.length - 1)
        c = str.slice(-1);
    }
    return str + ';';
}

const isInvalidChar = (char = '', invalidChars = []) => invalidChars.includes(char)
    



String.prototype.insertAt = function(element, position){ 
    return this.replace(new RegExp(`(?<=^.{${position}})`), element);
}