import commonjs from '@rollup/plugin-commonjs'; // Converte módulos CommonJS para ES6
import vue from 'rollup-plugin-vue'; // Manipula arquivos .vue
import babel from "@rollup/plugin-babel"
import vuetify from "rollup-plugin-vuetify"
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: 'src/wrapper.js', // Caminho relativo ao package.json
  output: {
    name: 'FormMaisPrecoceAmpl',
    exports: 'named',
    globals:{
        'form-mais-precoce-ampl': 'FormNewOptimization',
        "vue":"Vue",
        "vuetify/lib": "Vuetify"
    }
  },
  external: ["vue", "vuetify/lib"],
  plugins: [
    commonjs(),
    nodeResolve(),
    vue({
      css: true, // Dinamicamente injeta CSS como uma tag <style>
      compileTemplate: true, // Explicitamente converte template para função render
    }),
    babel({
      exclude: 'node_modules/**',
      //externalHelpersWhitelist: ['objectSpread'],
      babelHelpers: 'runtime',
      plugins: ["@babel/plugin-proposal-class-properties"],
      presets: [['@babel/preset-env', { modules: false }]],
    }),
    vuetify()
  ],
};