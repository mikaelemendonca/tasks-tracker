<template>
    <FormTracker @aoSalvarTarefa="salvarTarefa" />
    
    <div class="lista">
        <BoxTracker v-if="listaEstaVazia">
            Você ainda não inicou tarefas hoje =(
        </BoxTracker>
    
        <TarefaTracker v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa" />
        
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando Tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descicaoDaTarefa" class="label">
                            Nome da Tarefa
                        </label>
                        <input
                            type="text"
                            class="input"
                            v-model="tarefaSelecionada.descricao"
                            id="descicaoDaTarefa"
                        />
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>


<style>
    .modal-card-foot, .modal-card-head {
        flex-shrink: 1 !important;
    }
    header {
        height: 10vh !important;
    }
</style>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import FormTracker from '../components/FormTracker.vue'
import TarefaTracker from '../components/TarefaTracker.vue'
import BoxTracker from '../components/BoxTracker.vue'
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, ALTERAR_TAREFA } from '@/store/tipos-acoes';
import ITarefa from '@/interface/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormTracker,
        TarefaTracker,
        BoxTracker
    },
    data () {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    computed: {
        listaEstaVazia () : boolean {
            return this.tarefas.length == 0;
        }
    },
    methods: {
        salvarTarefa (tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        alterarTarefa () {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        },
        selecionarTarefa (tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal () {
            this.tarefaSelecionada = null
        }
    },
    setup () {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>
