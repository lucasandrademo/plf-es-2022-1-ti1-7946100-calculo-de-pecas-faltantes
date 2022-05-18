if (localStorage.getItem('pecasFaltantes') === null) {
    localStorage.setItem('pecasFaltantes', JSON.stringify([]));
} 

let pecasFaltantes = JSON.parse(localStorage.getItem('pecasFaltantes'));
//aaa

let casoTeste = [{
    idPeca: 1,
    peca1dia: 10,
    peca1semana: 5,
    peca2semana: 2
},
{
    idPeca: 2,
    peca1dia: 15,
    peca1semana: 7,
    peca2semana: 3
}]

function listarDadosNaTabelaDeProduto(){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for(let i = 0; i < casoTeste.length; i++){
        let tr = tbody.insertRow();
        let td_idPeca = tr.insertCell();
        let td_peca1dia = tr.insertCell();
        let td_peca1semana = tr.insertCell();
        let td_peca2semana = tr.insertCell();

        td_idPeca.innerHTML = casoTeste[i].idPeca;
        td_peca1dia.innerHTML = casoTeste[i].peca1dia;
        td_peca1semana.innerHTML = casoTeste[i].peca1semana;
        td_peca2semana.innerHTML = casoTeste[i].peca2semana;
    }
}

listarDadosNaTabelaDeProduto();