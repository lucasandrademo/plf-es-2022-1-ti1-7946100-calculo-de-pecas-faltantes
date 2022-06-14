
const local = {
    set: (nome, obj) => localStorage.setItem(nome, JSON.stringify(obj)),
    clr: () => localStorage.clear(),
    get: (nome) => JSON.parse(localStorage.getItem(nome)),
    rmv: (nome) => localStorage.removeItem(nome),
    add: (nomeObjc, objAdd) => {
        const newObjc = JSON.parse(localStorage.getItem(nomeObjc));
        localStorage.removeItem(nomeObjc);
        newObjc.push(objAdd)
        localStorage.setItem(nomeObjc, JSON.stringify(newObjc));
    },
    dell: (nomeObjc, objDellId) => {
        let newObjc = [];
        JSON.parse(localStorage.getItem(nomeObjc)).forEach(objc => {
            if(objc.id != objDellId){
                newObjc.push(objc)
            }
        });
        localStorage.removeItem(nomeObjc);
        localStorage.setItem(nomeObjc, JSON.stringify(newObjc));
    },
    update: (nomeObjc, ObjId, newObj) => {
        let newObjc = [];
        JSON.parse(localStorage.getItem(nomeObjc)).forEach(objc => {
            if(objc.id != ObjId){
                newObjc.push(objc)
            }
        });
        localStorage.removeItem(nomeObjc);
        newObjc.push(newObj)
        localStorage.setItem(nomeObjc, JSON.stringify(newObjc));
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

const gera = {
    id: (dataBase, length = 25) => {
        let resultado = '';
        let characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let characteresTamanho = characteres.length;
        for ( let i = 0; i < length; i++ ) {
            resultado += characteres.charAt(Math.floor(Math.random() * characteresTamanho));
        }
        let bd = local.get(dataBase)
        bd.forEach(data => {
            if(data.id == resultado){
                return false
            }
        });
        return resultado;
    }
}

const table = $('#comprasTable');

var produtos;

$(document).ready(() => {
    produtos = local.get('produtos');
    setProdutosSelect();
    setComprasTable();
    $('.bootstrap-table').css('width', '90%')
})

function selectOptions(obj, msg = '', showCodigo = true){
    let html = '';
    if(msg != ''){
        html += `<option value="" disabled selected hidden>${msg}</option>`;
    }
    obj.forEach(item => {
        html +=
        `<option value="${item.id}">
            ${showCodigo && item.codigo + ' - '}
            ${item.descricao}
        </option>`;
    });
    return html;
}

function setProdutosSelect(){
    let pecas = local.get('pecas');
    let produtosSelect = []
    produtos.forEach(produto => {
        pecas.forEach(peca => {
            let select = produtosSelect.filter(function(obj) { return obj.id == peca.produto});
            if(produto.id == peca.produto && select.length === 0){
                produtosSelect.push(produto)
            }
        });
    });
    const html = selectOptions(
        produtosSelect,
        'Selecione um Produto'
    );
    $('.produtos-select').html(html);
}

function setComprasTable(){
    const compras = local.get('compras');
    compras.forEach(compra => {
        let produto = produtos.filter(function(obj) { return obj.id == compra.produto; });
        bts.addRow(
            table,
            {
                id: compra.id,
                produto: compra.produto,
                codigo: produto[0].codigo,
                descricao: produto[0].descricao,
                qtde: compra.qtde,
                dtCompra: compra.dtCompra,
                dtEntrega: compra.dtEntrega
            }
        )
    });
}

function produtoValidate(prodId){
    let produtos = local.get('produtos');
    let filtrado = produtos.filter(function(obj) { return obj.id == prodId; });
    if(filtrado.length != 1){
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'Cadastro de Produto defeituoso, favor, entrar em contato com o responsável',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        return false;
    }
    return filtrado[0];
}

function dataValidate(dataCompra, dataEntrega, tkt){
    let isValid = dataEntrega.isAfter(dataCompra.add(tkt, "d"));

    if(!isValid){
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'A fábrica não é capaz de entregar esse produto no tempo solicitado',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
    }
    return isValid;
}

function validaQtd(qtd){
    if(qtd == null || qtd == '' || qtd <= 0){
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'Necessário inserir uma quantidade',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        return false;
    }
    return true;
}

function getDadosFormValidate(id = null){
    const prodId = $(".produtos-select").val();
    const qtd = $(".qtde-input").val();
    let dataCompra = $(".date-input").val();
    let dataEntrega = $(".date-send-input").val();

    if(!validaQtd(qtd)) return false;

    const produtoValido = produtoValidate(prodId);

    if(produtoValido == false) return false;
    
    dataCompra == '' ? dataCompra = moment() : dataCompra = moment(dataCompra, "YYYY-MM-DD");

    if(dataEntrega == ''){
        dataEntrega = moment(dataCompra);
        dataEntrega = dataEntrega.add(produtoValido.tkt + local.get('margemPadrao'), "d");
    }else{
        dataEntrega = moment(dataEntrega, "YYYY-MM-DD")
    }

    const dtCompra = dataCompra.format("YYYY-MM-DD");
    const dtEntrega = dataEntrega.format("YYYY-MM-DD");

    if(!dataValidate(dataCompra, dataEntrega, produtoValido.tkt)) return false;

    if(id==null){
        id = gera.id('compras')
    
        while(id == false){
            id = gera.id('compras')
        }
    }

    return [
        {
            bts: {
                id: id,
                produto: prodId,
                codigo: produtoValido.codigo,
                descricao: produtoValido.descricao,
                qtde: qtd,
                dtCompra: dtCompra,
                dtEntrega: dtEntrega,
            },
            local: {
                id: id,
                produto: prodId,
                qtde: qtd,
                dtCompra: dtCompra,
                dtEntrega: dtEntrega,
            }
        }
    ]
}

function excluir(id){
    local.dell('compras', id)
    bts.dellRow(table, id)
}

function confirmaExclusao(id, codigo, descricao, dtEntrega){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'CONFIRMAÇÃO DE EXCLUSAO!',
        type: 'warning',
        position: 'top-right',
        descricaoription: `deseja realmente excluir o dado  ${codigo} - ${descricao}, com data de entrega para dia ${dtEntrega}?`,
        image: {
            visible: true,
            customImage: '../assets/growl-notification/img/warning.png'
        },
        showButtons: true,
        buttons: {
            action: {
                text: 'Sim',
                callback: () => excluir(id)
            },
            cancel: {
                text: 'Cancelar',                
            }
        },
        closeTimeout: 10000
    });
}

