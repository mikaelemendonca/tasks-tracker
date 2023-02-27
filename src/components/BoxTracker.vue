<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <slot></slot>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxTracker',
    data () {
        return {
            estilos: {
                backgroundColor: '#f9f3e1'
            }
        }
    }
})

</script>
