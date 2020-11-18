<template>
  <v-dialog v-model="mantainOpened" max-width="500px">
    <v-alert dismissible type="error"></v-alert>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.component("ErrorModal", {
  props: {
    closeIn: { type: integer },
  },
  computed: {
    mantainOpened: function () {
      return new Date() < closeIn;
    },
  },
});
</script>