import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import FormProjeto from '../views/Projetos/FormProjeto.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos
    },
    {
        path: '/projetos/novo',
        name: 'Novo projetos',
        component: FormProjeto
    },
    {
        path: '/projetos/:id',
        name: 'Editar projetos',
        component: FormProjeto
    },
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;
