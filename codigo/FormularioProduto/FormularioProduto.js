if (localStorage.getItem('produtos') === null) {
    localStorage.setItem('produtos', JSON.stringify([]));
} 

let produtos = JSON.parse(localStorage.getItem('produtos'));


function cadastroProduto () {

    let jaExiste = false;
    let nome = document.getElementById("NOME").value;
    let descricao = document.getElementById("DESCRICAO").value;
    let codigo = document.getElementById("CODE").value;
    let tkt = document.getElementById("TKT").value;

    const produto = {
        id: makeid(25),
        nome: nome,
        descricao: descricao,
        codigo: codigo,
        tkt: tkt
    }

    produtos.map((el) => {
        if (el.nome === produto.nome) {
            alert('Produto já cadastrado');
            jaExiste = true
        }})

    if (jaExiste === false) {
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        document.getElementById('FORMULARIO_PRODUTO').reset();
        listarDadosNaTabelaDeProduto()
        alert('Produto cadastrado com sucesso!');
    }

}

function listarDadosNaTabelaDeProduto(){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for(let i = 0; i < produtos.length; i++){
        let tr = tbody.insertRow();
        let td_nome = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_codigo = tr.insertCell();
        let td_tkt = tr.insertCell();

        td_nome.innerHTML = produtos[i].nome;
        td_descricao.innerHTML = produtos[i].descricao;
        td_codigo.innerHTML = produtos[i].codigo;
        td_tkt.innerHTML = produtos[i].tkt;
    }
}

function makeid(length) {
    let resultado = '';
    let characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let characteresTamanho = characteres.length;
    for ( let i = 0; i < length; i++ ) {
        resultado += characteres.charAt(Math.floor(Math.random() * 
      characteresTamanho));
   }
   return resultado;
}

listarDadosNaTabelaDeProduto();
document.getElementById('FORMULARIO_PRODUTO').addEventListener('submit', cadastroProduto);