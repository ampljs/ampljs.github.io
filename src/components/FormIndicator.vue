<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" elevation="2" color="primary" class="d-flex align-center" x-large><v-icon>mdi-clipboard-play</v-icon></v-btn>
      </template>
      <v-card>
          <FormNewOptimization @closeDialog="dialog = $event" :jsonIndicators="jsonIndicators" :jsonSimulation="jsonSimulation"/>
      </v-card>
        
    </v-dialog>
  </v-row>
</template>

<script>
import FormNewOptimization from "./FormNewOptimization";
import Vue from "vue";
export default Vue.component("FormIndicator", {
  name: "FormIndicator",
  components: { FormNewOptimization },
  props: ["jsonIndicators", "jsonSimulation"],
  data: () => ({
    dialog: false,
  }),
});
</script>