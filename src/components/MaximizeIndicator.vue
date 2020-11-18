<template>
<v-btn-toggle v-on:change="updateObjective($event)" dense rounded mandatory>
    <v-btn        
        value="maximize"
        active-class="blue white--text"
        rounded
        >maximizar</v-btn
      >
      <v-btn
        value="minimize"
        active-class="blue white--text"
        rounded
        >minimizar</v-btn
      >
</v-btn-toggle>
  
</template>
<script>
export default {
  name: "MaximizeIndicator",
  data: () => ({
      value: 'maximize'
  }),
  methods:{
    updateObjective:function (value) {
      this.$emit('updateObjective', value)
    }
  }
};
</script>