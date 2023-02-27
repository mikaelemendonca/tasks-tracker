<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter">
            <div class="box conteudo">
                <FormTracker @aoSalvarTarefa="salvarTarefa" />
                <div class="lista">
                    <TarefaTracker v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" />
                </div>
                <BoxTracker v-if="listaEstaVazia">
                    Você ainda não inicou tarefas hoje =(
                </BoxTracker>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import FormTracker from './components/FormTracker.vue'
import TarefaTracker from './components/TarefaTracker.vue'
import BoxTracker from './components/BoxTracker.vue'
import ITarefa from './interface/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral,
        FormTracker,
        TarefaTracker,
        BoxTracker
    },
    data () {
        return {
            tarefas: [] as ITarefa[],
            modoEscuroAtivo: false
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
        },
        trocarTema (modoEscuroAtivo: boolean) {
            this.modoEscuroAtivo = modoEscuroAtivo; 
        }
    }
});
</script>

<style>
.lista {
    padding: #fff;
}
main {
    --bg-primario: #fff;
    --text-primario: #000;
}
main.modo-escuro {
    --bg-primario: #2d2d42;
    --text-primario: #ddd;
}
.conteudo {
    background: var(--bg-primario);
    height: 100vh;
}
</style>