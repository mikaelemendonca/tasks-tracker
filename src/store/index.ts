
import IProjeto from "@/interface/IProjeto";
import ITarefa from "@/interface/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipos-mutacoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA } from "./tipos-mutacoes";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: []
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
        [ADICIONA_TAREFA] (state, nome: string) {
            const tarefa = {
                descricao: nome
            } as ITarefa
            state.tarefas.push(tarefa)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}

