<template>
    <FormTracker @aoSalvarTarefa="salvarTarefa" />

    <div class="lista">
        <BoxTracker v-if="listaEstaVazia">
            Você ainda não inicou tarefas hoje =(
        </BoxTracker>

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <TarefaTracker v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa" />

        <Modal v-if="tarefaSelecionada != null" :mostrar="tarefaSelecionada != null">
            <template v-slot:header>
                <p class="modal-card-title">Editando Tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </template>
            <template v-slot:section>
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
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>

<style>
    .modal-card-foot, .modal-card-head {
        flex-shrink: 1 !important;
    }
    .modal-card-head {
        height: 10vh !important;
    }
</style>

<script lang="ts">

import { computed, defineComponent, ref, watchEffect } from 'vue';
import { useStore } from '@/store';
import FormTracker from '../components/FormTracker.vue'
import TarefaTracker from '../components/TarefaTracker.vue'
import BoxTracker from '../components/BoxTracker.vue'
import Modal from '../components/Modal.vue'
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, ALTERAR_TAREFA } from '@/store/tipos-acoes';
import ITarefa from '@/interface/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormTracker,
        TarefaTracker,
        BoxTracker,
        Modal,
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

        const filtro = ref('')

        // const tarefas = computed(() =>
        //     store.state.tarefa.tarefas.filter(
        //         (t) => !filtro.value || t.descricao.includes(filtro.value)
        //     )
        // )

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            filtro,
            store
        }
    }
});
</script>
