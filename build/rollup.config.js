import commonjs from '@rollup/plugin-commonjs'; // Converte módulos CommonJS para ES6
import vue from 'rollup-plugin-vue'; // Manipula arquivos .vue
import babel from "rollup-plugin-babel"
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: 'src/wrapper.js', // Caminho relativo ao package.json
  output: {
    name: 'FormMaisPrecoceAmpl',
    exports: 'named',
    globals:{
        'form-mais-precoce-ampl': 'FormNewOptimization'
    }
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    vue({
      css: true, // Dinamicamente injeta CSS como uma tag <style>
      compileTemplate: true, // Explicitamente converte template para função render
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpersWhitelist: ['objectSpread'],
      runtimeHelpers: true,
      plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-class-properties'],
      //presets: [['env', { modules: false }]],
    }),
  ],
};