function limpaEdicao(index){
    $("tr[data-index='"+index+"']").removeClass('selected');
    $("#submitBtn").css('display', '');
    $("#editBtns").css('display', 'none');
    $(".produtos-select").removeAttr("disabled");
    $(".excluir").removeAttr("disabled");
    $(".editar").removeAttr("disabled");
    $(".produtos-select").val('');
    $(".qtde-input").val('');
    $(".date-input").val('');
    $(".date-send-input").val('');
}

function salvaEdicao(id, index){
    const validData = getDadosFormValidate(id)

    if(validData == false){
        return
    }

    const data = validData[0];

    bts.update(
        table,
        id,
        index,
        data.bts
    )
    local.update(
        'compras',
        id,
        data.local
    )
    limpaEdicao(index);
}

function editar(id, produto, qtde, dtCompra, dtEntrega, index){

    html =`<button onclick="salvaEdicao('${id}','${index}')" id="saveBtn" class="buttons">Salvar</button>
    <button onclick="limpaEdicao('${index}')" id="cancelBtn" class="buttons">Cancelar</button>`

    $("tr[data-index='"+index+"']").addClass('selected');
    $("#submitBtn").css('display', 'none');
    $("#editBtns").css('display', '');
    $("#editBtns").html(html);
    $(".excluir").attr("disabled","disabled");
    $(".editar").attr("disabled","disabled");
    $(".produtos-select").val(produto);
    $(".qtde-input").val(qtde);
    $(".date-input").val(dtCompra);
    $(".date-send-input").val(dtEntrega);
    $(".produtos-select").attr("disabled","disabled");
}

function confirmaEdicao(id, produto, codigo, descricao, qtde, dtCompra, dtEntrega, index){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'Deseja Editar?',
        type: 'info',
        position: 'top-right',
        descricaoription: `deseja realmente editar o dado  ${codigo} - ${descricao}, com data de entrega para dia ${dtEntrega}?`,
        image: {
            visible: true,
            customImage: '../assets/growl-notification/img/default.png'
        },
        showButtons: true,
        buttons: {
            action: {
                text: 'Sim',
                callback: () => editar(id, produto, qtde, dtCompra, dtEntrega, index)
            },
            cancel: {
                text: 'Cancelar',                
            }
        },
        closeTimeout: 10000
    });
}

function actions(value, row, index) {
    let excluir, editar = '';
    excluir =
    `<button onclick="confirmaExclusao('${row.id}','${row.codigo}','${row.descricao}','${row.dtEntrega}')" class="excluir btn btn-danger" title="Excluir registro">
        <i class="fa fa-trash" aria-hidden="true"></i>
    </button>`;
    editar =
    `<button onclick="confirmaEdicao('${row.id}', '${row.produto}','${row.codigo}','${row.descricao}','${row.qtde}','${row.dtCompra}', '${row.dtEntrega}','${index}')" class="editar btn btn-primary" title="Editar registro">
        <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>`;
    return [
        excluir,
        editar
    ].join('');   
}

$('#submitBtn').click( (event) => {
    event.preventDefault();
    const validData = getDadosFormValidate()

    if(validData == false){
        return
    }

    const data = validData[0]

    bts.addRow(
        table,
        data.bts
    )
    local.add(
        'compras',
        data.local
    )

    GrowlNotification.notify({
        title: 'CADASTRO REALIZADO!',
        type: 'success',
        position: 'top-right',
        closeTimeout: 5000
    });
})
