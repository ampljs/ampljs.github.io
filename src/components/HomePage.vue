<template>
  <v-content>
    <v-row>
      <v-col cols="6" >
          <v-textarea class="d-flex justify-space-between align-center" outlined rows="25" v-model="jsonSimulation" label="JSON SIMULAÇÃO" full-width/>
        </v-col>
        <v-col cols="6">
          <v-textarea class="d-flex justify-space-between align-center" outlined rows="25" v-model="jsonIndicators" label="JSON INDICADORES" full-width/>
        </v-col>
    </v-row>
     <div class="d-flex justify-xl-space-around">
        <ModalIndicator :jsonIndicators="jsonIndicators" :jsonSimulation="jsonSimulation"/>
      </div>
    
  </v-content>
</template>
<script>
import ModalIndicator from "./FormIndicator";
export default {
  name: "HomePage",
  components: { ModalIndicator },
  data: () => ({
    jsonIndicators: JSON_INDICATORS,
    jsonSimulation: JSON_SIMULATION
  }),
};



const JSON_INDICATORS = JSON.stringify({
  i1: {
    name: 'Preço de bovinos comprados, kg PV',
    description: 'Preço médio do peso vivo de bovinos comprados.',
    unit: 'R$/kgPV',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Output',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i2: {
    name: 'Preço de bovinos vendidos, kg PV',
    description: 'Preço médio do peso vivo de bovinos vendidos.',
    unit: 'R$/kgPV',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Input',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i3: {
    name: 'Custo total',
    description: 'Custo total.',
    unit: 'R$',
    group: 'Econômicos',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal']
      }
    }
  },
  i4: {
    name: 'Receita total',
    description: 'Receita total.',
    unit: 'R$',
    group: 'Econômicos',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal']
      }
    }
  },
  i5: {
    name: 'Rebanho, cab',
    description: 'Rebanho bovino total em cabeças.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['BOVINOS']
      }
    }
  },
  i6: {
    name: 'Rebanho, kg PV',
    description: 'Rebanho bovino total em kg de peso vivo.',
    unit: 'kgPV',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      }
    }
  },
  i7: {
    name: 'Nulíparas',
    description: 'Qtde de Nulíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['NULIPARAS']
      }
    }
  },
  i8: {
    name: 'Primíparas',
    description: 'Qtde de Primíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['PRIMIPARAS']
      }
    }
  },
  i9: {
    name: 'Multíparas',
    description: 'Qtde de Multíparas, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['MULTIPARAS']
      }
    }
  },
  i10: {
    name: 'Matrizes',
    description: 'Qtde de Matrizes, média no ano.',
    unit: 'cab',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        categories: ['NULIPARAS', 'PRIMIPARAS', 'MULTIPARAS']
      }
    }
  },
  i11: {
    name: 'Desfrute',
    description: 'Qtde de animais vendidos no ano subtraída dos animais comprados no ano dividido pelo rebanho médio, em cabeças.',
    unit: '%cab',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        categories: ['BOVINOS']
      }
    }
  },
  i12: {
    name: 'Desfrute',
    description: 'Peso dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo rebanho médio, em kg.',
    unit: '%kg',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        property: 'PESO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      }
    }
  },
  i13: {
    name: 'Desfrute',
    description: 'Valor dos animais vendidos no ano subtraído dos animais comprados no ano dividido pelo valor médio do rebanho.',
    unit: '%kg',
    group: 'Produção',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      N2: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        property: 'PRECO',
        categories: ['BOVINOS']
      }
    }
  },
  i14: {
    name: 'CO2eq',
    description: "Emissões de gases de efeito estufa totais do 'berço ao portão'.",
    unit: 'kg CO2eq',
    group: 'Emissões',
    terms: {
      N1: {
        method: 'Output',
        categories: ['GEE']
      },
      N2: {
        method: 'Output',
        property: 'CO2EQ',
        stages: ['terminal']
      }
    }
  },
  i15: {
    name: 'Preço de bovinos comprados, @',
    description: 'Preço médio da arroba de bovinos comprados.',
    unit: 'R$/@',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Output',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Output',
        property: 'ARROBA',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i16: {
    name: 'Preço de bovinos vendidos, @',
    description: 'Preço médio da arroba de bovinos vendidos.',
    unit: 'R$/@',
    group: 'Compras',
    terms: {
      N1: {
        method: 'Input',
        property: 'PRECO',
        stages: ['terminal'],
        categories: ['BOVINOS']
      },
      D1: {
        method: 'Input',
        property: 'ARROBA',
        stages: ['terminal'],
        categories: ['BOVINOS']
      }
    }
  },
  i17: {
    name: 'Taxa de Lotação',
    description: 'Taxa de lotação em kg de peso vivo por ha.',
    unit: 'kgPV/ha',
    group: 'Rebanho',
    terms: {
      N1: {
        method: 'Stock',
        property: 'PESO',
        categories: ['BOVINOS']
      },
      D1: {
        method: 'AREA_PRODUCAO'
      }
    }
  }}, '', '   ')

  const JSON_SIMULATION = `/* Falta:
Exemplos de valores de Parâmetros do Modelo: min, max, std, fixed;
Exemplos de Parâmetros do Modelo calculados por Fórmulas;
Exemplos de Fórmulas: de Duração, de Fluxos;
Categorias de Recursos: As necessárias para Indicadores;
Diferenciar Recursos: Cada Estação com só um de cada;
Outros Fluxos Terminais, seus Recursos e Categorias: Perdas, Insumos;
Infraestrutura, seus Recursos, Categorias e Nós de Manutenção: Área, Touros, Equiptos, Pessoal, Instalacões;
Parâmetros e Fórmulas "reais"; Códigos, valores da simulação, valores do modelo.
*/
    {
    "idSimulation": "68ca096d-4702-496e-8284-fc5f827ecc7f",
    "idSystem": 72,
    "idModel": 18,
    "simulationData": {
        "ARROBA": 15,
        "graph": {
            "nodes": {
/* Início da Cadeia 0 */
                "n_1_VeBg_Venda de bois gordos.": {
                    "formula": "CONFINAMENTO+INICIO_AGUAS",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_2_TeBm_Terminação em confinamento de bois magros.-n_1_VeBg_Venda de bois gordos."
                    ],
                    "duration": 200,
                    "type": "terminal_saida_producao"
                },
                "n_2_TeBm_Terminação em confinamento de bois magros.": {
                    "formula": "CONFINAMENTO",
                    "stages": [
                        "Confinamento"
                    ],
                    "flows": [
                        "n_2_TeBm_Terminação em confinamento de bois magros.-n_1_VeBg_Venda de bois gordos.",
                        "n_3_AgBo_Recria nas águas de bezerros.-n_2_TeBm_Terminação em confinamento de bois magros."
                    ],
                    "duration": 110,
                    "type": "est_producao"
                },
                "n_3_AgBo_Recria nas águas de bezerros.": {
                    "formula": "AGUAS",
                    "stages": [
                        "Recria nas águas"
                    ],
                    "flows": [
                        "n_3_AgBo_Recria nas águas de bezerros.-n_2_TeBm_Terminação em confinamento de bois magros.",
                        "n_8_SeBo_Recria na seca de bezerros.-n_3_AgBo_Recria nas águas de bezerros."
                    ],
                    "duration": 212,
                    "type": "est_producao"
                },
                "n_8_SeBo_Recria na seca de bezerros.": {
                    "formula": "SECA",
                    "stages": [
                        "Recria na seca"
                    ],
                    "flows": [
                        "n_8_SeBo_Recria na seca de bezerros.-n_3_AgBo_Recria nas águas de bezerros.",
                        "b_12_1_Bo_Balanço de bezerros desmamados.-n_8_SeBo_Recria na seca de bezerros."
                    ],
                    "duration": 153,
                    "type": "est_producao"
                },
                "b_12_1_Bo_Balanço de bezerros desmamados.": {
                    "formula": "0",
                    "stages": [
                        "Balanço"
                    ],
                    "flows": [
                        "b_12_1_Bo_Balanço de bezerros desmamados.-n_8_SeBo_Recria na seca de bezerros.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-b_12_1_Bo_Balanço de bezerros desmamados.",
                        "s_53_1_Bo_Balanço de bezerros desmamados.-b_12_1_Bo_Balanço de bezerros desmamados."
                    ],
                    "duration": 0,
                    "type": "est_reuso"
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Aleitamento"
                    ],
                    "flows": [
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-b_12_1_Bo_Balanço de bezerros desmamados.",
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-n_16_AlMp_Aleitamento de multíparas prenhes.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-n_18_ReMs_Reserva na seca de multíparas.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-n_19_BaMp_Venda de bezerras desmamadas.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-s_20_10_GeMs_Gestação na seca de multíparas solteiras.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-s_21_4_EnMs_Engorda na seca de multíparas."
                    ],
                    "duration": 31,
                    "type": "est_producao"
                },
                "n_17_DiMp_Diagnose de prenhez de multíparas paridas.": {
                    "formula": "DIAGNOSE",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-n_16_AlMp_Aleitamento de multíparas prenhes.",
                        "n_25_MoMp_Monta de multíparas paridas.-n_17_DiMp_Diagnose de prenhez de multíparas paridas.",
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras.",
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas."
                    ],
                    "duration": 59,
                    "type": "est_producao"
                },
                "n_25_MoMp_Monta de multíparas paridas.": {
                    "formula": "MONTA",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "n_25_MoMp_Monta de multíparas paridas.-n_17_DiMp_Diagnose de prenhez de multíparas paridas.",
                        "n_35_PuMp_Puerpério de multíparas.-n_25_MoMp_Monta de multíparas paridas.",
                        "n_25_MoMp_Monta de multíparas paridas.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras."
                    ],
                    "duration": 92,
                    "type": "est_producao"
                },
                "n_35_PuMp_Puerpério de multíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Puerpério"
                    ],
                    "flows": [
                        "n_35_PuMp_Puerpério de multíparas.-n_25_MoMp_Monta de multíparas paridas.",
                        "b_42_3_Mp_Balanço de multíparas paridas.-n_35_PuMp_Puerpério de multíparas.",
                        "n_35_PuMp_Puerpério de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras.",
                        "n_35_PuMp_Puerpério de multíparas.-n_44_AlMv_Aleitamento de multíparas vazias."
                    ],
                    "duration": 30,
                    "type": "est_producao"
                },
                "b_42_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "0",
                    "stages": [
                        "Balanço"
                    ],
                    "flows": [
                        "b_42_3_Mp_Balanço de multíparas paridas.-n_35_PuMp_Puerpério de multíparas.",
                        "n_48_GePs_Gestação na seca de primíparas solteiras.-b_42_3_Mp_Balanço de multíparas paridas.",
                        "s_92_3_Mp_Balanço de multíparas paridas.-b_42_3_Mp_Balanço de multíparas paridas."
                    ],
                    "duration": 0,
                    "type": "est_reuso"
                },
                "n_48_GePs_Gestação na seca de primíparas solteiras.": {
                    "formula": "SECA",
                    "stages": [
                        "Gestação na seca"
                    ],
                    "flows": [
                        "n_48_GePs_Gestação na seca de primíparas solteiras.-b_42_3_Mp_Balanço de multíparas paridas.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-n_48_GePs_Gestação na seca de primíparas solteiras.",
                        "n_48_GePs_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento."                    
                    ],
                    "duration": 153,
                    "type": "est_producao"
                },
                "n_59_AlPp_Aleitamento de primíparas prenhes.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Aleitamento"
                    ],
                    "flows": [
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-n_48_GePs_Gestação na seca de primíparas solteiras.",
                        "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-n_59_AlPp_Aleitamento de primíparas prenhes.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-s_53_1_Bo_Balanço de bezerros desmamados.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-n_19_BaPp_Venda de bezerras desmamadas.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-s_72_14_RePs_Reserva na seca de primíparas falhadas."
                    ],
                    "duration": 31,
                    "type": "est_producao"
                },
                "n_69_DiPp_Diagnose de prenhez de primíparas paridas.": {
                    "formula": "DIAGNOSE",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-n_59_AlPp_Aleitamento de primíparas prenhes.",
                        "n_85_MoPp_Monta de primíparas paridas.-n_69_DiPp_Diagnose de prenhez de primíparas paridas.",
                        "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras."
                    ],
                    "duration": 59,
                    "type": "est_producao"
                },
                "n_85_MoPp_Monta de primíparas paridas.": {
                    "formula": "MONTA",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "n_85_MoPp_Monta de primíparas paridas.-n_69_DiPp_Diagnose de prenhez de primíparas paridas.",
                        "n_101_PuPp_Puerpério de primíparas.-n_85_MoPp_Monta de primíparas paridas.",
                        "n_85_MoPp_Monta de primíparas paridas.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras."
                    ],
                    "duration": 92,
                    "type": "est_producao"
                },
                "n_101_PuPp_Puerpério de primíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Puerpério"
                    ],
                    "flows": [
                        "n_101_PuPp_Puerpério de primíparas.-n_85_MoPp_Monta de primíparas paridas.",
                        "n_112_GeNu_Gestação na seca de nulíparas.-n_101_PuPp_Puerpério de primíparas.",
                        "n_101_PuPp_Puerpério de primíparas.-s_169_12_MoPs_Monta de primíparas solteiras."
                    ],
                    "duration": 30,
                    "type": "est_producao"
                },
                "n_112_GeNu_Gestação na seca de nulíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Gestação na seca"
                    ],
                    "flows": [
                        "n_112_GeNu_Gestação na seca de nulíparas.-n_101_PuPp_Puerpério de primíparas.",
                        "n_112_GaNu_Gestação nas águas de nulíparas.-n_112_GeNu_Gestação na seca de nulíparas.",
                        "n_112_GeNu_Gestação na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas."
                    ],
                    "duration": 153,
                    "type": "est_producao"
                },
                "n_112_GaNu_Gestação nas águas de nulíparas.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Gestação na seca"
                    ],
                    "flows": [
                        "n_112_GaNu_Gestação nas águas de nulíparas.-n_112_GeNu_Gestação na seca de nulíparas.",
                        "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_112_GaNu_Gestação nas águas de nulíparas.",
                        "n_112_GaNu_Gestação nas águas de nulíparas.-s_118_13_EnNu_Engorda na seca de nulíparas."
                    ],
                    "duration": 31,
                    "type": "est_producao"
                },
                "n_117_DiNu_Diagnose de prenhez de nulíparas.": {
                    "formula": "DIAGNOSE",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_112_GaNu_Gestação nas águas de nulíparas.",
                        "n_128_MoNu_Monta de nulíparas.-n_117_DiNu_Diagnose de prenhez de nulíparas.",
                        "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_129_EaNu1_Engorda nas águas de nulíparas falhadas."
                    ],
                    "duration": 59,
                    "type": "est_producao"
                },
                "n_128_MoNu_Monta de nulíparas.": {
                    "formula": "MONTA",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "n_128_MoNu_Monta de nulíparas.-n_117_DiNu_Diagnose de prenhez de nulíparas.",
                        "n_138_AgNu_Recria nas águas de nulíparas.-n_128_MoNu_Monta de nulíparas."
                    ],
                    "duration": 92,
                    "type": "est_producao"
                },
                "n_138_AgNu_Recria nas águas de nulíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Recria nas águas"
                    ],
                    "flows": [
                        "n_138_AgNu_Recria nas águas de nulíparas.-n_128_MoNu_Monta de nulíparas.",
                        "n_156_SeNu_Recria na seca de nulíparas.-n_138_AgNu_Recria nas águas de nulíparas."
                    ],
                    "duration": 30,
                    "type": "est_producao"
                },
                "n_156_SeNu_Recria na seca de nulíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Recria na seca"
                    ],
                    "flows": [
                        "n_156_SeNu_Recria na seca de nulíparas.-n_138_AgNu_Recria nas águas de nulíparas.",
                        "n_173_AgBa_Recria nas águas de bezerras.-n_156_SeNu_Recria na seca de nulíparas."
                    ],
                    "duration": 153,
                    "type": "est_producao"
                },
                "n_173_AgBa_Recria nas águas de bezerras.": {
                    "formula": "AGUAS",
                    "stages": [
                        "Recria nas águas"
                    ],
                    "flows": [
                        "n_173_AgBa_Recria nas águas de bezerras.-n_156_SeNu_Recria na seca de nulíparas.",
                        "n_185_SeBa_Recria na seca de bezerras.-n_173_AgBa_Recria nas águas de bezerras."
                    ],
                    "duration": 212,
                    "type": "est_producao"
                },
                "n_185_SeBa_Recria na seca de bezerras.": {
                    "formula": "SECA",
                    "stages": [
                        "Recria na seca"
                    ],
                    "flows": [
                        "n_185_SeBa_Recria na seca de bezerras.-n_173_AgBa_Recria nas águas de bezerras.",
                        "n_207_CoBa_Compra de bezerras desmamadas.-n_185_SeBa_Recria na seca de bezerras."
                    ],
                    "duration": 153,
                    "type": "est_producao"
                },
                "n_207_CoBa_Compra de bezerras desmamadas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_207_CoBa_Compra de bezerras desmamadas.-n_185_SeBa_Recria na seca de bezerras."
                    ],
                    "duration": 0,
                    "type": "est_producao"
                },
/* Fim da Cadeia 0 */
/* Início da Cadeia 1 */
                "n_129_EaNu1_Engorda nas águas de nulíparas falhadas.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Engorda nas águas"
                    ],
                    "flows": [
                        "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_129_EaNu1_Engorda nas águas de nulíparas falhadas.",
                        "n_129_EaNu1_Engorda nas águas de nulíparas falhadas.-s_118_13_EnNu_Engorda na seca de nulíparas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "s_118_13_EnNu_Engorda na seca de nulíparas.": {
                    "formula": "0",
                    "stages": [
                        "Engorda na seca"
                    ],
                    "flows": [
                        "n_129_EaNu1_Engorda nas águas de nulíparas falhadas.-s_118_13_EnNu_Engorda na seca de nulíparas.",
                        "s_118_13_EnNu_Engorda na seca de nulíparas.-n_144_EnNu_Engorda na seca de nulíparas.",
                        "n_112_GaNu_Gestação nas águas de nulíparas.-s_118_13_EnNu_Engorda na seca de nulíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_144_EnNu_Engorda na seca de nulíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Engorda na seca"
                    ],
                    "flows": [
                        "s_118_13_EnNu_Engorda na seca de nulíparas.-n_144_EnNu_Engorda na seca de nulíparas.",
                        "n_144_EnNu_Engorda na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
                "s_118_13_EaNu2_Engorda nas águas de nulíparas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_144_EnNu_Engorda na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas.",
                        "s_118_13_EaNu2_Engorda nas águas de nulíparas.-n_144_EaNu2_Engorda nas águas de nulíparas.",
                        "n_112_GeNu_Gestação na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_144_EaNu2_Engorda nas águas de nulíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Engorda nas águas"
                    ],
                    "flows": [
                        "s_118_13_EaNu2_Engorda nas águas de nulíparas.-n_144_EaNu2_Engorda nas águas de nulíparas.",
                        "n_144_EaNu2_Engorda nas águas de nulíparas.-n_162_VeNg_Venda de nulíparas gordas."
                    ],
                    "duration": 30,
                    "type": "est_tratamento"
                },
                "n_162_VeNg_Venda de nulíparas gordas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_144_EaNu2_Engorda nas águas de nulíparas.-n_162_VeNg_Venda de nulíparas gordas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
/* Fim da Cadeia 1 */
/* Início da Cadeia 2 */
                "s_169_12_MoPs_Monta de primíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_101_PuPp_Puerpério de primíparas.-s_169_12_MoPs_Monta de primíparas solteiras.",
                        "s_169_12_MoPs_Monta de primíparas solteiras.-n_113_MoPs_Monta de primíparas solteiras.",
                        "n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.-s_169_12_MoPs_Monta de primíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_113_MoPs_Monta de primíparas solteiras.": {
                    "formula": "MONTA",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "s_169_12_MoPs_Monta de primíparas solteiras.-n_113_MoPs_Monta de primíparas solteiras.",
                        "n_113_MoPs_Monta de primíparas solteiras.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras."
                    ],
                    "duration": 92,
                    "type": "est_tratamento"
                },
                "s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "n_113_MoPs_Monta de primíparas solteiras.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.",
                        "s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.-n_122_DiPs_Diagnose de prenhez de primíparas solteiras.",
                        "n_85_MoPp_Monta de primíparas paridas.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.": {
                    "formula": "DIAGNOSE",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.-n_122_DiPs_Diagnose de prenhez de primíparas solteiras.",
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras.",
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_134_RaPs1_Reserva nas águas de primíparas falhadas.",
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_190_EaPs1_Engorda nas águas de primíparas falhadas."
                    ],
                    "duration": 59,
                    "type": "est_tratamento"
                },
                "s_86_11_GaPs_Gestação nas águas de primíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "Gestação nas águas"
                    ],
                    "flows": [
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras.",
                        "s_86_11_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GaPs_Gestação nas águas de primíparas solteiras.",
                        "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_133_GaPs_Gestação nas águas de primíparas solteiras.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Gestação nas águas"
                    ],
                    "flows": [
                        "s_86_11_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GaPs_Gestação nas águas de primíparas solteiras.",
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GePs1_Gestação na seca de primíparas solteiras.",
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_72_14_RePs_Reserva na seca de primíparas falhadas.",
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_199_17_EnPs_Engorda na seca de primíparas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "n_133_GePs1_Gestação na seca de primíparas solteiras.": {
                    "formula": "SECA",
                    "stages": [
                        "Gestação nas águas"
                    ],
                    "flows": [
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GePs1_Gestação na seca de primíparas solteiras.",
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.",
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.",                        
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_199_17_EaPs2_Engorda nas águas de primíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
/* Fim da Cadeia 2 */
/* Início da Cadeia 3 */
                "n_134_RaPs1_Reserva nas águas de primíparas falhadas.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Reserva nas águas"
                    ],
                    "flows": [
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_134_RaPs1_Reserva nas águas de primíparas falhadas.",
                        "n_134_RaPs1_Reserva nas águas de primíparas falhadas.-s_72_14_RePs_Reserva na seca de primíparas falhadas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "s_72_14_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_134_RaPs1_Reserva nas águas de primíparas falhadas.-s_72_14_RePs_Reserva na seca de primíparas falhadas.",
                        "s_72_14_RePs_Reserva na seca de primíparas falhadas.-n_152_RePs_Reserva na seca de primíparas falhadas.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-s_72_14_RePs_Reserva na seca de primíparas falhadas.",
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_72_14_RePs_Reserva na seca de primíparas falhadas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_152_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "SECA",
                    "stages": [
                        "Reserva na seca"
                    ],
                    "flows": [
                        "s_72_14_RePs_Reserva na seca de primíparas falhadas.-n_152_RePs_Reserva na seca de primíparas falhadas.",
                        "n_152_RePs_Reserva na seca de primíparas falhadas.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
                "s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_152_RePs_Reserva na seca de primíparas falhadas.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.",
                        "s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.-n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.",
                        "n_48_GePs_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.",
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Reserva nas águas"
                    ],
                    "flows": [
                        "s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.-n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.",
                        "n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.-s_169_12_MoPs_Monta de primíparas solteiras."
                    ],
                    "duration": 30,
                    "type": "est_tratamento"
                },
/* Fim da Cadeia 3 */
/* Início da Cadeia 4 */
                "n_190_EaPs1_Engorda nas águas de primíparas falhadas.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Engorda nas águas"
                    ],
                    "flows": [
                        "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_190_EaPs1_Engorda nas águas de primíparas falhadas.",
                        "n_190_EaPs1_Engorda nas águas de primíparas falhadas.-s_199_17_EnPs_Engorda na seca de primíparas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "s_199_17_EnPs_Engorda na seca de primíparas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_190_EaPs1_Engorda nas águas de primíparas falhadas.-s_199_17_EnPs_Engorda na seca de primíparas.",
                        "s_199_17_EnPs_Engorda na seca de primíparas.-n_203_EnPs_Engorda na seca de primíparas.",
                        "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_199_17_EnPs_Engorda na seca de primíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_203_EnPs_Engorda na seca de primíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Engorda na seca"
                    ],
                    "flows": [
                        "s_199_17_EnPs_Engorda na seca de primíparas.-n_203_EnPs_Engorda na seca de primíparas.",
                        "n_203_EnPs_Engorda na seca de primíparas.-s_199_17_EaPs2_Engorda nas águas de primíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
                "s_199_17_EaPs2_Engorda nas águas de primíparas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_203_EnPs_Engorda na seca de primíparas.-s_199_17_EaPs2_Engorda nas águas de primíparas.",
                        "s_199_17_EaPs2_Engorda nas águas de primíparas.-n_203_EaPs2_Engorda nas águas de primíparas.",
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_199_17_EaPs2_Engorda nas águas de primíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_203_EaPs2_Engorda nas águas de primíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Engorda na seca"
                    ],
                    "flows": [
                        "s_199_17_EaPs2_Engorda nas águas de primíparas.-n_203_EaPs2_Engorda nas águas de primíparas.",
                        "n_203_EaPs2_Engorda nas águas de primíparas.-n_209_VePg_Venda de primíparas solteiras vazias gordas."
                    ],
                    "duration": 30,
                    "type": "est_tratamento"
                },
                "n_209_VePg_Venda de primíparas solteiras vazias gordas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_203_EaPs2_Engorda nas águas de primíparas.-n_209_VePg_Venda de primíparas solteiras vazias gordas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
/* Fim da Cadeia 4 */
/* Início da Cadeia 5 */
                "n_44_AlMv_Aleitamento de multíparas vazias.": {
                    "formula": "AGUAS-PUERPERIO",
                    "stages": [
                        "Aleitamento"
                    ],
                    "flows": [
                        "n_35_PuMp_Puerpério de multíparas.-n_44_AlMv_Aleitamento de multíparas vazias.",
                        "n_44_AlMv_Aleitamento de multíparas vazias.-s_53_1_Bo_Balanço de bezerros desmamados.",
                        "n_44_AlMv_Aleitamento de multíparas vazias.-n_19_BaMv_Venda de bezerras desmamadas.",
                        "n_44_AlMv_Aleitamento de multíparas vazias.-s_21_4_EnMs_Engorda na seca de multíparas."
                    ],
                    "duration": 182,
                    "type": "est_tratamento"
                },
/* Fim da Cadeia 5 */
/* Início da Cadeia 6 */
                "s_31_7_MoMs_Monta de multíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "n_35_PuMp_Puerpério de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras.",
                        "s_31_7_MoMs_Monta de multíparas solteiras.-n_43_MoMs_Monta de multíparas solteiras.",
                        "n_18_RaMs_Reserva nas águas de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_43_MoMs_Monta de multíparas solteiras.": {
                    "formula": "MONTA",
                    "stages": [
                        "Monta"
                    ],
                    "flows": [
                        "s_31_7_MoMs_Monta de multíparas solteiras.-n_43_MoMs_Monta de multíparas solteiras.",
                        "n_43_MoMs_Monta de multíparas solteiras.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras."                    
                    ],
                    "duration": 92,
                    "type": "est_tratamento"
                },
                "s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "n_43_MoMs_Monta de multíparas solteiras.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.",
                        "s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.-n_49_DiMs_Diagnose de prenhez de multíparas solteiras.",
                        "n_25_MoMp_Monta de multíparas paridas.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.": {
                    "formula": "DIAGNOSE",
                    "stages": [
                        "Diagnose"
                    ],
                    "flows": [
                        "s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.-n_49_DiMs_Diagnose de prenhez de multíparas solteiras.",
                        "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras.",
                        "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas."
                    ],
                    "duration": 59,
                    "type": "est_tratamento"
                },
                "s_26_9_GaMs_Gestação nas águas de multíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras.",
                        "s_26_9_GaMs_Gestação nas águas de multíparas solteiras.-n_64_GaMs_Gestação nas águas de multíparas solteiras.",
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_64_GaMs_Gestação nas águas de multíparas solteiras.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Gestação nas águas"
                    ],
                    "flows": [
                        "s_26_9_GaMs_Gestação nas águas de multíparas solteiras.-n_64_GaMs_Gestação nas águas de multíparas solteiras.",
                        "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_20_10_GeMs_Gestação na seca de multíparas solteiras.",
                        "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_21_4_EnMs_Engorda na seca de multíparas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "s_20_10_GeMs_Gestação na seca de multíparas solteiras.": {
                    "formula": "0",
                    "stages": [
                        "Gestação na seca"
                    ],
                    "flows": [
                        "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_20_10_GeMs_Gestação na seca de multíparas solteiras.",
                        "s_20_10_GeMs_Gestação na seca de multíparas solteiras.-n_76_GeMs_Gestação na seca de multíparas solteiras.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-s_20_10_GeMs_Gestação na seca de multíparas solteiras."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_76_GeMs_Gestação na seca de multíparas solteiras.": {
                    "formula": "SECA",
                    "stages": [
                        "Gestação na seca"
                    ],
                    "flows": [
                        "s_20_10_GeMs_Gestação na seca de multíparas solteiras.-n_76_GeMs_Gestação na seca de multíparas solteiras.",
                        "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.",
                        "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_93_5_EaMs2_Engorda nas águas de multíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
/* Fim da Cadeia 6 */
/* Início da Cadeia 7 */
                "s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.",
                        "s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.-n_65_EaMs1_Engorda nas águas de multíparas falhadas.",
                        "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_65_EaMs1_Engorda nas águas de multíparas falhadas.": {
                    "formula": "FIM_AGUAS",
                    "stages": [
                        "Engorda nas águas"
                    ],
                    "flows": [
                        "s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.-n_65_EaMs1_Engorda nas águas de multíparas falhadas.",
                        "n_65_EaMs1_Engorda nas águas de multíparas falhadas.-s_21_4_EnMs_Engorda na seca de multíparas."
                    ],
                    "duration": 31,
                    "type": "est_tratamento"
                },
                "s_21_4_EnMs_Engorda na seca de multíparas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_65_EaMs1_Engorda nas águas de multíparas falhadas.-s_21_4_EnMs_Engorda na seca de multíparas.",
                        "s_21_4_EnMs_Engorda na seca de multíparas.-n_81_EnMs_Engorda na seca de multíparas.",
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-s_21_4_EnMs_Engorda na seca de multíparas.",
                        "n_44_AlMv_Aleitamento de multíparas vazias.-s_21_4_EnMs_Engorda na seca de multíparas.",
                        "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_21_4_EnMs_Engorda na seca de multíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_81_EnMs_Engorda na seca de multíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Engorda na seca"
                    ],
                    "flows": [
                        "s_21_4_EnMs_Engorda na seca de multíparas.-n_81_EnMs_Engorda na seca de multíparas.",
                        "n_81_EnMs_Engorda na seca de multíparas.-s_93_5_EaMs2_Engorda nas águas de multíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
                "s_93_5_EaMs2_Engorda nas águas de multíparas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_81_EnMs_Engorda na seca de multíparas.-s_93_5_EaMs2_Engorda nas águas de multíparas.",
                        "s_93_5_EaMs2_Engorda nas águas de multíparas.-n_97_EaMs2_Engorda nas águas de multíparas.",
                        "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_93_5_EaMs2_Engorda nas águas de multíparas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_97_EaMs2_Engorda nas águas de multíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Engorda nas águas"
                    ],
                    "flows": [
                        "s_93_5_EaMs2_Engorda nas águas de multíparas.-n_97_EaMs2_Engorda nas águas de multíparas.",
                        "n_97_EaMs2_Engorda nas águas de multíparas.-n_108_VeMg_Venda de multíparas solteiras vazias gordas."
                    ],
                    "duration": 30,
                    "type": "est_tratamento"
                },
                "n_108_VeMg_Venda de multíparas solteiras vazias gordas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_97_EaMs2_Engorda nas águas de multíparas.-n_108_VeMg_Venda de multíparas solteiras vazias gordas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
/* Fim da Cadeia 7 */
/* Início da Cadeia 8 */
                "n_18_ReMs_Reserva na seca de multíparas.": {
                    "formula": "SECA",
                    "stages": [
                        "Reserva na seca"
                    ],
                    "flows": [
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-n_18_ReMs_Reserva na seca de multíparas.",
                        "n_18_ReMs_Reserva na seca de multíparas.-n_18_RaMs_Reserva nas águas de multíparas."
                    ],
                    "duration": 153,
                    "type": "est_tratamento"
                },
                "n_18_RaMs_Reserva nas águas de multíparas.": {
                    "formula": "PUERPERIO",
                    "stages": [
                        "Reserva nas águas"
                    ],
                    "flows": [
                        "n_18_ReMs_Reserva na seca de multíparas.-n_18_RaMs_Reserva nas águas de multíparas.",
                        "n_18_RaMs_Reserva nas águas de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras."
                    ],
                    "duration": 30,
                    "type": "est_tratamento"
                },
/* Fim da Cadeia 8 */
/* Somas e Vendas */                
                "s_53_1_Bo_Balanço de bezerros desmamados.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_44_AlMv_Aleitamento de multíparas vazias.-s_53_1_Bo_Balanço de bezerros desmamados.",
                        "s_53_1_Bo_Balanço de bezerros desmamados.-b_12_1_Bo_Balanço de bezerros desmamados.",
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-s_53_1_Bo_Balanço de bezerros desmamados."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                },
                "n_19_BaMp_Venda de bezerras desmamadas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_16_AlMp_Aleitamento de multíparas prenhes.-n_19_BaMp_Venda de bezerras desmamadas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
                "n_19_BaMv_Venda de bezerras desmamadas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_44_AlMv_Aleitamento de multíparas vazias.-n_19_BaMv_Venda de bezerras desmamadas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
                "n_19_BaPp_Venda de bezerras desmamadas.": {
                    "formula": "0",
                    "stages": [
                        "terminal"
                    ],
                    "flows": [
                        "n_59_AlPp_Aleitamento de primíparas prenhes.-n_19_BaPp_Venda de bezerras desmamadas."
                    ],
                    "duration": 0,
                    "type": "terminal_saida_tratamento"
                },
                "s_92_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "0",
                    "stages": [
                        "(nenhuma)"
                    ],
                    "flows": [
                        "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.",
                        "s_92_3_Mp_Balanço de multíparas paridas.-b_42_3_Mp_Balanço de multíparas paridas.",
                        "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas."
                    ],
                    "duration": 0,
                    "type": "soma_tratamento"
                }
            },
            "flows": {
                "n_2_TeBm_Terminação em confinamento de bois magros.-n_1_VeBg_Venda de bois gordos.": {
                    "formula": "PRODUCAO",
                    "resource": {
                        "name": "Bois gordos",
                        "unit": "cab",
                        "category": "BOIS_GORDOS"
                    },
                    "type": "Produção",
                    "factor": 438,
                    "day": 200,
                    "qty": 438
                },
                "n_3_AgBo_Recria nas águas de bezerros.-n_2_TeBm_Terminação em confinamento de bois magros.": {
                    "formula": "1/(1-PERDAS)^(CONFINAMENTO/CICLO)",
                    "resource": {
                        "name": "Bezerros recriados nas águas",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Produção",
                    "factor": 1.0030,
                    "day": 90,
                    "qty": 439.33
                },
                "n_8_SeBo_Recria na seca de bezerros.-n_3_AgBo_Recria nas águas de bezerros.": {
                    "formula": "1/(1-PERDAS)^(AGUAS/CICLO)",
                    "resource": {
                        "name": "Bezerros recriados na seca",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Produção",
                    "factor": 1.0059,
                    "day": -122,
                    "qty": 441.90
                },
                "b_12_1_Bo_Balanço de bezerros desmamados.-n_8_SeBo_Recria na seca de bezerros.": {
                    "formula": "1/(1-PERDAS)^(SECA/CICLO)",
                    "resource": {
                        "name": "Bezerros desmamados",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Produção",
                    "factor": 1.0042,
                    "day": -275,
                    "qty": 443.77
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.-b_12_1_Bo_Balanço de bezerros desmamados.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerros desmamados",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -275,
                    "qty": 443.77
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.-n_18_ReMs_Reserva na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas reservadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 443.77
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.-n_19_BaMp_Venda de bezerras desmamadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras desmamadas",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 443.77
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.-s_20_10_GeMs_Gestação na seca de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 443.77
                },
                "n_16_AlMp_Aleitamento de multíparas prenhes.-s_21_4_EnMs_Engorda na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 443.77
                },
                "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-n_16_AlMp_Aleitamento de multíparas prenhes.": {
                    "formula": "1/(PARTO_MACHO*(1-PERDAS_CRIA)^((AGUAS-PUERPERIO)/CICLO))",
                    "resource": {
                        "name": "Multíparas paridas prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Produção",
                    "factor": 2.0411,
                    "day": -306,
                    "qty": 905.78
                },
                "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 905.78 
                },
                "n_17_DiMp_Diagnose de prenhez de multíparas paridas.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 905.78
                },
                "n_25_MoMp_Monta de multíparas paridas.-n_17_DiMp_Diagnose de prenhez de multíparas paridas.": {
                    "formula": "1/(PRENHEZ*(1-PERDAS)^(DIAGNOSE/CICLO))",
                    "resource": {
                        "name": "Multíparas paridas após a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1.1129,
                    "day": -365,
                    "qty": 1008.06
                },
                "n_25_MoMp_Monta de multíparas paridas.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras após a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -365,
                    "qty": 1008.06
                },
                "n_35_PuMp_Puerpério de multíparas.-n_25_MoMp_Monta de multíparas paridas.": {
                    "formula": "1/(1-PERDAS)^(MONTA/CICLO)",
                    "resource": {
                        "name": "Multíparas paridas para a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1.0025,
                    "day": -457,
                    "qty": 1010.62
                },
                "n_35_PuMp_Puerpério de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -457,
                    "qty": 1010.62
                },
                "n_35_PuMp_Puerpério de multíparas.-n_44_AlMv_Aleitamento de multíparas vazias.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas para a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -457,
                    "qty": 1010.62
                },
                "b_42_3_Mp_Balanço de multíparas paridas.-n_35_PuMp_Puerpério de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1.0008,
                    "day": -487,
                    "qty": 1011.45
                },
                "s_92_3_Mp_Balanço de multíparas paridas.-b_42_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -122,
                    "qty": 1011.45
                },
                "n_48_GePs_Gestação na seca de primíparas solteiras.-b_42_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -487,
                    "qty": 1011.45
                },
                "n_18_ReMs_Reserva na seca de multíparas.-n_18_RaMs_Reserva nas águas de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas reservadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -122,
                    "qty": 1010.62
                },
                "n_18_RaMs_Reserva nas águas de multíparas.-s_31_7_MoMs_Monta de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -92,
                    "qty": 1010.62
                },
                "s_31_7_MoMs_Monta de multíparas solteiras.-n_43_MoMs_Monta de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -457,
                    "qty": 1010.62
                },
                "s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.-n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas reservadas.",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_43_MoMs_Monta de multíparas solteiras.-s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras após a monta",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -365,
                    "qty": 1010.62
                },
                "n_44_AlMv_Aleitamento de multíparas vazias.-s_53_1_Bo_Balanço de bezerros desmamados.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerros desmamados",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "n_44_AlMv_Aleitamento de multíparas vazias.-n_19_BaMv_Venda de bezerras desmamadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras desmamadas",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "n_44_AlMv_Aleitamento de multíparas vazias.-s_21_4_EnMs_Engorda na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "s_53_1_Bo_Balanço de bezerros desmamados.-b_12_1_Bo_Balanço de bezerros desmamados.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerros desmamados.",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "n_59_AlPp_Aleitamento de primíparas prenhes.-n_48_GePs_Gestação na seca de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "s_36_8_DiMs_Diagnose de prenhez de multíparas solteiras.-n_49_DiMs_Diagnose de prenhez de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 1010.62
                },
                "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_26_9_GaMs_Gestação nas águas de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 1010.62
                },
                "s_26_9_GaMs_Gestação nas águas de multíparas solteiras.-n_64_GaMs_Gestação nas águas de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 1010.62
                },
                "n_49_DiMs_Diagnose de prenhez de multíparas solteiras.-s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 1010.62
                },
                "s_27_6_EaMs1_Engorda nas águas de multíparas falhadas.-n_65_EaMs1_Engorda nas águas de multíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -306,
                    "qty": 1010.62
                },
                "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-n_59_AlPp_Aleitamento de primíparas prenhes.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas paridas prenhes",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_59_AlPp_Aleitamento de primíparas prenhes.-s_53_1_Bo_Balanço de bezerros desmamados.": {
                        "formula": "1",
                    "resource": {
                        "name": "Bezerros desmamados",
                        "unit": "cab",
                        "category": "BEZERROS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_59_AlPp_Aleitamento de primíparas prenhes.-s_72_14_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_20_10_GeMs_Gestação na seca de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "s_20_10_GeMs_Gestação na seca de multíparas solteiras.-n_76_GeMs_Gestação na seca de multíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "n_64_GaMs_Gestação nas águas de multíparas solteiras.-s_21_4_EnMs_Engorda na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -275,
                    "qty": 1010.62
                },
                "n_65_EaMs1_Engorda nas águas de multíparas falhadas.-s_21_4_EnMs_Engorda na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "s_21_4_EnMs_Engorda na seca de multíparas.-n_81_EnMs_Engorda na seca de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_85_MoPp_Monta de primíparas paridas.-n_69_DiPp_Diagnose de prenhez de primíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas paridas após a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -730,
                    "qty": 1010.62
                },
                "n_69_DiPp_Diagnose de prenhez de primíparas paridas.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_59_AlPp_Aleitamento de primíparas prenhes.-n_19_BaPp_Venda de bezerras desmamadas.": { 
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras desmamadas",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -122,
                    "qty": 1010.62
                },
                "n_76_GeMs_Gestação na seca de multíparas solteiras.-s_93_5_EaMs2_Engorda nas águas de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -122,
                    "qty": 1010.62
                },
                "n_81_EnMs_Engorda na seca de multíparas.-s_93_5_EaMs2_Engorda nas águas de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "s_93_5_EaMs2_Engorda nas águas de multíparas.-n_97_EaMs2_Engorda nas águas de multíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_152_RaPs2_Reserva nas águas de primíparas após aleitamento.-s_169_12_MoPs_Monta de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -822,
                    "qty": 1010.62
                },
                "n_101_PuPp_Puerpério de primíparas.-s_169_12_MoPs_Monta de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -822,
                    "qty": 1010.62
                },
                "n_101_PuPp_Puerpério de primíparas.-n_85_MoPp_Monta de primíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas paridas para a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -822,
                    "qty": 1010.62
                },
                "s_169_12_MoPs_Monta de primíparas solteiras.-n_113_MoPs_Monta de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras para a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -822,
                    "qty": 1010.62
                },
                "n_85_MoPp_Monta de primíparas paridas.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas paridas após a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -730,
                    "qty": 1010.62
                },
                "n_97_EaMs2_Engorda nas águas de multíparas.-n_108_VeMg_Venda de multíparas solteiras vazias gordas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas gordas",
                        "unit": "cab",
                        "category": "MULTIPARAS_GORDAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -92,
                    "qty": 1010.62
                },
                "n_112_GeNu_Gestação na seca de nulíparas.-n_101_PuPp_Puerpério de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas paridas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_112_GaNu_Gestação nas águas de nulíparas.-s_118_13_EnNu_Engorda na seca de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas prenhes",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -1005,
                    "qty": 1010.62
                },
                "n_112_GaNu_Gestação nas águas de nulíparas.-n_112_GeNu_Gestação na seca de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas prenhes",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1005,
                    "qty": 1010.62
                },
                "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_112_GaNu_Gestação nas águas de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas prenhes",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1036,
                    "qty": 1010.62
                },
                "n_129_EaNu1_Engorda nas águas de nulíparas falhadas.-s_118_13_EnNu_Engorda na seca de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -1005,
                    "qty": 1010.62
                },
                "n_112_GeNu_Gestação na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_113_MoPs_Monta de primíparas solteiras.-s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras após a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": 1096,
                    "qty": 1010.62
                },
                "n_128_MoNu_Monta de nulíparas.-n_117_DiNu_Diagnose de prenhez de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas após a monta",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1095,
                    "qty": 1010.62
                },
                "n_117_DiNu_Diagnose de prenhez de nulíparas.-n_129_EaNu1_Engorda nas águas de nulíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -1036,
                    "qty": 1010.62
                },
                "s_86_11_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GaPs_Gestação nas águas de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "s_102_16_DiPs_Diagnose de prenhez de primíparas solteiras.-n_122_DiPs_Diagnose de prenhez de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras após a monta",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-s_86_11_GaPs_Gestação nas águas de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_134_RaPs1_Reserva nas águas de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_122_DiPs_Diagnose de prenhez de primíparas solteiras.-n_190_EaPs1_Engorda nas águas de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -671,
                    "qty": 1010.62
                },
                "n_138_AgNu_Recria nas águas de nulíparas.-n_128_MoNu_Monta de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas para a monta",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1187,
                    "qty": 1010.62
                },
                "s_118_13_EnNu_Engorda na seca de nulíparas.-n_144_EnNu_Engorda na seca de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_133_GaPs_Gestação nas águas de primíparas solteiras.-n_133_GePs1_Gestação na seca de primíparas solteiras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes.",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_72_14_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes.",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_133_GaPs_Gestação nas águas de primíparas solteiras.-s_199_17_EnPs_Engorda na seca de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas solteiras prenhes.",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_92_3_Mp_Balanço de multíparas paridas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas paridas",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas reservadas.",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_133_GePs1_Gestação na seca de primíparas solteiras.-s_199_17_EaPs2_Engorda nas águas de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Multíparas descartadas.",
                        "unit": "cab",
                        "category": "MULTIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_134_RaPs1_Reserva nas águas de primíparas falhadas.-s_72_14_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "s_72_14_RePs_Reserva na seca de primíparas falhadas.-n_152_RePs_Reserva na seca de primíparas falhadas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_156_SeNu_Recria na seca de nulíparas.-n_138_AgNu_Recria nas águas de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas recriadas na seca",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1217,
                    "qty": 1010.62
                },
                "n_144_EnNu_Engorda na seca de nulíparas.-s_118_13_EaNu2_Engorda nas águas de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "s_118_13_EaNu2_Engorda nas águas de nulíparas.-n_144_EaNu2_Engorda nas águas de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas descartadas",
                        "unit": "cab",
                        "category": "NULIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -852,
                    "qty": 1010.62
                },
                "n_144_EaNu2_Engorda nas águas de nulíparas.-n_162_VeNg_Venda de nulíparas gordas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Nulíparas gordas",
                        "unit": "cab",
                        "category": "NULIPARAS_GORDAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -822,
                    "qty": 1010.62
                },
                "n_48_GePs_Gestação na seca de primíparas solteiras.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_152_RePs_Reserva na seca de primíparas falhadas.-s_72_14_RaPs2_Reserva nas águas de primíparas após aleitamento.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas reservadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_173_AgBa_Recria nas águas de bezerras.-n_156_SeNu_Recria na seca de nulíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras recriadas nas águas",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1370,
                    "qty": 1010.62
                },
                "n_185_SeBa_Recria na seca de bezerras.-n_173_AgBa_Recria nas águas de bezerras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras recriadas na seca",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1582,
                    "qty": 1010.62
                },
                "n_190_EaPs1_Engorda nas águas de primíparas falhadas.-s_199_17_EnPs_Engorda na seca de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas descartadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "s_199_17_EnPs_Engorda na seca de primíparas.-n_203_EnPs_Engorda na seca de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas descartadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -640,
                    "qty": 1010.62
                },
                "n_207_CoBa_Compra de bezerras desmamadas.-n_185_SeBa_Recria na seca de bezerras.": {
                    "formula": "1",
                    "resource": {
                        "name": "Bezerras desmamadas",
                        "unit": "cab",
                        "category": "BEZERRAS"
                    },
                    "type": "Produção",
                    "factor": 1,
                    "day": -1735,
                    "qty": 1010.62
                },
                "n_203_EnPs_Engorda na seca de primíparas.-s_199_17_EaPs2_Engorda nas águas de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas descartadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "s_199_17_EaPs2_Engorda nas águas de primíparas.-n_203_EaPs2_Engorda nas águas de primíparas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas descartadas",
                        "unit": "cab",
                        "category": "PRIMIPARAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -487,
                    "qty": 1010.62
                },
                "n_203_EaPs2_Engorda nas águas de primíparas.-n_209_VePg_Venda de primíparas solteiras vazias gordas.": {
                    "formula": "1",
                    "resource": {
                        "name": "Primíparas gordas",
                        "unit": "cab",
                        "category": "PRIMIPARAS_GORDAS"
                    },
                    "type": "Tratamento",
                    "factor": 1,
                    "day": -457,
                    "qty": 1010.62
                }
            },
            "idModel": 18,
            "root": "n_1_VeBg_Venda de bois gordos.",
            "nodeOne": "n_2_TeBm_Terminação em confinamento de bois magros."
        },
        "parameters": {
            "AGUAS": 212,
            "CICLO": 365,
            "CONFINAMENTO": 110,
            "DIAGNOSE": 59, 
            "INICIO_AGUAS": 90,
            "MONTA": 92,
            "NATALIDADE": 0.80,
            "PARTO_MACHO": 0.50,
            "PERDAS": 0.01,
            "PERDAS_CRIA": 0.03,
            "PRECO#BEZERRAS": 890.0,
            "PRECO#BEZERROS": 960.0,
            "PRECO#BOIS_GORDOS": 9100.0,
            "PRECO#MULTIPARAS": 5100.0,
            "PRECO#MULTIPARAS_GORDAS": 5100.0,
            "PRECO#MULTIPARAS_PARIDAS": 5900.0,
            "PRECO#NULIPARAS_GORDAS": 4100.0,
            "PRECO#PRIMIPARAS": 4400.0,
            "PRECO#PRIMIPARAS_GORDAS": 4400.0,
            "PRENHEZ": 0.90,
            "PRODUCAO": 438,
            "PUERPERIO": 30
        },
        "systemParameters": {
            "AGUAS": {"min": 200, "std": 212, "max": 220}, /* Duração da estação das águas em dias */
            "CICLO": {"min": 365, "std": 365, "max": 365}, /* Duração do ciclo anual, em dias */
            "CONFINAMENTO": {"min": 100, "std": 110, "max": 120}, /* Duração do confinamento, em dias */
            "INICIO_AGUAS": {"min": 80, "std": 90, "max": 100}, /* Dias desde o início do ciclo para o início da estação das águas, em dias */
            "DIAGNOSE": {"min": 30, "std": 60, "max": 90}, /* Duração da diagnose de prenhez, em dias */
            "PARTO_MACHO": {"min": 0.5, "std": 0.5, "max": 0.5}, /* Quantidade de machos por parto bem sucedido, em fração */
            "MONTA": {"min": 60, "std": 90, "max": 120}, /* Duração da monta, em dias */
            "NATALIDADE": {"min": 0.50, "std": 0.80, "max": 1.00}, /* Taxa de natalidade, em fração */
            "PERDAS": {"min": 0.01, "std": 0.03, "max": 0.05}, /* Perdas de animais adultos, em fração de cabeças por ciclo anual */
            "PERDAS_CRIA": {"min": 0.03, "std": 0.05, "max": 0.10}, /* Perdas de bezerros ou bezerras antes da desmama, em fração de cabeças por ciclo anual */
            "PRECO#BEZERRAS": {"min": 800.0, "std": 900.0, "max": 1000.0}, /* Preço, em R$/cab */
            "PRECO#BEZERROS": {"min": 850.0, "std": 950.0, "max": 1100.0}, /* Preço, em R$/cab */
            "PRECO#BOIS_GORDOS": {"min": 7000.0, "std": 9000.0, "max": 10000.0}, /* Preço, em R$/cab */
            "PRECO#MULTIPARAS": {"min": 4000.0, "std": 5000.0, "max": 6000.0}, /* Preço, em R$/cab */
            "PRECO#MULTIPARAS_GORDAS": {"min": 4000.0, "std": 5000.0, "max": 6000.0}, /* Preço, em R$/cab */
            "PRECO#MULTIPARAS_PARIDAS": {"min": 5000.0, "std": 6000.0, "max": 7000.0}, /* Preço, em R$/cab */
            "PRECO#NULIPARAS_GORDAS": {"min": 3000.0, "std": 4000.0, "max": 5000.0}, /* Preço, em R$/cab */
            "PRECO#PRIMIPARAS": {"min": 3500.0, "std": 4500.0, "max": 5500.0}, /* Preço, em R$/cab */
            "PRECO#PRIMIPARAS_GORDAS": {"min": 3500.0, "std": 4500.0, "max": 5500.0}, /* Preço, em R$/cab */
            "PRENHEZ": {"min": 0.50, "std": 0.80, "max": 1.00}, /* Taxa de prenhez, em fração */
            "PRODUCAO": {"min": 300, "std": 400, "max": 500}, /* Produção principal, em cabeças */
            "PUERPERIO": {"min": 25, "std": 30, "max": 40} /* Duração do puerpério, em dias */
        },
        "calculatedParameters": {
            "FIM_AGUAS": "AGUAS-DIAGNOSE-MONTA-PUERPERIO", /* Restante do período de águas antes da próxima seca */
            "SECA": "CICLO-AGUAS" /* Duração da estação seca em dias */
        },
        "formulas": {
            "nodes": [
                "AGUAS",
                "AGUAS-PUERPERIO",
                "CONFINAMENTO",
                "CONFINAMENTO+INICIO_AGUAS",
                "DIAGNOSE",
                "MONTA",
                "PUERPERIO",
                "SECA"
            ],
            "flows": [
                "1",
                "PRODUCAO",
                "1/(1-PERDAS)^(AGUAS/CICLO)",
                "1/(1-PERDAS)^(CONFINAMENTO/CICLO)",
                "1/(1-PERDAS)^(MONTA/CICLO)",
                "1/(1-PERDAS)^(SECA/CICLO)",
                "1/(PARTO_MACHO*(1-PERDAS_CRIA)^((AGUAS-PUERPERIO)/CICLO))",
                "1/(PRENHEZ*(1-PERDAS)^(DIAGNOSE/CICLO))"
            ]
        },
        "resources": {
            "Bezerras desmamadas": {
                "unit": "cab",
                "category": "BEZERRAS"
            },
            "Bezerras recriadas nas águas": {
                "unit": "cab",
                "category": "BEZERRAS"
            },
            "Bezerras recriadas na seca": {
                "unit": "cab",
                "category": "BEZERRAS"
            },
            "Bezerros desmamados": {
                "unit": "cab",
                "category": "BEZERROS"
            },
            "Bezerros recriados nas águas": {
                "unit": "cab",
                "category": "BEZERROS"
            },
            "Bezerros recriados na seca": {
                "unit": "cab",
                "category": "BEZERROS"
            },
            "Bois gordos": {
                "unit": "cab",
                "category": "BOIS_GORDOS"
            },
            "Multíparas descartadas": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas gordas": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas paridas": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas paridas após a monta": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas paridas para a monta": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas paridas prenhes": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas reservadas": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas solteiras após a monta": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas solteiras para a monta": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Multíparas solteiras prenhes": {
                "unit": "cab",
                "category": "MULTIPARAS"
            },
            "Nulíparas após a monta": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas descartadas": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas gordas": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas para a monta": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas prenhes": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas recriadas na seca": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Nulíparas recriadas nas águas": {
                "unit": "cab",
                "category": "NULIPARAS"
            },
            "Primíparas descartadas": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas gordas": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas paridas": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas paridas após a monta": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas paridas para a monta": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas paridas prenhes": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas reservadas": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas solteiras após a monta": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas solteiras para a monta": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            },
            "Primíparas solteiras prenhes": {
                "unit": "cab",
                "category": "PRIMIPARAS"
            }
        },
        "stagesHierarchy": {
            "Aleitamento": {
                "color": "powderblue",
                "label": "Al"
            },
            "Balanço": {
                "color": "black",
                "label": null
            },
            "Diagnose": {
                "color": "gold",
                "label": "Di"
            },
            "Engorda na seca": {
                "color": "moccasin",
                "label": "En"
            },
            "Engorda nas águas": {
                "color": "beige",
                "label": "Ea"
            },
            "Gestação na seca": {
                "color": "burlywood",
                "label": "Ge"
            },
            "Gestação nas águas": {
                "color": "deeppink",
                "label": "Ge"
            },
            "Monta": {
                "color": "magenta",
                "label": "Mo"
            },
            "Puerpério": {
                "color": "yellow",
                "label": "Pu"
            },
            "Recria na seca": {
                "color": "khaki",
                "label": "Se"
            },
            "Recria nas águas": {
                "color": "darkkhaki",
                "label": "Ag"
            },
            "Reserva na seca": {
                "color": "aquamarine",
                "label": "Re"
            },
            "Reserva nas águas": {
                "color": "mediumaquamarine",
                "label": "Re"
            },
            "Confinamento": {
                "color": "cyan",
                "label": "Te"
            },
            "terminal": {
                "color": "white",
                "label": null
            },
            "(nenhuma)": {
                "color": "white",
                "label": null
            }
        },
        "stock": null,
        "categoriesResourceHierarchy": {
            "BEZERRAS": "FEMEAS",
            "BEZERROS": "MACHOS",
            "MULTIPARAS_PARIDAS": "MULTIPARAS",
            "MULTIPARAS_GORDAS": "MULTIPARAS",
            "MULTIPARAS": "MATRIZES",
            "PRIMIPARAS_GORDAS": "PRIMIPARAS",
            "PRIMIPARAS": "MATRIZES",
            "NULIPARAS_GORDAS": "NULIPARAS",
            "NULIPARAS": "MATRIZES",
            "MATRIZES": "FEMEAS",
            "FEMEAS": "BOVINOS",
            "MACHOS": "BOVINOS"
        },
        "calculatedIndicators": null,
        "indicatorsToCalculate": null
    },
    "resultQuery": null
}`
</script>