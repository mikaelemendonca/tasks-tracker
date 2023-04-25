<template>
    <div class="notificacoes">
        <article
            class="message is-success"
            v-for="notificacao in notificacoes"
            :key="notificacao.id"
        >
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">

import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Notificacoes',
    setup () {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    },
})

</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 100;
}
</style>
