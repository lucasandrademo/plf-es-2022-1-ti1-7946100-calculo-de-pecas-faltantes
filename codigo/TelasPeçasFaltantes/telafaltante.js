const local = {
    set: (name, obj) => localStorage.setItem(name, JSON.stringify(obj)),
    clr: () => localStorage.clear(),
    get: (name) => JSON.parse(localStorage.getItem(name)),
    rmv: (name) => localStorage.removeItem(name),
    add: (nameObjc, objAdd) => {
        const newObjc = JSON.parse(localStorage.getItem(nameObjc));
        localStorage.removeItem(nameObjc);
        newObjc.push(objAdd)
        localStorage.setItem(nameObjc, JSON.stringify(newObjc));
    },
    dell: (nameObjc, objDellId) => {
        let newObjc = [];
        JSON.parse(localStorage.getItem(nameObjc)).forEach(objc => {
            if(objc.id != objDellId){
                newObjc.push(objc)
            }
        });
        localStorage.removeItem(nameObjc);
        localStorage.setItem(nameObjc, JSON.stringify(newObjc));
    },
    update: (nameObjc, ObjId, newObj) => {
        let newObjc = [];
        JSON.parse(localStorage.getItem(nameObjc)).forEach(objc => {
            if(objc.id != ObjId){
                newObjc.push(objc)
            }
        });
        localStorage.removeItem(nameObjc);
        newObjc.push(newObj)
        localStorage.setItem(nameObjc, JSON.stringify(newObjc));
    }
}

const bts = {
    addRow : (table, row) => {
        table.bootstrapTable(
            'insertRow',
            {
                index: 0,
                row: row
            }
        )
    },
    dellRow : (table, id) => {
        table.bootstrapTable(
            'remove',
            {
                field: 'id',
                values: [id]
            }
        )
    },
    hide : (table, index) => {
        table.bootstrapTable(
            'hideRow',
            {
                index: index
            }
        )
    },
    update: (table, id, index, row) => {
        table.bootstrapTable(
            'remove',
            {
                field: 'id',
                values: [id]
            }
        )
        table.bootstrapTable(
            'insertRow',
            {
                index: index,
                row: row
            }
        )
    }
}
const table = $('#telafaltantestable');

var produtos;
var pecas;


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

