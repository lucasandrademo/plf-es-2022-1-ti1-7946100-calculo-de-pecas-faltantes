const btnIncrementa$ = document.getElementById("btnIncrementa");
const btnDecrementa$ = document.getElementById("btnDecrementa");
const container = document.querySelector(".container");
const p$ = document.getElementById("pContador");

let contador = 0;


p$.innerHTML = contador;

btnIncrementa$.addEventListener("click", function(){

p$.innerHTML = ++contador

});

btnDecrementa$.addEventListener("click", function(){

    --contador

    if(contador < 0) {

        contador = 0


    }

    p$.innerHTML = contador

});


if (localStorage.getItem('produtos') === null) {
    localStorage.setItem('produtos', JSON.stringify([]));
} 

let produtos = JSON.parse(localStorage.getItem('produtos'));

let pecas = [{

    nome: "peça1",

    codigo: "2132983219",

    quantidade: 0,
}, 

{
    nome: "peça2",

    codigo: "71449832219",

    quantidade: 2,
    
}

]



function listarDadosNaTabelaDePecas(){

    for(let i = 0; i < pecas.length; i++){
        let divQuantificacao = document.createElement("DIV")
        let nomeP = document.createElement("P")
        let codigoP = document.createElement("P")
        let divQuantifica = document.createElement("DIV")
        let quantidadeBttn1 = document.createElement("BUTTON")
        let quantidadeP = document.createElement("P")
        let quantidadeBttn2 = document.createElement("BUTTON")

        let textoNome = document.createTextNode(`${pecas[i].nome}`);
        let textoCodigo = document.createTextNode(`${pecas[i].codigo}`);
        let textoQuantidade = document.createTextNode(`${pecas[i].quantidade}`);
        let incremento = document.createTextNode(`+`)
        let decremento = document.createTextNode(`-`)
        
        divQuantificacao.appendChild(nomeP)
        divQuantificacao.appendChild(codigoP)
        divQuantificacao.appendChild(divQuantifica)

        divQuantifica.appendChild(quantidadeBttn2)
        divQuantifica.appendChild(quantidadeP)
        divQuantifica.appendChild(quantidadeBttn1)

        nomeP.appendChild(textoNome)
        codigoP.appendChild(textoCodigo)
        quantidadeBttn2.appendChild(decremento)
        quantidadeBttn1.appendChild(incremento)
        quantidadeP.appendChild(textoQuantidade)

        divQuantifica.className = "divQuantifica"
        divQuantificacao.className = "containerQuantificacao"
        nomeP.className = "paragrafoQuantifica"
        codigoP.className = "paragrafoQuantifica"
        quantidadeBttn2.className = "btns"
        quantidadeBttn1.className = "btns"
        quantidadeP.className = "paragrafoContador"
        
        container.appendChild(divQuantificacao)

    }
}

listarDadosNaTabelaDePecas();



