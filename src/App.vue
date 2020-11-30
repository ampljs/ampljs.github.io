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
import HomePage from "./components/HomePage"

export default {
  name: 'App',

  components: {
    HomePage,
  },

  data: () => ({
    //
  }),
};
</script>
