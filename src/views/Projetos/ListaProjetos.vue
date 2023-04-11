<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
    </section>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'ListaProjetos',
    setup () {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})

</script>
