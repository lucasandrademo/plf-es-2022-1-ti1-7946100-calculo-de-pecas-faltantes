

var pecas = [
    {
        "id": 'IYfFhyYpSfER5VjAnPUyWevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "codigo": 'DLJK4',
        "nome": 'Volante',
        "descricao": 'Guia para direção inclusa na cabine',
        "qtde": 3,
        "qtd_estoque": 0
    },
    {
        "id": 'IYfFhyYpSUIWGVjAfFhyYevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "codigo": 'DUJK4',
        "nome": 'Cabaça',
        "descricao": 'Parte superior inserida no topo da cabine',
        "qtde": 2,
        "qtd_estoque": 30
    },
    {
        "id": 'IYfFhytasfgYpSUIWGVjAfFhyYevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "codigo": 'LDSF4',
        "nome": 'Teste',
        "descricao": 'teste',
        "qtde": 1,
        "qtd_estoque": 30
    },
    {
        "id": 'AXjAETSFuUK5p5VjAnPUyWevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "codigo": 'PDJ44',
        "nome": 'Guia D',
        "descricao": 'Guia do lado direito do motorista para controle',
        "qtde": 2,
        "qtd_estoque": 98
    },
    {
        "id": 'IYfFhyYpAXjAETSFuUK5pevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "codigo": 'PJJ43',
        "nome": 'Guia E',
        "descricao": 'Guia do lado esquerdo do motorista para controle',
        "qtde": 3,
        "qtd_estoque": 2
    },
    {
        "id": 'IY43hyYpAXjAETSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "codigo": 'PJJ23',
        "nome": 'Pedal',
        "descricao": 'Responsabilidade de controle',
        "qtde": 2,
        "qtd_estoque": 1
    },
    {
        "id": 'IYfFhyYpAXjA0oSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "codigo": 'PKD43',
        "nome": 'Guia',
        "descricao": 'Manual de guia',
        "qtde": 1,
        "qtd_estoque": 2
    },
    {
        "id": 'IYfFhyYpAXjAEdpSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "codigo": 'SLJ43',
        "nome": 'tela E',
        "descricao": 'Relacao Geral',
        "qtde": 2,
        "qtd_estoque": 1
    }
]

var compras = [
    {
        "id": "CwsLQLd7tbrQkmmYnlJEoJtkR",
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "qtde": 2,
        "dtCompra": "2022-05-14",
        "dtEntrega": "2022-05-24"
    },
    {
        "id": "CwsLQLd7tbrQk654gasfaoJtkR",
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "qtde": 10,
        "dtCompra": "2022-05-17",
        "dtEntrega": "2022-06-19"
    },
    {
        "id": "CwsLQLd7tbrQk654gasfaoJ65R",
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "qtde": 3,
        "dtCompra": "2022-05-17",
        "dtEntrega": "2022-06-15"
    },
    {
        "id": "oEoSJ3Owmx3lmR98F39LAgvcp",
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "qtde": 92,
        "dtCompra": "2022-04-14",
        "dtEntrega": "2022-06-13"
    },
    {
        "id": "oEoSJ3Owmx53mR98F39LAgvcp",
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "qtde": 2,
        "dtCompra": "2022-04-14",
        "dtEntrega": "2022-06-14"
    }
]

var produtos = [
    {
        "id": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "codigo": 'CA2',
        "nome": 'Cabine Trator',
        "descricao": 'Cabine Trator',
        "tkt": 6
    },
    {
        "id": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "codigo": 'CB2',
        "nome": 'Cabine Empilhadeira',
        "descricao": 'Cabine Empilhadeira',
        "tkt": 6
    },
    {
        "id": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "codigo": 'C42',
        "nome": 'Sistema Embreagem',
        "descricao": 'Sistema Embreagem',
        "tkt": 3
    },
    {
        "id": '7WduClLpO6AUzylqMNmM2PRZe',
        "codigo": 'CGD',
        "nome": 'Motor CC',
        "descricao": 'Motor CC',
        "tkt": 9
    },
    {
        "id": '8iyCp1KTWImAOb1qaneSf6t0A',
        "codigo": 'C9D',
        "nome": 'Motor CA',
        "descricao": 'Motor CA',
        "tkt": 9
    }
]

var margemPadrao = 3

function setTemporario(){
    console.log('oi')
    local.set('pecas', pecas);
    local.set('compras', compras);
    local.set('margemPadrao', margemPadrao);
}

$(document).ready(() => {
    setTemporario(); //fake localstorage
})