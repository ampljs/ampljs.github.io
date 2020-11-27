<template>
  <div class="select">
    <v-select
      label="Selecione um indicador"
      v-on:change="updateIndicator($event)"
      :items="indicatorsList"
      item-text="name"
      item-value="id"
      required
      persistent-hint
      return-object
      no-data-text="Nenhum indicador disponível"
    >
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("Indicador", {
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
  },
});
</script>
