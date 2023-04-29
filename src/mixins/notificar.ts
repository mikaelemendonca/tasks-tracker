import { TipoNotificacao } from "@/interface/INotificacao"
import { NOTIFICAR } from "@/store/tipos-mutacoes"
import { store } from '@/store'

export const notificacaoMixin = {
    methods: {
        notificar (titulo: string, texto: string, tipo: TipoNotificacao): void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    }
}