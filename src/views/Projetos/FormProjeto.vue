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
    props: {
        id: {
            type: String
        }
    },
    data () {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar () {
            if (this.id) {
                this.store.commit('ALTERA_PROJETO', {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            }
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    },
    mounted () {
        if (this.id) {
            const projeto = this.store.state.projetos.find(
                proj => proj.id == this.id
            )
            this.nomeDoProjeto = projeto?.nome || ''
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
