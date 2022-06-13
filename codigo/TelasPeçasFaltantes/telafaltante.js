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

let produtos = JSON.parse(localStorage.getItem("produtos"));
let pecas = JSON.parse(localStorage.getItem("pecas"));
let compras = JSON.parse(localStorage.getItem("compras"));

$(document).ready(() => {
    $('.bootstrap-table').css('width', '90%')
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