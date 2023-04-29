import { TipoNotificacao } from "@/interface/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipos-mutacoes"

type Notificador = {
    notificar: (titulo: string, texto: string, tipo: TipoNotificacao) => void
}

export default () : Notificador => {
    const notificar = (titulo: string, texto: string, tipo: TipoNotificacao): void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }

    return {
        notificar
    }
}
