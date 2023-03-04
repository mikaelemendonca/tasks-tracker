<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <BarraLateral @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter">
            <div class="box conteudo">
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'

export default defineComponent({
    name: 'App',
    components: {
        BarraLateral
    },
    data () {
        return {
            modoEscuroAtivo: false
        }
    },
    methods: {
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