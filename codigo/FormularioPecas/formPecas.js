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

const table = $('#pecasTable');

var produtos;
var pecas;

$(document).ready(() => {
    local.set('pecas', [])
    produtos = local.get('produtos');
    pecas = local.get('pecas');
    setProdutosSelect();
    setPecasTable();
    $('.bootstrap-table').css('width', '90%')
})

function setProdutosSelect(){
    const html = selectOptions(
        produtos,
        'Selecione um Produto'
    );
    $('.produtos-select').html(html);
}

function selectOptions(obj, msg = '', showcodigo = true){
    let html = '';
    if(msg != ''){
        html += `<option value="" disabled selected hidden>${msg}</option>`;
    }
    obj.forEach(item => {
        html +=
        `<option value="${item.id}">
            ${showcodigo && item.codigo + ' - '}
            ${item.descricao}
        </option>`;
    });
    return html;
}

function setPecasTable(){
    const pecas = local.get('pecas');
    pecas.forEach(peca => {
        let produto = produtos.filter(function(obj) { return obj.id == peca.produto; });
        bts.addRow(
            table,
            { 
                id: peca.id,
                produto: peca.produto,
                codigoprod: produto[0].codigo,
                nomeprod: produto[0].nome,
                codigo: peca.codigo,
                nome: peca.nome,
                descricao: peca.descricao,
                qtde: peca.qtde
            }
        )
    });
}

function codigoValidate(codigo){
    let dadoValido = true
    pecas = local.get('pecas')
    pecas.forEach(peca => {
        if(peca.codigo == codigo){
            dadoValido = false;
            GrowlNotification.closeAll();
            GrowlNotification.notify({
                title: 'ERRO DE CADASTRO!',
                descricaoription: 'Código da peça já cadastrado',
                type: 'error',
                position: 'top-right',
                closeTimeout: 5000
            });
        }
    });
    return dadoValido;
}

function produtoValidate(prodId){
    let produtos = local.get('produtos');
    let filtrado = produtos.filter(function(obj) { return obj.id == prodId; });
    if(filtrado.length != 1){
        filtrado[0] = false;
        GrowlNotification.closeAll();
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'Cadastro de Produto defeituoso, favor, entrar em contato com o responsável',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
    }
    return filtrado[0];
}

function qtdeValidate(quantidade){
    let dadoValido = true
    if(quantidade == '' || quantidade <= 0 || quantidade != Math.trunc(quantidade)){
        GrowlNotification.closeAll();
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'Quantidade deve ser um número inteiro e positivo',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        dadoValido = false
    }
    return dadoValido;
}

function requiredValidate(nome, codigo){
    let dadoValido = true
    if(
        nome == '' ||
        codigo == ''
    ){
        GrowlNotification.closeAll();
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            descricaoription: 'Dados obrigatórios não preenchidos',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        obrigatorios = false
    }
    return dadoValido;
}

function getEstoque(id){
    let estoque = 0;
    pecas.forEach(peca => {
        if(peca.id = id){
            estoque = peca.qtd_estoque
        }
    });
    return estoque
}

function getDadosPecasValidate(id = null){
    const prodId = $(".produtos-select").val();
    const codigo = $(".codigo").val();
    const nome = $(".nome").val();
    const descricao = $(".descricao").val();
    const quantidade = $(".qtde").val();
    const qtdeValido = qtdeValidate(quantidade);
    const produtoValido = produtoValidate(prodId);
    let codigoValido = true;
    const qtdeEstoque = getEstoque(id);
    const obrigatoriosValido = requiredValidate(nome, codigo);
    if(id==null){
        codigoValido = codigoValidate(codigo);
        id = gera.id('pecas')
    
        while(id == false){
            id = gera.id('pecas')
        }
    }

    if(
        produtoValido == false ||
        codigoValido == false ||
        obrigatoriosValido == false ||
        qtdeValido == false
    ){
        return false;
    }

    return [
        {
            bts: {
                id: id,
                produto: prodId,
                codigoprod: produtoValido.codigo,
                nomeprod: produtoValido.nome,
                codigo: codigo,
                nome: nome,
                descricao: descricao,
                qtde: quantidade
            },
            local: {
                id: id,
                produto: prodId,
                codigo: codigo,
                nome: nome,
                descricao: descricao,
                qtde: quantidade,
                qtd_estoque: qtdeEstoque
            }
        }
    ]

}

