
import IProjeto from "@/interface/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipos-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interface/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [
            {
                id: 1,
                texto: 'Uma notificacao de sucesso',
                titulo: 'sucesso',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: 'Uma notificacao de atencao',
                titulo: 'atencao',
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                texto: 'Uma notificacao de falha',
                titulo: 'falha',
                tipo: TipoNotificacao.FALHA
            }
        ]
    },
    mutations: {
        [ADICIONA_PROJETO] (state, nome: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nome
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO] (state, projeto: IProjeto) {
            const index = state.projetos.findIndex(
                proj => proj.id == projeto.id
            )
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO] (state, id: string) {
            state.projetos = state.projetos.filter(
                proj => proj.id != id
            )
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}

