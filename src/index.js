import Vue from "vue";
import FormNewOptimization from "./components"

export default {
    install(Vue, options) {
        Vue.component('form-mais-precoce-ampl', FormNewOptimization)
    }
}