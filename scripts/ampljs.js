const AMPLJS = (function () {
  var modelJSONString;
  var modelJSONObject;
  var userJSONString;
  var userJSONObject;
  var _parameters;
  var _nodes;
  var _flows;
  var _resources;
  var _indicator;
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
        nodes: _nodes,
        flows: _flows,
        resources: _resources,
        parameters: _parameters,
        indicator: _indicator,
        json: modelJSONObject
      }
    },
    loadModelJSONObject: (json) => {
      modelJSONObject = JSON.parse(json);
      modelJSONString = json;
    },
    loadUserJsonObject: (json) => {
      userJSONObject = JSON.parse(json);
      userJSONString = json;
    },
    loadParameters: () => {
      if (modelJSONObject != undefined) {
        _parameters = {};

        const n = modelJSONObject['simulationData']['parameters']
        const systemParameters = modelJSONObject['simulationData']['systemParameters']
        const calculatedParameters = modelJSONObject['simulationData']['calculatedParameters']

        for (let k in n) _parameters[k] = new Parameter(k, getParameterCategory({ name: k, min: systemParameters[k].min, max: systemParameters[k].max }, ['CONFINAMENTO', 'PERDAS_CRIA', 'AGUAS', 'INICIO_AGUAS']), systemParameters[k].std, systemParameters[k].min, systemParameters[k].max, n[k]);
        for (let k in calculatedParameters) _parameters[k] = new Parameter(k, 'calculated', 1, 1, 2, 1, calculatedParameters[k])

      }
      else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json).');
    },
    loadNodes: () => {
      if (modelJSONObject != undefined) {
        _nodes = {};
        const n = modelJSONObject['simulationData']['graph']['nodes'];
        for (let k in n) {
          let _ = removeUselessCharsInNodeName(k, 'node');
          _nodes[_] = new Node(_, NodeTypes[n[k]['type']], n[k]['stages'][0], n[k]['duration'], n[k]['formula'], n[k]['flows'].map((f) => removeUselessCharsInNodeName(f, 'flow')));
        }

      }
      else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
    },
    loadFlows: () => {
      if (modelJSONObject != undefined) {
        _flows = {};
        const n = modelJSONObject['simulationData']['graph']['flows'];
        for (let k in n) {
          let _ = removeUselessCharsInNodeName(k, 'flow');
          const { bottom, top } = getTopAndBottomNodesOfFlow(_, _nodes);

          _flows[_] = new Flow(FlowTypes[n[k]['type']], bottom, top, n[k]['factor'], n[k]['qty'], n[k]['day'], new Resource(removeSpecialCharsFromResourceName(n[k]['resource']['name']), n[k]['resource']['category'], n[k]['resource']['unit']), n[k]['formula']);
        }

      }
      else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
    },
    loadResources: () => {
      if (modelJSONObject != undefined) {
        const n = modelJSONObject['simulationData']['resources'];
        _resources = {};
        for (let k in n) {
          const _ = removeSpecialCharsFromResourceName(k);
          _resources[_] = new Resource(_, n[k]['category'], n[k]['unit'])
        }

      }
      else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
    },
    loadIndicator: () => {
      if (modelJSONObject != undefined && Indicators != undefined) {
        var selectedIndicator = Indicators[userJSONObject['indicator']['name']]
        if (selectedIndicator != undefined) {
          _indicator = new Indicator(selectedIndicator.name, userJSONObject['indicator']['objective'], selectedIndicator['terms'])
        }
        else console.error('O indicador selecionado não foi encontrado na base de indicadores, verifique o nome do indicador ou atualize a base do AMPLJS.')

      }
      else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
    },
    printNodes: () => {
      if (_nodes != undefined) {
        let str = '';

        str += '\n\nset NODES :=';

        for (let k in _nodes)
          str += `\n\t${k}`


        str += ';';
        return str;
      }
      else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');
      return '';
    },
    printFlowsResource: () => {
      if (_flows != undefined) {
        let str = '';

        str += '\n\nparam Resource :=';

        for (let k in _flows) str += `\n\t${_flows[k].toStringName(' ')}, ${_flows[k].resource},`;
        str = str.substring(0, str.length - 2) + ';\n';
        return str;
      }
      else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');
      return '';
    },
    printFlows: () => {
      if (_flows != undefined) {
        let str = '';

        str += '\n\nset FLOWS :=';

        for (let k in _flows) str += `\n\t(${_flows[k].toStringName(', ')}),`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');
      return '';
    },
    printResources: () => {
      if (_resources != undefined) {
        let str = '';

        str += '\n\nset RESOURCES := \n';

        for (let k in _resources) str += `\t${k} \n`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Resources com AMPLJS.loadResources()');
      return '';
    },
    printOptimizedParameters: () => {
      if (_parameters != undefined) {
        let str = '';

        for (let k in _parameters) str += _parameters[k].category == 'optimized' ? `\nvar ${k}${_parameters[k].category == 'optimized' ? ' >= ' + _parameters[k].min + ' <= ' + _parameters[k].max : ''};` : '';
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printFixed: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nset FIXED := \n';

        for (let k in _parameters) if (_parameters[k].category == 'fixed') str += `\t${_parameters[k].toStringName()} \n`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printCalculated: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nset CALCULATED := \n';

        for (let k in _parameters) if (_parameters[k].category == 'calculated') str += `\t${k} \n`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printOptimized: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nset VARIABLES :=';

        for (let k in _parameters) if (_parameters[k].category == 'optimized') str += `\n\t${k}`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printFixedValues: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nparam Fixed :=';

        for (let k in _parameters) str += _parameters[k].toStringByCat('fixed');
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printProperties: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nset PROPERTIES :=';

        for (let k in _parameters) str += `\n\t${_parameters[k].toStringName()}`;
        str += `\n\t_1`
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printParameters: () => {
      if (_parameters != undefined) {
        let str = '';

        str += '\n\nset PARAMETERS :=';

        for (let k in _parameters) str += `\n\t${_parameters[k].toStringName()}`;
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');
      return '';
    },
    printSigns: () => {
      if (_flows != undefined) {
        let str = '';
        str += '\n\nparam Sign :=';

        for (let f in _flows) str += _flows[f].type === 'PROD' ? _flows[f].toStringSign() : '';

        str = replaceInvalidCharsWithSemicolon(str);

        return str;
      }
      else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

      return '';

    },
    printBalances: () => {
      if (_nodes != undefined) {
        let str = '';

        for (let n in _nodes) str += _nodes[n].toStringType('balance');

        if (str.length > 0) str = '\n\nparam IsBalance :=' + str;


        str = replaceInvalidCharsWithSemicolon(str);

        return str;
      }
      else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

      return '';
    },
    printSums: () => {
      if (_nodes != undefined) {
        let str = '';

        for (let n in _nodes) str += _nodes[n].toStringType('sum');

        if (str.length > 0) str = '\n\nparam IsSum :=' + str;

        str = replaceInvalidCharsWithSemicolon(str);

        return str;
      }
      else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

      return '';
    },
    printStations: () => {
      if (_nodes != undefined) {
        let str = '';
        str += '\n\nparam IsStation :=';
        const strSize = str.length;

        for (let n in _nodes) str += _nodes[n].toStringType('station');


        str = replaceInvalidCharsWithSemicolon(str);

        return str;
      }
      else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

      return '';
    },
    printRoot: () => {
      if (_nodes != undefined) {
        let str = '';
        str += '\n\nparam IsRoot :=';

        for (let n in _nodes) str += _nodes[n].name === removeUselessCharsInNodeName(modelJSONObject['simulationData']['graph']['root']) ?
          `\n\t${_nodes[n]['name']}\t1;`
          : '';

        return str;
      }
      else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

      return '';
    },
    translate: (input, output) => {
      //output.setValue(FIXED_MODEL_STRING);
    },
    printCalculatedParameters: () => {
      if (_parameters != undefined) {
        let str = '';

        for (let n in _parameters) {
          if (_parameters[n].category == 'calculated')
            str += `\nsubject to ValCalculated_${_parameters[n].toStringName()}: ${_parameters[n].toStringName()} = ${_parameters[n].toStringFormula(_parameters)};`;
        }

        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

      return '';
    },
    printMinMaxParameters: () => {
      if (_parameters != undefined) {
        let str = '\n\nparam:\tMin\tMax :=';

        for (let n in _parameters) {
          if (_parameters[n].category == 'optimized')
            str += `\n\t${_parameters[n].toStringName()}\t${_parameters[n].min}\t${_parameters[n].max},`;
        }
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

      return '';
    },
    printStdParameters: () => {
      if (_parameters != undefined) {
        let str = '\n\nparam:\tStd :=';

        for (let n in _parameters) {
          if (_parameters[n].category == 'optimized' || _parameters[n].category === 'fixed')
            str += `\n\t${_parameters[n].toStringName()}\t${_parameters[n].val},`;
        }
        str = replaceInvalidCharsWithSemicolon(str);
        return str;
      }
      else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

      return '';
    },
    printFactorsSubject: () => {
      let str = '';
      if (_flows != undefined) {
        let i = 0;

        for (let f in _flows) str += `\n${_flows[f].bottom.type === 'balance' || _flows[f].bottom.type === 'sum' ? '#' : ''}subject to Factor${i++}: factor['${_flows[f].toStringName("', '")}'] = ${_flows[f].toStringFormulaWithResults()};`;


        return str;
      }
      else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

      return '';
    },
    printDurationsSubject: () => {
      let str = '';
      if (_nodes != undefined) {
        let i = 0;

        for (let n in _nodes) _indicator.getTermNodes().has(n) ? str += `\nsubject to Duration${i++}: duration['${_nodes[n].name}'] = ${_nodes[n].toStringFormulaWithResults()};` : '';


        return str;
      }
      else console.error('Você precisa carregar os Flows com AMPLJS.loadNodes()');

      return '';
    },
    printTermMethod: () => {
      let str = '\n\nset TermMethods :=';
      if (_indicator != undefined) {
        str += _indicator.toStringMethods()
        str += ';'
        return str;
      }
      else console.error('Você precisa carregar o indicator com AMPLJS.loadIndicator()');

      return '';
    },
    printFlowProperties: () => {
      let str = '\n\nset TermFlowProperties :=';
      if (_indicator != undefined) {
        const properties = _indicator.toStringProperties();
        if (properties.length == 0) return '\n\nset TermFlowProperties;';
        else return str + properties + ';';
      }
      else console.error('Você precisa carregar o indicator com AMPLJS.loadIndicator()');

      return '';
    },
    printTermNodes: () => {
      const selectedNodes = AMPLJS.getGraph().indicator.getTermNodes()
      var str = ''
      if (selectedNodes.size > 0) {
        str = `\n\nset TermNodes :=`

        for (let n of selectedNodes.values()) str += `\n\t${n}`
        str += ';'
        return str;
      }
      else
        return '\n\nset TermNodes;';

    }




  };
})();

class Node {
    /*String */ uid
    /*String */ name
    /*String */ type
    /*String */ stage
    /*String */ duration
    /*String */formula //Fórmula de duration
    /**Array<Flow> */ flows
  constructor(name, type, stage, duration, formula, flows = []) {
    this.name = name;
    this.type = type;
    this.stage = stage;
    this.duration = duration;
    this.formula = formula;
    this.flows = flows;
  }

  toStringDuration(platform) { }
  toString(platform) { }
  toStringType = (type) => type == this.type ? `\n\t${this.name}\t1,` : ''
  toStringFormulaWithResults = (_params) => {
    let formula = this.formula.replace(/[A-Za-z_]{1,100}/g, (name) => {
      _params = _params || AMPLJS.getGraph().parameters
      const param = _params[name]

      if (param != undefined)
        return param.toStringNameOrValue()

      return name;
    })

    formula = math.simplify(formula).toString()
    formula = formula.replace(/[A-Za-z_]{1,100}/g, (name) => `val["${name}"]`)
    formula = replaceExponentialOperator(formula)

    return formula

  }
}

class Flow {
    /*String*/uid
    /*String*/type
    /*Node*/top
    /*Node*/bottom
    /*String*/factor
    /*String*/qty    //Inclui inicialmente só para caso de armazenarmos algum valor 'standard' da variável
    /*String*/day      //Mesmo caso descrito acima
    /**String */formula
    /*Resource*/ resource

  constructor(type, bottom, top, factor, qty, day, resource, formula) {
    this.type = type;
    this.top = top;
    this.bottom = bottom;
    this.factor = factor;
    this.qty = qty;
    this.day = day;
    this.resource = resource;
    this.formula = formula;
  }

  toStringFactor(platform) { }    //Fórmulas para a plataforma especificada
  toString(platform) { }             //top.name   bottom.name
  toStringSign = () => `\n\t${this.toStringName(' ')}, ${this.type == 'PROD' ? -1 : 1}`     //1 se type = treatment, -1 de type = production
  toStringName = (_) => `${this.type == 'PROD' ? `${this.top.name}${_}${this.bottom.name}` : `${this.bottom.name}${_}${this.top.name}`}`;
  toStringFormulaWithResults = (_params) => {
    let formula = this.formula.replace(/[A-Za-z_]{1,100}/g, (name) => {
      _params = _params || AMPLJS.getGraph().parameters
      const param = _params[name]

      if (param != undefined)
        return param.toStringNameOrValue()

      return name;
    })

    formula = math.simplify(formula).toString()
    formula = formula.replace(/[A-Za-z_]{1,100}/g, (name) => `val["${name}"]`)
    formula = replaceExponentialOperator(formula)

    return formula

  }
}

class Parameter {
    /*String*/ uid
    /*String*/ name
    /*String*/ category    /*FIXED, CALCULATED, OPTIMIZED */
    /*String*/val
    /*String*/ std
    /*String*/ min
    /*String*/ max
    /*String */formula

  constructor(name, category, std, min, max, val, formula) {
    this.name = name;
    this.category = max == min ? 'fixed' : category;
    this.std = std;
    this.min = min;
    this.max = max;
    this.val = val;
    this.formula = formula;
  }
  toString(platform) { }
  isCategory(category) { }
  toStringByCat = (category) => this.category == category ? `\n\t${this.toStringName()}\t${this.val},` : ``
  toStringName = () => this.name.includes('#') ? this.name.replace('#', '_cerquilha_') : this.name
  toStringNameOrValue = () => {
    if (this.category == 'fixed') return `${this.val}`
    if (this.category == 'calculated') return `(${this.toStringFormula()})`
    return this.toStringName()
  }
  toStringFormula = (_params) => this.category == 'calculated' ? this.formula.replace(/[A-Za-z_]{1,100}/g, (name) => {
    _params = _params || AMPLJS.getGraph().parameters
    const param = _params[name]

    if (param != undefined)
      return param.toStringNameOrValue()


    return name;
  }) : ''
}

class Indicator {
    /*String*/ name
    /*String*/ objective   /* {max, min} */
    /*{method, property, stages, categories, flows} */ terms
  constructor(name, objective, terms) {
    this.name = name;
    this.objective = objective;
    let _ = {};
    for (let m in defaultMethods) {
      _[m] = { ...defaultMethods[m], ...(terms[m] != null ? terms[m] : {}) }
    }
    this.terms = _;

    this.selectFlows();
  }
  selectFlows() {
    for (let t in this.terms) {
      const side = this.terms[t].method === 'Input' ? 1 : 0
      var { categories, stages, method, property } = this.terms[t];
      var category = undefined;
      const parent = AMPLJS.getGraph().json.simulationData.categoriesResourceHierarchy;

      //this.terms[t]['flows'] = {}
      const nodes = AMPLJS.getGraph().nodes;
      const flows = AMPLJS.getGraph().flows;


      for (let n in nodes) {
        if (stages == null || stages.includes(nodes[n].stage)) {
          const connectedFlows = nodes[n].flows.reduce((t, f) => {
            t[f] = flows[f];
            return t;
          }, {})

          //if(connectedFlows.includes(undefined)) console.error('Erro ao selecionar os fluxos conectados');

          for (let f in connectedFlows) {
            if (method === 'Stock' || f.split('-')[side] === n) {
              if (categories != null) {
                category = connectedFlows[f].resource.category;
                while (category != null && !(categories.includes(category)))
                  category = parent[category]
                if (category == null) continue;
              }
              if (category != null) {
                //this.terms[t]['flows'] = {}
                this.terms[t]['flows'][f] = connectedFlows[f]
                this.terms[t]['flows'][f]['property'] = property != null ? property + conector + flows[f].resource.category : defaultProperty
              }
            }
          }
        }
      }
    }
  }
  toString() { }
  toStringFormula() { }
  toStringProperties() {
    var str = '';

    for (let t in this.terms) {
      var flows = this.terms[t].flows
      if (Object.keys(flows).length > 0) {
        for (let f in flows) {
          str += `\n\t${t}, ${flows[f].toStringName(', ')}, ${flows[f].property}`
        }
      }
    }

    return str;
  }
  toStringMethods() {
    let str = '';

    for (let m in defaultMethods)
      str += `\n\t${m}, ${this.terms[m] == null ? defaultMethods[m] : this.terms[m].method}`

    return str;
  }
  getTermNodes() {
    const terms = AMPLJS.getGraph().indicator.terms

    var selectedNodes = new Set()
    for (let t in terms) {
      if (terms[t].method === 'Stock') {
        let flows = terms[t].flows;
        for (let f in flows) {
          selectedNodes.add(flows[f].bottom.name)
          selectedNodes.add(flows[f].top.name)
        }
      }
    }
    return selectedNodes
  }
}

class Resource {
    /*String*/uid
    /*String*/name
    /*String*/ category
    /**String */ unit
  constructor(name, category, unit) {
    this.name = name;
    this.category = category;
    this.unit = unit;
  }

  toStringCategory(category) { }

}


/*const a = {
    "notFixed": [
        "PESO_cerquilha_MULTIPARAS",
        "PRECO_PESO_cerquilha_BOVINOS"
    ],
    "indicator": {
        "name": 'CO2EQ',
        "objective": 'minimize'
    }
}*/

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


function removeUselessCharsInNodeName(nodeName, type) {
  if (!(typeof nodeName == 'string')) return console.error('Nome do nó não encontrado.');
  if (type === 'flow') {
    nodesName = nodeName.split('-');    //Alguns nodes possuem - no nome.
    if (nodesName.length > 2) {
      for (let i in nodesName) {
        if (!(nodesName[i].includes('_'))) {
          nodesName[i - 1] = nodesName[i - 1] + nodesName[i];
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

function getTopAndBottomNodesOfFlow(flowString, _nodes) {
  const _names = flowString.split('-');
  const bottom = _nodes[_names[0]];
  const top = _nodes[_names[1]];

  return {
    bottom, top
  };
}

const conector = '_cerquilha_'

const defaultMethods = {
  'N1': {
    method: '_1',
    flows: {}
  },
  'N2': {
    method: '_0',
    flows: {}
  },
  'N3': {
    method: '_1',
    flows: {}
  },
  'D1': {
    method: '_1',
    flows: {}
  },
  'D2': {
    method: '_0',
    flows: {}
  },
  'D3': {
    method: '_1',
    flows: {}
  }
}
const defaultProperty = '_1'

function removeSpecialCharsFromResourceName(str) {
  const map = {
    '_': ' ',
    'a': 'á|à|ã|â|À|Á|Ã|Â',
    'e': 'é|è|ê|É|È|Ê',
    'i': 'í|ì|î|Í|Ì|Î',
    'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    'c': 'ç|Ç',
    'n': 'ñ|Ñ'
  };

  //str = str.toLowerCase();

  for (var pattern in map) {
    str = str.replace(new RegExp(map[pattern], 'g'), pattern);
  };

  return str;
};

function getParameterCategory(p, optimizedParameters) {
  if (p.min == p.max) return 'fixed'

  if (optimizedParameters.includes(p.name)) return 'optimized'

  return 'fixed'
}

const replaceInvalidCharsWithSemicolon = (str) => {
  let c = str.slice(-1);
  const invalidChars = ['', ' ', ',', '\n']

  while (isInvalidChar(c, invalidChars)) {
    str = str.substring(0, str.length - 1)
    c = str.slice(-1);
  }
  return str + ';';
}

const isInvalidChar = (char = '', invalidChars = []) => invalidChars.includes(char)

String.prototype.insertAt = function (element, position) {
  return `${this.substring(0, position)}${element}${this.substring(position)}`;
}

const removeComments = (s) => s.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');

const hasOnlyDigitsOnFormula = (formula) => typeof formula == 'string' ? formula.search(/[a-zA-Z_]/g) == -1 : false

const replaceExponentialOperator = (formula) => formula.replace('^', '**')


const Indicators = {
  i1: {
    name: 'Preço de bovinos comprados, kg PV',
    description: 'Preço médio do peso vivo de bovinos comprados.',
    unit: 'R$/kgPV',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Output',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i2: {
    name: 'Preço de bovinos vendidos, kg PV',
    description: 'Preço médio do peso vivo de bovinos vendidos.',
    unit: 'R$/kgPV',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Input',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i3: {
    name: 'Custo total',
    description: 'Custo total.',
    unit: 'R$',
    group: 'Econômicos',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal']
      }
    }
  },
  i4: {
    name: 'Receita total',
    description: 'Receita total.',
    unit: 'R$',
    group: 'Econômicos',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal']
      }
    }
  },
  i5: {
    name: 'Rebanho, cab',
    description: 'Rebanho bovino total em cabeças.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['BOVINOS']
      }
    }
  },
  i6: {
    name: 'Rebanho, kg PV',
    description: 'Rebanho bovino total em kg de peso vivo.',
    unit: 'kgPV',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      }
    }
  },
  i7: {
    name: 'Nulíparas',
    description: 'Qtde de Nulíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['NULIPARAS']
      }
    }
  },
  i8: {
    name: 'Primíparas',
    description: 'Qtde de Primíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['PRIMIPARAS']
      }
    }
  },
  i9: {
    name: 'Multíparas',
    description: 'Qtde de Multíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['MULTIPARAS']
      }
    }
  },
  i10: {
    name: 'Matrizes',
    description: 'Qtde de Matrizes, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['NULIPARAS', 'PRIMIPARAS', 'MULTIPARAS']
      }
    }
  },
  i11: {
    name: 'Desfrute',
    description: 'Qtde de animais vendidos no ano subtraída dos animais comprados no ano dividido pelo rebanho médio, em cabeças.',
    unit: '%cab',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        categories: ['BOVINOS']
      }
    }
  },
  i12: {
    name: 'Desfrute',
    description: 'Peso dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo rebanho médio, em kg.',
    unit: '%kg',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      }
    }
  },
  i13: {
    name: 'Desfrute',
    description: 'Valor dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo valor médio do rebanho.',
    unit: '%kg',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        property: 'PRECO',
        categories: ['BOVINOS']
      }
    }
  },
  i14: {
    name: 'CO2eq',
    description: "Emissões de gases de efeito estufa totais do 'berço ao portão'.",
    unit: 'kg CO2eq',
    group: 'Emissões',
    terms: {
      N1: {
        method: 'Output',
        categories: ['GEE']
      },
      N2: {
        method: 'Output',
        property: 'CO2EQ',
        stages: ['terminal']
      }
    }
  },
  i15: {
    name: 'Preço de bovinos comprados, @',
    description: 'Preço médio da arroba de bovinos comprados.',
    unit: 'R$/@',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Output',
        property: 'ARROBA',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i16: {
    name: 'Preço de bovinos vendidos, @',
    description: 'Preço médio da arroba de bovinos vendidos.',
    unit: 'R$/@',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Input',
        property: 'ARROBA',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i17: {
    name: 'Taxa de Lotação',
    description: 'Taxa de lotação em kg de peso vivo por ha.',
    unit: 'kgPV/ha',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      },
      D1: {
        method: 'AREA_PRODUCAO'
      }
    }
  }
};
