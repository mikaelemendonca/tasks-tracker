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

import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interface/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipos-acoes';
import { useRouter } from 'vue-router';
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
    setup (props) {
        const router = useRouter()
        const store = useStore()
        const { notificar } = useNotificador()

        // trabalhando com composition api
        const nomeDoProjeto = ref("")
        if (props.id) {
            const projeto = store.state.projeto.projetos.find(
                proj => proj.id == props.id
            )
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const salvar = () => {
            if (props.id) {
                store
                    .dispatch(ALTERAR_PROJETO, {
                        id: props.id,
                        nome: nomeDoProjeto.value
                    })
                    .then(() => lidarComSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = ''
            notificar(
                'Novo projeto foi salvo',
                'Prontinho ;) seu projeto já está disponível',
                TipoNotificacao.SUCESSO
            )
            router.push('/projetos')
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
})

</script>

