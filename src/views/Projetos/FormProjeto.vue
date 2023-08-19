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
import { TipoNotificacao } from '@/interface/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipos-acoes';
// import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
    name: 'FormProjeto',
    props: {
        id: {
            type: String
        }
    },
    // mixins: [
    //     notificacaoMixin
    // ],
    data () {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar () {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => this.lidarComSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
            }
        },
        lidarComSucesso () {
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
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})

</script>

