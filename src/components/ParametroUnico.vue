<template>
    <div class="parametros">          
          <v-col cols="12" >         

            <!-- ADICIONANDO SELECT MULTIPLO -->
            <v-select
              v-on:change="addParam($event)"
              :items="params"
              hint="A lista de Parâmetros possui apenas os Parâmetros utilizados no cálculo do indicador selecionado"
              chips
              deletable-chips
              solo
              multiple
              label="Selecione os parâmetros que deseja flexibilizar"
              item-text="name"
              eager
              item-value="name"
              no-data-text="Sem parâmetros para selecionar"
              persistent-hint
            />
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
