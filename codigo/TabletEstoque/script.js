const btnIncrementa$ = document.getElementsByClassName("btnIncrementa");
const btnDecrementa$ = document.getElementsByClassName("btnDecrementa");
const p$ = document.getElementsByClassName("paragrafoContador");

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
        let nome = document.createElement("DIV")
        let nomeP = document.createElement("H2")
        let codigo = document.createElement("DIV")
        let codigoP = document.createElement("h2")
        let quantidade = document.createElement("DIV")
        let quantidadeBttn1 = document.createElement("BUTTON")
        let quantidadeDIV = document.createElement("DIV")
        let quantidadeP = document.createElement("P")
        let quantidadeBttn2 = document.createElement("BUTTON")


        let textoNome = document.createTextNode(`${pecas[i].nome}`);
        let textoCodigo = document.createTextNode(`${pecas[i].codigo}`);
        let textoQuantidade = document.createTextNode(`${pecas[i].quantidade}`);
        let incremento = document.createTextNode(`+`)
        let decremento = document.createTextNode(`-`)       

        nome.appendChild(nomeP)
        nomeP.appendChild(textoNome)
        codigo.appendChild(codigoP)
        codigoP.appendChild(textoCodigo)


        quantidade.appendChild(quantidadeBttn1)
        quantidade.appendChild(quantidadeDIV)
        quantidadeDIV.appendChild(quantidadeP)
        quantidadeP.appendChild(textoQuantidade)
        quantidade.appendChild(quantidadeBttn2)
        quantidadeBttn1.appendChild(decremento)
        quantidadeBttn2.appendChild(incremento)

        nome.className = "paragrafoQuantifica";
        codigo.className = "paragrafoQuantifica";
        quantidadeDIV.className = "divQuantifica"
        quantidadeBttn1.className = "btns"
        quantidadeBttn2.className = "btns"


        
        conteinerPecas.appendChild(nome)
        conteinerPecas.appendChild(codigo)
        conteinerPecas.appendChild(quantidade)
    

    }
}

listarDadosNaTabelaDePecas();



