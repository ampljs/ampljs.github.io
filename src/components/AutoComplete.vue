<template>
    <div class="select">
        <!-- Inicio do autocomplete -->
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                filled
                chips
                label="Selecione o Parâmetro"
                item-text="name"
                item-value="name"
                persistent-hint :rules="paramRules"
                multiple
                v-on:input="limiter"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                   
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <!-- Final do autocomplete -->
    </div>
</template>

<script>
export default {
    data () {
        return {
        autoUpdate: true,
        friends: ['Parâmetro 1', 'Parâmetro 3'],
        isUpdating: false,
        people: [
            { name: 'Parâmetro 1'},
            { name: 'Parâmetro 2'},
            { name: 'Parâmetro 3'},
            { name: 'Parâmetro 4'},
            { name: 'Parâmetro 5'},
            { name: 'Parâmetro 6'},
            { name: 'Parâmetro 7'},
            { name: 'Parâmetro 8'},
        ],
        paramRules: [
        v => !!v || 'Selecione um parâmetro',
        ]
        }
        
    },

    watch: {
        isUpdating (val) {
        if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
        }
        },
    },

    methods: {
        remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
        },
        removeAll () {
        //const index = this.friends.indexOf(item.name)
          this.friends.splice()
        },
        limiter(e) {
          if(e.length > 6) {
            //melhorar mensagem de erro
            alert(' você só pode selecionar até 6 parâmetros!')
            e.pop()
          }
        }
    },
}
</script>