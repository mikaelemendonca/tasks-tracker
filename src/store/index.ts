
import http from '@/http'

import IProjeto from "@/interface/IProjeto";
import { INotificacao } from "@/interface/INotificacao";

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipos-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "./tipos-acoes";

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
    // essas mudanças de estado NÃO PODEM depender de requsições http
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
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[]) {
            state.projetos = projetos
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
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
            
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            return http.post(
                '/projetos',
                {
                    nome: nomeDoProjeto
                }
            )
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
            return http.put(
                `/projetos/${projeto.id}`,
                {
                    nome: projeto.nome
                }
            )
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}

