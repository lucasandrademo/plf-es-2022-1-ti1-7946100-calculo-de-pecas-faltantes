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

var produtos = [
    {
        "id": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'CA2',
        "name": 'Cabine Trator',
        "desc": 'Cabine Trator',
        "tkt": 6
    },
    {
        "id": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'CB2',
        "name": 'Cabine Empilhadeira',
        "desc": 'Cabine Empilhadeira',
        "tkt": 6
    },
    {
        "id": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "cod": 'C42',
        "name": 'Sistema Embreagem',
        "desc": 'Sistema Embreagem',
        "tkt": 3
    },
    {
        "id": '7WduClLpO6AUzylqMNmM2PRZe',
        "cod": 'CGD',
        "name": 'Motor CC',
        "desc": 'Motor CC',
        "tkt": 9
    },
    {
        "id": '8iyCp1KTWImAOb1qaneSf6t0A',
        "cod": 'C9D',
        "name": 'Motor CA',
        "desc": 'Motor CA',
        "tkt": 9
    }
]

var pecas = [
    {
        "id": 'IYfFhyYpSfER5VjAnPUyWevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'DLJK4',
        "name": 'Volante',
        "desc": 'Guia para direção inclusa na cabine'
    },
    {
        "id": 'IYfFhyYpSUIWGVjAfFhyYevza',
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'DUJK4',
        "name": 'Cabaça',
        "desc": 'Parte superior inserida no topo da cabine'
    },
    {
        "id": 'AXjAETSFuUK5p5VjAnPUyWevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'PDJ44',
        "name": 'Guia D',
        "desc": 'Guia do lado direito do motorista para controle'
    },
    {
        "id": 'IYfFhyYpAXjAETSFuUK5pevza',
        "produto": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'PJJ43',
        "name": 'Guia E',
        "desc": 'Guia do lado esquerdo do motorista para controle'
    }
]

var produtos;

function setTemporario(){
    local.set('produtos', produtos);
    local.set('pecas', pecas);
}

$(document).ready(() => {
    setTemporario(); //fake localstorage
    produtos = local.get('produtos');
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

function selectOptions(obj, msg = '', showCod = true){
    let html = '';
    if(msg != ''){
        html += `<option value="" disabled selected hidden>${msg}</option>`;
    }
    obj.forEach(item => {
        html +=
        `<option value="${item.id}">
            ${showCod && item.cod + ' - '}
            ${item.desc}
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
                codprod: produto[0].cod,
                nomeprod: produto[0].name,
                codpeca: peca.cod,
                nomepeca: peca.name,
                descpeca: peca.desc
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
            description: 'Cadastro de Produto defeituoso, favor, entrar em contato com o responsável',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        return false;
    }
    return filtrado[0];
}

function getDadosFormValidate(id = null){
    const prodId = $(".produtos-select").val();
    const codpeca = $(".cod").val();
    const nomepeca = $(".nome").val();
    const descpeca = $(".desc").val();
    const produtoValido = produtoValidate(prodId);

    if(produtoValido == false) return false;

    if(id==null){
        id = gera.id('pecas')
    
        while(id == false){
            id = gera.id('pecas')
        }
    }

    return [
        {
            bts: {
                id: id,
                produto: prodId,
                codprod: produtoValido.cod,
                nomeprod: produtoValido.name,
                codpeca: codpeca,
                nomepeca: nomepeca,
                descpeca: descpeca,
            },
            local: {
                id: id,
                produto: prodId,
                cod: codpeca,
                name: nomepeca,
                desc: descpeca,
            }
        }
    ]
}

function excluir(id){
    local.dell('pecas', id)
    bts.dellRow(table, id)
}

function confirmaExclusao(id, codpeca, nomepeca, codprod){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'CONFIRMAÇÃO DE EXCLUSAO!',
        type: 'warning',
        position: 'top-right',
        description: `deseja realmente excluir a peca ${codpeca} - ${nomepeca}, vinculado ao produto ${codprod}?`,
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
    $(".desc").val('');
    $(".cod").val('');
}

function salvaEdicao(id, index, codpeca){
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
        'pecas',
        id,
        data.local
    )
    limpaEdicao(index);

    GrowlNotification.notify({
        title: `PEÇA ${codpeca} ATUALIZADA!`,
        type: 'success',
        position: 'top-right',
        closeTimeout: 5000
    });
}

function editar(id, index, produto, nomepeca, descpeca, codpeca){

    html =`<button onclick="salvaEdicao('${id}','${index}','${codpeca}')" id="saveBtn" class="buttons">Salvar</button>
    <button onclick="limpaEdicao('${index}')" id="cancelBtn" class="buttons">Cancelar</button>`

    $("tr[data-index='"+index+"']").addClass('selected');
    $("#submitBtn").css('display', 'none');
    $("#editBtns").css('display', '');
    $("#editBtns").html(html);
    $(".excluir").attr("disabled","disabled");
    $(".editar").attr("disabled","disabled");
    $(".produtos-select").val(produto);
    $(".nome").val(nomepeca);
    $(".desc").val(descpeca);
    $(".cod").val(codpeca);
}

function confirmaEdicao(id, codpeca, nomepeca, codprod, index, produto, descpeca){
    GrowlNotification.closeAll();
    GrowlNotification.notify({
        title: 'Deseja Editar?',
        type: 'info',
        position: 'top-right',
        description: `deseja realmente editar a peca ${codpeca} - ${nomepeca}, vinculado ao produto ${codprod}?`,
        image: {
            visible: true,
            customImage: '../assets/growl-notification/img/default.png'
        },
        showButtons: true,
        buttons: {
            action: {
                text: 'Sim',
                callback: () => editar(id, index, produto, nomepeca, descpeca, codpeca)
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
    `<button onclick="confirmaExclusao('${row.id}','${row.codpeca}','${row.nomepeca}','${row.codprod}')" class="excluir btn btn-danger" title="Excluir registro">
        <i class="fa fa-trash" aria-hidden="true"></i>
    </button>`;
    editar =
    `<button onclick="confirmaEdicao('${row.id}','${row.codpeca}','${row.nomepeca}','${row.codprod}', '${index}','${row.produto}','${row.descpeca}')" class="editar btn btn-primary" title="Editar registro">
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
        'pecas',
        data.local
    )

    GrowlNotification.notify({
        title: 'CADASTRO REALIZADO!',
        type: 'success',
        position: 'top-right',
        closeTimeout: 5000
    });
})
