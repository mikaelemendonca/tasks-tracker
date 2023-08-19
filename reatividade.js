const projetos = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}

// os REF são PROXY
const proxy = new Proxy(projetos, {
    get(objetoOriginal, chave) {
        console.log(`Alguém pediu a chave ${chave} do projeto`)
        return objetoOriginal[chave]
    },
    set(objetoOriginal, chave, valor) {
        console.log(`Alguém alterou a chave ${chave} do projeto para o valor ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade'
console.log(proxy.descricao)
