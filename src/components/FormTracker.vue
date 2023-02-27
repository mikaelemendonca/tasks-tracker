<template>
    <div class="columns formulario">
        <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
            <input type="text" v-model="descricao" class="input" placeholder="Iniciar tarefa ...">
        </div>
        <div class="column">
            <TemporizadorTracker @aoTemporizadorFinalizado="finzalizarTarefa" />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import TemporizadorTracker from './TemporizadorTracker.vue'

export default defineComponent({
    name: 'FormTracker',
    emits: [
        'aoSalvarTarefa'
    ],
    components: {
        TemporizadorTracker
    },
    data () {
        return {
            descricao: ''
        }
    },
    methods: {
        finzalizarTarefa (tempoDecorrido: number) : void {
            console.log('Tempo da tarefa = ' , tempoDecorrido);            
            console.log('Descricao = ' , this.descricao);     

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })

            this.descricao = '';       
        }
    }
})

</script>

<style>
.formulario {
    color: var(--text-primario);
    background-color: var(--bg-primario);
}
</style>
