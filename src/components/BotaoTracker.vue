<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
      <span v-if="icone" class="icon">
        <i :class="icone"></i>
      </span>
      <span v-if="texto">{{ texto }}</span>
    </button>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoTracker',
    emits: ['clicado'],
    props: {
        desabilitado: {
            type: Boolean
        },
        icone: {
            type: String
        },
        texto: {
            type: String,
            required: true
        },
    },
    methods: {
        clicado () : void {
            this.$emit('clicado')
        }
    }
})

</script>
