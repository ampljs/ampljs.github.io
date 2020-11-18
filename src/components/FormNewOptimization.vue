<template>
  <div class="rotulo">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>{{ simulation.name }}</h1>
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
import MaximizeIndicator from "./MaximizeIndicator";
import AMPL from "../plugins/ampljs/ampl";
const AMPLJS = AMPL.ampljs;

export default Vue.component("FormNewOptimization", {
  components: { Indicador, Parametro, MaximizeIndicator },
  props: ["jsonSimulation", "jsonIndicators"],
  methods: {
    validateForm: function () {},
    graph: function () {
      return AMPLJS.getGraph();
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
        AMPLJS.getGraph().removeComments(this.jsonSimulation)
      );
      return Object.entries(simulation["simulationData"]["systemParameters"])
        .map((e) => ({
          name: e[0],
          ...e[1],
          disabled: e[1].min === e[1].max,
        }))
        .filter((e) => !e.disabled);
    },
    indicators: function () {
      return JSON.parse(this.jsonIndicators);
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
</script>

<style scoped>
</style>

