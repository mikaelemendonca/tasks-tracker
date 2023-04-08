<template>
    <section class="proejtos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input
                    type="text"
                    class="input"
                    v-model="nomeDoProjeto"
                    id="nomeDoProjeto"
                />
            </div>
            <div class="field">
                <button type="submit" class="button">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'FormProjeto',
    data() {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar () {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    },
    setup () {
        const store = useStore()
        return {
            store
        }
    }
})

</script>

<style>
.projetos {
    padding: 1.25rem;
}
</style>
