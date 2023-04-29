<template>
    <section>
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
import { ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR } from "@/store/tipos-mutacoes";
import { TipoNotificacao } from '@/interface/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
    name: 'FormProjeto',
    props: {
        id: {
            type: String
        }
    },
    mixins: [
        notificacaoMixin
    ],
    data () {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar () {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = ''
            this.notificar(
                'Novo projeto foi salvo',
                'Prontinho ;) seu projeto já está disponível',
                TipoNotificacao.SUCESSO
            )
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

