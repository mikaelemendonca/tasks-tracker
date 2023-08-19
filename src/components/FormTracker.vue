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
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import TemporizadorTracker from './TemporizadorTracker.vue'
import { NOTIFICAR } from '@/store/tipos-mutacoes';
import { TipoNotificacao } from '@/interface/INotificacao';

export default defineComponent({
    name: 'FormTracker',
    emits: [
        'aoSalvarTarefa'
    ],
    components: {
        TemporizadorTracker
    },
    setup(props, { emit }) {
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")
        const projetos = computed(() => store.state.projeto.projetos)

        const finzalizarTarefa = (tempoDecorrido: number) : void => {
            console.log('Tempo da tarefa = ' , tempoDecorrido);            
            console.log('Descricao = ' , descricao.value);     

            const projeto = projetos.value.find((p) => p.id == idProjeto.value); // primeiro, buscamos pelo projeto
            if(!projeto) { // se o projeto não existe...
                store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.FALHA,
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }

            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(
                    proj => proj.id == idProjeto.value
                )
            })

            descricao.value = '';       
        }

        return {
            projetos,
            descricao,
            idProjeto,
            finzalizarTarefa
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
