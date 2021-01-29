# mais-precoce-ampl

## Introdução

Este repositório faz parte de um repositório maior, contendo outros módulos que integram a P+P.

O objetivo deste módulo é prover um gerador de script AMPL, que receberá um JSON de simulação e algumas configurações, e fornecerá um arquivo .mod para download.

Espera-se que o caso de uso da tradução comece em um botão, que dará acesso à esse formulário através de um modal ou de uma nova tela, os padrões de usabilidade e navegação da plataforma fogem do contexto desse trabalho, portanto, o local onde esse formulário ficará será escolhido pelo desenvolvedor responsável por integrar este módulo à P+P. Se você está lendo isso, provavelmente você é o desenvolvedor responsável.

Caso utilize um v-dialog para exibir o formulário, os tamanhos recomendados são:
width: 800,
height: 600.

## Configuração do projeto

O projeto deverá ser introduzido via git, inserindo a seguinte linha no package.json do projeto principal.
```
dependencies:{
    /*...*/
    "ampl": "git+https://git.cnpgc.embrapa.br/mais-precoce/ampl.git"
    /*...*/
}

```

Feito isso, para utilizar o componente basta importá-lo:

```
<template>
  <FormMaisPrecoceAmpl></FormMaisPrecoceAmpl>
</template>
import FormMaisPrecoceAmpl from "ampl";
  export default {
    name: 'HelloWorld',
    components:{FormMaisPrecoceAmpl},

    data: () => ({
     
    }),
  }
```

### Propriedades
| Nome           | Tipo     | Obrigatório? | Descrição                                                                                                                                                                        |
|----------------|----------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| jsonSimulation | String   | Sim          | JSON contendo a simulação realizada e que deverá ser otimizada.                                                                                                                  |
| jsonIndicators | String   | Sim          | JSON contendo as informações de todos os indicadores da P+P.                                                                                                                     |
| simulationName | String   | Sim          | Nome da simulação, que será exibido no topo do formulário                                                                                                                        |
| resultFileName | String   | Não          | Nome do arquivo contendo o script gerado, que será disponibilizado ao usuário para download, o nome terá a extensão .mod, caso não seja informado o nome padrão será simulation. |
| onGenerate     | Function | Não          | Função que será executada ao finalizar a geração do arquivo, pode ser para exibir uma informação em tela ou retornar à tela anterior.                                            |

### Dependências
Dependências de ambiente:
```
node: 10.9.0+
npm: 6.13.4+
```

Dependências de projeto:
```
"vue": 2.6.11+
"vuetify": 2.4.0+
"vuetify-loader": 1.7.0+
```
