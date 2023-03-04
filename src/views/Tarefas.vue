<template>
    <FormTracker @aoSalvarTarefa="salvarTarefa" />
    
    <div class="lista">
        <BoxTracker v-if="listaEstaVazia">
            Você ainda não inicou tarefas hoje =(
        </BoxTracker>
    
        <TarefaTracker v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import FormTracker from '../components/FormTracker.vue'
import TarefaTracker from '../components/TarefaTracker.vue'
import BoxTracker from '../components/BoxTracker.vue'
import ITarefa from '../interface/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormTracker,
        TarefaTracker,
        BoxTracker
    },
    data () {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    computed: {
        listaEstaVazia () : boolean {
            return this.tarefas.length == 0;
        }
    },
    methods: {
        salvarTarefa (tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>
