<template>
    <section>
        <b>{{ tempoDecorrido }}</b>
    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronoTracker',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorrido () : string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
        }
    },
})

</script>
