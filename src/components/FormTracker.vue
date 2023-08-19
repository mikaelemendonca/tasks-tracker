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
import { NOTIFICAR } from '@/store/tipos-mutacoes';
import { TipoNotificacao } from '@/interface/INotificacao';
import { OBTER_PROJETOS } from '@/store/tipos-acoes';

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

            const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto
            if(!projeto) { // se o projeto não existe...
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.FALHA,
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }

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
        store.dispatch(OBTER_PROJETOS)

        return {
            store,
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
