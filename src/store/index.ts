
import IProjeto from "@/interface/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
    ADICIONA_PROJETO,
    ALTERA_PROJETO,
    EXCLUIR_PROJETO,
    NOTIFICAR
} from "./tipos-mutacoes";
import { INotificacao } from "@/interface/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
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
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(
                    notificacao => notificacao.id != novaNotificacao.id
                )
            }, 3000)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}

