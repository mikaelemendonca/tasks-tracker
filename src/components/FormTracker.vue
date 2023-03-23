<template>
    <div class="columns formulario">
        <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
            <input type="text" v-model="descricao" class="input" placeholder="Iniciar tarefa ...">
        </div>
        <div class="column is-3">
            <div class="select">
            <select v-model="idProjeto">
                <option value="">Selecione o projeto</option>
                <option
                    :value="projeto.id"
                    v-for="projeto in projetos"
                    :key="projeto.id"
                    >
                {{ projeto.nome }}
                </option>
            </select>
            </div>
        </div>
        <div class="column">
            <TemporizadorTracker @aoTemporizadorFinalizado="finzalizarTarefa" />
        </div>
    </div>
</template>

<script lang="ts">

import { key } from '@/store';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
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
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finzalizarTarefa (tempoDecorrido: number) : void {
            console.log('Tempo da tarefa = ' , tempoDecorrido);            
            console.log('Descricao = ' , this.descricao);     

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(
                    proj => proj.id == this.idProjeto
                )
            })

            this.descricao = '';       
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
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
