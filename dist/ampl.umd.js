(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vuetify/lib'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vuetify/lib', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FormMaisPrecoceAmpl = {}, global.Vuetify, global.Vue));
}(this, (function (exports, lib, Vue) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

  var script = Vue__default['default'].component("Indicador", {
    components: {
      VSelect: lib.VSelect
    },

    props: ["indicators"],

    data: () => ({
      value: null,
    }),

    computed: {
      indicatorsList: function () {
        if (this.indicators != null)
          return Object.entries(this.indicators).map((e) => ({
            id: e[0],
            ...e[1],
          }));
        else return [];
      },
    },

    methods: {
      updateIndicator: function (value) {
        this.$emit("updateIndicator", value);
      },
    }
  });

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "select" },
      [
        _c("v-select", {
          attrs: {
            label: "Selecione um indicador",
            items: _vm.indicatorsList,
            "item-text": "name",
            "item-value": "id",
            required: "",
            "persistent-hint": "",
            solo: "",
            "return-object": "",
            "no-data-text": "Nenhum indicador disponível"
          },
          on: {
            change: function($event) {
              return _vm.updateIndicator($event)
            }
          }
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
    components: {
      VSelect: lib.VSelect,
      VCol: lib.VCol
    },

    props: ['params'],

    data: () => ({
        //parâmetros para seleção
      autoUpdate: true,
     
    }),

    methods: {
      addParam: function (param) {
        this.$emit('addParam', param);
      },
    }
  };

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "parametros" },
      [
        _c(
          "v-col",
          { attrs: { cols: "12" } },
          [
            _c("v-select", {
              attrs: {
                items: _vm.params,
                hint:
                  "A lista de Parâmetros possui apenas os Parâmetros utilizados no cálculo do indicador selecionado",
                chips: "",
                "deletable-chips": "",
                solo: "",
                multiple: "",
                label: "Selecione os parâmetros que deseja flexibilizar",
                "item-text": "name",
                eager: "",
                "item-value": "name",
                "no-data-text": "Sem parâmetros para selecionar",
                "persistent-hint": ""
              },
              on: {
                change: function($event) {
                  return _vm.addParam($event)
                }
              }
            })
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-108e34f6_0", { source: "\n.msg[data-v-108e34f6]{\n    color:#CCCCCC;\n    font-style: italic;\n    font-size: 0.9em;\n}\n", map: {"version":3,"sources":["C:\\Users\\Jacons\\OneDrive\\Mestrado\\ampljs\\mais-precoce-ampl\\src\\components\\ParametroUnico.vue"],"names":[],"mappings":";AA4CA;IACA,aAAA;IACA,kBAAA;IACA,gBAAA;AACA","file":"ParametroUnico.vue","sourcesContent":["<template>\r\n    <div class=\"parametros\">          \r\n          <v-col cols=\"12\" >         \r\n\r\n            <!-- ADICIONANDO SELECT MULTIPLO -->\r\n            <v-select\r\n              v-on:change=\"addParam($event)\"\r\n              :items=\"params\"\r\n              hint=\"A lista de Parâmetros possui apenas os Parâmetros utilizados no cálculo do indicador selecionado\"\r\n              chips\r\n              deletable-chips\r\n              solo\r\n              multiple\r\n              label=\"Selecione os parâmetros que deseja flexibilizar\"\r\n              item-text=\"name\"\r\n              eager\r\n              item-value=\"name\"\r\n              no-data-text=\"Sem parâmetros para selecionar\"\r\n              persistent-hint\r\n            />\r\n          </v-col>\r\n     \r\n    </div>\r\n    \r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    props: ['params'],\r\n    data: () => ({\r\n        //parâmetros para seleção\r\n      autoUpdate: true,\r\n     \r\n    }),\r\n  methods: {\r\n    addParam: function (param) {\r\n      this.$emit('addParam', param)\r\n    },\r\n  }\r\n    \r\n}\r\n</script>\r\n\r\n<style scoped>\r\n    .msg{\r\n        color:#CCCCCC;\r\n        font-style: italic;\r\n        font-size: 0.9em;\r\n    }\r\n</style>>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-108e34f6";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$2 = {
    components: {
      VBtn: lib.VBtn,
      VBtnToggle: lib.VBtnToggle
    },

    name: "MaximizeIndicator",

    data: () => ({
        value: 'maximize'
    }),

    methods:{
      updateObjective:function (value) {
        this.$emit('updateObjective', value);
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "v-btn-toggle",
      {
        attrs: { dense: "", rounded: "", mandatory: "" },
        on: {
          change: function($event) {
            return _vm.updateObjective($event)
          }
        }
      },
      [
        _c(
          "v-btn",
          {
            attrs: {
              value: "maximize",
              "active-class": "blue white--text",
              rounded: ""
            }
          },
          [_vm._v("maximizar")]
        ),
        _vm._v(" "),
        _c(
          "v-btn",
          {
            attrs: {
              value: "minimize",
              "active-class": "blue white--text",
              rounded: ""
            }
          },
          [_vm._v("minimizar")]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global$1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global$1, key, value);
    } catch (error) {
      global$1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global$1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global$1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.7.0',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global$1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global$1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
      : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$1;
    } else if (STATIC) {
      target = global$1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global$1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  var defineProperty = Object.defineProperty;
  var cache = {};

  var thrower = function (it) { throw it; };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = { length: -1 };

      if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  var $filter = arrayIteration.filter;



  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
  // Edge 14- issue
  var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var $includes = arrayIncludes.includes;



  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$1 }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var min$2 = Math.min;
  var nativeLastIndexOf = [].lastIndexOf;
  var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict('lastIndexOf');
  // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
  var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
  var FORCED$1 = NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$2;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$1 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = min$2(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : nativeLastIndexOf;

  // `Array.prototype.lastIndexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
  _export({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
    lastIndexOf: arrayLastIndexOf
  });

  var $map = arrayIteration.map;



  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
  // FF49- issue
  var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map');

  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$2 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject(that);
      var self = indexedObject(O);
      var length = toLength(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
    left: createMethod$2(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
    right: createMethod$2(true)
  };

  var engineIsNode = classofRaw(global$1.process) == 'process';

  var $reduce = arrayReduce.left;





  var STRICT_METHOD$2 = arrayMethodIsStrict('reduce');
  var USES_TO_LENGTH$4 = arrayMethodUsesToLength('reduce', { 1: 0 });
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$4 || CHROME_BUG }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$5 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$2 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$5 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var defineProperty$1 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.github.io/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty$1(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y,
  	BROKEN_CARET: BROKEN_CARET
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty$2 = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;





  var setInternalState = internalState.set;



  var MATCH$1 = wellKnownSymbol('match');
  var NativeRegExp = global$1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

  var FORCED$2 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  })));

  // `RegExp` constructor
  // https://tc39.github.io/ecma262/#sec-regexp-constructor
  if (FORCED$2) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var sticky;

      if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
        return pattern;
      }

      if (CORRECT_NEW) {
        if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
      } else if (pattern instanceof RegExpWrapper) {
        if (flagsAreUndefined) flags = regexpFlags.call(pattern);
        pattern = pattern.source;
      }

      if (UNSUPPORTED_Y$1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      var result = inheritIfRequired(
        CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
        thisIsRegExp ? this : RegExpPrototype,
        RegExpWrapper
      );

      if (UNSUPPORTED_Y$1 && sticky) setInternalState(result, { sticky: sticky });

      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper || defineProperty$2(RegExpWrapper, key, {
        configurable: true,
        get: function () { return NativeRegExp[key]; },
        set: function (it) { NativeRegExp[key] = it; }
      });
    };
    var keys$1 = getOwnPropertyNames(NativeRegExp);
    var index = 0;
    while (keys$1.length > index) proxy(keys$1[index++]);
    RegExpPrototype.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype;
    redefine(global$1, 'RegExp', RegExpWrapper);
  }

  // https://tc39.github.io/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var freezing = !fails(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;



  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + ++id, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;
  });

  var iterators = {};

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  var iteratorClose = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var defineProperty$3 = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
      defineProperty$3(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    // eslint-disable-next-line max-len
    if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    })))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR$3)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var defineProperty$4 = objectDefineProperty.f;








  var fastKey = internalMetadata.fastKey;


  var setInternalState$1 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty$4(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  // `Set` constructor
  // https://tc39.github.io/ecma262/#sec-set-objects
  collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$2 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$2] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$2 = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$2(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$4 = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    return 'a'.replace(/./, '$0') === '$0';
  })();

  var REPLACE = wellKnownSymbol('replace');
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$4] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }, {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
    }

    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  var max$2 = Math.max;
  var min$3 = Math.min;
  var floor$1 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$2(min$3(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$1(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  var SPECIES$5 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.github.io/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var arrayPush = [].push;
  var min$4 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SUPPORTS_Y);

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.github.io/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$3(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$5] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
      }
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function F() {};

        return {
          s: F,
          n: function n() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function s() {
        it = o[Symbol.iterator]();
      },
      n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _ = {
    getCodebase: function getCodebase() {
      return codebase;
    }
  };
  var codebase = "reset;\n\nmodel;\n\noption substout 1; \noption presolve 0;\noption show_stats 1;\noption solver minos;\noption minos_options 'major_iterations=100000';\n\nparam Cycle := 365;\n\nset NODES;\nparam IsRoot{NODES} binary default 0;\nparam IsBalance{NODES} binary default 0;\nparam IsSum{NODES} binary default 0;\nset TermNodes within NODES;\nvar duration{n in TermNodes} default 0;\n\nset FLOWS within NODES cross NODES;\nparam Sign{FLOWS} in {-1,1} default 1;\nvar factor{FLOWS} default 1; \nvar qty{FLOWS} default 1;\n\nset PARAMETERS;\nset PROPERTIES := PARAMETERS union {'_1'}; \nparam Std{p in PROPERTIES} default 1; \nparam Min{p in PROPERTIES} default Std[p] <= Std[p];\nparam Max{p in PROPERTIES} default Std[p] >= Std[p];\nvar val {p in PROPERTIES} default Std[p];\n\nset TERMS := {'N1', 'N2', 'N3', 'D1', 'D2', 'D3'};\nset TermMethods within TERMS cross (PARAMETERS union {'_0', '_1', 'Input', 'Output', 'Stock'});\nset TermFlowProperties within TERMS cross FLOWS cross PROPERTIES;\nvar term{TERMS} default 0;\nvar Indicator  default 0;\n\nmaximize IndicatorMax: Indicator;\n    \nsubject to IndicatorTerms: Indicator = \n\t((term[\"N1\"] - term[\"N2\"]) * term[\"N3\"]) / ((term[\"D1\"] - term[\"D2\"]) * term[\"D3\"]);\n\nsubject to TermMethod{(t,m) in TermMethods}: term[t] = \n\tif m = \"Stock\" then\n\t\t(sum {(t,i,j,p) in TermFlowProperties} val[p] * qty[i, j] * (duration[i] + duration[j]))/2/Cycle\n\telse if m in {\"Input\", \"Output\"} then\n\t\tsum{(t,i,j,p) in TermFlowProperties} val[p] * qty[i, j]\n\telse if m = \"_0\" then 0\n\telse if m = \"_1\" then 1\n\telse val[m];\n\n\nsubject to FlowQty{(n, j) in FLOWS}: qty[n, j] =\n\tif IsRoot[n] then\n\t\tfactor[n, j] else\n\tif IsSum[n]  then\n\t\tsum{(i, n) in FLOWS} qty[i, n] else\n    if IsBalance[n] then\n    \tSign[n, j] * sum{(i, n) in FLOWS} Sign[i, n] * qty[i, n]\n\telse\n\t\tfactor[n, j] * sum{(i, n) in FLOWS} qty[i, n];\n\nsubject to ValFixed{p in PROPERTIES: Min[p] = Max[p]}: val[p] = Std[p];\nsubject to ValNotFixed{p in PROPERTIES: Min[p] <> Max[p]}: Min[p] <= val[p] <= Max[p];\nsubject to PositiveQty{(n,j) in FLOWS: IsBalance[n]}: qty[n,j] >= 0;";

  //import Vue from "vue"
  var math = require('mathjs'); //import Validator from "./validation"

  var AMPLJS = function () {
    //var modelJSONString;
    var modelJSONObject; //var userJSONString;

    var jsonIndicators;
    var userJSONObject;

    var _parameters;

    var _nodes;

    var _flows;

    var _resources;

    var _indicator;

    return {
      isJSON: function isJSON(str) {
        try {
          return !!(JSON.parse(str) && !!str);
        } catch (e) {
          return false;
        }
      },
      getGraph: function getGraph() {
        return {
          nodes: _nodes,
          flows: _flows,
          resources: _resources,
          parameters: _parameters,
          indicator: _indicator,
          json: modelJSONObject,
          removeComments: removeComments
        };
      },
      loadModelJSONObject: function loadModelJSONObject(json) {
        modelJSONObject = JSON.parse(json); //modelJSONString = json;
      },
      loadUserJsonObject: function loadUserJsonObject(json) {
        userJSONObject = JSON.parse(json); //userJSONString = json;
      },
      loadParameters: function loadParameters() {
        if (modelJSONObject != undefined) {
          _parameters = {};
          var n = modelJSONObject['simulationData']['parameters'];
          var systemParameters = modelJSONObject['simulationData']['systemParameters'];
          var calculatedParameters = modelJSONObject['simulationData']['calculatedParameters'];

          for (var k in n) {
            _parameters[k] = new Parameter(k, getParameterCategory({
              name: k,
              min: systemParameters[k].min,
              max: systemParameters[k].max
            }, userJSONObject['parameters'].map(function (e) {
              return e.name;
            })), systemParameters[k].std, systemParameters[k].min, systemParameters[k].max, n[k]);
          }

          for (var _k in calculatedParameters) {
            _parameters[_k] = new Parameter(_k, 'calculated', 1, 1, 2, 1, calculatedParameters[_k]);
          }
        } else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json).');
      },
      loadNodes: function loadNodes() {
        if (modelJSONObject != undefined) {
          _nodes = {};
          var n = modelJSONObject['simulationData']['graph']['nodes'];

          for (var k in n) {
            var _2 = removeUselessCharsInNodeName(k, 'node');

            _nodes[_2] = new Node(_2, NodeTypes[n[k]['type']], n[k]['stages'][0], n[k]['duration'], n[k]['formula'], n[k]['flows'].map(function (f) {
              return removeUselessCharsInNodeName(f, 'flow');
            }));
          }
        } else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
      },
      loadFlows: function loadFlows() {
        if (modelJSONObject != undefined) {
          _flows = {};
          var n = modelJSONObject['simulationData']['graph']['flows'];

          for (var k in n) {
            var _3 = removeUselessCharsInNodeName(k, 'flow');

            var _getTopAndBottomNodes = getTopAndBottomNodesOfFlow(_3, _nodes),
                bottom = _getTopAndBottomNodes.bottom,
                top = _getTopAndBottomNodes.top;

            _flows[_3] = new Flow(FlowTypes[n[k]['type']], bottom, top, n[k]['factor'], n[k]['qty'], n[k]['day'], new Resource(removeSpecialCharsFromResourceName(n[k]['resource']['name']), n[k]['resource']['category'], n[k]['resource']['unit']), n[k]['formula']);
          }
        } else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
      },
      loadResources: function loadResources() {
        if (modelJSONObject != undefined) {
          var n = modelJSONObject['simulationData']['resources'];
          _resources = {};

          for (var k in n) {
            var _4 = removeSpecialCharsFromResourceName(k);

            _resources[_4] = new Resource(_4, n[k]['category'], n[k]['unit']);
          }
        } else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
      },
      loadIndicator: function loadIndicator() {
        var indicators;

        if (jsonIndicators != null) {
          indicators = JSON.parse(jsonIndicators);
        }

        if (modelJSONObject != null && indicators != null) {
          var selectedIndicator = indicators[userJSONObject['indicator']['id']];

          if (selectedIndicator != undefined) {
            _indicator = new Indicator(selectedIndicator.name, userJSONObject['indicator']['objective'], selectedIndicator['terms']);
          } else console.error('O indicador selecionado não foi encontrado na base de indicadores, verifique o nome do indicador ou atualize a base do AMPLJS.');
        } else console.error('Você precisa carregar o json primeiro com AMPLJS.loadJSONObject(json)');
      },
      printNodes: function printNodes() {
        if (_nodes != undefined) {
          var str = '';
          str += '\n\nset NODES :=';

          for (var k in _nodes) {
            str += "\n\t".concat(k);
          }

          str += ';';
          return str;
        } else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

        return '';
      },
      printFlowsResource: function printFlowsResource() {
        if (_flows != undefined) {
          var str = '';
          str += '\n\nparam Resource :=';

          for (var k in _flows) {
            str += "\n\t".concat(_flows[k].toStringName(' '), ", ").concat(_flows[k].resource, ",");
          }

          str = str.substring(0, str.length - 2) + ';\n';
          return str;
        } else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

        return '';
      },
      printFlows: function printFlows() {
        if (_flows != undefined) {
          var str = '';
          str += '\n\nset FLOWS :=';

          for (var k in _flows) {
            str += "\n\t(".concat(_flows[k].toStringName(', '), "),");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

        return '';
      },
      printResources: function printResources() {
        if (_resources != undefined) {
          var str = '';
          str += '\n\nset RESOURCES := \n';

          for (var k in _resources) {
            str += "\t".concat(k, " \n");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Resources com AMPLJS.loadResources()');

        return '';
      },
      printOptimizedParameters: function printOptimizedParameters() {
        if (_parameters != undefined) {
          var str = '';

          for (var k in _parameters) {
            str += _parameters[k].category == 'optimized' ? "\nvar ".concat(k).concat(_parameters[k].category == 'optimized' ? ' >= ' + _parameters[k].min + ' <= ' + _parameters[k].max : '', ";") : '';
          }

          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printFixed: function printFixed() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nset FIXED := \n';

          for (var k in _parameters) {
            if (_parameters[k].category == 'fixed') str += "\t".concat(_parameters[k].toStringName(), " \n");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printCalculated: function printCalculated() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nset CALCULATED := \n';

          for (var k in _parameters) {
            if (_parameters[k].category == 'calculated') str += "\t".concat(k, " \n");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printOptimized: function printOptimized() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nset VARIABLES :=';

          for (var k in _parameters) {
            if (_parameters[k].category == 'optimized') str += "\n\t".concat(k);
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printFixedValues: function printFixedValues() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nparam Fixed :=';

          for (var k in _parameters) {
            str += _parameters[k].toStringByCat('fixed');
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printProperties: function printProperties() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nset PROPERTIES :=';

          for (var k in _parameters) {
            str += "\n\t".concat(_parameters[k].toStringName());
          }

          str += "\n\t_1";
          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printParameters: function printParameters() {
        if (_parameters != undefined) {
          var str = '';
          str += '\n\nset PARAMETERS :=';

          for (var k in _parameters) {
            str += "\n\t".concat(_parameters[k].toStringName());
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printSigns: function printSigns() {
        if (_flows != undefined) {
          var str = '';
          str += '\n\nparam Sign :=';

          for (var f in _flows) {
            str += _flows[f].type === 'PROD' ? _flows[f].toStringSign() : '';
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

        return '';
      },
      printBalances: function printBalances() {
        if (_nodes != undefined) {
          var str = '';

          for (var n in _nodes) {
            str += _nodes[n].toStringType('balance');
          }

          if (str.length > 0) str = '\n\nparam IsBalance :=' + str;
          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

        return '';
      },
      printSums: function printSums() {
        if (_nodes != undefined) {
          var str = '';

          for (var n in _nodes) {
            str += _nodes[n].toStringType('sum');
          }

          if (str.length > 0) str = '\n\nparam IsSum :=' + str;
          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

        return '';
      },
      printStations: function printStations() {
        if (_nodes != undefined) {
          var str = '';
          str += '\n\nparam IsStation :=';

          for (var n in _nodes) {
            str += _nodes[n].toStringType('station');
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

        return '';
      },
      printRoot: function printRoot() {
        if (_nodes != undefined) {
          var str = '';
          str += '\n\nparam IsRoot :=';

          for (var n in _nodes) {
            str += _nodes[n].name === removeUselessCharsInNodeName(modelJSONObject['simulationData']['graph']['root']) ? "\n\t".concat(_nodes[n]['name'], "\t1;") : '';
          }

          return str;
        } else console.error('Você precisa carregar os Nodes com AMPLJS.loadNodes()');

        return '';
      },
      translate: function translate(jSimulation, jUser, jIndicators) {
        jSimulation = jSimulation || JSON.stringify(modelJSONObject);
        jUser = jUser || JSON.stringify(userJSONObject);
        jIndicators = jIndicators || jsonIndicators;
        var jsonSimulation = removeComments(jSimulation);
        var jsonUser = removeComments(jUser);
        jsonIndicators = removeComments(jIndicators);
        var amplCode = '';

        if (AMPLJS.isJSON(jsonSimulation)) {
          AMPLJS.loadModelJSONObject(jsonSimulation);
          AMPLJS.loadUserJsonObject(jsonUser);
          AMPLJS.loadNodes();
          AMPLJS.loadFlows();
          AMPLJS.loadResources();
          AMPLJS.loadParameters();
          AMPLJS.loadIndicator();
          amplCode = _.getCodebase();
          if (userJSONObject.indicator.objective != 'maximize') amplCode = amplCode.replace('maximize', 'minimize'); //amplCode += AMPLJS.printOptimizedParameters();
          //amplCode += AMPLJS.printCalculatedParameters();

          amplCode += AMPLJS.printFactorsSubject();
          amplCode += AMPLJS.printDurationsSubject();
          amplCode += "\n\ndata;";
          amplCode += AMPLJS.printNodes();
          amplCode += AMPLJS.printBalances();
          amplCode += AMPLJS.printRoot(); //amplCode += AMPLJS.printStations();

          amplCode += AMPLJS.printSums();
          amplCode += AMPLJS.printFlows(); //amplCode += AMPLJS.printResources();
          //amplCode += AMPLJS.printFixed();
          //amplCode += AMPLJS.printFixedValues();

          amplCode += AMPLJS.printSigns();
          amplCode += AMPLJS.printParameters(); //amplCode += AMPLJS.printProperties();
          //amplCode += AMPLJS.printCalculated();
          //amplCode += AMPLJS.printOptimized();
          //amplCode += AMPLJS.printFixedValues();
          //amplCode += AMPLJS.printFlowsResource();

          amplCode += AMPLJS.printStdParameters();
          amplCode += AMPLJS.printMinMaxParameters();
          amplCode += AMPLJS.printTermMethod();
          amplCode += AMPLJS.printFlowProperties();
          amplCode += AMPLJS.printTermNodes(); //Validator.checkNodes(JSON.parse(jsonSimulation)['simulationData'], amplCode)
          //Validator.checkFlows(JSON.parse(jsonSimulation)['simulationData'], amplCode)

          console.log(JSON.stringify(AMPLJS.getGraph().parameters, undefined, ' '));
          return amplCode;
        }
      },
      printCalculatedParameters: function printCalculatedParameters() {
        if (_parameters != undefined) {
          var str = '';

          for (var n in _parameters) {
            if (_parameters[n].category == 'calculated') str += "\nsubject to ValCalculated_".concat(_parameters[n].toStringName(), ": ").concat(_parameters[n].toStringName(), " = ").concat(_parameters[n].toStringFormula(_parameters), ";");
          }

          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printMinMaxParameters: function printMinMaxParameters() {
        if (_parameters != undefined) {
          var str = '\n\nparam:\tMin\tMax :=';

          for (var n in _parameters) {
            if (_parameters[n].category == 'optimized') str += "\n\t".concat(_parameters[n].toStringName(), "\t").concat(_parameters[n].min, "\t").concat(_parameters[n].max, ",");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printStdParameters: function printStdParameters() {
        if (_parameters != undefined) {
          var str = '\n\nparam:\tStd :=';

          for (var n in _parameters) {
            if (_parameters[n].category == 'optimized' || _parameters[n].category === 'fixed') str += "\n\t".concat(_parameters[n].toStringName(), "\t").concat(_parameters[n].val, ",");
          }

          str = replaceInvalidCharsWithSemicolon(str);
          return str;
        } else console.error('Você precisa carregar os Parameters com AMPLJS.loadParameters()');

        return '';
      },
      printFactorsSubject: function printFactorsSubject() {
        var str = '';

        if (_flows != undefined) {
          var i = 0;

          for (var f in _flows) {
            str += _flows[f].bottom.type === 'balance' || _flows[f].bottom.type === 'sum' ? "\nsubject to Factor".concat(i++, ": factor['").concat(_flows[f].toStringName("', '"), "'] = ").concat(_flows[f].toStringFormulaWithResults(AMPLJS.getGraph().parameters), ";") : '';
          }

          return str;
        } else console.error('Você precisa carregar os Flows com AMPLJS.loadFlows()');

        return '';
      },
      printDurationsSubject: function printDurationsSubject() {
        var str = '';

        if (_nodes != undefined) {
          var i = 0;

          for (var n in _nodes) {
            _indicator.getTermNodes().has(n) ? str += "\nsubject to Duration".concat(i++, ": duration['").concat(_nodes[n].name, "'] = ").concat(_nodes[n].toStringFormulaWithResults(), ";") : '';
          }

          return str;
        } else console.error('Você precisa carregar os Flows com AMPLJS.loadNodes()');

        return '';
      },
      printTermMethod: function printTermMethod() {
        var str = '\n\nset TermMethods :=';

        if (_indicator != undefined) {
          str += _indicator.toStringMethods();
          str += ';';
          return str;
        } else console.error('Você precisa carregar o indicator com AMPLJS.loadIndicator()');

        return '';
      },
      printFlowProperties: function printFlowProperties() {
        var str = '\n\nset TermFlowProperties :=';

        if (_indicator != undefined) {
          var properties = _indicator.toStringProperties();

          if (properties.length == 0) return '\n\nset TermFlowProperties;';else return str + properties + ';';
        } else console.error('Você precisa carregar o indicator com AMPLJS.loadIndicator()');

        return '';
      },
      printTermNodes: function printTermNodes() {
        var selectedNodes = AMPLJS.getGraph().indicator.getTermNodes();
        var str = '';

        if (selectedNodes.size > 0) {
          str = "\n\nset TermNodes :=";

          var _iterator = _createForOfIteratorHelper(selectedNodes.values()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var n = _step.value;
              str += "\n\t".concat(n);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          str += ';';
          return str;
        } else return '\n\nset TermNodes;';
      }
    };
  }();

  var Node =
  /*String */

  /*String */

  /*String */

  /*String */

  /*String */

  /*String */
  //Fórmula de duration

  /**Array<Flow> */
  function Node(name, _type, stage, duration, formula) {
    var _this = this;

    var flows = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    _classCallCheck(this, Node);

    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "stage", void 0);

    _defineProperty(this, "duration", void 0);

    _defineProperty(this, "formula", void 0);

    _defineProperty(this, "flows", void 0);

    _defineProperty(this, "toStringType", function (type) {
      return type == _this.type ? "\n\t".concat(_this.name, "\t1,") : '';
    });

    _defineProperty(this, "toStringFormulaWithResults", function (_params) {
      return simplifyFormula(_this.formula, _params);
    });

    this.name = name;
    this.type = _type;
    this.stage = stage;
    this.duration = duration;
    this.formula = replacePropertySeparator(formula);
    this.flows = flows;
  };

  var Flow =
  /*String*/

  /*String*/

  /*Node*/

  /*Node*/

  /*String*/

  /*String*/
  //Inclui inicialmente só para caso de armazenarmos algum valor 'standard' da variável

  /*String*/
  //Mesmo caso descrito acima

  /**String */

  /*Resource*/
  function Flow(type, bottom, top, factor, qty, day, resource, formula) {
    var _this2 = this;

    _classCallCheck(this, Flow);

    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "top", void 0);

    _defineProperty(this, "bottom", void 0);

    _defineProperty(this, "factor", void 0);

    _defineProperty(this, "qty", void 0);

    _defineProperty(this, "day", void 0);

    _defineProperty(this, "formula", void 0);

    _defineProperty(this, "resource", void 0);

    _defineProperty(this, "toStringSign", function () {
      return "\n\t".concat(_this2.toStringName(' '), ", ").concat(_this2.type == 'PROD' ? -1 : 1);
    });

    _defineProperty(this, "toStringName", function (_) {
      return "".concat(_this2.type == 'PROD' ? "".concat(_this2.top.name).concat(_).concat(_this2.bottom.name) : "".concat(_this2.bottom.name).concat(_).concat(_this2.top.name));
    });

    _defineProperty(this, "toStringFormulaWithResults", function (_params) {
      return simplifyFormula(_this2.formula, _params);
    });

    this.type = type;
    this.top = top;
    this.bottom = bottom;
    this.factor = factor;
    this.qty = qty;
    this.day = day;
    this.resource = resource;
    this.formula = replacePropertySeparator(formula);
  };

  var Parameter =
  /*String*/

  /*String*/

  /*String*/

  /*FIXED, CALCULATED, OPTIMIZED */

  /*String*/

  /*String*/

  /*String*/

  /*String*/

  /*String */
  function Parameter(name, _category, std, min, max, val, formula) {
    var _this3 = this;

    _classCallCheck(this, Parameter);

    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "category", void 0);

    _defineProperty(this, "val", void 0);

    _defineProperty(this, "std", void 0);

    _defineProperty(this, "min", void 0);

    _defineProperty(this, "max", void 0);

    _defineProperty(this, "formula", void 0);

    _defineProperty(this, "toStringByCat", function (category) {
      return _this3.category == category ? "\n\t".concat(_this3.toStringName(), "\t").concat(_this3.val, ",") : "";
    });

    _defineProperty(this, "toStringName", function () {
      return _this3.name.includes('#') ? _this3.name.replace('#', conector) : _this3.name;
    });

    _defineProperty(this, "toStringNameOrValue", function (_params) {
      if (_this3.category == 'fixed') return "".concat(_this3.val);
      if (_this3.category == 'calculated') return "(".concat(_this3.toStringFormula(_params || AMPLJS.getGraph().parameters), ")");
      return _this3.toStringName();
    });

    _defineProperty(this, "toStringFormula", function (_params) {
      return _this3.category == 'calculated' ? simplifyFormula(_this3.formula, _params, _this3.category) : '';
    });

    this.name = replacePropertySeparator(name);
    this.category = max == min ? 'fixed' : _category;
    this.std = std;
    this.min = min;
    this.max = max;
    this.val = val;
    this.formula = replacePropertySeparator(formula);
  };

  var Indicator = /*#__PURE__*/function () {
    /*String*/

    /*String*/

    /* {max, min} */

    /*{method, property, stages, categories, flows} */
    function Indicator(name, objective, terms) {
      _classCallCheck(this, Indicator);

      _defineProperty(this, "name", void 0);

      _defineProperty(this, "objective", void 0);

      _defineProperty(this, "terms", void 0);

      this.name = name;
      this.objective = objective;
      var _ = {};

      for (var m in defaultMethods) {
        _[m] = _objectSpread2(_objectSpread2({}, defaultMethods[m]), terms[m] != null ? terms[m] : {});
      }

      this.terms = _;
      this.selectFlows();
    }

    _createClass(Indicator, [{
      key: "selectFlows",
      value: function selectFlows() {
        var _this4 = this;

        var _loop = function _loop(t) {
          var side = _this4.terms[t].method === 'Input' ? 1 : 0;
          var _this4$terms$t = _this4.terms[t];
          categories = _this4$terms$t.categories;
          stages = _this4$terms$t.stages;
          method = _this4$terms$t.method;
          property = _this4$terms$t.property;
          category = undefined;
          var parent = AMPLJS.getGraph().json.simulationData.categoriesResourceHierarchy; //this.terms[t]['flows'] = {}

          var nodes = AMPLJS.getGraph().nodes;
          var flows = AMPLJS.getGraph().flows;

          for (var n in nodes) {
            if (stages == null || stages.includes(nodes[n].stage)) {
              var connectedFlows = nodes[n].flows.reduce(function (t, f) {
                t[f] = flows[f];
                return t;
              }, {}); //if(connectedFlows.includes(undefined)) console.error('Erro ao selecionar os fluxos conectados');

              for (var f in connectedFlows) {
                if (method === 'Stock' || f.split('-')[side] === n) {
                  if (categories != null) {
                    category = connectedFlows[f].resource.category;

                    while (category != null && !categories.includes(category)) {
                      category = parent[category];
                    }

                    if (category == null) continue;
                  }

                  if (category != null) {
                    //this.terms[t]['flows'] = {}
                    _this4.terms[t]['flows'][f] = connectedFlows[f];
                    _this4.terms[t]['flows'][f]['property'] = property != null ? property + conector + flows[f].resource.category : defaultProperty;
                  }
                }
              }
            }
          }
        };

        for (var t in this.terms) {
          var categories, stages, method, property;
          var category;

          _loop(t);
        }
      }
    }, {
      key: "toStringProperties",
      value: function toStringProperties() {
        var str = '';

        for (var t in this.terms) {
          var flows = this.terms[t].flows;

          if (Object.keys(flows).length > 0) {
            for (var f in flows) {
              str += "\n\t".concat(t, ", ").concat(flows[f].toStringName(', '), ", ").concat(flows[f].property);
            }
          }
        }

        return str;
      }
    }, {
      key: "toStringMethods",
      value: function toStringMethods() {
        var str = '';

        for (var m in defaultMethods) {
          str += "\n\t".concat(m, ", ").concat(this.terms[m] == null ? defaultMethods[m] : this.terms[m].method);
        }

        return str;
      }
    }, {
      key: "getTermNodes",
      value: function getTermNodes() {
        var terms = AMPLJS.getGraph().indicator.terms;
        var selectedNodes = new Set();

        for (var t in terms) {
          if (terms[t].method === 'Stock') {
            var flows = terms[t].flows;

            for (var f in flows) {
              selectedNodes.add(flows[f].bottom.name);
              selectedNodes.add(flows[f].top.name);
            }
          }
        }

        return selectedNodes;
      }
    }]);

    return Indicator;
  }();

  var Resource =
  /*String*/

  /*String*/

  /*String*/

  /**String */
  function Resource(name, category, unit) {
    _classCallCheck(this, Resource);

    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "category", void 0);

    _defineProperty(this, "unit", void 0);

    this.name = name;
    this.category = category;
    this.unit = unit;
  };
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


  var NodeTypes = {
    'terminal_saida_producao': 'terminal',
    'terminal_saida_tratamento': 'terminal',
    'terminal_entrada_producao': 'terminal',
    'est_reuso': 'balance',
    'est_producao': 'station',
    //Ainda está faltando tipos?
    'est_tratamento': 'station',
    'soma_tratamento': 'sum',
    'soma_producao': 'sum'
  };
  var FlowTypes = {
    'Produção': 'PROD',
    'Tratamento': 'TREAT'
  };

  var simplifyFormula = function simplifyFormula(_formula, _params, paramType) {
    var formula = _formula.replace(/[A-Za-z_]{1,100}/g, function (name) {
      _params = _params || AMPLJS.getGraph().parameters;
      var param = _params[name];
      if (param != undefined) return param.toStringNameOrValue(_params);
      return name;
    });

    formula = math.simplify(formula).toString();
    if (paramType != 'calculated') formula = formula.replace(/[A-Za-z_]{1,100}/g, function (name) {
      return "val[\"".concat(name, "\"]");
    });
    formula = replaceExponentialOperator(formula);
    return formula;
  };

  function removeUselessCharsInNodeName(nodeName, type) {
    if (!(typeof nodeName == 'string')) return 'Nome do nó deve ser uma string, tipo recebido: ' + _typeof(nodeName);

    if (type === 'flow') {
      var nodesName = nodeName.split('-'); //Alguns nodes possuem - no nome.

      if (nodesName.length > 2) {
        for (var i in nodesName) {
          if (!nodesName[i].includes('_')) {
            nodesName[i - 1] = nodesName[i - 1] + nodesName[i];
            nodesName[i] = '';
          }
        }
      }

      nodesName = nodesName.filter(function (n) {
        return n.length > 0;
      });
      nodesName[0] = nodesName[0].substring(0, nodesName[0].lastIndexOf('_'));
      nodesName[1] = nodesName[1].substring(0, nodesName[1].lastIndexOf('_'));
      return nodesName.join('-');
    }

    return nodeName.substring(0, nodeName.lastIndexOf('_'));
  }

  function getTopAndBottomNodesOfFlow(flowString, _nodes) {
    var _names = flowString.split('-');

    var bottom = _nodes[_names[0]];
    var top = _nodes[_names[1]];
    if (bottom != null && top != null) return {
      bottom: bottom,
      top: top
    };else return {};
  }

  var replacePropertySeparator = function replacePropertySeparator() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return name.length > 0 ? name.replace(/#/g, conector) : '';
  };

  var conector = '_cerquilha_';
  var defaultMethods = {
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
  };
  var defaultProperty = '_1';

  function removeSpecialCharsFromResourceName(str) {
    var map = {
      '_': ' ',
      'a': 'á|à|ã|â|À|Á|Ã|Â',
      'e': 'é|è|ê|É|È|Ê',
      'i': 'í|ì|î|Í|Ì|Î',
      'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c': 'ç|Ç',
      'n': 'ñ|Ñ'
    }; //str = str.toLowerCase();

    for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }

    return str;
  }

  function getParameterCategory(p, optimizedParameters) {
    if (p.min == p.max) return 'fixed';
    if (optimizedParameters.includes(p.name)) return 'optimized';
    return 'fixed';
  }

  var replaceInvalidCharsWithSemicolon = function replaceInvalidCharsWithSemicolon(str) {
    var c = str.slice(-1);
    var invalidChars = ['', ' ', ',', '\n'];

    while (isInvalidChar(c, invalidChars)) {
      str = str.substring(0, str.length - 1);
      c = str.slice(-1);
    }

    return str + ';';
  };

  var isInvalidChar = function isInvalidChar() {
    var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var invalidChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return invalidChars.includes(char);
  };

  String.prototype.insertAt = function (element, position) {
    return "".concat(this.substring(0, position)).concat(element).concat(this.substring(position));
  };

  var removeComments = function removeComments(s) {
    return s.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');
  }; //const hasOnlyDigitsOnFormula = (formula) => typeof formula == 'string' ? formula.search(/[a-zA-Z_]/g) == -1 : false


  var replaceExponentialOperator = function replaceExponentialOperator(formula) {
    return formula.replace(/[\^]/g, '**');
  };
  /*
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
  */


  var ampljs = AMPLJS;
  var functions = {
    replaceExponentialOperator: replaceExponentialOperator,
    removeComments: removeComments,
    isInvalidChar: isInvalidChar,
    replaceInvalidCharsWithSemicolon: replaceInvalidCharsWithSemicolon,
    getParameterCategory: getParameterCategory,
    removeSpecialCharsFromResourceName: removeSpecialCharsFromResourceName,
    getTopAndBottomNodesOfFlow: getTopAndBottomNodesOfFlow,
    removeUselessCharsInNodeName: removeUselessCharsInNodeName,
    simplifyFormula: simplifyFormula
  };
  var types = {
    Node: Node,
    Flow: Flow,
    Resource: Resource,
    Parameter: Parameter,
    Indicator: Indicator
  };
  var AMPL = {
    ampljs: ampljs,
    functions: functions,
    types: types
  };
  /*module.exports = {
    AMPLJS: AMPLJS, 
    functions: {replaceExponentialOperator, removeComments, isInvalidChar, replaceInvalidCharsWithSemicolon, getParameterCategory, removeSpecialCharsFromResourceName, getTopAndBottomNodesOfFlow, removeUselessCharsInNodeName},
    types: {Node, Flow, Resource, Parameter, Indicator}}*/

  const AMPLJS$1 = AMPL.ampljs;

  var script$3 = Vue__default['default'].component("form-mais-precoce-ampl", {
    name: "form-mais-precoce-ampl",
    components: {
      Indicador: __vue_component__,
      Parametro: __vue_component__$1,
      MaximizeIndicator: __vue_component__$2,
      VCol: lib.VCol,
      VRow: lib.VRow,
      VBtn: lib.VBtn,
      VContainer: lib.VContainer,
      VForm: lib.VForm
    },
    props: ["jsonSimulation", "jsonIndicators"],
    methods: {
      validateForm: function () {},
      graph: function () {
        return {
          graph: AMPLJS$1.getGraph(),
          ampljs: AMPLJS$1,
        };
      },
      generate: function () {
        //const indicatorsJSON = JSON.stringify(this.indicators);
        this.isGenerateButtonLoading = true;
        const userData = {
          indicator: { ...this.selectedIndicator, objective: this.objective },
          parameters: this.selectedParameters.map((e) => ({ name: e })),
        };
        const script = AMPLJS$1.translate(
          this.jsonSimulation,
          JSON.stringify(userData),
          this.jsonIndicators
        );

        if (script != null) {
          this.forceFileDownload(script);
        }

        this.isGenerateButtonLoading = false;
      },
      forceFileDownload: function (file) {
        const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "simulation.mod"); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
      closeDialog: function () {
        this.$emit("close-dialog", false);
      },
    },
    computed: {
      params: function () {
        const simulation = JSON.parse(
          AMPLJS$1.getGraph().removeComments(this.jsonSimulation || "{}")
        );
        console.log(simulation);
        if (simulation["simulationData"] != undefined)
          return Object.entries(simulation["simulationData"]["parameters"])
            .filter((e) =>
              byFixedParameter(
                e,
                simulation["simulationData"]["systemParameters"]
              )
            )
            .filter((e) =>
              byIndicatorParameter(e, simulation, this.selectedIndicator)
            )
            .map((e) => ({
              name: e[0],
              ...e[1],
            }));
        else return [];
      },
      indicators: function () {
        if (
          typeof this.jsonIndicators === "string" &&
          this.jsonIndicators.length > 0
        )
          return JSON.parse(this.jsonIndicators);
        else return {};
      },
    },
    data: () => ({
      isGenerateButtonLoading: false,
      selectedIndicator: null,
      selectedParameters: null,
      objective: "maximize",
      simulation: {
        name: "Simulação realizada 1",
      },
      //lista de indicadores
    }),
  });

  const byFixedParameter = (e, systemParameters) =>
    typeof e[0] === "string" &&
    systemParameters[e[0]].min != systemParameters[e[0]].max;
  const byIndicatorParameter = (e, simulation = {}, selectedIndicator = {}) =>
    typeof e[0] === "string" &&
    selectedIndicator != null &&
    selectedIndicator["name"] in
      simulation["simulationData"]["indicatorParameters"] &&
    parameterIsNecessary(e, [
      ...simulation["simulationData"]["indicatorParameters"][
        selectedIndicator["name"]
      ]["default"],
      ...simulation["simulationData"]["indicatorParameters"][
        selectedIndicator["name"]
      ]["other"],
    ]);
  const parameterIsNecessary = (e, p) => Array.isArray(p) && p.includes(e[0]);

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "rotulo" },
      [
        _c(
          "v-form",
          [
            _c(
              "v-container",
              [
                _c(
                  "v-row",
                  [
                    _c("v-col", { attrs: { cols: "12" } }, [
                      _c("h1", [_vm._v(_vm._s(_vm.simulation.name))])
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-row",
                  [
                    _c("v-col", { attrs: { cols: "12" } }, [
                      _c("h4", [_vm._v("Indicadores")])
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "12" } },
                      [
                        _c("Indicador", {
                          key: _vm.jsonIndicators,
                          attrs: { indicators: _vm.indicators },
                          on: {
                            updateIndicator: function($event) {
                              _vm.selectedIndicator = $event;
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "12" } },
                      [
                        _c("h4", [_vm._v("Maximizar ou minimizar?")]),
                        _vm._v(" "),
                        _c("MaximizeIndicator", {
                          on: {
                            updateObjective: function($event) {
                              _vm.objective = $event;
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "12" } },
                      [
                        _c("h4", [_vm._v("Parâmetros")]),
                        _vm._v(" "),
                        _c("Parametro", {
                          key: _vm.jsonSimulation,
                          attrs: { params: _vm.params },
                          on: {
                            addParam: function($event) {
                              _vm.selectedParameters = $event;
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      {
                        staticClass: "d-flex justify-space-between",
                        attrs: { cols: "12" }
                      },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "disabled" },
                            on: { click: _vm.closeDialog }
                          },
                          [_vm._v("Cancelar")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex justify-end" },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  color: "success",
                                  loading: _vm.isGenerateButtonLoading
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generate()
                                  }
                                }
                              },
                              [_vm._v("Gerar")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return
      inject("data-v-1df19ea4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FormNewOptimization.vue"}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$3 = "data-v-1df19ea4";
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('FormMaisPrecoceAmpl', __vue_component__$3);
  } // Cria a definição do módulo para Vue.use()

  var plugin = {
    install: install
  }; // Auto-instala quando o Vue é encontrado (no navegador via <script>)

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  } // Para permitir o uso como um módulo exportável (npm/webpack/etc.)

  exports.default = __vue_component__$3;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
