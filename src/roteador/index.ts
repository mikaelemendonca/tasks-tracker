import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import FormProjeto from '../views/Projetos/FormProjeto.vue'
import ListaProjetos from '../views/Projetos/ListaProjetos.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'ListaProjetos',
                component: ListaProjetos
            },
            {
                path: 'novo',
                name: 'Novo projetos',
                component: FormProjeto
            },
            {
                path: ':id',
                name: 'Editar projetos',
                component: FormProjeto,
                props: true
            },
        ]
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;
