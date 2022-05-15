import * as local from '../component/localStorage.js';
import * as objToHtml from '../component/constructHtml.js';
import * as generate from '../component/generator.js';
import * as preData from './data2.js';

let produtos;
const table = $('#comprasTable');
const margemPadrao = 3;

$(document).ready(() => {
    preData.setTemporario();
    produtos = local.get('produtos');
    setProdutosSelect();
    $('.bootstrap-table').css('width', '90%')
})

function setProdutosSelect(){
    const html = objToHtml.selectOptions(
        produtos,
        'Selecione um Produto'
    );
    $('.produtos-select').html(html);
}

function getProdutoById(prodId){
    let filtrado = produtos.filter(function(obj) { return obj.id == prodId; });
    if(filtrado.length != 1){
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            description: 'Cadastro de Produto defeituoso, favor, entrar em contato com o responsável',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
        return null;
    }
    return filtrado[0];
}

function dataValidate(dataCompra, dataEntrega, tkt){
    let isValid = dataEntrega.isAfter(dataCompra.add(tkt, "d"));

    if(!isValid){
        GrowlNotification.notify({
            title: 'ERRO DE CADASTRO!',
            description: 'A fábrica não é capaz de entregar esse produto no tempo solicitado',
            type: 'error',
            position: 'top-right',
            closeTimeout: 5000
        });
    }
    return isValid;
}

$('.compras-form').submit(function(event){
    event.preventDefault();
    const prodId = $(".produtos-select").val();
    const qtd = $(".qtde-input").val();
    let dataCompra = $(".date-input").val();
    let dataEntrega = $(".date-send-input").val();

    const produto = getProdutoById(prodId);

    if(produto == null) return;
    
    dataCompra == '' ? dataCompra = moment() : dataCompra = moment(dataCompra, "YYYY-MM-DD");

    if(dataEntrega == ''){
        dataEntrega = moment(dataCompra);
        dataEntrega = dataEntrega.add(produto.tkt + margemPadrao, "d");
    }else{
        dataEntrega = moment(dataEntrega, "YYYY-MM-DD")
    }

    const dtCompra = dataCompra.format("DD/MM/YYYY");
    const dtEntrega = dataEntrega.format("DD/MM/YYYY");

    if(!dataValidate(dataCompra, dataEntrega, produto.tkt)) return;

    const row = {
        id: generate.id(25),
        cod: produto.cod,
        desc: produto.desc,
        qtde: qtd,
        dtCompra: dtCompra,
        dtEntrega: dtEntrega,
    }

    objToHtml.insertRow(
        table,
        row
    )
    local.add('compras', row)
})
