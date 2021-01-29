<template>
  <v-app>
    <v-main>
      <div class="d-flex align-center">
        <HomePage/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import FormMaisPrecoceAmpl from "./components/FormNewOptimization.vue"

export default {
  name: 'form-mais-precoce-ampl',

  components: {
    FormMaisPrecoceAmpl,
  },

  data: () => ({
    //
  }),
};
</script>