var pecas = [
    {
        "id": 'IYfFhyYpSfER5VjAnPUyWevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'DLJK4',
        "name": 'Volante',
        "desc": 'Guia para direção inclusa na cabine',
        "qtde": 3,
        "qtd_estoque": 0
    },
    {
        "id": 'IYfFhyYpSUIWGVjAfFhyYevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'DUJK4',
        "name": 'Cabaça',
        "desc": 'Parte superior inserida no topo da cabine',
        "qtde": 2,
        "qtd_estoque": 30
    },
    {
        "id": 'IYfFhytasfgYpSUIWGVjAfFhyYevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'LDSF4',
        "name": 'Teste',
        "desc": 'teste',
        "qtde": 1,
        "qtd_estoque": 30
    },
    {
        "id": 'AXjAETSFuUK5p5VjAnPUyWevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'PDJ44',
        "name": 'Guia D',
        "desc": 'Guia do lado direito do motorista para controle',
        "qtde": 2,
        "qtd_estoque": 98
    },
    {
        "id": 'IYfFhyYpAXjAETSFuUK5pevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'PJJ43',
        "name": 'Guia E',
        "desc": 'Guia do lado esquerdo do motorista para controle',
        "qtde": 3,
        "qtd_estoque": 2
    },
    {
        "id": 'IY43hyYpAXjAETSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "cod": 'PJJ23',
        "name": 'Pedal',
        "desc": 'Responsabilidade de controle',
        "qtde": 2,
        "qtd_estoque": 1
    },
    {
        "id": 'IYfFhyYpAXjA0oSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "cod": 'PKD43',
        "name": 'Guia',
        "desc": 'Manual de guia',
        "qtde": 1,
        "qtd_estoque": 2
    },
    {
        "id": 'IYfFhyYpAXjAEdpSFuUK5pevza',
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "cod": 'SLJ43',
        "name": 'tela E',
        "desc": 'Relacao Geral',
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
        "dtEntrega": "2022-06-20"
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
$(document).ready(() => {
    $('.bootstrap-table').css('width', '90%')
    setTemporario()
    calcularFaltantes(5)
    setHeader()
    setTable()
})
function setHeader(){
    table.bootstrapTable('destroy');
    table.bootstrapTable({
        columns:[{
            field: 'codpeca',
            sortable: true,
            title: 'Codígo da Peça'
        },{
            field: 'qtde_dia0',
            sortable: true,
            title: 'Atraso'
        },{
            field: 'qtde_dia1',
            sortable: true,
            title: moment().format('DD/MM/YY')
        },{
            field: 'qtde_dia2',
            sortable: true,
            title: moment().add(1,'d').format('DD/MM/YY') 
        },{
            field: 'qtde_dia3',
            sortable: true,
            title: moment().add(2,'d').format('DD/MM/YY') 
        },{
            field: 'qtde_dia4',
            sortable: true,
            title: moment().add(3,'d').format('DD/MM/YY') 
        }]
    });
}

function setTable(){
    const necessidades = local.get("necessidades")
    necessidades.forEach(necessidade => {
        bts.addRow(table,necessidade)
    });
}


function setTemporario(){
        local.set('produtos', produtos);
        local.set('pecas', pecas);
        local.set('compras', compras);
        
}



function calcularFaltantes(dias) {
    const ordensCompras = local.get('compras');
    const pecasComprados = local.get('pecas');
    const produtosDados = local.get('produtos');
    const arrayNecessidade = [];
    let hoje = moment().format("YYYY-MM-DD");

    pecasComprados.forEach(pecaNecessaria => {
        ordensCompras.forEach(ordemCompra => {
            if(ordemCompra.produto == pecaNecessaria.produto){
                let dataCompra = moment(ordemCompra.dtEntrega, 'YYYY-MM-DD')
                let produto = produtosDados.filter(function(obj) { return obj.id == ordemCompra.produto; });
                let dataNecessidade = dataCompra.subtract(produto[0].tkt, "d").format("YYYY-MM-DD");
                let necessidades = arrayNecessidade.filter(function(obj) { return obj.peca == pecaNecessaria.cod && obj.dtNecessidade == dataNecessidade; });
                if (necessidades.length === 0){
                    arrayNecessidade.push({
                        dtNecessidade: dataNecessidade,
                        atraso: dataNecessidade < hoje ? 1 : 0,
                        peca: pecaNecessaria.id,
                        codpeca: pecaNecessaria.cod,
                        qtdeNecessaria: ordemCompra.qtde*pecaNecessaria.qtde
                    })
                }else{
                    necessidades[0].qtdeNecessaria = necessidades[0].qtdeNecessaria + (ordemCompra.qtde*pecaNecessaria.qtde)
                }
            }
        })
    });

    let atrasados = arrayNecessidade.filter(function(obj) { return obj.atraso == 1 });
    let necessidadeFinal = [];
    atrasados.forEach(atrasado => {
        let necessidadeExistente = necessidadeFinal.filter(function(obj) { return obj.peca == atrasado.peca; });
        if (necessidadeExistente.length === 0){
            necessidadeFinal.push({
                peca: atrasado.peca,
                codpeca: atrasado.codpeca,
                qtde_dia0: atrasado.qtdeNecessaria
            })
        }else{
            necessidadeExistente[0].qtde_dia0 += atrasado.qtdeNecessaria
        }
    });

    for (let index = 0; index < dias; index++) {
        let diasNec = arrayNecessidade.filter(function(obj) { return obj.dtNecessidade == moment(hoje).add(index, "d").format("YYYY-MM-DD") });
        let nomeQtdDia = 'qtde_dia' + (index + 1)
        diasNec.forEach(dia => {
            let necessidadeExistente = necessidadeFinal.filter(function(obj) { return obj.peca == dia.peca; });
            if (necessidadeExistente.length === 0){
                necessidadeFinal.push({
                    peca: dia.peca,
                    codpeca: dia.codpeca
                })
            }
            necessidadeExistente = necessidadeFinal.filter(function(obj) { return obj.peca == dia.peca; });
            necessidadeExistente[0][nomeQtdDia] = dia.qtdeNecessaria
        });
    }
    necessidadeFinal.forEach(nec => {
        let peca = pecasComprados.filter(function(obj) { return obj.id == nec.peca });
        let estoque = peca[0].qtd_estoque
        Object.keys(nec).forEach((key) => {
            if(key.indexOf("qtde_dia") != -1){
                nec[key] -= estoque
                if(nec[key] < 0){
                    estoque = Math.abs(nec[key])
                    nec[key] = 0
                }else{
                    estoque = 0
                }
            }else{
            }
        });          
    });

    local.set('necessidades', necessidadeFinal)

}