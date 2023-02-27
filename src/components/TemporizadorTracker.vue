<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronoTracker :tempoEmSegundos="tempoEmSegundos" />
        
        <BotaoTracker @clicado="iniciar" icone="fas fa-play" texto="Iniciar" :desabilitado="cronometroRodando" />
        <BotaoTracker @clicado="finalizar" icone="fas fa-stop" texto="Parar" :desabilitado="!cronometroRodando" />

        <BotaoTracker texto="Finalizar" :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import CronoTracker from './CronoTracker.vue'
import BotaoTracker from './BotaoTracker.vue'

export default defineComponent({
    name: 'TemporizadorTracker',
    emits: [
        'aoTemporizadorFinalizado'
    ],
    components: {
        CronoTracker,
        BotaoTracker
    },
    data () {
        return {
            idCronometro: 0,
            tempoEmSegundos: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar () {
            console.log('iniciando . . . ');

            this.cronometroRodando = true;

            this.idCronometro = setInterval(() => {
                console.log('incrementando . . . ');
                this.tempoEmSegundos += 1;
            }, 1000)
        },
        finalizar () {
            console.log('finalizando . . . ');

            this.cronometroRodando = false;

            clearInterval(this.idCronometro)

            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);

            this.tempoEmSegundos = 0;
        }
    }
})

</script>
