import ITarefa from "@/interface/ITarefa"
import http from '@/http'
import { Estado } from "@/store"
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipos-acoes"
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/tipos-mutacoes"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(
                tf => tf.id == tarefa.id
            )
            state.tarefas[index] = tarefa
        },
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
    },
    actions: {
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
}
