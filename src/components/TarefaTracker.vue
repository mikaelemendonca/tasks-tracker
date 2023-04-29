<template>
    <BoxTracker>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronoTracker :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTracker>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import ITarefa from '@/interface/ITarefa';
import CronoTracker from './CronoTracker.vue'
import BoxTracker from './BoxTracker.vue'

export default defineComponent({
    name: 'TarefaTracker',
    components: {
        CronoTracker,
        BoxTracker
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})

</script>
