
import http from '@/http'

import IProjeto from "@/interface/IProjeto";
import ITarefa from '@/interface/ITarefa';
import { INotificacao } from "@/interface/INotificacao";

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipos-mutacoes";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipos-acoes";

interface Estado {
    tarefas: ITarefa[],
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
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
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_PROJETO] (state, projeto: IProjeto) {
            const index = state.projetos.findIndex(
                proj => proj.id == projeto.id
            )
            state.projetos[index] = projeto
        },
        [ALTERA_TAREFA] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(
                tf => tf.id == tarefa.id
            )
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_PROJETO] (state, id: string) {
            state.projetos = state.projetos.filter(
                proj => proj.id != id
            )
        },
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
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
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`,tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}

