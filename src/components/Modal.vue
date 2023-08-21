<template>
    <div
        class="modal"
        :class="{ 'is-active': mostrar }" 
    >
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header" />
            </header>
            <section class="modal-card-body">
                <slot name="section" />
            </section>
            <footer class="modal-card-foot">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: "Modal",
    props: {
        mostrar: {
            type: Boolean,
            required: true
        }
    }
})

</script>
