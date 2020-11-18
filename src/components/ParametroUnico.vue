<template>
    <div class="parametros">

        
          
          <v-col cols="12" >         

            <!-- ADICIONANDO SELECT MULTIPLO -->
            <!-- Inicio do autocomplete -->
            <v-autocomplete
              v-on:change="addParam($event)"
              :items="params"
              hint="Parâmetros fixos não podem ser selecionados"
              chips
              multiple
              label="Selecione os parâmetros que deseja flexibilizar"
              item-text="name"
              item-value="name"
              no-data-text="Sem parâmetros para selecionar"
              persistent-hint
            >
            </v-autocomplete>
          </v-col>
     
    </div>
    
</template>

<script>
export default {
    props: ['params'],
    data: () => ({
        //parâmetros para seleção
      autoUpdate: true,
     
    }),
  methods: {
    addParam: function (param) {
      this.$emit('addParam', param)
    },
  }
    
}
</script>

<style scoped>
    .msg{
        color:#CCCCCC;
        font-style: italic;
        font-size: 0.9em;
    }
</style>>