function excluir(id){
    local.dell('pecas', id)
    bts.dellRow(table, id)
}

function confirmaExclusao(id, codigo, nome, codigoprod){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'CONFIRMAÇÃO DE EXCLUSAO!',
        type: 'warning',
        position: 'top-right',
        descricaoription: `deseja realmente excluir a peca ${codigo} - ${nome}, vinculado ao produto ${codigoprod}?`,
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
    $(".nome").val('');
    $(".descricao").val('');
    $(".codigo").val('');
    $(".qtde").val('');
}

function salvaEdicao(id, index, codigo){
    const validData = getDadosPecasValidate(id)

    if(validData != false){
        const data = validData[0];

        bts.update(
            table,
            id,
            index,
            data.bts
        )
        local.update(
            'pecas',
            id,
            data.local
        )
        limpaEdicao(index);
        pecas = local.get('pecas')
    
        GrowlNotification.notify({
            title: `PEÇA ${codigo} ATUALIZADA!`,
            type: 'success',
            position: 'top-right',
            closeTimeout: 5000
        });
    }
}

function editar(id, index, produto, nome, descricao, codigo, qtde){

    html =`<button onclick="salvaEdicao('${id}','${index}','${codigo}')" id="saveBtn" class="buttons">Salvar</button>
    <button onclick="limpaEdicao('${index}')" id="cancelBtn" class="buttons">Cancelar</button>`

    $("tr[data-index='"+index+"']").addClass('selected');
    $("#submitBtn").css('display', 'none');
    $("#editBtns").css('display', '');
    $("#editBtns").html(html);
    $(".excluir").attr("disabled","disabled");
    $(".editar").attr("disabled","disabled");
    $(".produtos-select").val(produto);
    $(".nome").val(nome);
    $(".descricao").val(descricao);
    $(".codigo").val(codigo);
    $(".qtde").val(qtde);
}

function confirmaEdicao(id, codigo, nome, codigoprod, index, produto, descricao, qtde){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'Deseja Editar?',
        type: 'info',
        position: 'top-right',
        descricaoription: `deseja realmente editar a peca ${codigo} - ${nome}, vinculado ao produto ${codigoprod}?`,
        image: {
            visible: true,
            customImage: '../assets/growl-notification/img/default.png'
        },
        showButtons: true,
        buttons: {
            action: {
                text: 'Sim',
                callback: () => editar(id, index, produto, nome, descricao, codigo, qtde)
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
    `<button onclick="confirmaExclusao('${row.id}','${row.codigo}','${row.nome}','${row.codigoprod}')" class="excluir btn btn-danger" title="Excluir registro">
        <i class="fa fa-trash" aria-hidden="true"></i>
    </button>`;
    editar =
    `<button onclick="confirmaEdicao('${row.id}','${row.codigo}','${row.nome}','${row.codigoprod}', '${index}','${row.produto}','${row.descricao}','${row.qtde}')" class="editar btn btn-primary" title="Editar registro">
        <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>`;
    return [
        excluir,
        editar
    ].join('');   
}

$('#submitBtn').click( (event) => {
    event.preventDefault();
    const validData = getDadosPecasValidate()

    if(validData != false){
        const data = validData[0]

        bts.addRow(
            table,
            data.bts
        )
        local.add(
            'pecas',
            data.local
        )
        
        pecas = local.get('pecas')
    
        GrowlNotification.notify({
            title: 'CADASTRO REALIZADO!',
            type: 'success',
            position: 'top-right',
            closeTimeout: 5000
        });
    }
})
