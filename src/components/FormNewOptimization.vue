<template>
  <div class="rotulo">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>{{ simulationName }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h4>Indicadores</h4>
          </v-col>
          <v-col cols="12">
            <!-- COMPONENTE PARA SELEÇÃO DO INDICADOR -->
            <Indicador
              :indicators="indicators"
              :key="jsonIndicators"
              @updateIndicator="selectedIndicator = $event"
            />
          </v-col>

          <v-col cols="12">
            <h4>Maximizar ou minimizar?</h4>
            <MaximizeIndicator @updateObjective="objective = $event" />
          </v-col>

          <v-col cols="12">
            <h4>Parâmetros</h4>
            <!-- COMPONENTE PARA SELEÇÃO DO PARÂMETRO -->
            <Parametro
              :key="jsonSimulation"
              :params="params"
              @addParam="selectedParameters = $event"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-space-between">
            <v-btn color="disabled" @click="closeDialog">Cancelar</v-btn>
            <div class="d-flex justify-end">
              <v-btn
                color="success"
                @click="generate()"
                :loading="isGenerateButtonLoading"
                >Gerar</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Indicador from "./Indicador.vue";
import Vue from "vue";
import Parametro from "./ParametroUnico.vue";
import MaximizeIndicator from "./MaximizeIndicator.vue";
import AMPL from "../plugins/ampljs/ampl";
const AMPLJS = AMPL.ampljs;

export default Vue.component("form-mais-precoce-ampl", {
  name: "form-mais-precoce-ampl",
  components: { Indicador, Parametro, MaximizeIndicator },
  props: ["jsonSimulation", "jsonIndicators", "simulationName", "resultFileName", 'onGenerate'],
  methods: {
    validateForm: function () {},
    graph: function () {
      return {
        graph: AMPLJS.getGraph(),
        ampljs: AMPLJS,
      };
    },
    generate: function () {
      //const indicatorsJSON = JSON.stringify(this.indicators);
      this.isGenerateButtonLoading = true;
      const userData = {
        indicator: { ...this.selectedIndicator, objective: this.objective },
        parameters: this.selectedParameters.map((e) => ({ name: e })),
      };
      const script = AMPLJS.translate(
        this.jsonSimulation,
        JSON.stringify(userData),
        this.jsonIndicators
      );

      if (script != null) {
        this.forceFileDownload(script);
      }

      if(typeof this.onGenerate === 'function') this.onGenerate();

      this.isGenerateButtonLoading = false;
    },
    forceFileDownload: function (file) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${typeof this.resultFileName === 'string' ? this.resultFileName : 'simulation'}.mod`); //or any other extension
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
        AMPLJS.getGraph().removeComments(this.jsonSimulation || "{}")
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
</script>

<style scoped>
</style>

