if (localStorage.getItem('produtos') === null) {
    localStorage.setItem('produtos', JSON.stringify([]));
}

function cadastroProduto () {

    let produtos = JSON.parse(localStorage.getItem('produtos'));
    let nome = document.getElementById("NOME").value;
    let descricao = document.getElementById("DESCRICAO").value;
    let codigo = document.getElementById("CODE").value;
    let tkt = document.getElementById("TKT").value;

    const produto = {
        nome: nome,
        descricao: descricao,
        codigo: codigo,
        tkt: tkt
    }

        produtos.push(produto);
        console.log(produtos)
        localStorage.setItem('produtos', JSON.stringify(produtos));
        document.getElementById('FORMULARIO_PRODUTO').reset();
        alert('Produto cadastrado com sucesso!');

}

document.getElementById('FORMULARIO_PRODUTO').addEventListener('submit', cadastroProduto);